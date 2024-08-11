from django.contrib import admin
from .models import leakdata
from .models import emailList
from .models import contactForm

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

admin.site.register(leakdata, leakdataAdmin)
admin.site.register(emailList, emailListAdmin)
admin.site.register(contactForm, contactformAdmin)