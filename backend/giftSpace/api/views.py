from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from giftSpace.models import User, Budget, Gift, Person, Tracking

from .serializers import BudgetSerializer, GiftSerializer, PersonSerializer, TrackingSerializer

from twilio.rest import Client
import os
from decouple import config

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



# User registration logic
@api_view(['GET', 'POST'])
def register(request):
    username = request.data["username"]
    email = request.data["email"]

    # Ensure password matches confirmation
    password = request.data["password"]
    confirmation = request.data["confirmPassword"]
    if password != confirmation:
        return Response("ERROR: Passwords don't match", status=status.HTTP_406_NOT_ACCEPTABLE)
    
    # Input validation. Check if all data is provided
    if not email or not username or not password or not confirmation:
        return Response('All data is required')

    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return Response("ERROR: Username already taken", status=status.HTTP_406_NOT_ACCEPTABLE)
    return Response('Registered Successfully from backend')




@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)




# To set the budget of a user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def setBudget(request):
    newBudget = float(request.data['budget'])
    
    # To update the budget of a user if it already exists
    try:
        oldBudget = Budget.objects.get(user=request.user)
        
        # If the budget is increased
        if oldBudget.budget < newBudget:
            addedAmount = newBudget - float(oldBudget.budget)
            # Increase the balance aswell
            oldBudget.balance += addedAmount
        # If the budget is decreased
        elif oldBudget.budget > newBudget:
            decreasedAmount = float(oldBudget.budget) - newBudget
            # Decrease the balance aswell
            oldBudget.balance -= decreasedAmount

        # Update the budget
        oldBudget.budget = newBudget
        oldBudget.save()
    # If no budget exists of the requested user, then add it as a new budget
    except ObjectDoesNotExist:
        budget = Budget(user=request.user, budget=newBudget, balance=newBudget)
        budget.save()

    return Response('✅Budget Set')



# To get the budget of a user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBudget(request):
    try:
        budget = Budget.objects.get(user=request.user)
    # If budget is not set, then throw an error
    except ObjectDoesNotExist:
        return Response('BudgetDoesNotExist', status=status.HTTP_412_PRECONDITION_FAILED)

    print('Budget: ', budget)

    serializer = BudgetSerializer(budget)
    return Response(serializer.data)




# To add a person to the user's gift receivers list
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addPerson(request):
    name = request.data['name']

    data = Person(user=request.user, name=name)
    data.save()

    return Response('✅Added the person')



# To get the list of person's added by the user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPerson(request):

    person = Person.objects.filter(user=request.user)
    serilizer = PersonSerializer(person, many=True)
    return Response(serilizer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addGift(request):
    link = request.data['link']
    price = request.data['price']
    description = request.data['description']
    person = request.data['person']

    # Get the user's budget and subtract the gift's amount from it
    oldBudget = Budget.objects.get(user=request.user)
    newBalance = float(oldBudget.balance) - float(price)
    # Update the balance amount
    oldBudget.balance = newBalance
    oldBudget.save()

    # To add a new gift
    data = Gift(user=request.user, link=link, price=price, description=description, recipient=person)
    data.save()
    
    print('GIFT ID: ', data.id)
    serializer = GiftSerializer(data)
    return Response(serializer.data)



# To get the details of all the gifts added by the user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getGifts(request):
    gifts = Gift.objects.filter(user=request.user)
    serializer = GiftSerializer(gifts, many=True)
    return Response(serializer.data)


# To delete the requested gift item
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteGift(request, id):
    
    print('DELETE ID: ', id)
    # Find the gift by its ID
    gift = Gift.objects.get(user=request.user, id=id)

    # Update the user's balance by adding the gift's amount to it
    price = gift.price
    budget = Budget.objects.get(user=request.user)
    budget.balance += price
    budget.save()

    # Delete the requested gift
    gift.delete()
    return Response('✅Gift deleted')



# To add a tracking data
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTrackingData(request):

    company = request.data['company']
    trackingID = request.data['trackingID']
    description = request.data['description']
    recipient = request.data['recipient']

    trackingData = Tracking(user=request.user, company=company, trackingID=trackingID, description=description, recipient=recipient)
    trackingData.save()

    serializer = TrackingSerializer(trackingData)
    
    return Response(serializer.data)


# To get the tracking data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTrackingData(request):

    trackingData = Tracking.objects.filter(user=request.user)
    serializer = TrackingSerializer(trackingData, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sendMessage(request):

    company = request.data['company']
    trackingID = request.data['trackingID']
    description = request.data['description']
    recipient = request.data['recipient']
    mobileNumber = request.data['mobileNumber']

    account_sid = config('TWILIO_ACCOUNT_SID')
    auth_token = config('TWILIO_AUTH_TOKEN')
    client = Client(account_sid, auth_token) 

    sendTo = '+' + mobileNumber
    sendTo = str(sendTo)

    sendBody = '\nHi ' + str(recipient) + '! I have bought a gift for you this holiday season. It will be delivered via - ' + str(company) + '. Track vide this tracking ID: ' + str(trackingID) + '. \nHappy Holidays! \nSent via GiftSpace WebApp.'
    sendBody = str(sendBody)

    message = client.messages.create(  
                              body=sendBody,
                              from_='+14347223111',      
                              to=sendTo 
                          ) 
    
    print(message.sid)

    return Response('MESSAGE SENT')


    pass