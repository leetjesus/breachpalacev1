from .models import leakdata, emailList, contactForm, breachInfo
from django.contrib import admin

# Register your models here.
class leakdataAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,      {'fields': ['email']}),
        (None,      {'fields': ['table_name']}),
        (None,      {'fields': ['data_type']}),
        (None,      {'fields': ['description']})
    ]
    list_display = ('email', 'table_name', 'data_type', 'description')

class emailListAdmin(admin.ModelAdmin):
    fieldsets = [
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
        ('Name',        {'fields': ['name']}),
        ('Description', {'fields': ['description']}),
        ('Breach Date', {'fields': ['BreachDate']}),
        ('Added Date',  {'fields': ['AddedDate']}),
        ('Email Count', {'fields': ['emailCount']}),

    ]

admin.site.register(leakdata, leakdataAdmin)
admin.site.register(emailList, emailListAdmin)
admin.site.register(contactForm, contactformAdmin)
admin.site.register(breachInfo, breachinfoAdmin)