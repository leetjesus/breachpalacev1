from django.urls import path
from . import views

urlpatterns = [
    path('api/contact/', views.contact_form),
    path('api/email/<str:name>', views.email_search)
]