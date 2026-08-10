from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    User, Farm, Field, Crop, Disease, DiseaseReport,
    WeatherRecord, MarketPrice, GovernmentScheme, SchemeBookmark,
    SoilHealthRecord, ExpertProfile, Appointment, AgriShop,
    FarmRecord, AuditLog
)

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'phone', 'preferred_language', 'green_points', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_superuser')
    fieldsets = UserAdmin.fieldsets + (
        ('AgriGuard Profile', {'fields': ('role', 'phone', 'preferred_language', 'location', 'is_phone_verified', 'profile_picture', 'green_points')}),
    )

@admin.register(Farm)
class FarmAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'area_acres', 'soil_type', 'state', 'created_at')

@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'optimal_n', 'optimal_p', 'optimal_k', 'water_req_mm')

@admin.register(Disease)
class DiseaseAdmin(admin.ModelAdmin):
    list_display = ('name', 'crop', 'scientific_name', 'severity_default')

@admin.register(DiseaseReport)
class DiseaseReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'detected_disease_name', 'confidence_score', 'severity', 'created_at')

@admin.register(WeatherRecord)
class WeatherRecordAdmin(admin.ModelAdmin):
    list_display = ('location_name', 'temp_c', 'humidity', 'rainfall_mm', 'alert_level')

@admin.register(MarketPrice)
class MarketPriceAdmin(admin.ModelAdmin):
    list_display = ('crop', 'market_name', 'price_per_quintal', 'date')

@admin.register(GovernmentScheme)
class GovernmentSchemeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'funding_amount', 'deadline')

@admin.register(SoilHealthRecord)
class SoilHealthRecordAdmin(admin.ModelAdmin):
    list_display = ('farm', 'nitrogen', 'phosphorus', 'potassium', 'ph', 'health_score')

@admin.register(ExpertProfile)
class ExpertProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialization', 'qualification', 'rating', 'is_available')

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('farmer', 'expert', 'date_time', 'status')

@admin.register(AgriShop)
class AgriShopAdmin(admin.ModelAdmin):
    list_display = ('name', 'shop_type', 'address', 'phone', 'rating')

@admin.register(FarmRecord)
class FarmRecordAdmin(admin.ModelAdmin):
    list_display = ('farm', 'record_type', 'title', 'amount', 'date')

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'user', 'action')
