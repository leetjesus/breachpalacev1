from django.urls import path
from . import views

# api/<fields>
# "Ohhhh that is sick!" left off here
urlpatterns = [
    path('api/', views.search_email),
    path('api/contact/', views.home_page_view)
]