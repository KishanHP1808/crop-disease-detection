from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    ROLE_CHOICES = (
        ('FARMER', 'Farmer'),
        ('EXPERT', 'Agriculture Expert'),
        ('ADMIN', 'Platform Admin'),
        ('GOVT_OFFICER', 'Government Officer'),
        ('SHOP_OWNER', 'Agriculture Shop Owner'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='FARMER')
    phone = models.CharField(max_length=20, blank=True, null=True)
    preferred_language = models.CharField(max_length=10, default='en')
    location = models.CharField(max_length=255, blank=True, null=True)
    is_phone_verified = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    green_points = models.IntegerField(default=100)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

class Farm(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='farms')
    name = models.CharField(max_length=100)
    area_acres = models.FloatField(default=1.0)
    soil_type = models.CharField(max_length=50, default='Loamy')
    village = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, default='Karnataka')
    latitude = models.FloatField(default=12.9716)
    longitude = models.FloatField(default=77.5946)
    qr_code_id = models.CharField(max_length=64, unique=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.owner.username}"

class Crop(models.Model):
    name = models.CharField(max_length=100, unique=True)
    scientific_name = models.CharField(max_length=150, blank=True, null=True)
    category = models.CharField(max_length=50, default='Cereals')
    major_producing_states = models.TextField(blank=True, null=True)
    season = models.CharField(max_length=50, default='Kharif')
    soil_and_climate = models.TextField(blank=True, null=True)
    main_uses = models.TextField(blank=True, null=True)
    optimal_n = models.IntegerField(default=120)
    optimal_p = models.IntegerField(default=60)
    optimal_k = models.IntegerField(default=40)
    optimal_ph_min = models.FloatField(default=6.0)
    optimal_ph_max = models.FloatField(default=7.5)
    water_req_mm = models.IntegerField(default=500)
    growth_days = models.IntegerField(default=120)
    icon_emoji = models.CharField(max_length=10, default='🌾')

    def __str__(self):
        return self.name

class Field(models.Model):
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='fields')
    name = models.CharField(max_length=100)
    crop = models.ForeignKey(Crop, on_delete=models.SET_NULL, null=True, blank=True)
    area_acres = models.FloatField(default=1.0)
    planted_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.farm.name})"

class Disease(models.Model):
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='diseases')
    name = models.CharField(max_length=150)
    scientific_name = models.CharField(max_length=150, blank=True, null=True)
    severity_default = models.CharField(max_length=20, default='Medium')
    symptoms = models.TextField()
    causes = models.TextField()
    organic_treatment = models.TextField()
    chemical_treatment = models.TextField()
    required_pesticide = models.CharField(max_length=255, blank=True, null=True)
    required_fertilizer = models.CharField(max_length=255, blank=True, null=True)
    recovery_days = models.IntegerField(default=14)
    prevention_tips = models.TextField()

    def __str__(self):
        return f"{self.crop.name} - {self.name}"

class DiseaseReport(models.Model):
    SEVERITY_CHOICES = (
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
        ('CRITICAL', 'Critical'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='disease_reports', null=True, blank=True)
    farm = models.ForeignKey(Farm, on_delete=models.SET_NULL, null=True, blank=True)
    crop = models.ForeignKey(Crop, on_delete=models.SET_NULL, null=True, blank=True)
    disease = models.ForeignKey(Disease, on_delete=models.SET_NULL, null=True, blank=True)
    detected_disease_name = models.CharField(max_length=150)
    confidence_score = models.FloatField(default=95.0)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default='MEDIUM')
    affected_area_pct = models.FloatField(default=15.0)
    soil_type = models.CharField(max_length=100, blank=True, null=True, default='Red Sandy Loam')
    soil_ph = models.FloatField(blank=True, null=True, default=6.5)
    soil_pathogen_risk = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='disease_scans/', blank=True, null=True)
    image_url_override = models.URLField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report #{self.id} - {self.detected_disease_name} ({self.confidence_score}%)"

class SoilRecord(models.Model):
    location_name = models.CharField(max_length=100, default='Bengaluru')
    latitude = models.FloatField(default=12.9716)
    longitude = models.FloatField(default=77.5946)
    soil_type = models.CharField(max_length=100, default='Red Sandy Loam')
    ph_level = models.FloatField(default=6.5)
    organic_carbon_pct = models.FloatField(default=0.65)
    nitrogen_level = models.CharField(max_length=50, default='Medium')
    phosphorus_level = models.CharField(max_length=50, default='Medium')
    potassium_level = models.CharField(max_length=50, default='High')
    drainage_quality = models.CharField(max_length=50, default='Moderate')
    common_soil_diseases = models.TextField(default='Root Rot, Fusarium Wilt, Nematode Infection')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.location_name} - {self.soil_type} (pH {self.ph_level})"


