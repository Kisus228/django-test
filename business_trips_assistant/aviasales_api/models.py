from django.db import models


class City(models.Model):
    objects = models.Manager()

    code = models.CharField(max_length=3, primary_key=True)
    city = models.CharField(max_length=250)


class Airport(models.Model):
    objects = models.Manager()

    code = models.CharField(max_length=3, primary_key=True)
    airport = models.CharField(max_length=250)
    city = models.CharField(max_length=250)