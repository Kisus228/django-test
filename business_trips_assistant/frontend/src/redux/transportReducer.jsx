import {transportAPI} from "../api/api";

const SET_TRANSPORT = "TRANSPORT/SET-TRANSPORT";
const SET_DATA = "TRANSPORT/SET-DATA";
const SET_STATIONS_FROM = "TRANSPORT/SET-STATIONS-FROM";
const SET_STATIONS_TO = "TRANSPORT/SET-STATIONS-TO";
const SET_CITY_FROM = "TRANSPORT/SET-CITY-FROM";
const SET_CITY_TO = "TRANSPORT/SET-CITY-TO";
const DELETE_STATIONS = "TRANSPORT/DELETE-STATIONS";
const DELETE_CITY = "TRANSPORT/DELETE-CITY";
const INITIALIZED_SUCCESS = "TRANSPORT/INITIALIZED-SUCCESS";
const UNINITIALIZED_SUCCESS = "TRANSPORT/UNINITIALIZED-SUCCESS";

let initialState = {
    initialized: false,
    transport: [],
    transportDataSearch: {},
    stationsFrom: [],
    stationsTo: [],
    codeCityFrom: '',
    codeCityTo: '',
}

const TransportReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRANSPORT:
            return {...state, transport: [...action.items]};
        case SET_DATA:
            return {...state, transportDataSearch: {...action.items}};
        case SET_STATIONS_FROM:
            return {...state, stationsFrom: [...state.stationsFrom, ...action.items]};
        case SET_STATIONS_TO:
            return {...state, stationsTo: [...state.stationsTo, ...action.items]};
        case SET_CITY_FROM:
            return {...state, codeCityFrom: action.item};
        case SET_CITY_TO:
            return {...state, codeCityTo: action.item};
        case DELETE_STATIONS:
            return {...state, stationsFrom: [], stationsTo: []};
        case DELETE_CITY:
            return {...state, codeCityFrom: '', codeCityTo: ''};
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        case UNINITIALIZED_SUCCESS:
            return {...state, initialized: false, transport: []}
        default:
            return state;
    }
}

export const setTransportTC = (info) => async (dispatch) => {
    const data = [];
    console.log(info.stationT)
    console.log(info.stationF)
    for (const option of info.type) {
        let a = !!info.stationT ? info.stationT?.type : info.stationF?.type;
        console.log(a)
        if (!!a) {
            if (a === 1)
                data.push(await transportAPI.getRZD(info.cityT, info.cityF, info.stationT.value, info.stationF.value,
                    info.stationT.code, info.stationF.code, info.date));
            else
                data.push(await transportAPI.getAviasales(info.cityT, info.cityF, info.stationT.value, info.stationF.value,
                    info.date).then(res => res.data));
        } else {
            if (option.value === 1)
                data.push(await transportAPI.getRZD(info.cityT, info.cityF, info.stationT.value, info.stationF.value,
                    info.stationT.code, info.stationF.code, info.date));
            else
                data.push(await transportAPI.getAviasales(info.cityT, info.cityF, info.stationT.value, info.stationF.value,
                    info.date).then(res => res.data));
        }
    }
    if (data.length !== 0) {
        dispatch(setTransport(data.flat()));
        dispatch(setTransportDataSearch(info));
    }
}

export const initializeTransport = (cityFrom, cityTo, options) => (dispatch) => {
    const isDoneSetFrom = [];
    const isDoneSetTo = [];
    for (const option of options) {
        isDoneSetFrom.push(option.value === 1
            ? dispatch(setStationsTC(cityFrom, true))
            : dispatch(setAirportsTC(cityFrom, true)));
        isDoneSetTo.push(option.value === 1
            ? dispatch(setStationsTC(cityTo, false))
            : dispatch(setAirportsTC(cityTo, false)));
    }
    Promise.all(isDoneSetFrom.concat(isDoneSetTo)).then(() => dispatch(initializedSuccess()));
}

const setStationsTC = (city, from) => async (dispatch) => {
    const data = await transportAPI.getCodeCityRZD(city)
    if (data !== undefined) {
        dispatch(setCodeCity(from ? SET_CITY_FROM : SET_CITY_TO, data[0].cityCode));
        await transportAPI.getStationsRZD(data[0].cityCode)
            .then(response => {
                dispatch(setStations(from ? SET_STATIONS_FROM : SET_STATIONS_TO, response
                    .map(i => ({station: i.station, code: i.code, type: 1}))));
            })
    }
}

const setAirportsTC = (city, from) => async (dispatch) => {
    const data = await transportAPI.getCodeCityAviasales(city)
    if (data !== undefined) {
        dispatch(setCodeCity(from ? SET_CITY_FROM : SET_CITY_TO, data.split(',')[0])); //todo: VsALT переделать, когда кирилл исправит
        await transportAPI.getStationsAviasales(data.split(',')[0])
            .then(response => {
                dispatch(setStations(from ? SET_STATIONS_FROM : SET_STATIONS_TO, response.split(',')
                    .map(i => ({station: i, code: i, type: 0}))));
            })
    }
}

export const uninitializedDataSuccess = () => async (dispatch) => {
    dispatch(deleteStations());
    dispatch(deleteCodeCity());
}

const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
export const uninitializedTransportSuccess = () => ({type: UNINITIALIZED_SUCCESS});
const setTransport = (items) => ({type: SET_TRANSPORT, items});
const setTransportDataSearch = (items) => ({type: SET_DATA, items});
const setStations = (type, items) => ({type: type, items});
const setCodeCity = (type, item) => ({type: type, item});
const deleteStations = () => ({type: DELETE_STATIONS});
const deleteCodeCity = () => ({type: DELETE_CITY});

export default TransportReducer;