from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userBudget')
    budget = models.FloatField()
    balance = models.FloatField()

    def __str__(self):
        return f"{self.user}'s budget = {self.budget}  |  Balance={self.balance}"



class Gift(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='giftsUser')
    link = models.CharField(max_length=800)
    price = models.FloatField()
    description = models.CharField(max_length=320)
    recipient = models.CharField(max_length=32, default=None, null=True)

    def __str__(self):
        return f"{self.user} | {self.link} | {self.price}"



class Person(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='giftReciver')
    name = models.CharField(max_length=32)

    def __str__(self):
        return f"{self.name}"



class Tracking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userTracking')
    company = models.CharField(max_length=16)
    trackingID = models.CharField(max_length=32)
    description = models.CharField(max_length=64)
    recipient = models.CharField(max_length=32)
    
    def __str__(self):
        return f"{self.company} | {self.trackingID} | {self.recipient}"