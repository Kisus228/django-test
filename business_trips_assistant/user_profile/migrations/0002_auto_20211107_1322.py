# Generated by Django 3.2.7 on 2021-11-07 08:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hotel',
            old_name='adress',
            new_name='address',
        ),
        migrations.AddField(
            model_name='businesstrip',
            name='status',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Cheque',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('date_time', models.DateTimeField()),
                ('report', models.TextField()),
                ('business_trip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_profile.businesstrip')),
            ],
        ),
    ]