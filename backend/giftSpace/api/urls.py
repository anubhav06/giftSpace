from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('register/', views.register, name="register" ),
    
    path('get-budget/', views.getBudget, name='getBudget'),
    path('set-budget/', views.setBudget, name='setBudget'),

    path('add-person/', views.addPerson, name='addPerson'),
    path('get-person/', views.getPerson, name='getPerson'),

    path('add-gift/', views.addGift, name='addGift'),
    path('delete-gift/<str:id>/', views.deleteGift, name='deleteGift'),
    path('gifts/', views.getGifts),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
