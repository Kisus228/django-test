from django.db import models
from railways_api.models import City


class City_for_avia(models.Model):
    """Таблица с названиями городов, расположенных в РФ, и их IATA-кодами"""
    code = models.CharField(max_length=3, primary_key=True)
    city_general = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    city = models.CharField(max_length=250)
    time_zone = models.CharField(max_length=100)


class Airport(models.Model):
    """
    Таблица с названиями аэропортов, расположенных в РФ, их IATA-кодами и названиями городов,
    в которых расположен аэропорт (*если имеется информация)
    """
    code = models.CharField(max_length=3, primary_key=True)
    airport = models.CharField(max_length=250, null=True)
    city = models.CharField(max_length=250, null=True)