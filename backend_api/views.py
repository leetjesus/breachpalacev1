from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import leakdata
from .models import contactForm
import json

def email_search(request, name):
    # Verifies if the email exists in the database
    if request.method == 'GET':
        verify_email = leakdata.objects.filter(email=name).exists()
        
        if verify_email == True: 
            return JsonResponse({'message': 'email found, redirecting to /result/ end-point'}, status=200)
        else:
            return JsonResponse({'message': 'email not found!'}, status=404)

 
    return JsonResponse({'message': 'Method not allowed'}, status=405)
    
@csrf_protect
def contact_form(request):
    # Things to-do
    # Prevent spamming based on IP address
    # 
    if request.method == 'POST':
        data = json.loads(request.body)
        
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Print data terminal
        # print(f"Name: {name}")
        # print(f"Email: {email}")
        # print(f"Message: {message}")
        
        verify_email = contactForm.objects.filter(email=email).exists()

        if verify_email == True:
            # Return 302 if data already exist in table
            return HttpResponse(status=302)
        elif verify_email == False:
            # Save new form data into table
            obj = contactForm(name=name, email=email, description=message)
            obj.save()
            return HttpResponse(status=200)

    return redirect('/contact/')
