# Generated by Django 3.2.9 on 2022-01-15 07:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('aviasales_api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='city',
            old_name='city',
            new_name='city_avia',
        ),
    ]