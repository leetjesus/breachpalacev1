
def create_model(ModelName):
    model_syntax = f"""
    class {ModelName}(models.Model):
        email_id = models.ForeignKey(emailList, on_delete=models.CASCADE)
        email = models.EmailField()
        password = models.TextField()
        breach_id = models.ForeignKey(breachInfo, on_delete=models.CASCADE)

        class Meta:
            verbose_name = 'Adobe'
            verbose_name_plural = 'Adobe'
        
        def __str__(self):
            return str(self.email_id)\n
    """

    with open('models.py', 'a') as file:
        file.write(model_syntax)
        file.close()

def create_admin_model(ModelName):
    admin_syntax = f"""\n
@admin.register({ModelName}Breach)
class {ModelName}Admin(admin.ModelAdmin):
    fieldsets = [
        ('breach_id',   {{'fields': ['email_id']}}),
        ('Name',        {{'fields': ['email']}}),
        ('Description', {{'fields': ['password']}}),
        ('Breach Date', {{'fields': ['breach_id']}})
    ]\n
    """

    with open('admin.py', 'a') as file:
        file.write(admin_syntax)
        file.close()