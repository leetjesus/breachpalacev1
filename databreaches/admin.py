from django.contrib import admin

# Register your models here.
class breachExampleAdmin(admin.ModelAdmin):
    fieldsets = [
        ('breach_id',        {'fields': ['email_id']}),
        ('Name',        {'fields': ['email']}),
        ('Description', {'fields': ['password']}),
        ('Breach Date', {'fields': ['breach_id']})
    ]