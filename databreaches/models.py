from django.db import models
from backend_api.models import breachInfo, emailList

# Create your models here.
class breachExample(models.Model):
    # This would take the example of data breach (Myspace database dump)
    email_id = models.ForeignKey(emailList, on_delete=models.CASCADE)
    email = models.EmailField()
    password = models.TextField()
    breach_id = models.ForeignKey(breachInfo, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'breachExample'
        verbose_name_plural = 'breachExample'
    
    def __str__(self):
        return str(self.email_id)