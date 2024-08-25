from .models import emailList, contactForm, breachInfo, breachExample
from django.contrib import admin

# Register your models here.
class emailListAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['email_id']}),
        (None, {'fields': ['email']})
    ]
    display_list = ('email')

class contactformAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Name',        {'fields': ['name']}),
        ('Email',       {'fields': ['email']}),
        ('description', {'fields': ['description']})
    ]
    displ_list = ('Name', 'Email', 'description')

class breachinfoAdmin(admin.ModelAdmin):
    fieldsets = [
        ('breach_id',        {'fields': ['breach_id']}),
        ('Name',        {'fields': ['name']}),
        ('Description', {'fields': ['description']}),
        ('Breach Date', {'fields': ['BreachDate']}),
        ('Added Date',  {'fields': ['AddedDate']}),
        ('Email Count', {'fields': ['emailCount']}),

    ]

class breachExampleAdmin(admin.ModelAdmin):
    fieldsets = [
        ('breach_id',        {'fields': ['email_id']}),
        ('Name',        {'fields': ['email']}),
        ('Description', {'fields': ['password']}),
        ('Breach Date', {'fields': ['breach_id']})
    ]

admin.site.register(emailList, emailListAdmin)
admin.site.register(contactForm, contactformAdmin)
admin.site.register(breachInfo, breachinfoAdmin)
admin.site.register(breachExample, breachExampleAdmin)