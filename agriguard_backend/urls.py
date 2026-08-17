from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView, RedirectView

from api.views import ApkDownloadView, ServiceWorkerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin-portal/', RedirectView.as_view(url='/admin/', permanent=False), name='admin_portal'),
    path('admin-login/', RedirectView.as_view(url='/admin/', permanent=False), name='admin_login'),
    path('manifest.json', TemplateView.as_view(template_name='manifest.json', content_type='application/json'), name='manifest'),
    path('sw.js', ServiceWorkerView.as_view(), name='sw_js'),
    path('download/apk/', ApkDownloadView.as_view(), name='root_apk_download'),
    path('download/app/', ApkDownloadView.as_view(), name='root_app_download'),
    path('api/v1/', include('api.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
