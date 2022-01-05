"""Модуль для работы с API Aviasales"""
import requests
from .models import City, Airport


def get_code_city(name_city):
    """
    Метод возвращает код города по его названию
    Args:
        name_city: содержит название города на русском языке
    Returns: код города в формате IATA
    """
    city_inf = City.objects.get(city=name_city.upper())
    return city_inf.code


def get_code_airport(name_airport):
    """
    Метод возвращает код аэропорта по его названию
    Args:
        name_airport: содержит название аэропорта на русском языке
    Returns: код аэропорта в формате IATA
    """
    airport_inf = Airport.objects.get(airport=name_airport.upper())
    return airport_inf.code


def get_request(name_city_departure, name_city_arrival, depart_date, name_airport_departure, name_airport_arrival, is_direct="true"):
    """
    Метод отправляет запрос на API Aviasales и получает информацию
    о самых дешёвых билетах на рейс с указанными параметрами
    Args:
        name_city_departure: название города отправления на русском языке
        name_city_arrival: название города прибытия на русском языке
        depart_date: дата отправления в формате YYYY-MM-DD
        name_airport_departure: название аэропорта отправления на русском языке
        name_airport_arrival: название аэропорта прибытия на русском языке
        is_direct: поиск рейсов без пересадок
    Returns: JSON файл, содержащий информацию о рейсах
    """
    departure_point_code = get_code_airport(name_airport_departure) if name_airport_departure is not None else get_code_city(name_city_departure)
    arrival_point_code = get_code_airport(name_airport_arrival) if name_airport_arrival is not None else get_code_city(name_city_arrival)

    url = "https://api.travelpayouts.com/aviasales/v3/prices_for_dates"
    my_token = '80e3bc9df1061b7e7e683428c7df0b8a'
    headers = {'x-access-token': my_token}
    querystring = {"origin": departure_point_code,
                   "destination": arrival_point_code,
                   "departure_at": depart_date,
                   "currency": "rub",
                   "direct": is_direct,
                   "limit": "30",
                   "sorting": "price"}
    response = requests.request("GET", url, headers=headers, params=querystring)
    return response