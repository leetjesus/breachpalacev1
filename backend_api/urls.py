from django.urls import path
from . import views

urlpatterns = [
    path('api/contact/', views.contact_form),
    path('api/search/', views.search_email)
]