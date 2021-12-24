from django.contrib import admin

# Register your models here.

from .models import Gift, Budget

admin.site.register(Budget)
admin.site.register(Gift)