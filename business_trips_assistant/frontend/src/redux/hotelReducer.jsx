import {hotelsAPI} from "../api/api";

const SET_HOTEL = "HOTEL/SET-HOTEL";
const SET_DATA = "HOTEL/SET-DATA";

let initialState = {
    count: 0,
    hotels: [],
    hotelsDataSearch: {},
    pageSize: 0,
}

const HotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HOTEL:
            return {...state, hotels: [...action.items], count: action.count, pageSize: action.items.length};
        case SET_DATA:
            return {...state, hotelsDataSearch: {...action.items}};
        default:
            return state;
    }
}

export const setHotelsTC = (info) => async (dispatch) => {
    let data;
    if (info.option === 'booking')
        data = await hotelsAPI.getBooking(info.city, info.offset, info.checkIn, info.checkOut, info.conveniences);
    if (info.option === 'airbnb')
        data = await hotelsAPI.getAirbnb(info.city, info.offset, info.checkIn, info.checkOut, info.wifi, info.parking);
    if (data !== undefined) {
        dispatch(setHotels(data.count_hotels, data.hotels));
        dispatch(setHotelsDataSearch(info));
    }
}

const setHotels = (count, items) => ({type: SET_HOTEL, count, items});
const setHotelsDataSearch = (items) => ({type: SET_DATA, items});

export default HotelReducer;