class WeatherRecord(models.Model):
    location_name = models.CharField(max_length=100, default='Bengaluru')
    temp_c = models.FloatField(default=28.5)
    humidity = models.IntegerField(default=65)
    rainfall_mm = models.FloatField(default=12.0)
    wind_kph = models.FloatField(default=14.0)
    uv_index = models.IntegerField(default=6)
    alert_level = models.CharField(max_length=20, default='NORMAL')
    alert_title = models.CharField(max_length=150, blank=True, null=True)
    alert_desc = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.location_name} Weather ({self.temp_c}°C)"

class MarketPrice(models.Model):
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='market_prices')
    market_name = models.CharField(max_length=100)
    state = models.CharField(max_length=100, default='Karnataka')
    price_per_quintal = models.FloatField()
    prev_price = models.FloatField(default=0.0)
    price_change_pct = models.FloatField(default=0.0)
    demand_level = models.CharField(max_length=20, default='HIGH')
    best_sell_day = models.CharField(max_length=50, default='Thursday')
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.crop.name} - ₹{self.price_per_quintal}/qnt ({self.market_name})"

class GovernmentScheme(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, default='Financial Subsidy')
    eligibility = models.TextField()
    required_documents = models.TextField()
    deadline = models.DateField(null=True, blank=True)
    apply_url = models.URLField()
    funding_amount = models.CharField(max_length=100, default='Up to ₹50,000 / acre')
    state = models.CharField(max_length=100, default='All India')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class SchemeBookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='scheme_bookmarks')
    scheme = models.ForeignKey(GovernmentScheme, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'scheme')

class SoilHealthRecord(models.Model):
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='soil_records')
    nitrogen = models.FloatField(default=110)
    phosphorus = models.FloatField(default=45)
    potassium = models.FloatField(default=35)
    ph = models.FloatField(default=6.8)
    organic_carbon = models.FloatField(default=0.65)
    moisture_pct = models.FloatField(default=40.0)
    health_score = models.IntegerField(default=88)
    recommendation_summary = models.TextField(default='Soil NPK balance is optimal. Recommended minor organic nitrogen boost.')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Soil Record #{self.id} for {self.farm.name}"

class ExpertProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='expert_profile')
    specialization = models.CharField(max_length=150, default='Crop Pathology & Soil Chemistry')
    qualification = models.CharField(max_length=150, default='Ph.D. Agronomy (UAS Bangalore)')
    experience_years = models.IntegerField(default=12)
    rating = models.FloatField(default=4.9)
    consultation_fee = models.FloatField(default=0.0)
    bio = models.TextField(default='Senior Plant Pathologist specializing in rice, wheat, and commercial horticulture diseases.')
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Dr. {self.user.get_full_name() or self.user.username}"

class Appointment(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    )
    farmer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='farmer_appointments')
    expert = models.ForeignKey(ExpertProfile, on_delete=models.CASCADE, related_name='expert_appointments')
    date_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    meeting_url = models.URLField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appointment with {self.expert} on {self.date_time}"

class AgriShop(models.Model):
    SHOP_TYPES = (
        ('SHOP', 'Agriculture Store'),
        ('HOSPITAL', 'Plant Hospital / Diagnostic Lab'),
        ('WAREHOUSE', 'Warehouse & Storage'),
        ('COLD_STORAGE', 'Cold Storage Unit'),
        ('MARKET', 'Mandi / Agri Market'),
    )
    name = models.CharField(max_length=150)
    shop_type = models.CharField(max_length=30, choices=SHOP_TYPES, default='SHOP')
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=30)
    latitude = models.FloatField(default=12.9716)
    longitude = models.FloatField(default=77.5946)
    products_available = models.TextField(default='Seeds, Bio-Pesticides, Organic Fertilizers, Micro-nutrients')
    rating = models.FloatField(default=4.7)

    def __str__(self):
        return f"{self.name} ({self.get_shop_type_display()})"

class FarmRecord(models.Model):
    TYPES = (
        ('INCOME', 'Income / Crop Sale'),
        ('EXPENSE', 'Expense'),
        ('HARVEST', 'Harvest Yield'),
        ('SEEDS', 'Seeds Purchased'),
        ('FERTILIZER', 'Fertilizer Applied'),
        ('PESTICIDE', 'Pesticide Sprayed'),
        ('EQUIPMENT', 'Equipment Rental'),
        ('WORKERS', 'Labor Wages'),
    )
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='records')
    record_type = models.CharField(max_length=20, choices=TYPES, default='EXPENSE')
    title = models.CharField(max_length=150)
    amount = models.FloatField()
    quantity_kg = models.FloatField(default=0.0)
    date = models.DateField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.get_record_type_display()}: {self.title} - ₹{self.amount}"

class AuditLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=255)
    details = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.timestamp} - {self.action}"
