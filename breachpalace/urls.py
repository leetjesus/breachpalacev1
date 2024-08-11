from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

# "Ohhhh that is sick!" left off here
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('backend_api.urls')),
    path('', include('backend_api.urls')),
    # React HTML template
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'))
]