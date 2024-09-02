from django.urls import path
from . import views
from .views import InfoBreach, EmailSearch, FormatEmailResult

urlpatterns = [
    path('api/contact/', views.contact_form),
    path('api/email/<str:email>', views.EmailSearch.as_view(), name='email'),
    path('api/result/<str:email>', views.FormatEmailResult.as_view(), name='email'),
]