import {authAPI} from "../api/api";
import Cookies from "js-cookie";
import {setBusinessTrips} from "./businessTripsReducer";

const SET_USER_DATA = "AUTH/SET_USER_DATA";

let initialState = {
    id: null,
    email: null,
    username: null,
    isAuth: false,
    isFetching: false,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: action.isAuth};
        default:
            return state;
    }
}

const setUserId = (data, isAuth) => ({type: SET_USER_DATA, data, isAuth});

export const getAuthMeTC = () => async (dispatch) => {
    const data = await authAPI.getAuthMe()
    if (data !== undefined && data.detail !== 'Authentication credentials were not provided.') {
        dispatch(setUserId(data.data, true));
        const newDataCsrf = await authAPI.getCsrf();
        if (newDataCsrf !== undefined) {
            dispatch(() => Cookies.set('csrftoken', newDataCsrf));
        }
    } else alert('Не удаётся связаться с сервером.');
}

export const postAuthLoginTC = (info) => async (dispatch) => {
    const dataCsrf = await authAPI.getCsrf();
    if (dataCsrf !== undefined) {
        dispatch(() => Cookies.set('csrftoken', dataCsrf));
        return await authAPI.postAuthLogin(info)
    }
}

export const postAuthRegisterTC = (info) => async (dispatch) => {
    const dataCsrf = await authAPI.getCsrf();
    if (dataCsrf !== undefined) {
        dispatch(() => Cookies.set('csrftoken', dataCsrf));
        return await authAPI.postAuthRegister(info)
    }
}

export const deleteAuthLoginTC = () => async (dispatch) => {
    await authAPI.deleteAuthLogin();
    dispatch(setUserId({id: null, email: null, username: null}, false));
    dispatch(setBusinessTrips([]))
}

export const postTelegramTC = (info) => async (dispatch) => {
    const dataCsrf = await authAPI.getCsrf();
    if (dataCsrf !== undefined) {
        dispatch(() => Cookies.set('csrftoken', dataCsrf));
        return await authAPI.postTelegram(info);
    }
}

export default AuthReducer;