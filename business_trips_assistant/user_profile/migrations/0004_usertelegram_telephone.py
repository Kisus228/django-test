# Generated by Django 3.2.7 on 2021-11-14 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0003_usertelegram'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertelegram',
            name='telephone',
            field=models.CharField(default=70000000000, max_length=11),
            preserve_default=False,
        ),
    ]
