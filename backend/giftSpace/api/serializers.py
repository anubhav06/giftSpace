from django.db import models
from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from giftSpace.models import Gift


class GiftSerializer(ModelSerializer):
    class Meta:
        model = Gift
        fields = '__all__'
