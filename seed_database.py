import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agriguard_backend.settings')
django.setup()

from api.models import (
    User, Farm, Field, Crop, Disease, DiseaseReport,
    WeatherRecord, MarketPrice, GovernmentScheme,
    SoilHealthRecord, SoilRecord, ExpertProfile, AgriShop
)

def seed():
    print("Starting AgriGuard AI Comprehensive Database Population...")

    # 1. PLATFORM OWNER / SUPERUSER SETUP
    owner, created = User.objects.get_or_create(
        username='kishanhp18',
        defaults={
            'email': 'kishanhp18@gmail.com',
            'first_name': 'Kishan',
            'last_name': 'HP',
            'role': 'ADMIN',
            'is_staff': True,
            'is_superuser': True,
            'green_points': 1500,
            'location': 'Bangalore, Karnataka'
        }
    )
    if created:
        owner.set_password('Agriguard@2026')
        owner.save()
        print("Platform Owner Created: kishanhp18 (kishanhp18@gmail.com)")
    else:
        owner.is_staff = True
        owner.is_superuser = True
        owner.save()
        print("Platform Owner Verified: kishanhp18")

    # Sample Farmer Account
    farmer, _ = User.objects.get_or_create(
        username='rajesh_farmer',
        defaults={
            'email': 'rajesh.farmer@gmail.com',
            'first_name': 'Rajesh',
            'last_name': 'Kumar',
            'role': 'FARMER',
            'phone': '9876543210',
            'location': 'Mandya, Karnataka'
        }
    )

    # 2. CROPS & DISEASES
    crops_data = [
        {
            'name': 'Tomato',
            'category': 'Horticulture / Vegetable',
            'description': 'Major solanaceous crop grown extensively across Karnataka, AP, MP, Maharashtra.',
            'optimal_temp_min': 18.0, 'optimal_temp_max': 32.0,
            'optimal_humidity_min': 50.0, 'optimal_humidity_max': 75.0,
            'optimal_ph_min': 6.0, 'optimal_ph_max': 7.0,
            'diseases': [
                {
                    'name': 'Tomato Late Blight',
                    'scientific_name': 'Phytophthora infestans',
                    'symptoms': 'Dark water-soaked lesions on leaves and stems with white downy fungal growth under humid conditions.',
                    'causes': 'Cool temperatures (18-22°C) combined with high relative humidity (>90%) and free leaf wetness.',
                    'organic_treatment': 'Spray 1% Bordeaux mixture or 5% Neem Seed Kernel Extract (NSKE) every 7 days.',
                    'chemical_treatment': 'Spray Metalaxyl 8% + Mancozeb 64% WP @ 2g/L water or Difenoconazole 25% EC @ 0.5ml/L.',
                    'required_pesticide': 'Mancozeb 75% WP, Metalaxyl 8%',
                    'required_fertilizer': 'High Potash Foliar Spray + Calcium Nitrate',
                    'recovery_days': 12
                },
                {
                    'name': 'Tomato Early Blight',
                    'scientific_name': 'Alternaria solani',
                    'symptoms': 'Concentric dark target-board spot lesions on older leaves, causing defoliation.',
                    'causes': 'Alternating wet and dry weather with warm temperatures (24-29°C).',
                    'organic_treatment': 'Apply Trichoderma viride @ 5g/L or Pseudomonas fluorescens @ 10g/L spray.',
                    'chemical_treatment': 'Spray Azoxystrobin 23% SC @ 1ml/L or Chlorothalonil 75% WP @ 2g/L.',
                    'required_pesticide': 'Chlorothalonil 75% WP',
                    'required_fertilizer': 'Balanced NPK 19-19-19',
                    'recovery_days': 10
                },
                {
                    'name': 'Tomato Yellow Leaf Curl Virus',
                    'scientific_name': 'TYLCV (Begomovirus)',
                    'symptoms': 'Stunted growth, upward leaf curling, yellowing margins, and severe flower drop.',
                    'causes': 'Transmitted by Whitefly vector (Bemisia tabaci) under hot, dry conditions.',
                    'organic_treatment': 'Install yellow sticky traps (15/acre). Spray Neem oil 10,000 PPM @ 3ml/L.',
                    'chemical_treatment': 'Spray Imidacloprid 17.8% SL @ 0.5ml/L or Thiamethoxam 25% WG @ 0.3g/L to control whiteflies.',
                    'required_pesticide': 'Imidacloprid 17.8% SL',
                    'required_fertilizer': 'Micronutrient Mixture (Zinc + Boron)',
                    'recovery_days': 14
                },
                {
                    'name': 'Tomato Healthy Leaf',
                    'scientific_name': 'Solanum lycopersicum (Healthy)',
                    'symptoms': 'Vibrant green, uniform leaf structure, zero necrosis, intact chlorophyll.',
                    'causes': 'Optimal soil moisture, balanced NPK nutrition, and dry canopy leaves.',
                    'organic_treatment': 'Maintain routine Jeevamrutha or Vermicompost drenching.',
                    'chemical_treatment': 'No chemical spray needed.',
                    'required_pesticide': 'None',
                    'required_fertilizer': 'Organic Compost / Jeevamrutha',
                    'recovery_days': 0
                }
            ]
        },
        {
            'name': 'Rice',
            'category': 'Cereal / Grain',
            'description': 'Staple cereal crop of West Bengal, UP, Punjab, Telangana, AP, Karnataka.',
            'optimal_temp_min': 20.0, 'optimal_temp_max': 35.0,
            'optimal_humidity_min': 65.0, 'optimal_humidity_max': 90.0,
            'optimal_ph_min': 5.5, 'optimal_ph_max': 6.8,
            'diseases': [
                {
                    'name': 'Rice Blast',
                    'scientific_name': 'Magnaporthe oryzae',
                    'symptoms': 'Spindle-shaped or eye-shaped lesions with grey centers and dark reddish margins on leaves and collar node rot.',
                    'causes': 'High nitrogen fertilizer, long dew periods, cool night temperatures (20-23°C).',
                    'organic_treatment': 'Spray Pseudomonas fluorescens @ 10g/L or Cow urine 10% + buttermilk spray.',
                    'chemical_treatment': 'Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L.',
                    'required_pesticide': 'Tricyclazole 75% WP',
                    'required_fertilizer': 'Muriate of Potash (MOP) to strengthen cell walls',
                    'recovery_days': 14
                },
                {
                    'name': 'Bacterial Leaf Blight',
                    'scientific_name': 'Xanthomonas oryzae pv. oryzae',
                    'symptoms': 'Wavy yellow-to-white blighted margins starting from leaf tips, leading to kresek wilt phase.',
                    'causes': 'Strong winds, heavy rainstorms, flooded fields, high humidity.',
                    'organic_treatment': 'Spray Fresh Cow dung extract 20% + Neem oil emulsion.',
                    'chemical_treatment': 'Spray Copper Oxychloride 50% WP @ 2.5g/L + Streptocycline @ 0.15g/L.',
                    'required_pesticide': 'Copper Oxychloride + Streptocycline',
                    'required_fertilizer': 'Potash + Zinc Sulphate 21%',
                    'recovery_days': 12
                },
                {
                    'name': 'Rice Healthy Paddy',
                    'scientific_name': 'Oryza sativa (Healthy)',
                    'symptoms': 'Uniform lush green tiller canopy, strong panicle emergence, robust root structure.',
                    'causes': 'Balanced alternate wetting and drying irrigation and soil pH 6.5.',
                    'organic_treatment': 'Apply Azospirillum and Phosphobacteria bio-fertilizers.',
                    'chemical_treatment': 'No chemical spray needed.',
                    'required_pesticide': 'None',
                    'required_fertilizer': 'Bio-Fertilizer + Farmyard Manure',
                    'recovery_days': 0
                }
            ]
        },
        {
            'name': 'Wheat',
            'category': 'Cereal / Grain',
            'description': 'Primary rabi cereal cultivated in UP, Punjab, Haryana, MP, Rajasthan.',
            'optimal_temp_min': 12.0, 'optimal_temp_max': 25.0,
            'optimal_humidity_min': 40.0, 'optimal_humidity_max': 70.0,
            'optimal_ph_min': 6.0, 'optimal_ph_max': 7.5,
            'diseases': [
                {
                    'name': 'Wheat Yellow Stripe Rust',
                    'scientific_name': 'Puccinia striiformis',
                    'symptoms': 'Bright yellow pustules arranged in linear stripes along the leaf veins.',
                    'causes': 'Cool temperatures (10-15°C) and foggy morning mist.',
                    'organic_treatment': 'Spray sour curd/buttermilk solution @ 50ml/L or fermented botanical extract.',
                    'chemical_treatment': 'Spray Propiconazole 25% EC @ 1ml/L or Tebuconazole 25.9% EC @ 1ml/L.',
                    'required_pesticide': 'Propiconazole 25% EC',
                    'required_fertilizer': 'Foliar Potassium Nitrate (13-0-45)',
                    'recovery_days': 10
                },
                {
                    'name': 'Wheat Healthy Crop',
                    'scientific_name': 'Triticum aestivum (Healthy)',
                    'symptoms': 'Erect green leaves, healthy golden earheads, sturdy straw stem.',
                    'causes': 'Timely winter sowing, optimal crown root initiation irrigation.',
                    'organic_treatment': 'Routine organic vermicompost application.',
                    'chemical_treatment': 'No chemical intervention required.',
                    'required_pesticide': 'None',
                    'required_fertilizer': 'Organic Compost',
                    'recovery_days': 0
                }
            ]
        },
        {
            'name': 'Cotton',
            'category': 'Commercial / Fibre',
            'description': 'Major fiber cash crop grown in Gujarat, Maharashtra, Telangana, AP, Karnataka.',
            'optimal_temp_min': 22.0, 'optimal_temp_max': 38.0,
            'optimal_humidity_min': 50.0, 'optimal_humidity_max': 80.0,
            'optimal_ph_min': 6.5, 'optimal_ph_max': 8.2,
            'diseases': [
                {
                    'name': 'Cotton Bacterial Blight',
                    'scientific_name': 'Xanthomonas citri pv. malvacearum',
                    'symptoms': 'Angular water-soaked spots on leaves, black arm lesions on stems, and boll rot.',
                    'causes': 'High humidity (>85%), wind-driven rains, warm temperatures (28-35°C).',
                    'organic_treatment': 'Spray Panchagavya 3% or Neem cake soil application (250kg/acre).',
                    'chemical_treatment': 'Spray Copper Oxychloride 50% WP @ 2.5g/L + Streptocycline @ 0.1g/L.',
                    'required_pesticide': 'Copper Oxychloride 50% WP',
                    'required_fertilizer': 'Magnesium Sulphate + Boron',
                    'recovery_days': 12
                },
                {
                    'name': 'Cotton Healthy Crop',
                    'scientific_name': 'Gossypium hirsutum (Healthy)',
                    'symptoms': 'Broad dark green palmate leaves, vigorous branching, clean boll formation.',
                    'causes': 'Well-drained Vertisol soil, balanced NPK fertigation.',
                    'organic_treatment': 'Apply Neem cake and bio-pesticides.',
                    'chemical_treatment': 'None',
                    'required_pesticide': 'None',
                    'required_fertilizer': 'Bio-char + Organic Compost',
                    'recovery_days': 0
                }
            ]
        },
        {
            'name': 'Potato',
            'category': 'Horticulture / Tuber',
            'description': 'Major tuber crop grown in UP, West Bengal, Bihar, Punjab, Gujarat.',
            'optimal_temp_min': 15.0, 'optimal_temp_max': 24.0,
            'optimal_humidity_min': 60.0, 'optimal_humidity_max': 85.0,
            'optimal_ph_min': 5.0, 'optimal_ph_max': 6.5,
            'diseases': [
                {
                    'name': 'Potato Late Blight',
                    'scientific_name': 'Phytophthora infestans',
                    'symptoms': 'Water-soaked purplish-black lesions expanding rapidly across leaves with white fungal growth underneath.',
                    'causes': 'Cool humid weather (15-20°C) with persistent fog or light rain.',
                    'organic_treatment': 'Spray Bordeaux mixture 1% or Trichoderma viride @ 5g/L drenching.',
                    'chemical_treatment': 'Spray Cymoxanil 8% + Mancozeb 64% WP @ 2g/L or Dimethomorph 50% WP @ 1g/L.',
                    'required_pesticide': 'Cymoxanil + Mancozeb',
                    'required_fertilizer': 'Sulphate of Potash (SOP)',
                    'recovery_days': 10
                }
            ]
        }
    ]

    for c_data in crops_data:
        diseases = c_data.pop('diseases')
        crop_obj, _ = Crop.objects.get_or_create(
            name=c_data['name'],
            defaults=c_data
        )
        print(f"  Seeded Crop: {crop_obj.name}")

        for d_data in diseases:
            disease_obj, _ = Disease.objects.get_or_create(
                name=d_data['name'],
                crop=crop_obj,
                defaults=d_data
            )
            print(f"    └─ Seeded Disease: {disease_obj.name}")

    # 3. REGIONAL SOIL RECORDS
    soils = [
        {
            'location_name': 'Deccan Plateau & Central India (Maharashtra, MP, Gujarat, North KA)',
            'latitude': 19.7515, 'longitude': 75.7139,
            'soil_type': 'Black Cotton Soil (Vertisol)',
            'ph_level': 7.8,
            'organic_carbon_pct': 0.65,
            'nitrogen_level': 'Medium (240 kg/ha)',
            'phosphorus_level': 'Low (14 kg/ha)',
            'potassium_level': 'High (380 kg/ha)',
            'drainage_quality': 'Slow / Heavy Water Retention',
            'common_soil_diseases': 'Root Rot, Phytophthora Blight, Pythium Damping-Off, Fusarium Wilt'
        },
        {
            'location_name': 'Indo-Gangetic Plains (Punjab, Haryana, UP, Bihar, WB)',
            'latitude': 28.6139, 'longitude': 77.2090,
            'soil_type': 'Alluvial Fertile Loam',
            'ph_level': 6.8,
            'organic_carbon_pct': 0.85,
            'nitrogen_level': 'High (320 kg/ha)',
            'phosphorus_level': 'Medium (22 kg/ha)',
            'potassium_level': 'Medium (260 kg/ha)',
            'drainage_quality': 'Well-Drained Loam',
            'common_soil_diseases': 'Rhizoctonia Stem Rot, Powdery Mildew, Nematodes'
        },
        {
            'location_name': 'Southern Peninsular India (Karnataka, AP, Tamil Nadu)',
            'latitude': 12.9716, 'longitude': 77.5946,
            'soil_type': 'Red Sandy Loam',
            'ph_level': 6.2,
            'organic_carbon_pct': 0.55,
            'nitrogen_level': 'Low (190 kg/ha)',
            'phosphorus_level': 'Medium (18 kg/ha)',
            'potassium_level': 'Medium (210 kg/ha)',
            'drainage_quality': 'Rapid / High Leaching',
            'common_soil_diseases': 'Root-Knot Nematodes, Fusarium Wilt, Zinc Deficiency Chlorosis'
        },
        {
            'location_name': 'Western Coastal Belt (Kerala, Goa, Konkan)',
            'latitude': 9.9312, 'longitude': 76.2673,
            'soil_type': 'Coastal Laterite Acidic Soil',
            'ph_level': 5.2,
            'organic_carbon_pct': 1.10,
            'nitrogen_level': 'Medium (260 kg/ha)',
            'phosphorus_level': 'Low (11 kg/ha)',
            'potassium_level': 'Low (140 kg/ha)',
            'drainage_quality': 'Excessive / Highly Acidic',
            'common_soil_diseases': 'Bacterial Wilt (Ralstonia), Aluminium Toxicity, Foot Rot'
        }
    ]

    for s in soils:
        s_obj, _ = SoilRecord.objects.get_or_create(
            location_name=s['location_name'],
            defaults=s
        )
        print(f"  Seeded Soil Record: {s_obj.soil_type} ({s_obj.location_name})")

    # 4. APMC MARKET PRICES
    prices = [
        {'crop_name': 'Tomato', 'mandi_name': 'Kolar APMC Mandi', 'state': 'Karnataka', 'price_per_quintal': 2750, 'prev_price': 2500, 'price_change_pct': 10.0, 'demand_level': 'HIGH', 'best_sell_day': 'Thursday'},
        {'crop_name': 'Rice', 'mandi_name': 'Mandya Grain APMC', 'state': 'Karnataka', 'price_per_quintal': 2380, 'prev_price': 2300, 'price_change_pct': 3.47, 'demand_level': 'HIGH', 'best_sell_day': 'Monday'},
        {'crop_name': 'Wheat', 'mandi_name': 'Khanna APMC Market', 'state': 'Punjab', 'price_per_quintal': 2475, 'prev_price': 2450, 'price_change_pct': 1.02, 'demand_level': 'MEDIUM', 'best_sell_day': 'Wednesday'},
        {'crop_name': 'Cotton', 'mandi_name': 'Rajkot Commercial APMC', 'state': 'Gujarat', 'price_per_quintal': 7450, 'prev_price': 7200, 'price_change_pct': 3.47, 'demand_level': 'HIGH', 'best_sell_day': 'Friday'},
        {'crop_name': 'Potato', 'mandi_name': 'Agra Vegetable APMC', 'state': 'Uttar Pradesh', 'price_per_quintal': 1720, 'prev_price': 1650, 'price_change_pct': 4.24, 'demand_level': 'MEDIUM', 'best_sell_day': 'Tuesday'}
    ]

    for p in prices:
        c_obj = Crop.objects.filter(name__icontains=p['crop_name']).first()
        if c_obj:
            p_obj, _ = MarketPrice.objects.get_or_create(
                crop=c_obj,
                market_name=p['mandi_name'],
                defaults={
                    'state': p['state'],
                    'price_per_quintal': p['price_per_quintal'],
                    'prev_price': p['prev_price'],
                    'price_change_pct': p['price_change_pct'],
                    'demand_level': p['demand_level'],
                    'best_sell_day': p['best_sell_day']
                }
            )
            print(f"  💰 Seeded Market Price: {c_obj.name} @ {p_obj.market_name} (₹{p_obj.price_per_quintal}/qtl)")

    # 5. GOVERNMENT SCHEMES
    schemes = [
        {
            'title': 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
            'category': 'Direct Income Transfer',
            'eligibility': 'All landholding farmer families with cultivable land in their names.',
            'required_documents': 'Aadhaar Card, Land Record Copy (7/12 or RTC), Active Bank Account Details.',
            'apply_url': 'https://pmkisan.gov.in',
            'funding_amount': '₹6,000 / year (3 installments)',
            'state': 'All India'
        },
        {
            'title': 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
            'category': 'Crop Insurance',
            'eligibility': 'All farmers growing notified crops in notified areas.',
            'required_documents': 'Land Sowing Certificate, Bank Passbook, Aadhaar Card, Crop Possession Certificate.',
            'apply_url': 'https://pmfby.gov.in',
            'funding_amount': 'Comprehensive Risk Cover (1.5% - 2% Premium)',
            'state': 'All India'
        },
        {
            'title': 'Soil Health Card Scheme',
            'category': 'Soil Diagnostics & Subsidies',
            'eligibility': 'All agricultural land cultivators in India.',
            'required_documents': 'Khasra/Khatauni Land Record, Aadhaar Card.',
            'apply_url': 'https://soilhealth.dac.gov.in',
            'funding_amount': 'Free Periodic Soil Health Testing',
            'state': 'All India'
        },
        {
            'title': 'Kisan Credit Card (KCC) Scheme',
            'category': 'Agri Credit & Loans',
            'eligibility': 'Farmers, tenant farmers, sharecroppers, and self-help groups.',
            'required_documents': 'Land Ownership Documents, Passport Size Photo, ID & Address Proof.',
            'apply_url': 'https://www.nabard.org',
            'funding_amount': 'Credit line up to ₹3,000,000 at 4% interest',
            'state': 'All India'
        },
        {
            'title': 'Sub-Mission on Agricultural Mechanization (SMAM)',
            'category': 'Machinery Subsidy',
            'eligibility': 'Small, marginal, female farmers and Custom Hiring Centers.',
            'required_documents': 'Aadhaar Card, Machinery Quotation, Land Record, Bank Passbook.',
            'apply_url': 'https://agrimachinery.nic.in',
            'funding_amount': '40% to 50% Subsidy on Machinery & Drones',
            'state': 'All India'
        }
    ]

    for sc in schemes:
        sc_obj, _ = GovernmentScheme.objects.get_or_create(
            title=sc['title'],
            defaults=sc
        )
        print(f"  📜 Seeded Government Scheme: {sc_obj.title}")

    # 6. EXPERT PROFILES
    experts = [
        {
            'username': 'dr_ramesh_gowda',
            'first_name': 'Dr. Ramesh',
            'last_name': 'Gowda',
            'email': 'dr.ramesh@icar.gov.in',
            'specialization': 'Senior Plant Pathologist & Fungal Disease Specialist',
            'qualification': 'Ph.D. Plant Pathology (ICAR-IARI)',
            'experience_years': 18,
            'rating': 4.95,
            'consultation_fee': 0.00,
            'bio': 'Specialist in crop disease diagnosis, bio-fungicides, and organic crop protection protocols.'
        },
        {
            'username': 'dr_sunita_sharma',
            'first_name': 'Dr. Sunita',
            'last_name': 'Sharma',
            'email': 'dr.sunita@iari.res.in',
            'specialization': 'Agronomist & Soil Health Specialist',
            'qualification': 'Ph.D. Soil Science (PAU Ludhiana)',
            'experience_years': 14,
            'rating': 4.88,
            'consultation_fee': 0.00,
            'bio': 'Expert in soil fertility management, Vertisol clay conditioning, and precision NPK fertigation.'
        }
    ]

    for exp in experts:
        exp_user, _ = User.objects.get_or_create(
            username=exp['username'],
            defaults={
                'first_name': exp['first_name'],
                'last_name': exp['last_name'],
                'email': exp['email'],
                'role': 'EXPERT'
            }
        )
        e_obj, _ = ExpertProfile.objects.get_or_create(
            user=exp_user,
            defaults={
                'specialization': exp['specialization'],
                'qualification': exp['qualification'],
                'experience_years': exp['experience_years'],
                'rating': exp['rating'],
                'consultation_fee': exp['consultation_fee'],
                'bio': exp['bio']
            }
        )
        print(f"  👨‍🔬 Seeded Expert Profile: Dr. {exp_user.first_name} {exp_user.last_name}")

    # 7. AGROCHEMICAL STORES
    shops = [
        {
            'name': 'Kisan Agri Seva Center & Fertilizer Depot',
            'shop_type': 'SHOP',
            'address': 'Main Market Road, Mandya, Karnataka',
            'latitude': 12.5218, 'longitude': 76.8951,
            'phone': '+91 98450 12345'
        },
        {
            'name': 'KVK Agricultural Diagnostic Lab & Bio-Control Center',
            'shop_type': 'HOSPITAL',
            'address': 'ICAR-KVK Campus, Hebbal, Bangalore, Karnataka',
            'latitude': 13.0358, 'longitude': 77.5896,
            'phone': '+91 80 2333 0155'
        },
        {
            'name': 'Krishi Vikas Organic & Fertilizer Clinic',
            'shop_type': 'SHOP',
            'address': 'Agri Market Yard, Pune, Maharashtra',
            'latitude': 18.5204, 'longitude': 73.8567,
            'phone': '+91 98220 54321'
        }
    ]

    for sh in shops:
        sh_obj, _ = AgriShop.objects.get_or_create(
            name=sh['name'],
            defaults=sh
        )
        print(f"  🏪 Seeded Agri Shop: {sh_obj.name}")

    print("\nALL AGRICULTURAL DATA CONNECTED AND SEEDED INTO DATABASE SUCCESSFULLY!")

if __name__ == '__main__':
    seed()
