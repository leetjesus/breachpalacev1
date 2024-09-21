from .models import emailList, contactForm, breachInfo
from django.contrib import admin

# Register your models here.
@admin.register(emailList)
class emailListAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['email_id']}),
        (None, {'fields': ['email']})
    ]
    display_list = ('email')

@admin.register(contactForm)
class contactformAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Name',        {'fields': ['name']}),
        ('Email',       {'fields': ['email']}),
        ('description', {'fields': ['description']})
    ]
    displ_list = ('Name', 'Email', 'description')


@admin.register(breachInfo)
class breachinfoAdmin(admin.ModelAdmin):
    fieldsets = [
        ('breach_id',        {'fields': ['breach_id']}),
        ('Name',        {'fields': ['name']}),
        ('Description', {'fields': ['description']}),
        ('Breach Date', {'fields': ['BreachDate']}),
        ('Added Date',  {'fields': ['AddedDate']}),
        ('Email Count', {'fields': ['emailCount']}),

    ]
