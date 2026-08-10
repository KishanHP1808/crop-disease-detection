import threading
import logging
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import User

logger = logging.getLogger(__name__)

def _send_account_creation_email(user_id):
    """
    Sends detailed email notification to kishanhp18@gmail.com upon new user registration.
    Runs asynchronously in background thread to guarantee fast response times.
    """
    try:
        user = User.objects.filter(id=user_id).first()
        if not user:
            return

        target_email = getattr(settings, 'ADMIN_NOTIFICATION_EMAIL', 'kishanhp18@gmail.com')
        owner_email = getattr(settings, 'SYSTEM_OWNER_EMAIL', 'kishanhp18@gmail.com')

        subject = f"🔔 [AgriGuard AI] New Account Created: {user.username}"
        
        body = f"""
Hello System Owner,

A new user account has just been registered on the AgriGuard AI Smart Farming Platform.

====================================================
               NEW ACCOUNT REGISTRATION DETAILS
====================================================
Username    : {user.username}
Email       : {user.email or 'Not provided'}
Full Name   : {user.get_full_name() or user.username}
User Role   : {user.get_role_display()}
Phone       : {user.phone or 'Not provided'}
Location    : {user.location or 'Not specified'}
Joined Date : {user.date_joined.strftime('%Y-%m-%d %H:%M:%S UTC')}

====================================================
                  SYSTEM OWNERSHIP NOTICE
====================================================
Platform Owner : {owner_email}
Note           : Full administrative ownership and superuser controls 
                 remain strictly with {owner_email}.

-- 
AgriGuard AI Automated Notification System
"""
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'AgriGuard AI <kishanhp18@gmail.com>')
        
        # Send live email
        send_mail(
            subject=subject,
            message=body,
            from_email=from_email,
            recipient_list=[target_email],
            fail_silently=False
        )
        print(f"Account notification email sent successfully to {target_email} for user {user.username}")
    except Exception as e:
        print(f"Failed to send account creation email notification: {e}")

@receiver(post_save, sender=User)
def handle_user_post_save(sender, instance, created, **kwargs):
    owner_email = getattr(settings, 'SYSTEM_OWNER_EMAIL', 'kishanhp18@gmail.com')

    # Enforce sole system ownership for kishanhp18@gmail.com
    if instance.email and instance.email.lower().strip() == owner_email.lower():
        if not instance.is_superuser or not instance.is_staff or instance.role != 'ADMIN':
            User.objects.filter(id=instance.id).update(
                is_superuser=True,
                is_staff=True,
                role='ADMIN'
            )

    # Trigger email notification to kishanhp18@gmail.com when a new user account is created
    if created:
        thread = threading.Thread(target=_send_account_creation_email, args=(instance.id,))
        thread.daemon = True
        thread.start()
