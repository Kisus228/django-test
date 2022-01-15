"""Модуль обрабатывает запросы с клиента, связанные с API Aviasales"""
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .handler import get_request, get_processed_response
from .models import City_for_avia, Airport


@api_view()
def get_air_ticket(request):
    """
    Метод находит информацию о самых дешёвых авиарейсах с заданными параметрами
    Args:
        request: Request содержит информацию о дате поездки, месте отправления и месте прибытия
    Returns: JSON файл с информацией о рейсах
    """
    name_city_departure = request.GET.get('cityFrom').upper()
    name_city_arrival = request.GET.get('cityTo').upper()
    name_airport_departure = request.GET.get('airportFrom')
    name_airport_arrival = request.GET.get('airportTo')
    depart_date = request.GET.get('dateDepart')
    response = get_request(name_city_departure, name_city_arrival, depart_date, name_airport_departure, name_airport_arrival)
    result = get_processed_response(response)
    return Response(result)


@api_view()
def get_city_by_prefix(request):
    """
    Метод находит города по переданному префиксу
    Args:
        request: Request содержит префикс города
    Returns: список городов начинающихся на prefix
    """
    prefix = request.GET.get('prefix').upper()
    cities = [{'city': c.city, 'cityCode': c.city_general.id}
              for c in City_for_avia.objects.filter(city__startswith=prefix) if c.city_general is not None]
    return Response(cities)


@api_view()
def get_airport_by_city(request):
    """
    Метод находит аэропорты в заданном городе
    Args:
        request: Request содержит IATA-код города
    Returns: список аэропортов в указанном городе
    """
    city_code = request.GET.get('cityCode')
    city_name = City_for_avia.objects.filter(city_general=city_code)[0].city
    airports = [{'airport': a.airport, 'airportCode': a.code} for a in Airport.objects.filter(city=city_name)]
    return Response(airports)