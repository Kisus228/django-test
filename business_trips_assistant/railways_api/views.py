from django.shortcuts import render
from .handler import get_trains
from django.http import HttpResponse
import json
from railways_api.models import Station, City

# Create your views here.
def get_path_to_city(request):
    # city_to = request.GET['cityTo']
    # city_from = request.GET['cityFrom']
    # station_to = request.GET['stationTo']
    # station_from = request.GET['stationFrom']
    # date = request.GET['date']
    city_to = 'НИЖНИЙ ТАГИЛ'
    city_from = 'ЕКАТЕРИНБУРГ'
    station_to = 'null'
    station_from ='Екатеринбург-Пассажирский'
    code_station_to = 0
    code_station_from = 2030000
    date = '18.10.2021'
    answer = get_trains(city_to=city_to, city_from=city_from, date=date, station_from=station_from,
                        station_to=station_to, code_station_to=code_station_to, code_station_from=code_station_from)
    answer_json = json.dumps(answer, ensure_ascii=False).encode('utf-8')
    return HttpResponse(answer_json, content_type='application/json', charset='utf-8')


def get_city_by_prefix(request):
    # prefix = request.GET['prefix']
    prefix = 'Ека'.upper()
    cities = City.objects.filter(city__startswith=prefix)
    stations_to_json = [{'city': e.city, 'cityCode': e.id} for e in cities]
    answer_json = json.dumps(stations_to_json, ensure_ascii=False).encode('utf-8')
    return HttpResponse(answer_json, content_type='application/json', charset='utf-8')


def get_station_by_city(request):
    # city = request.GET['city'].upper()
    # code = int(request.GET['code'])
    city = "ЕКАТЕРИНБУРГ"
    code = 0
    if code == 0:
        code = [city.id for city in City.objects.filter(city=city)].pop()
    stations = [{"station": station.station, "code": station.code} for station in Station.objects.filter(city=code)]
    answer_json = json.dumps(stations, ensure_ascii=False).encode('utf-8')
    return HttpResponse(answer_json, content_type='application/json', charset='utf-8')