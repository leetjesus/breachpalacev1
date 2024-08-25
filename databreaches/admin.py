from django.contrib import admin
from .models import breachExample

# Register your models here.
@admin.register(breachExample)
class breachExampleAdmin(admin.ModelAdmin):
    fieldsets = [
        ('breach_id',        {'fields': ['email_id']}),
        ('Name',        {'fields': ['email']}),
        ('Description', {'fields': ['password']}),
        ('Breach Date', {'fields': ['breach_id']})
    ]