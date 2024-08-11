from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import leakdata

# Create your views here.
def search_email(request):
    test = leakdata.objects.all()
    return HttpResponse(test)

def home_page_view(request):
    return HttpResponse('Hello world!')