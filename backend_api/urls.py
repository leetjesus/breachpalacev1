from django.urls import path
from . import views

urlpatterns = [
    path('', views.search_email),
    path('', views.home_page_view)
]