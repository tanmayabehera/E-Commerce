import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";



export const getProductsBySlug = (slug) => {
    return async dispatch => {
        // dispatch({
        //     type: categoryConstants.GET_ALL_CATEGORIES_REQUEST
        // })
        const res = await axiosInstance.get(`/products/${slug}`);
        if (res.status === 200) {

            // const { categoryList } = res.data;

            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            })
        } else {
            // dispatch({
            //     type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
            //     payload: { error: res.data.error }
            // })
        }
    }
};

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_REQUEST
            })
            const { cid, type } = payload.params;
            const res = await axiosInstance.get(`/page/${cid}/${type}`);
            if (res.status === 200) {

                const { page } = res.data;

                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                })
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
};