import Cookies from 'js-cookie';

export const authAPI = {
    async postAuthLogin(data) {
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(`/account/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async deleteAuthLogin() {
        return await fetch(`/account/logout/`)
            .then(response => response.text())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getAuthMe() {
        return await fetch('/account/user/')
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getCsrf() {
        return await fetch('/account/get_csrf/')
            .then(response => response.text())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async postAuthRegister(data) {
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(`/account/registration/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async postTelegram(data) {
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(`/account/add_tg_user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
}

export const businessTripsAPI = {
    async getBusinessTrips(userId) {
        return await fetch(`/account/all_business_trip?userId=${userId}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getBusinessTripInfo(idBT) {
        return await fetch(`/account/info_business_trip?idBT=${idBT}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async postBusinessTrips(bt) {
        const url = '/account/create_business_trip/';
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(bt),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async putBusinessTrips(idBT, bt) {
        const url = '/account/update_business_trip/';
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({idBT, bt}),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async deleteBusinessTrips(idBT) {
        const url = '/account/delete_business_trip/';
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({idBT}),
        }).then(response => response.text())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async postHotelInfo(info) {
        const url = '/account/create_hotel/';
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(info),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async putHotelInfo(info) {
        const url = '/account/update_hotel/';
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(info),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async postTransportInfo(info) {
        const url = '/account/create_trip/';
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(info),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async putTransportInfo(info) {
        const url = '/account/update_trip/';
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(info),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
}

export const hotelsAPI = {
    async getBooking(city, offset, checkIn, checkOut, conveniences) {
        const url = `/hotel/hotels_booking?city=${city}&offset=${offset}&check_in=${checkIn}` +
        `&check_out=${checkOut}` + (conveniences.length !== 0 ? `&conveniences=${conveniences.join('%3B')}` : '');
        return await fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getAirbnb(city, offset, checkIn, checkOut, wifi, parking) {
        const url = `/hotel/hotels_airbnb?city=${city}&offset=${offset}&check_in=${checkIn}&check_out=${checkOut}`
            + (wifi ? '&wifi=1' : '') + (parking ? 'parking=1' : '');
        return await fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
}

export const transportAPI = {
    async getRZD(cityT, cityF, stationT, stationF, date) {
        const url = `/railways/list_trains?cityTo=${cityT}&cityFrom=${cityF}&date=${date}` +
            (stationT === '' || stationT === undefined ? '' : `&stationTo=${stationT}`) +
            (stationF === '' || stationF === undefined ? '' : `&stationFrom=${stationF}`);
        return await fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getCodeCityRZD(city) {
        const url = `/railways/cities_list?prefix=${city}`
        return await fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getStationsRZD(code) {
        const url = `/railways/stations_list?code=${code}`
        return await fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getAviasales(cityT, cityF, stationT, stationF, date) {
        const url = `/aviasales/ticket_avia?cityTo=${cityT}&cityFrom=${cityF}&dateDepart=${date}` +
            (stationT === '' || stationT === undefined ? '' : `&airportTo=${stationT}`) +
            (stationF === '' || stationF === undefined ? '' : `&airportFrom=${stationF}`);
        return await fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getCodeCityAviasales(city) {
        const url = `/aviasales/cities_list?prefix=${city}`
        return await fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getStationsAviasales(code) {
        const url = `/aviasales/airports_list?cityName=${code}`
        return await fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
}

export const expensesAPI = {
    async getExpenses(idBT) {
        const url = `/account/get_list_expenses?idBT=${idBT}`;
        return await fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
}
