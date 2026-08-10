from rest_framework import serializers
from .models import (
    User, Farm, Field, Crop, Disease, DiseaseReport,
    WeatherRecord, MarketPrice, GovernmentScheme, SchemeBookmark,
    SoilHealthRecord, ExpertProfile, Appointment, AgriShop,
    FarmRecord, AuditLog
)

class UserSerializer(serializers.ModelSerializer):
    is_system_owner = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone', 'preferred_language', 'location', 'is_phone_verified', 'profile_picture', 'green_points', 'is_system_owner']
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def get_is_system_owner(self, obj):
        return bool(obj.email and obj.email.lower().strip() == 'kishanhp18@gmail.com')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_password('Agriguard@2026')
        user.save()
        return user


class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = '__all__'

class DiseaseSerializer(serializers.ModelSerializer):
    crop_name = serializers.CharField(source='crop.name', read_only=True)
    class Meta:
        model = Disease
        fields = '__all__'

class FarmSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source='owner.username', read_only=True)
    class Meta:
        model = Farm
        fields = '__all__'

class FieldSerializer(serializers.ModelSerializer):
    crop_name = serializers.CharField(source='crop.name', read_only=True)
    farm_name = serializers.CharField(source='farm.name', read_only=True)
    class Meta:
        model = Field
        fields = '__all__'

class DiseaseReportSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    crop_name = serializers.CharField(source='crop.name', read_only=True)
    disease_details = DiseaseSerializer(source='disease', read_only=True)
    class Meta:
        model = DiseaseReport
        fields = '__all__'

class WeatherRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherRecord
        fields = '__all__'

class MarketPriceSerializer(serializers.ModelSerializer):
    crop_name = serializers.CharField(source='crop.name', read_only=True)
    class Meta:
        model = MarketPrice
        fields = '__all__'

class GovernmentSchemeSerializer(serializers.ModelSerializer):
    is_bookmarked = serializers.SerializerMethodField()

    class Meta:
        model = GovernmentScheme
        fields = '__all__'

    def get_is_bookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return SchemeBookmark.objects.filter(user=request.user, scheme=obj).exists()
        return False

class SoilHealthRecordSerializer(serializers.ModelSerializer):
    farm_name = serializers.CharField(source='farm.name', read_only=True)
    class Meta:
        model = SoilHealthRecord
        fields = '__all__'

class ExpertProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    email = serializers.EmailField(source='user.email', read_only=True)
    phone = serializers.CharField(source='user.phone', read_only=True)

    class Meta:
        model = ExpertProfile
        fields = '__all__'

    def get_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

class AppointmentSerializer(serializers.ModelSerializer):
    farmer_name = serializers.CharField(source='farmer.username', read_only=True)
    expert_name = serializers.CharField(source='expert.user.username', read_only=True)
    class Meta:
        model = Appointment
        fields = '__all__'

class AgriShopSerializer(serializers.ModelSerializer):
    shop_type_display = serializers.CharField(source='get_shop_type_display', read_only=True)
    class Meta:
        model = AgriShop
        fields = '__all__'

class FarmRecordSerializer(serializers.ModelSerializer):
    farm_name = serializers.CharField(source='farm.name', read_only=True)
    record_type_display = serializers.CharField(source='get_record_type_display', read_only=True)
    class Meta:
        model = FarmRecord
        fields = '__all__'

class AuditLogSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = AuditLog
        fields = '__all__'
