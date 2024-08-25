from django.db import models

class breachInfo(models.Model):
    breach_id = models.BigIntegerField(default=1, blank=True, null=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    BreachDate = models.CharField(max_length=50)
    AddedDate = models.CharField(max_length=50)
    emailCount = models.BigIntegerField()

    class Meta:
        verbose_name = 'Breach Info'
        verbose_name_plural = 'Breach Info'
    
    def __str__(self):
        return self.name

class contactForm(models.Model):
    name = models.CharField(max_length=15)
    email = models.EmailField(max_length=254)
    description = models.TextField(max_length=1000)

    class Meta:
        verbose_name_plural = 'Contact Form'
        verbose_name = 'Contact Form'

    def __str__(self):
        return self.email
    
class emailList(models.Model):
    email_id = models.BigIntegerField(default=1, blank=True, null=True)
    email = models.EmailField()
    
    class Meta:
        verbose_name_plural = "Emails"
        verbose_name = "Emails"

    def __str__(self):
        return self.email
