# Generated by Django 3.2.6 on 2021-12-24 14:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('giftSpace', '0002_tracking'),
    ]

    operations = [
        migrations.AddField(
            model_name='tracking',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='userTracking', to='auth.user'),
            preserve_default=False,
        ),
    ]
