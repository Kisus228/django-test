"""Модуль для работы с API Aviasales"""
import requests
import arrow
from .models import City, Airport


def get_code_city(name_city):
    """
    Метод возвращает код города по его названию
    Args:
        name_city: содержит название города на русском языке
    Returns: код города в формате IATA
    """
    return None if not City.objects.filter(city=name_city.upper()).exists()\
        else City.objects.get(city=name_city.upper()).code


def get_code_airport(name_airport):
    """
    Метод возвращает код аэропорта по его названию
    Args:
        name_airport: содержит название аэропорта на русском языке
    Returns: код аэропорта в формате IATA
    """
    return None if not Airport.objects.filter(airport=name_airport.upper()).exists()\
        else Airport.objects.get(airport=name_airport.upper()).code


def get_request(name_city_departure, name_city_arrival, depart_date, name_airport_departure, name_airport_arrival,
                is_direct="true"):
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
    departure_point_code = get_code_airport(
        name_airport_departure) if name_airport_departure is not None else get_code_city(name_city_departure)
    arrival_point_code = get_code_airport(name_airport_arrival) if name_airport_arrival is not None else get_code_city(
        name_city_arrival)

    if departure_point_code is None or arrival_point_code is None:
        return []

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


def get_processed_response(response):
    if not response:
        return []

    response = response.json()

    if not response['success'] or response['data'] == []:
        return []

    processed_response = []
    for flight_data in response['data']:
        tz0 = City.objects.get(code=flight_data['origin']).time_zone
        tz1 = City.objects.get(code=flight_data['destination']).time_zone
        dt0_local = arrow.get(flight_data['departure_at'], tzinfo=tz0)
        dt1_local = dt0_local.shift(minutes=flight_data['duration']).to(tz1)
        delta_tz0 = int(arrow.get(dt0_local.strftime('%z'), '+HHmm').format('HH')) - 3
        delta_tz1 = int(arrow.get(dt1_local.strftime('%z'), '+HHmm').format('HH')) - 3

        flight = {}

        flight['type'] = 0
        flight['fromCode'] = flight_data['origin']
        flight['link'] = 'https://www.aviasales.ru' + flight_data['link']
        flight['localDate0'] = dt0_local.format('DD.MM.YYYY')
        flight['localDate1'] = dt1_local.format('DD.MM.YYYY')
        flight['localTime0'] = dt0_local.format('H:mm')
        flight['localTime1'] = dt1_local.format('H:mm')
        flight['number'] = flight_data['airline'] + '-' + flight_data['flight_number']
        flight['station0'] = Airport.objects.get(code=flight_data['origin_airport']).airport
        flight['station1'] = Airport.objects.get(code=flight_data['destination_airport']).airport
        flight['timeDeltaString0'] = 'МСК' + ('{:+d}'.format(delta_tz0) if delta_tz0 != 0 else '')
        flight['timeDeltaString1'] = 'МСК' + ('{:+d}'.format(delta_tz1) if delta_tz1 != 0 else '')
        flight['timeInWay'] = arrow.get(flight_data['duration'] * 60).format('H:mm')
        flight['whereCode'] = flight_data['destination']

        processed_response.append(flight)

    return processed_response
