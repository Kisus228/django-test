# Generated by Django 3.2.7 on 2021-11-20 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0005_alter_usertelegram_telephone'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hotel',
            old_name='date_departure',
            new_name='date_check_out',
        ),
        migrations.RemoveField(
            model_name='usertelegram',
            name='tag_telegram',
        ),
        migrations.AlterField(
            model_name='businesstrip',
            name='credit',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='address',
            field=models.CharField(blank=True, max_length=150),
        ),
    ]
