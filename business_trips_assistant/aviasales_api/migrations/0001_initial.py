# Generated by Django 3.2.9 on 2022-01-09 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Airport',
            fields=[
                ('code', models.CharField(max_length=3, primary_key=True, serialize=False)),
                ('airport', models.CharField(max_length=250, null=True)),
                ('city', models.CharField(max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('code', models.CharField(max_length=3, primary_key=True, serialize=False)),
                ('city', models.CharField(max_length=250)),
                ('time_zone', models.CharField(max_length=100)),
            ],
        ),
    ]
