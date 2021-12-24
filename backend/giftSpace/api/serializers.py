from django.db import models
from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from giftSpace.models import Gift, Budget, Person


class BudgetSerializer(ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'


class GiftSerializer(ModelSerializer):
    class Meta:
        model = Gift
        fields = '__all__'


class PersonSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'
