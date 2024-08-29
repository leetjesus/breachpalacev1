from django.urls import path
from . import views
from .views import InfoBreach, EmailSearch, email_result

urlpatterns = [
    path('api/contact/', views.contact_form),
    path('api/email/<str:name>', views.EmailSearch.as_view(), name='email'),
    path('api/result/', email_result),
    # Original views before
    # path('api/result/<str:name>', views.email_result)
]