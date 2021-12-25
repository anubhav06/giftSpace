from django.contrib import admin

# Register your models here.

from .models import Gift, Budget, Person, Tracking

admin.site.register(Budget)
admin.site.register(Person)
admin.site.register(Gift)
admin.site.register(Tracking)