from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.shortcuts import render
from django.http import HttpResponse
from .models import leakdata
from .models import contactForm
import json

# Create your views here.
def search_email(request):
    test = leakdata.objects.all()
    return HttpResponse(test)

def home_page_view(request):
    return HttpResponse('Hello world!')

@csrf_protect
def contact_form(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Print data terminal
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Message: {message}")
        
        # Uing querysets to save data into db/table
        obj = contactForm(name=name, email=email, description=message)
        obj.save()

        return HttpResponse('POST request received!')
    return HttpResponse('Only POST requests are allowed.')
