from django.db import models

# Create your models here.
class leakdata(models.Model):
    email = models.TextField(primary_key=True)
    table_name = models.TextField()
    data_type = models.CharField(max_length=20)
    description = models.TextField()

    class meta:
        verbose_name_plural = "leakdata"
        verbose_name = "leakdata"

    def __str__(self):
        return self.email

class emailList(models.Model):
    email = models.ForeignKey(leakdata, on_delete=models.CASCADE)
    
    class meta:
        verbose_name_plural = "emailList"
        verbose_name = "emailList"

    def __str__(self):
        return self.email

class contactForm(models.Model):
    name = models.CharField(max_length=15)
    email = models.EmailField(max_length=254)
    description = models.TextField(max_length=1000)

    class meta:
        verbose_name_plural = 'contactform'
        verbose_name = 'contactform'

    def __str__(self):
        return self.email

class breachInfo(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    BreachDate = models.CharField(max_length=50)
    AddedDate = models.CharField(max_length=50)
    emailCount = models.BigIntegerField()

    class meta:
        verbose_name = 'breachInfo'
        verbose_name_plural = 'breachInfo'
    
    def __str__(self):
        return self.name