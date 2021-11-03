# Generated by Django 2.2.24 on 2021-10-30 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aviasales_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Airport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=3)),
                ('airport', models.CharField(max_length=250)),
                ('city', models.CharField(max_length=250)),
            ],
        ),
        migrations.RenameField(
            model_name='city',
            old_name='iata_code',
            new_name='code',
        ),
    ]