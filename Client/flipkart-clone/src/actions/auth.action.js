import axiosInstance from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) => {
    return async (dispath) => {

        dispath({ type: authConstants.LOGIN_REQUEST })

        const res = await axiosInstance.post('/signin', {
            ...user
        });

        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispath({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            if (res.status === 400) {
                dispath({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}


export const isUserLoggedIn = () => {
    return async dispath => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispath({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            dispath({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            })
        }
    }
}

export const signout = () => {
    return async dispath => {

        dispath({
            type: authConstants.LOGOUT_REQUEST
        })

        const res = await axiosInstance.post('/signout');

        if (res.status === 200) {
            localStorage.clear();
            dispath({
                type: authConstants.LOGOUT_SUCCESS
            })
        } else {
            dispath({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            })
        }

    }
}