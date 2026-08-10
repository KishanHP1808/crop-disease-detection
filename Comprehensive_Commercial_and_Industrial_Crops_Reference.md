# 🌿 Comprehensive Commercial, Fibre, Plantation & Industrial Crops of India

This reference document supplements **`Comprehensive_Crops_of_India_with_States.pdf`** with detailed agronomic data for 22 primary Commercial, Plantation, Fibre, and Industrial crops cultivated across Indian states.

---

## 📊 Commercial & Industrial Crop Reference Catalog

| Crop | Scientific Name | Major Growing States | Season | Soil & Climate | Main Uses |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cotton** | *Gossypium hirsutum* | Gujarat, Maharashtra, Telangana, Punjab, Haryana, Rajasthan, Karnataka | Kharif | Black cotton soil; warm climate | Textile industry, cottonseed oil |
| **Sugarcane** | *Saccharum officinarum* | Uttar Pradesh, Maharashtra, Karnataka, Tamil Nadu, Bihar, Punjab, Haryana | Year-round | Fertile loam; hot and humid | Sugar, jaggery, ethanol |
| **Jute** | *Corchorus capsularis*, *C. olitorius* | West Bengal, Assam, Bihar, Odisha, Meghalaya | Kharif | Alluvial soil; humid climate | Bags, ropes, mats |
| **Tobacco** | *Nicotiana tabacum* | Andhra Pradesh, Gujarat, Karnataka, Telangana, Uttar Pradesh, Bihar | Kharif | Sandy loam; warm climate | Cigarettes, cigars, chewing tobacco, nicotine extraction |
| **Tea** | *Camellia sinensis* | Assam, West Bengal, Tamil Nadu, Kerala | Perennial | Acidic soil; cool, humid climate | Beverage |
| **Coffee** | *Coffea arabica*, *C. canephora* | Karnataka, Kerala, Tamil Nadu | Perennial | Well-drained loam; moderate climate | Beverage |
| **Rubber** | *Hevea brasiliensis* | Kerala, Tamil Nadu, Karnataka, Tripura | Perennial | Laterite soil; hot and humid | Tyres, gloves, industrial rubber |
| **Coconut** | *Cocos nucifera* | Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, Odisha | Perennial | Sandy coastal soil | Oil, food, coir |
| **Arecanut (Betel Nut)** | *Areca catechu* | Karnataka, Kerala, Assam, Meghalaya, West Bengal | Perennial | Laterite soil; humid climate | Chewed with betel leaves, religious use |
| **Betel Vine (Paan)** | *Piper betle* | West Bengal, Odisha, Karnataka, Andhra Pradesh, Tamil Nadu, Bihar | Perennial | Fertile loam; warm and humid | Chewing leaves, medicinal use |
| **Cocoa** | *Theobroma cacao* | Andhra Pradesh, Karnataka, Kerala, Tamil Nadu | Perennial | Tropical climate | Chocolate, cocoa products |
| **Cashew** | *Anacardium occidentale* | Maharashtra, Goa, Kerala, Karnataka, Andhra Pradesh, Odisha, Tamil Nadu | Perennial | Sandy/laterite soil | Cashew nuts, cashew apple products |
| **Bamboo** | *Bambusa* spp. | Assam, Arunachal Pradesh, Mizoram, Tripura, Manipur, Nagaland, Karnataka, Kerala | Perennial | Tropical and subtropical | Construction, furniture, paper, handicrafts |
| **Banana Fibre** | *Musa* spp. | Tamil Nadu, Maharashtra, Gujarat, Kerala, Karnataka | Year-round | Fertile loam | Textiles, ropes, handicrafts |
| **Mulberry** | *Morus alba* | Karnataka, Andhra Pradesh, Tamil Nadu, Telangana, West Bengal | Perennial | Well-drained loam | Silkworm feed for silk production |
| **Guar (Cluster Bean)** | *Cyamopsis tetragonoloba* | Rajasthan, Haryana, Gujarat, Punjab | Kharif | Sandy soil; dry climate | Guar gum, food, cattle feed |
| **Industrial Hemp** | *Cannabis sativa* | Uttarakhand, Himachal Pradesh, parts of Jammu & Kashmir (where permitted) | Kharif | Well-drained soil; temperate climate | Fibre, textiles, ropes, industrial products |
| **Flax (Linseed)** | *Linum usitatissimum* | Madhya Pradesh, Chhattisgarh, Uttar Pradesh, Bihar, Maharashtra | Rabi | Loam soil; cool climate | Fibre (linen), linseed oil |
| **Oil Palm** | *Elaeis guineensis* | Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala, Mizoram | Perennial | Tropical, high rainfall | Edible palm oil |
| **Sisal** | *Agave sisalana* | Odisha, Andhra Pradesh, Karnataka, Tamil Nadu | Perennial | Dry, well-drained soil | Rope, twine, fibre |
| **Sun Hemp** | *Crotalaria juncea* | Uttar Pradesh, Madhya Pradesh, Maharashtra, Andhra Pradesh | Kharif | Loam soil | Fibre, green manure |
| **Mesta** | *Hibiscus cannabinus* / *H. sabdariffa* | Odisha, West Bengal, Assam, Andhra Pradesh | Kharif | Alluvial soil | Fibre industry |

---

## ⚙️ System Integration Status
- **Database Schema**: Updated `Crop` model in `api/models.py` with `season`, `soil_and_climate`, and `main_uses`.
- **Database Seeder**: Seeded into SQLite database (`python manage.py seed_data`).
- **AI Diagnostics**: AI vision engine (`api/ai_engine.py`) updated for automatic crop identification & disease diagnostics.
- **Frontend Dropdown**: `templates/index.html` updated with new commercial & fibre crop categories.
