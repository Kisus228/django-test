# Generated by Django 3.2.9 on 2022-01-15 07:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('railways_api', '0003_remove_station_prefix'),
        ('aviasales_api', '0003_auto_20220115_1236'),
    ]

    operations = [
        migrations.AddField(
            model_name='city_for_avia',
            name='city_general',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='railways_api.city'),
        ),
    ]
