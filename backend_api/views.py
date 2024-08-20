from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import leakdata
from .models import contactForm
import json

def email_search(request, name):
    # Verifies if the email exists in the database then redirects to result end point responsbile for outputting the acutal data
    if request.method == 'GET':
        verify_email = leakdata.objects.filter(email=name).exists()
        
        if verify_email == True:
            # Will have to redirect to routes but at the same time show the user information for that email..
            return JsonResponse({'message': 'email found, redirecting to /result/ end-point'}, status=200)
        else:
            return JsonResponse({'message': 'email not found!'}, status=404)

 
    return JsonResponse({'message': 'Method not allowed'}, status=405)


def email_result(request, name):
    # Return email data
    lookup_email = leakdata.objects.filter(email=name)
    print(lookup_email)

    dict1 = {
        "nodes": [
            { "id": "leetjesus@gmail.com", "name": "leetjesus@gmail.com", "type": "email"},
            { "id": "2", "name": "Node2", "type": "Database", "breachdate":"2024-09-12", "description": "Additional info for Node2" },
            { "id": "3", "name": "Node3", "type": "Database", "breachdate":"2024-09-12", "description": "Additional info for Node3" }
        ]
    }
    
    dict2 = {
        "links": [
            { "source": "leetjesus@gmail.com", "target": "leetjesus@gmail.com", "value": 10 },
            { "source": "2", "target": "leetjesus@gmail.com", "value": 15 },
            { "source": "3", "target": "leetjesus@gmail.com", "value": 5 },
        ]
    }
    
    dict1.update(dict2)
    
    
    return JsonResponse(dict1, status=200)

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


