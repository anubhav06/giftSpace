from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Gift(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='giftsUser')
    link = models.CharField(max_length=800)
    price = models.FloatField()
    trackingID = models.CharField(max_length=32)
    recipient = models.CharField(max_length=32, default=None, null=True)

    def __str__(self):
        return f"{self.user} | {self.link} | {self.price}"

