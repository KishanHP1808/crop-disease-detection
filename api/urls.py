from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, LoginView, OTPVerifyView, MeView, VerifyAdminPinView,
    DetectDiseaseView, PrintableReportView,
    CropViewSet, DiseaseViewSet, FarmViewSet, FieldViewSet,
    WeatherView, WeatherSuitabilityView, MarketPriceViewSet, GovernmentSchemeViewSet, BookmarkSchemeView,
    SoilHealthView, ExpertViewSet, AppointmentViewSet, AgriShopViewSet,
    FarmRecordViewSet, ChatbotView, AnalyticsSummaryView,
    ApkDownloadView, ServiceWorkerView, RedZoneStatusView
)

router = DefaultRouter()
router.register(r'crops', CropViewSet)
router.register(r'diseases', DiseaseViewSet)
router.register(r'farms', FarmViewSet)
router.register(r'fields', FieldViewSet)
router.register(r'market-prices', MarketPriceViewSet)
router.register(r'schemes', GovernmentSchemeViewSet)
router.register(r'experts', ExpertViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'shops', AgriShopViewSet)
router.register(r'farm-records', FarmRecordViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/otp-verify/', OTPVerifyView.as_view(), name='auth_otp_verify'),
    path('auth/verify-admin-pin/', VerifyAdminPinView.as_view(), name='auth_verify_admin_pin'),
    path('auth/me/', MeView.as_view(), name='auth_me'),
    
    path('detect-disease/', DetectDiseaseView.as_view(), name='detect_disease'),
    path('report-pdf/<int:report_id>/', PrintableReportView.as_view(), name='report_pdf'),
    path('weather/', WeatherView.as_view(), name='weather_info'),
    path('weather/suitability/', WeatherSuitabilityView.as_view(), name='weather_suitability'),
    path('soil-health/', SoilHealthView.as_view(), name='soil_health'),
    path('schemes/<int:scheme_id>/bookmark/', BookmarkSchemeView.as_view(), name='scheme_bookmark'),
    path('chatbot/', ChatbotView.as_view(), name='chatbot'),
    path('analytics/', AnalyticsSummaryView.as_view(), name='analytics_summary'),
    path('download/apk/', ApkDownloadView.as_view(), name='apk_download'),
    path('redzone-status/', RedZoneStatusView.as_view(), name='redzone_status'),

    path('', include(router.urls)),
]
