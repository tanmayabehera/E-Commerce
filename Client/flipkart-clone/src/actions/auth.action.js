import axiosInstance from "../helpers/axios"
import { authConstants, cartConstants } from "./constants"

export const signup = (user) => {
    return async (dispatch) => {
      let res;
      try {
        dispatch({ type: authConstants.SIGNUP_REQUEST });
        res = await axiosInstance.post(`/signup`, user);
        if (res.status === 201) {
          dispatch({ type: authConstants.SIGNUP_SUCCESS });
          const { token, user } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              token,
              user,
            },
          });
        } else {
          const { error } = res.data;
          dispatch({ type: authConstants.SIGNUP_FAILURE, payload: { error } });
        }
      } catch (error) {
        const { data } = error.response;
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: { error: data.error },
        });
      }
    };
  };


export const login = (user) => {
    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST })

        const res = await axiosInstance.post('/signin', {
            ...user
        });

        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
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
    return async (dispatch) => {
      dispatch({ type: authConstants.LOGOUT_REQUEST });
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
      dispatch({ type: cartConstants.RESET_CART });
    };
  };