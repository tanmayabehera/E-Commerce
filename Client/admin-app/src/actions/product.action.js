import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";



// export const getAllCategory = () => {
//     return async dispatch => {
//         dispatch({
//             type: categoryConstants.GET_ALL_CATEGORIES_REQUEST
//         })
//         const res = await axiosInstance.get('category/getCategories');
//         console.log(res);
//         if(res.status === 200){

//             const { categoryList } = res.data;

//             dispatch({
//                 type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
//                 payload: { categoryList }
//             })
//         }else{
//             dispatch({
//                 type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
//                 payload: { error: res.data.error }
//             })
//         }
//     }
// }

export const addProduct = (form) => {
    return async dispatch => {
        // dispatch({
        //     type: categoryConstants.ADD_NEW_CATEGORY_REQUEST
        // })
        const res = await axiosInstance.post('product/create', form);
        if(res.status === 201){
            return true;
        }else{
            // dispatch({
            //     type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            //     payload: res.data.error
            // })
            console.log(res);
        }
    }
}