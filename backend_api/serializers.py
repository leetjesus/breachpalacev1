from rest_framework import serializers
from .models import breachInfo, emailList

class BreachInfoSerializer(serializers.ModelSerializer):
    # This is giving the result per data breach... So one databreach at a time
    class Meta:
        model = breachInfo
        # fields = '__all__'  # Correct attribute name
        fields = ['name', 'description', 'BreachDate', 'AddedDate', 'emailCount']

class EmailResultSerializer(serializers.ModelSerializer):
    # This is verifying that the email exist to begin with.
    class Meta:
        model = emailList
        fields = ['email']