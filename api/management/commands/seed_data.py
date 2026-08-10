from django.core.management.base import BaseCommand
from api.models import (
    User, Farm, Field, Crop, Disease, DiseaseReport,
    WeatherRecord, MarketPrice, GovernmentScheme, SoilHealthRecord,
    ExpertProfile, Appointment, AgriShop, FarmRecord
)
from datetime import date, timedelta
import random

class Command(BaseCommand):
    help = 'Seeds initial realistic production data for AgriGuard AI platform'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting AgriGuard AI Data Seeding...'))

        # 1. Create System Owner & Default Users
        owner_user, _ = User.objects.get_or_create(
            username='kishanhp18',
            defaults={
                'email': 'kishanhp18@gmail.com',
                'first_name': 'Kishan',
                'last_name': 'HP',
                'role': 'ADMIN',
                'is_staff': True,
                'is_superuser': True,
                'phone': '+91 99000 18181'
            }
        )
        if not owner_user.check_password('Kishan@2026'):
            owner_user.set_password('Kishan@2026')
            owner_user.save()

        admin_user, _ = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'kishanhp18@gmail.com',
                'first_name': 'AgriGuard',
                'last_name': 'Administrator',
                'role': 'ADMIN',
                'is_staff': True,
                'is_superuser': True,
                'phone': '+91 99000 11223'
            }
        )
        admin_user.email = 'kishanhp18@gmail.com'
        admin_user.is_superuser = True
        admin_user.is_staff = True
        admin_user.role = 'ADMIN'
        admin_user.save()


        farmer_user, _ = User.objects.get_or_create(
            username='farmer_rajesh',
            defaults={
                'email': 'rajesh.kumar@farm.in',
                'first_name': 'Rajesh',
                'last_name': 'Kumar',
                'role': 'FARMER',
                'phone': '+91 98450 12345',
                'location': 'Mandya, Karnataka',
                'preferred_language': 'en',
                'is_phone_verified': True,
                'green_points': 450
            }
        )
        if not farmer_user.check_password('Farmer@2026'):
            farmer_user.set_password('Farmer@2026')
            farmer_user.save()

        expert_user, _ = User.objects.get_or_create(
            username='dr_sharma',
            defaults={
                'email': 'dr.sharma@agri.edu',
                'first_name': 'Dr. Ananya',
                'last_name': 'Sharma',
                'role': 'EXPERT',
                'phone': '+91 94480 98765',
                'location': 'Bangalore, Karnataka'
            }
        )
        if not expert_user.check_password('Expert@2026'):
            expert_user.set_password('Expert@2026')
            expert_user.save()

        ExpertProfile.objects.get_or_create(
            user=expert_user,
            defaults={
                'specialization': 'Crop Pathology & Bio-Fungicide Solutions',
                'qualification': 'Ph.D. Plant Pathology (ICAR-IARI)',
                'experience_years': 15,
                'rating': 4.9,
                'consultation_fee': 0.0,
                'bio': 'Senior scientist specializing in early blight detection, organic pest management, and sustainable NPK optimization.'
            }
        )

        shop_user, _ = User.objects.get_or_create(
            username='green_store_owner',
            defaults={
                'email': 'store@greenagro.com',
                'first_name': 'Ramesh',
                'last_name': 'Gowda',
                'role': 'SHOP_OWNER',
                'phone': '+91 97411 55443'
            }
        )

        govt_user, _ = User.objects.get_or_create(
            username='officer_patil',
            defaults={
                'email': 'patil@agri.gov.in',
                'first_name': 'Suresh',
                'last_name': 'Patil',
                'role': 'GOVT_OFFICER',
                'phone': '+91 98800 66778'
            }
        )

        # 2. Seed Supported Crops from Reference PDF (Comprehensive Indian Crops & Producing States)
        crops_data = [
            # Cereals
            ('Rice', 'Oryza sativa', 'Cereals', 'West Bengal, Uttar Pradesh, Punjab, Telangana, Andhra Pradesh, Chhattisgarh, Odisha, Tamil Nadu', 120, 60, 40, 5.5, 7.0, 1200, 130, '🌾'),
            ('Wheat', 'Triticum aestivum', 'Cereals', 'Uttar Pradesh, Madhya Pradesh, Punjab, Haryana, Rajasthan, Bihar', 140, 50, 40, 6.0, 7.5, 500, 120, '🌾'),
            ('Maize', 'Zea mays', 'Cereals', 'Karnataka, Madhya Pradesh, Bihar, Telangana, Andhra Pradesh', 150, 75, 60, 5.8, 7.2, 600, 100, '🌽'),
            ('Barley', 'Hordeum vulgare', 'Cereals', 'Rajasthan, Uttar Pradesh, Haryana, Punjab', 80, 40, 30, 6.0, 7.5, 400, 110, '🌾'),
            ('Jowar', 'Sorghum bicolor', 'Cereals', 'Maharashtra, Karnataka, Telangana', 90, 45, 40, 5.5, 7.5, 450, 105, '🌾'),
            ('Bajra', 'Pennisetum glaucum', 'Cereals', 'Rajasthan, Gujarat, Haryana, Uttar Pradesh', 80, 40, 30, 6.0, 8.0, 350, 90, '🌾'),
            ('Ragi', 'Eleusine coracana', 'Cereals', 'Karnataka, Tamil Nadu, Uttarakhand', 60, 30, 30, 5.5, 7.5, 300, 95, '🌾'),
            ('Little Millet', 'Panicum sumatrense', 'Cereals', 'Madhya Pradesh, Chhattisgarh, Tamil Nadu', 50, 25, 25, 5.5, 7.0, 280, 90, '🌾'),
            ('Foxtail Millet', 'Setaria italica', 'Cereals', 'Andhra Pradesh, Karnataka, Telangana', 50, 25, 25, 5.5, 7.0, 290, 90, '🌾'),
            ('Kodo Millet', 'Paspalum scrobiculatum', 'Cereals', 'Madhya Pradesh, Chhattisgarh', 45, 20, 20, 5.5, 7.0, 270, 100, '🌾'),
            ('Barnyard Millet', 'Echinochloa frumentacea', 'Cereals', 'Uttarakhand, Uttar Pradesh', 45, 20, 20, 5.5, 7.0, 260, 85, '🌾'),
            ('Proso Millet', 'Panicum miliaceum', 'Cereals', 'Madhya Pradesh, Uttar Pradesh', 45, 20, 20, 5.5, 7.0, 260, 75, '🌾'),
            ('Browntop Millet', 'Urochloa ramosa', 'Cereals', 'Karnataka, Andhra Pradesh', 40, 20, 20, 5.5, 7.0, 250, 75, '🌾'),

            # Pulses
            ('Chickpea', 'Cicer arietinum', 'Pulses', 'Madhya Pradesh, Rajasthan, Maharashtra, Uttar Pradesh', 20, 50, 20, 6.0, 7.5, 350, 110, '🫘'),
            ('Pigeon Pea', 'Cajanus cajan', 'Pulses', 'Maharashtra, Karnataka, Madhya Pradesh', 25, 60, 30, 6.5, 7.5, 450, 160, '🫘'),
            ('Green Gram', 'Vigna radiata', 'Pulses', 'Rajasthan, Maharashtra, Karnataka', 20, 40, 20, 6.2, 7.2, 300, 70, '🫘'),
            ('Black Gram', 'Vigna mungo', 'Pulses', 'Madhya Pradesh, Uttar Pradesh, Andhra Pradesh', 20, 40, 20, 6.2, 7.2, 300, 80, '🫘'),
            ('Lentil', 'Lens culinaris', 'Pulses', 'Madhya Pradesh, Uttar Pradesh, Bihar', 20, 40, 20, 6.0, 7.0, 320, 110, '🫘'),
            ('Field Pea', 'Pisum sativum', 'Pulses', 'Uttar Pradesh, Bihar, Punjab', 20, 40, 20, 6.0, 7.5, 350, 100, '🫘'),
            ('Cowpea', 'Vigna unguiculata', 'Pulses', 'Tamil Nadu, Karnataka, Rajasthan', 20, 40, 20, 6.0, 7.5, 300, 85, '🫘'),
            ('Horse Gram', 'Macrotyloma uniflorum', 'Pulses', 'Karnataka, Tamil Nadu, Odisha', 15, 30, 15, 5.5, 7.5, 250, 120, '🫘'),
            ('Moth Bean', 'Vigna aconitifolia', 'Pulses', 'Rajasthan, Gujarat', 15, 30, 15, 6.0, 8.0, 200, 75, '🫘'),
            ('Lablab Bean', 'Lablab purpureus', 'Pulses', 'Karnataka, Tamil Nadu', 20, 40, 20, 6.0, 7.5, 350, 120, '🫘'),
            ('Rajma', 'Phaseolus vulgaris', 'Pulses', 'Jammu & Kashmir, Himachal Pradesh, Uttarakhand', 30, 60, 40, 6.0, 7.0, 400, 110, '🫘'),

            # Oilseeds
            ('Groundnut', 'Arachis hypogaea', 'Oilseeds', 'Gujarat, Rajasthan, Andhra Pradesh, Tamil Nadu, Karnataka', 20, 40, 50, 6.0, 7.0, 450, 110, '🥜'),
            ('Mustard', 'Brassica juncea', 'Oilseeds', 'Rajasthan, Haryana, Uttar Pradesh, Madhya Pradesh', 80, 40, 40, 6.0, 7.5, 350, 110, '🌱'),
            ('Rapeseed', 'Brassica napus', 'Oilseeds', 'Rajasthan, Haryana, Uttar Pradesh', 80, 40, 40, 6.0, 7.5, 350, 110, '🌱'),
            ('Soybean', 'Glycine max', 'Oilseeds', 'Madhya Pradesh, Maharashtra, Rajasthan', 30, 60, 40, 6.0, 7.5, 550, 100, '🫘'),
            ('Sunflower', 'Helianthus annuus', 'Oilseeds', 'Karnataka, Andhra Pradesh, Telangana', 60, 90, 60, 6.0, 7.2, 500, 95, '🌻'),
            ('Sesame', 'Sesamum indicum', 'Oilseeds', 'West Bengal, Gujarat, Rajasthan', 40, 20, 20, 5.5, 7.5, 300, 90, '🌱'),
            ('Safflower', 'Carthamus tinctorius', 'Oilseeds', 'Maharashtra, Karnataka', 50, 40, 20, 6.0, 8.0, 350, 125, '🌱'),
            ('Castor', 'Ricinus communis', 'Oilseeds', 'Gujarat, Rajasthan', 80, 40, 30, 5.5, 7.5, 450, 150, '🌱'),
            ('Linseed', 'Linum usitatissimum', 'Oilseeds', 'Madhya Pradesh, Chhattisgarh', 60, 30, 30, 5.5, 7.0, 350, 120, '🌱'),
            ('Niger Seed', 'Guizotia abyssinica', 'Oilseeds', 'Odisha, Chhattisgarh', 30, 20, 20, 5.5, 7.0, 300, 100, '🌱'),
            ('Coconut', 'Cocos nucifera', 'Oilseeds', 'Kerala, Tamil Nadu, Karnataka, Andhra Pradesh', 180, 90, 200, 5.5, 8.0, 2000, 365, '🥥'),
            ('Oil Palm', 'Elaeis guineensis', 'Oilseeds', 'Andhra Pradesh, Telangana, Karnataka', 200, 100, 200, 5.5, 7.5, 2200, 365, '🌴'),

            # Fibre & Commercial Cash Crops
            ('Cotton', 'Gossypium hirsutum', 'Fibre', 'Gujarat, Maharashtra, Telangana, Punjab, Haryana, Rajasthan, Karnataka', 120, 60, 60, 6.0, 8.0, 750, 160, '🌱', 'Kharif', 'Black cotton soil; warm climate', 'Textile industry, cottonseed oil'),
            ('Sugarcane', 'Saccharum officinarum', 'Sugar/Starch', 'Uttar Pradesh, Maharashtra, Karnataka, Tamil Nadu, Bihar, Punjab, Haryana', 250, 110, 110, 6.0, 7.5, 1800, 365, '🎋', 'Year-round', 'Fertile loam; hot and humid', 'Sugar, jaggery, ethanol'),
            ('Jute', 'Corchorus capsularis', 'Fibre', 'West Bengal, Assam, Bihar, Odisha, Meghalaya', 80, 40, 40, 6.0, 7.5, 1200, 120, '🌿', 'Kharif', 'Alluvial soil; humid climate', 'Bags, ropes, mats'),
            ('Tobacco', 'Nicotiana tabacum', 'Cash Crop', 'Andhra Pradesh, Gujarat, Karnataka, Telangana, Uttar Pradesh, Bihar', 100, 50, 120, 5.5, 7.0, 600, 120, '🍃', 'Kharif', 'Sandy loam; warm climate', 'Cigarettes, cigars, chewing tobacco, nicotine extraction'),
            ('Tea', 'Camellia sinensis', 'Plantation', 'Assam, West Bengal, Tamil Nadu, Kerala', 150, 50, 100, 4.5, 5.5, 1600, 365, '🍵', 'Perennial', 'Acidic soil; cool, humid climate', 'Beverage'),
            ('Coffee', 'Coffea arabica', 'Plantation', 'Karnataka, Kerala, Tamil Nadu', 110, 55, 90, 5.5, 6.5, 1500, 365, '☕', 'Perennial', 'Well-drained loam; moderate climate', 'Beverage'),
            ('Rubber', 'Hevea brasiliensis', 'Plantation', 'Kerala, Tamil Nadu, Karnataka, Tripura', 120, 60, 100, 4.5, 6.0, 2000, 365, '🪵', 'Perennial', 'Laterite soil; hot and humid', 'Tyres, gloves, industrial rubber'),
            ('Coconut', 'Cocos nucifera', 'Oilseeds', 'Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, Odisha', 180, 90, 200, 5.5, 8.0, 2000, 365, '🥥', 'Perennial', 'Sandy coastal soil', 'Oil, food, coir'),
            ('Arecanut (Betel Nut)', 'Areca catechu', 'Plantation', 'Karnataka, Kerala, Assam, Meghalaya, West Bengal', 100, 40, 140, 5.5, 7.5, 1800, 365, '🌴', 'Perennial', 'Laterite soil; humid climate', 'Chewed with betel leaves, religious use'),
            ('Betel Vine (Paan)', 'Piper betle', 'Plantation', 'West Bengal, Odisha, Karnataka, Andhra Pradesh, Tamil Nadu, Bihar', 80, 40, 80, 6.0, 7.5, 1200, 365, '🍃', 'Perennial', 'Fertile loam; warm and humid', 'Chewing leaves, medicinal use'),
            ('Cocoa', 'Theobroma cacao', 'Plantation', 'Andhra Pradesh, Karnataka, Kerala, Tamil Nadu', 100, 40, 100, 6.0, 7.5, 1500, 365, '🍫', 'Perennial', 'Tropical climate', 'Chocolate, cocoa products'),
            ('Cashew', 'Anacardium occidentale', 'Plantation', 'Maharashtra, Goa, Kerala, Karnataka, Andhra Pradesh, Odisha, Tamil Nadu', 80, 40, 80, 5.5, 7.5, 800, 365, '🥜', 'Perennial', 'Sandy/laterite soil', 'Cashew nuts, cashew apple products'),
            ('Bamboo', 'Bambusa spp.', 'Plantation', 'Assam, Arunachal Pradesh, Mizoram, Tripura, Manipur, Nagaland, Karnataka, Kerala', 60, 30, 60, 5.5, 7.5, 1200, 365, '🎍', 'Perennial', 'Tropical and subtropical', 'Construction, furniture, paper, handicrafts'),
            ('Banana Fibre', 'Musa spp.', 'Fibre', 'Tamil Nadu, Maharashtra, Gujarat, Kerala, Karnataka', 150, 50, 150, 6.0, 7.5, 1800, 365, '🍌', 'Year-round', 'Fertile loam', 'Textiles, ropes, handicrafts'),
            ('Mulberry', 'Morus alba', 'Plantation', 'Karnataka, Andhra Pradesh, Tamil Nadu, Telangana, West Bengal', 100, 50, 80, 6.0, 7.5, 1000, 365, '🍃', 'Perennial', 'Well-drained loam', 'Silkworm feed for silk production'),
            ('Guar (Cluster Bean)', 'Cyamopsis tetragonoloba', 'Pulses', 'Rajasthan, Haryana, Gujarat, Punjab', 20, 40, 20, 6.5, 8.5, 300, 90, '🫘', 'Kharif', 'Sandy soil; dry climate', 'Guar gum, food, cattle feed'),
            ('Industrial Hemp', 'Cannabis sativa', 'Fibre', 'Uttarakhand, Himachal Pradesh, Jammu & Kashmir', 80, 40, 40, 6.0, 7.5, 500, 120, '🌿', 'Kharif', 'Well-drained soil; temperate climate', 'Fibre, textiles, ropes, industrial products'),
            ('Flax (Linseed)', 'Linum usitatissimum', 'Fibre', 'Madhya Pradesh, Chhattisgarh, Uttar Pradesh, Bihar, Maharashtra', 60, 30, 30, 5.5, 7.0, 350, 120, '🌱', 'Rabi', 'Loam soil; cool climate', 'Fibre (linen), linseed oil'),
            ('Oil Palm', 'Elaeis guineensis', 'Oilseeds', 'Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala, Mizoram', 200, 100, 200, 5.5, 7.5, 2200, 365, '🌴', 'Perennial', 'Tropical, high rainfall', 'Edible palm oil'),
            ('Sisal', 'Agave sisalana', 'Fibre', 'Odisha, Andhra Pradesh, Karnataka, Tamil Nadu', 40, 20, 40, 5.5, 7.5, 400, 365, '🪴', 'Perennial', 'Dry, well-drained soil', 'Rope, twine, fibre'),
            ('Sun Hemp', 'Crotalaria juncea', 'Fibre', 'Uttar Pradesh, Madhya Pradesh, Maharashtra, Andhra Pradesh', 40, 40, 20, 6.0, 7.5, 600, 90, '🌿', 'Kharif', 'Loam soil', 'Fibre, green manure'),
            ('Mesta', 'Hibiscus cannabinus', 'Fibre', 'Odisha, West Bengal, Assam, Andhra Pradesh', 60, 30, 30, 6.0, 7.0, 900, 130, '🌿', 'Kharif', 'Alluvial soil', 'Fibre industry'),

            # Spices
            ('Black Pepper', 'Piper nigrum', 'Spices', 'Kerala, Karnataka, Tamil Nadu', 100, 40, 140, 5.5, 6.5, 1800, 365, '🌶️'),
            ('Cardamom', 'Elettaria cardamomum', 'Spices', 'Kerala, Karnataka, Tamil Nadu', 75, 75, 150, 5.5, 6.5, 2000, 365, '🌱'),
            ('Turmeric', 'Curcuma longa', 'Spices', 'Telangana, Maharashtra, Karnataka, Tamil Nadu', 120, 60, 100, 5.5, 6.5, 1000, 260, '🟨'),
            ('Ginger', 'Zingiber officinale', 'Spices', 'Kerala, Meghalaya, Karnataka', 100, 50, 100, 5.5, 6.5, 1200, 240, '🫚'),
            ('Chilli', 'Capsicum annuum', 'Spices', 'Andhra Pradesh, Telangana, Karnataka', 90, 45, 60, 6.0, 7.0, 500, 120, '🌶️'),
            ('Coriander', 'Coriandrum sativum', 'Spices', 'Rajasthan, Madhya Pradesh', 60, 40, 30, 6.0, 8.0, 350, 90, '🌿'),
            ('Cumin', 'Cuminum cyminum', 'Spices', 'Gujarat, Rajasthan', 30, 20, 20, 6.8, 8.0, 250, 110, '🌱'),
            ('Fennel', 'Foeniculum vulgare', 'Spices', 'Gujarat, Rajasthan', 90, 40, 40, 6.5, 8.0, 400, 140, '🌱'),
            ('Fenugreek', 'Trigonella foenum-graecum', 'Spices', 'Rajasthan, Gujarat', 40, 40, 20, 6.0, 7.0, 300, 90, '🌱'),
            ('Ajwain', 'Trachyspermum ammi', 'Spices', 'Rajasthan, Gujarat', 30, 20, 20, 6.5, 8.0, 250, 120, '🌱'),
            ('Cinnamon', 'Cinnamomum verum', 'Spices', 'Kerala, Tamil Nadu', 80, 40, 80, 5.5, 6.5, 1500, 365, '🪵'),
            ('Clove', 'Syzygium aromaticum', 'Spices', 'Tamil Nadu, Kerala', 80, 40, 80, 5.5, 6.5, 1800, 365, '🧄'),
            ('Nutmeg', 'Myristica fragrans', 'Spices', 'Kerala', 80, 40, 80, 5.5, 6.5, 1800, 365, '🌰'),
            ('Bay Leaf', 'Cinnamomum tamala', 'Spices', 'Meghalaya, Sikkim', 60, 30, 60, 5.5, 6.5, 1500, 365, '🍃'),
            ('Vanilla', 'Vanilla planifolia', 'Spices', 'Kerala, Karnataka', 60, 30, 60, 5.5, 6.5, 1600, 365, '🌱'),
            ('Saffron', 'Crocus sativus', 'Spices', 'Jammu & Kashmir', 40, 40, 40, 6.0, 7.5, 400, 150, '🌸'),

            # Fruits
            ('Mango', 'Mangifera indica', 'Fruits', 'Uttar Pradesh, Andhra Pradesh, Telangana, Karnataka', 150, 75, 150, 5.5, 7.5, 1000, 365, '🥭'),
            ('Banana', 'Musa acuminata', 'Fruits', 'Tamil Nadu, Maharashtra, Gujarat', 200, 80, 240, 6.0, 7.5, 1600, 330, '🍌'),
            ('Apple', 'Malus domestica', 'Fruits', 'Jammu & Kashmir, Himachal Pradesh, Uttarakhand', 100, 50, 100, 6.0, 7.0, 800, 365, '🍎'),
            ('Orange', 'Citrus sinensis', 'Fruits', 'Maharashtra, Madhya Pradesh', 120, 60, 120, 6.0, 7.5, 900, 365, '🍊'),
            ('Guava', 'Psidium guajava', 'Fruits', 'Uttar Pradesh, Bihar', 100, 50, 100, 6.5, 7.5, 800, 365, '🍈'),
            ('Papaya', 'Carica papaya', 'Fruits', 'Andhra Pradesh, Gujarat', 120, 60, 120, 6.0, 6.8, 1200, 270, '🍈'),
            ('Grapes', 'Vitis vinifera', 'Fruits', 'Maharashtra, Karnataka', 150, 100, 200, 6.5, 7.5, 700, 365, '🍇'),
            ('Pomegranate', 'Punica granatum', 'Fruits', 'Maharashtra, Karnataka', 100, 50, 100, 6.5, 7.5, 600, 365, '🍎'),
            ('Pineapple', 'Ananas comosus', 'Fruits', 'Assam, Tripura', 120, 60, 120, 4.5, 5.5, 1500, 365, '🍍'),
            ('Litchi', 'Litchi chinensis', 'Fruits', 'Bihar, West Bengal', 100, 50, 100, 6.0, 6.5, 1200, 365, '🍒'),
            ('Jackfruit', 'Artocarpus heterophyllus', 'Fruits', 'Kerala, Karnataka', 100, 50, 100, 6.0, 7.5, 1200, 365, '🍈'),
            ('Amla', 'Phyllanthus emblica', 'Fruits', 'Uttar Pradesh, Madhya Pradesh', 80, 40, 80, 6.5, 8.0, 600, 365, '🍏'),
            ('Strawberry', 'Fragaria × ananassa', 'Fruits', 'Maharashtra', 80, 80, 100, 5.5, 6.5, 800, 120, '🍓'),
            ('Dragon Fruit', 'Selenicereus undatus', 'Fruits', 'Gujarat, Karnataka', 80, 40, 80, 6.0, 7.5, 500, 365, '🐉'),

            # Vegetables
            ('Potato', 'Solanum tuberosum', 'Vegetables', 'Uttar Pradesh, West Bengal, Bihar', 120, 60, 100, 5.2, 6.5, 400, 110, '🥔'),
            ('Tomato', 'Solanum lycopersicum', 'Vegetables', 'Andhra Pradesh, Karnataka, Madhya Pradesh', 100, 50, 80, 6.0, 6.8, 450, 90, '🍅'),
            ('Onion', 'Allium cepa', 'Vegetables', 'Maharashtra, Karnataka', 80, 40, 80, 6.0, 7.0, 350, 120, '🧅'),
            ('Garlic', 'Allium sativum', 'Vegetables', 'Madhya Pradesh, Rajasthan', 100, 50, 50, 6.0, 7.0, 350, 130, '🧄'),
            ('Brinjal', 'Solanum melongena', 'Vegetables', 'West Bengal, Odisha', 100, 50, 50, 6.0, 6.8, 500, 130, '🍆'),
            ('Okra', 'Abelmoschus esculentus', 'Vegetables', 'Gujarat, Uttar Pradesh', 80, 40, 40, 6.0, 6.8, 400, 90, '🥒'),
            ('Cabbage', 'Brassica oleracea var. capitata', 'Vegetables', 'West Bengal, Odisha', 120, 60, 60, 6.0, 6.8, 450, 90, '🥬'),
            ('Cauliflower', 'Brassica oleracea var. botrytis', 'Vegetables', 'Bihar, Uttar Pradesh', 120, 60, 60, 6.0, 6.8, 450, 90, '🥦'),
            ('Carrot', 'Daucus carota', 'Vegetables', 'Haryana, Punjab', 80, 40, 80, 6.0, 7.0, 350, 90, '🥕'),
            ('Radish', 'Raphanus sativus', 'Vegetables', 'West Bengal, Punjab', 50, 25, 50, 6.0, 7.0, 300, 45, '🌱'),
            ('Beetroot', 'Beta vulgaris', 'Vegetables', 'Tamil Nadu, Karnataka', 60, 30, 60, 6.0, 7.0, 350, 75, '🧅'),
            ('Spinach', 'Spinacia oleracea', 'Vegetables', 'All states', 50, 25, 50, 6.0, 7.0, 300, 40, '🥬'),
            ('Cucumber', 'Cucumis sativus', 'Vegetables', 'Karnataka, Uttar Pradesh', 80, 40, 60, 6.0, 7.0, 400, 60, '🥒'),
            ('Pumpkin', 'Cucurbita moschata', 'Vegetables', 'Assam, West Bengal', 80, 40, 60, 6.0, 7.5, 450, 100, '🎃'),
            ('Bottle Gourd', 'Lagenaria siceraria', 'Vegetables', 'Uttar Pradesh, Bihar', 80, 40, 60, 6.0, 7.0, 400, 90, '🥒'),
            ('Bitter Gourd', 'Momordica charantia', 'Vegetables', 'Uttar Pradesh, Maharashtra', 80, 40, 60, 6.0, 7.0, 400, 90, '🥒'),
            ('Capsicum', 'Capsicum annuum', 'Vegetables', 'Himachal Pradesh, Karnataka', 100, 50, 80, 6.0, 7.0, 500, 110, '🫑'),
            ('Green Peas', 'Pisum sativum', 'Vegetables', 'Uttar Pradesh, Punjab', 30, 60, 40, 6.0, 7.5, 350, 80, '🫛'),
            ('Drumstick', 'Moringa oleifera', 'Vegetables', 'Tamil Nadu, Andhra Pradesh', 60, 30, 60, 6.0, 7.5, 500, 180, '🌱'),
            ('Elephant Foot Yam', 'Amorphophallus paeoniifolius', 'Vegetables', 'Andhra Pradesh, Kerala', 80, 40, 80, 5.5, 7.0, 800, 240, '🍠'),

            # Flowers
            ('Rose', 'Rosa', 'Flowers', 'Karnataka, Tamil Nadu', 80, 40, 40, 6.0, 7.5, 600, 365, '🌹'),
            ('Marigold', 'Tagetes', 'Flowers', 'Karnataka, Maharashtra', 60, 30, 30, 6.0, 7.5, 400, 120, '🌼'),
            ('Jasmine', 'Jasminum', 'Flowers', 'Tamil Nadu, Karnataka', 60, 30, 30, 6.0, 7.5, 600, 365, '🌸'),

            # Medicinal
            ('Aloe Vera', 'Aloe barbadensis', 'Medicinal', 'Rajasthan, Gujarat', 40, 20, 20, 6.0, 8.5, 300, 365, '🪴'),
            ('Ashwagandha', 'Withania somnifera', 'Medicinal', 'Madhya Pradesh, Rajasthan', 30, 20, 20, 6.0, 7.5, 300, 160, '🌿'),
            ('Tulsi', 'Ocimum tenuiflorum', 'Medicinal', 'Across India', 40, 20, 20, 6.0, 7.5, 350, 90, '🌿'),

            # Fodder
            ('Napier Grass', 'Pennisetum purpureum', 'Fodder', 'Tamil Nadu, Karnataka', 100, 40, 40, 6.0, 7.5, 1000, 365, '🌾'),
            ('Berseem', 'Trifolium alexandrinum', 'Fodder', 'Punjab, Haryana', 40, 60, 30, 6.5, 7.5, 800, 150, '☘️')
        ]

        crop_objs = {}
        for item in crops_data:
            c_name = item[0]
            sc_name = item[1]
            cat = item[2]
            states = item[3]
            n, p, k = item[4], item[5], item[6]
            ph_min, ph_max = item[7], item[8]
            w_mm = item[9]
            g_days = item[10]
            emoji = item[11]
            season = item[12] if len(item) > 12 else 'Kharif'
            soil_climate = item[13] if len(item) > 13 else 'Fertile loam; tropical climate'
            main_uses = item[14] if len(item) > 14 else 'Food & Agricultural Commodity'

            crop, _ = Crop.objects.get_or_create(
                name=c_name,
                defaults={
                    'scientific_name': sc_name,
                    'category': cat,
                    'major_producing_states': states,
                    'season': season,
                    'soil_and_climate': soil_climate,
                    'main_uses': main_uses,
                    'optimal_n': n,
                    'optimal_p': p,
                    'optimal_k': k,
                    'optimal_ph_min': ph_min,
                    'optimal_ph_max': ph_max,
                    'water_req_mm': w_mm,
                    'growth_days': g_days,
                    'icon_emoji': emoji
                }
            )
            crop_objs[c_name] = crop

        # 3. Seed Farm & Fields
        farm, _ = Farm.objects.get_or_create(
            owner=farmer_user,
            name='Green Valley Organic Acres',
            defaults={
                'area_acres': 4.5,
                'soil_type': 'Red Sandy Loam',
                'village': 'Mandya Rural',
                'state': 'Karnataka',
                'latitude': 12.5218,
                'longitude': 76.8951
            }
        )

        Field.objects.get_or_create(
            farm=farm,
            name='North Field A (Tomatoes)',
            defaults={'crop': crop_objs.get('Tomato'), 'area_acres': 1.5, 'planted_date': date.today() - timedelta(days=35)}
        )
        Field.objects.get_or_create(
            farm=farm,
            name='South Field B (Rice Paddy)',
            defaults={'crop': crop_objs.get('Rice'), 'area_acres': 2.0, 'planted_date': date.today() - timedelta(days=60)}
        )

        # 4. Seed Weather Records
        WeatherRecord.objects.get_or_create(
            location_name='Mandya',
            defaults={
                'temp_c': 29.2,
                'humidity': 68,
                'rainfall_mm': 18.5,
                'wind_kph': 12.0,
                'uv_index': 7,
                'alert_level': 'WARNING',
                'alert_title': 'Monsoon Rain Alert',
                'alert_desc': 'Heavy localized rainfall expected on Sunday. Secure drainage channels in paddy fields.'
            }
        )

        # 5. Seed Market Prices
        mandi_prices = [
            ('Tomato', 'Mandya APMC Mandi', 2850, 2600, 9.6, 'HIGH', 'Thursday'),
            ('Rice', 'Bengaluru Central Market', 4200, 4150, 1.2, 'MEDIUM', 'Wednesday'),
            ('Potato', 'Hassan Produce Market', 1950, 2050, -4.8, 'HIGH', 'Friday'),
            ('Wheat', 'Davangere Market', 3100, 3000, 3.3, 'HIGH', 'Tuesday'),
            ('Chili Pepper', 'Guntur Agri Yard', 14500, 13800, 5.0, 'VERY HIGH', 'Monday'),
            ('Maize / Corn', 'Shimoga Mandi', 2250, 2200, 2.2, 'MEDIUM', 'Saturday')
        ]
        for cname, mname, price, pprice, change, dem, sday in mandi_prices:
            cobj = crop_objs.get(cname)
            if cobj:
                MarketPrice.objects.get_or_create(
                    crop=cobj,
                    market_name=mname,
                    defaults={
                        'state': 'Karnataka',
                        'price_per_quintal': price,
                        'prev_price': pprice,
                        'price_change_pct': change,
                        'demand_level': dem,
                        'best_sell_day': sday
                    }
                )

        # 6. Seed Government Schemes
        schemes_data = [
            (
                'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
                'Direct Income Support',
                'Small & Marginal farmers owning up to 2 hectares cultivable land.',
                'Aadhaar Card, Land Ownership Papers, Bank Passbook',
                date(2026, 12, 31),
                'https://pmkisan.gov.in',
                '₹6,000 / year (3 installments of ₹2,000)'
            ),
            (
                'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
                'Crop Insurance',
                'All farmers growing notified crops in notified areas including sharecroppers.',
                'Kisan Credit Card (KCC), Land Sowing Certificate, Bank Account',
                date(2026, 9, 30),
                'https://pmfby.gov.in',
                'Full financial coverage against natural calamities & crop pests'
            ),
            (
                'Soil Health Card Scheme',
                'Soil Testing Subsidy',
                'All landholding farmers across India.',
                'Aadhaar Card, Soil Sample Registration Number',
                date(2026, 11, 15),
                'https://soilhealth.dac.gov.in',
                'Free soil NPK, pH & Micronutrient diagnostic report'
            ),
            (
                'Sub-Mission on Agricultural Mechanization (SMAM)',
                'Equipment Subsidy',
                'Individual farmers, SHGs, and Farmer Producer Organizations (FPOs).',
                'Land Record Copy, Aadhaar, Bank Details, Quotation for Tractor/Equipment',
                date(2026, 10, 31),
                'https://agrimachinery.nic.in',
                '40% to 50% subsidy on tractors & farm implements'
            )
        ]
        for title, cat, elig, docs, dline, url, amt in schemes_data:
            GovernmentScheme.objects.get_or_create(
                title=title,
                defaults={
                    'category': cat,
                    'eligibility': elig,
                    'required_documents': docs,
                    'deadline': dline,
                    'apply_url': url,
                    'funding_amount': amt,
                    'state': 'All India'
                }
            )

        # 7. Seed Soil Health Baseline
        SoilHealthRecord.objects.get_or_create(
            farm=farm,
            defaults={
                'nitrogen': 115.0,
                'phosphorus': 42.0,
                'potassium': 38.0,
                'ph': 6.6,
                'organic_carbon': 0.62,
                'moisture_pct': 42.0,
                'health_score': 88,
                'recommendation_summary': 'Soil NPK balance is in healthy range. Add 10kg/acre Bio-Zinc before fruit set.'
            }
        )

        # 8. Seed Agri Shops & Plant Hospitals
        AgriShop.objects.get_or_create(
            name='Karnataka Farmers Co-operative Store',
            defaults={
                'shop_type': 'SHOP',
                'address': 'Main APMC Yard, Mandya, Karnataka',
                'phone': '+91 8232 220011',
                'latitude': 12.5250,
                'longitude': 76.8970,
                'products_available': 'Mancozeb 75 WP, Trichoderma, Certified Hybrid Tomato Seeds, Urea, DAP',
                'rating': 4.8
            }
        )
        AgriShop.objects.get_or_create(
            name='Krishi Vigyan Kendra (KVK) Plant Diagnostic Hospital',
            defaults={
                'shop_type': 'HOSPITAL',
                'address': 'KVK Campus, VC Farm, Mandya',
                'phone': '+91 8232 245566',
                'latitude': 12.5100,
                'longitude': 76.8800,
                'products_available': 'Leaf Tissue Testing, Fungal Bio-Agents, Drone Spraying Services',
                'rating': 4.9
            }
        )

        # 9. Seed Financial Farm Records
        FarmRecord.objects.get_or_create(
            farm=farm,
            title='Sold Premium Grade Hybrid Tomatoes',
            defaults={'record_type': 'INCOME', 'amount': 85000.0, 'quantity_kg': 3000.0, 'notes': 'Sold at Mandya APMC at ₹2,833/qnt.'}
        )
        FarmRecord.objects.get_or_create(
            farm=farm,
            title='Bio-Fungicide & Drip Irrigation Maintenance',
            defaults={'record_type': 'EXPENSE', 'amount': 12500.0, 'quantity_kg': 0.0, 'notes': 'Purchased Copper Oxychloride & lateral drip filters.'}
        )

        self.stdout.write(self.style.SUCCESS('AgriGuard AI Data Seeding Completed Successfully!'))
