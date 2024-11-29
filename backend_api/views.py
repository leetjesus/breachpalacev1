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
        # Model names will be hard coded for back-end reasons
        model_names = ['HelloWorldBreach', 'PokemoncreedBreach']

        # Is there a better way of doing this?
        # Instead of using a for loop. Wouldn't this cause a lot of drag on the system?
        for model_name in model_names:
            # Since the models are already imported, use the model name directly
            model_class = globals()[str(model_name)]

            # Perform the query on the model class
            email_check = model_class.objects.filter(email=email).exists()
        
            if email_check == True:
                valid_breach_names.append(model_name)
        
        return valid_breach_names 

    def structure_email_information(self, email, breach_information):
        found_breach_number = len(breach_information)
        breach_names = ", ".join(breach_information)

        return f'The following email {email} was found within {found_breach_number} databreach(s). This includes the following: {breach_names}'

    def construct_node_structure(self, email):
        valid_breach_names = self.fetch_breachnames(email=str(email))
        
        email_info = self.structure_email_information(breach_information=valid_breach_names, email=str(email))


        node_structure = {
            "nodes": [],
            "links": [],
            "email_info": email_info,
        }

        node_structure["nodes"].append({"id": str(email), "name": str(email), "type": "email"})
        node_structure["links"].append({"source": str(email), "target": str(email), "value": 15})
        
        for idx, modelName in enumerate(valid_breach_names, start=1):
            data = breachInfo.objects.filter(name=str(modelName.replace('Breach', ''))).values().first()    
            if data:
                model_name_instance = globals()[str(modelName)]
                cred_data = model_name_instance.objects.filter(email=email)
                
                data.pop('id', None)
                data.pop('breach_id', None)
                data['id'] = str(idx)

                try:
                    data['hashes'] = list(cred_data[0].hashes.split("-"))
                except AttributeError:
                    pass
                
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
