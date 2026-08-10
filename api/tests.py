from django.test import TestCase, Client
from django.urls import reverse
from api.models import User, Crop, Disease, WeatherRecord, MarketPrice, GovernmentScheme

class AgriGuardAPITestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.crop = Crop.objects.create(name='Tomato', category='Horticulture')
        self.disease = Disease.objects.create(
            crop=self.crop,
            name='Tomato Late Blight',
            symptoms='Dark lesions',
            causes='High humidity',
            organic_treatment='Bordeaux mixture 1%',
            chemical_treatment='Mancozeb 75 WP'
        )

    def test_analytics_api(self):
        response = self.client.get(reverse('analytics_summary'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('total_farmers', response.json())
        self.assertIn('ai_accuracy', response.json())

    def test_disease_detection_api(self):
        response = self.client.post(reverse('detect_disease'), {'crop_name': 'Tomato'})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data['success'])
        self.assertIn('disease_name', data['report'])

    def test_soil_health_api(self):
        response = self.client.post(reverse('soil_health'), {
            'nitrogen': 110,
            'phosphorus': 45,
            'potassium': 35,
            'ph': 6.8
        }, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('health_score', response.json())

    def test_weather_api(self):
        response = self.client.get(reverse('weather_info'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('temp_c', response.json())

    def test_chatbot_api(self):
        response = self.client.post(reverse('chatbot'), {
            'message': 'How to cure tomato disease?'
        }, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('reply', response.json())
