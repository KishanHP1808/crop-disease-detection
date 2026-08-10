from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin-portal/', TemplateView.as_view(template_name='admin_portal.html'), name='admin_portal'),
    path('admin-login/', TemplateView.as_view(template_name='admin_portal.html'), name='admin_login'),
    path('api/v1/', include('api.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
