import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: [],
    },
    pageRequest: false,
    page: {},
    error: null
}

export default (state = initState, action) => {

    console.log(action);

    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                pageRequest: true
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                pageRequest: false
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                pageRequest: false
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                productDetails: action.payload.productDetails,
                loading: false
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }

    return state;
}