import axiosInstance from "../helpers/axios"
import { userConstants } from "./constants"


export const signup = (user) =>{
    return async (dispath) => {
        console.log(user);


        dispath({ type: userConstants.USER_REGISTER_REQUEST })

        const res = await axiosInstance.post('/admin/signup',{
            ...user
        });

        if(res.status === 201){
            const { message } = res.data;
            dispath({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {
                    message
                }
            })
        }else{
            if(res.status === 400){
                dispath({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}