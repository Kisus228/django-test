# Generated by Django 3.2.9 on 2022-01-15 07:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('aviasales_api', '0002_rename_city_city_city_avia'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='City',
            new_name='City_for_avia',
        ),
        migrations.RenameField(
            model_name='city_for_avia',
            old_name='city_avia',
            new_name='city',
        ),
    ]
