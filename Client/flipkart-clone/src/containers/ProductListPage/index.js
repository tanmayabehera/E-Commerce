import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import Layout from '../../components/Layout';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';
import ProductStore from './ProductStore';
import ProductPage from './ProductPage';
import getParams from '../../utils/getParams';

/**
* @author
* @function ProductListPage
**/

const ProductListPage = (props) => {

    const renderProduct = () => {
        const params = getParams(props.location.search);
        console.log(params);
        let content = null;
        switch (params && params.type) {
            case 'store':
                content = <ProductStore {...props} />
                break;
            case 'page':
                content = <ProductPage {...props} />
                break;
            default:
                content = null;
        }
        return content;
    }


    return (
        <Layout>
            {renderProduct()}
        </Layout>
    )

}

export default ProductListPage