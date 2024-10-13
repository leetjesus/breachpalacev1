from django.views.decorators.csrf import csrf_protect
from django.shortcuts import redirect
from django.http import HttpResponse, JsonResponse
from .models import emailList, contactForm, breachInfo
from .serializers import BreachInfoSerializer, EmailResultSerializer
from rest_framework.generics import GenericAPIView
from databreaches.models import * 
import json, re

class InfoBreach(GenericAPIView):
    queryset = breachInfo.objects.all()
    serializer_class = BreachInfoSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return HttpResponse(serializer.data)

class EmailSearch(GenericAPIView):
    serializer_class = EmailResultSerializer
    def emailValidation(self, email):
        pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
        if re.match(pattern, email):
            return 'valid'
        else:
            return 'invalid'

    def get(self, request, *args, **kwargs):
        # Perform email validation here too
        email = self.kwargs['email'] # Perform email validation here too
        validation_status = self.emailValidation(email=email)
        
        if validation_status == 'valid':
            email_exists = emailList.objects.filter(email=email).exists()

            if email_exists:
                return JsonResponse({'message': f'Email {email} exists in the database.'})
            else:
                return JsonResponse({'message': f'Email {email} does not exist in the database.'}, status=404)
        elif validation_status == 'invalid':
            return JsonResponse({'message': f'Invalid Email: {email} .'}, status=404)

class FormatEmailResult(GenericAPIView):
    def fetch_breachnames(self, email):
        valid_breach_names = []
        #model_names = ['GetrevengeonyourexBreach', 'TicketiqBreach', 'PokemoncreedBreach', 'BellcanadaBreach', 'SonypicturesBreach', 'LatestpilotjobsBreach']
        # temp for now
        model_names = ['EmailhashtestBreach']
        
        for model_name in model_names:
            # Since the models are already imported, use the model name directly
            model_class = globals()[str(model_name)]

            # Perform the query on the model class
            email_check = model_class.objects.filter(email=email).exists()
        
            if email_check == True:
                valid_breach_names.append(model_name)
                print(f"Email found in {model_name}: {email_check}")
        
        return valid_breach_names

    def construct_node_structure(self, email):
        valid_breach_names = self.fetch_breachnames(email=str(email))

        node_structure = {
            "nodes": [],
            "links": []
        }

        node_structure["nodes"].append({"id": str(email), "name": str(email), "type": "email"})
        node_structure["links"].append({"source": str(email), "target": str(email), "value": 15})
        
        for idx, modelName in enumerate(valid_breach_names, start=1):
            data = breachInfo.objects.filter(name=str(modelName.replace('Breach', ''))).values().first()

            # Start deleing keys we don't need
            if data:
                model_name_instance = globals()[str(modelName)]
                cred_data = model_name_instance.objects.filter(email=email)

                data.pop('id', None)
                data.pop('breach_id', None)
                data['id'] = str(idx)
                data['hashes'] = list(cred_data[0].hashes.split("-"))
                data['line'] = cred_data[0].line
                node_structure["nodes"].append(data)

        for idx in range(1, len(node_structure["nodes"])):
            node_structure["links"].append({"source": str(idx), "target": str(email), "value": 15})

        print(node_structure)
        return node_structure

    def get(self, request, *args, **kwargs):
        email = self.kwargs['email']
        node_data = self.construct_node_structure(email=email)
    
        return JsonResponse(node_data, status=200)
    
@csrf_protect
def contact_form(request):
    # Things to-do
    # Prevent spamming based on IP address
    # Change into class based
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
