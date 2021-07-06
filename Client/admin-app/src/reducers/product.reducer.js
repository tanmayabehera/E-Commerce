import { productConstants } from "../actions/constants";


const initState = {
    products: [],
}


export default (state = initState, action) => {

    console.log(action);

    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
        // case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
        //     state = {
        //         ...state,
        //         loading: true
        //     }
        //     break;
        // case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
        //     const category = action.payload.category;
        //     const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
        //     console.log(updatedCategories);
        //     state = {
        //         ...state,
        //         categories: updatedCategories,
        //         loading: false
        //     }
        //     break;
        // case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
        //     state = {
        //         ...initState
        //     }
        //     break;
    }

    return state;
}