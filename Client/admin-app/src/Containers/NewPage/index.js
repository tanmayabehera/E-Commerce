import Layout from '../../Components/Layout';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';
import NewModal from '../../Components/Modals';
import Input from '../../Components/UI/Input';
import LinearCategories from '../../helpers/LinearCategories'
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';
/**
* @author
* @function NewPage
**/

const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [type, setType] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setCategories(LinearCategories(category.categories));

    }, [category])

    const onCategoryChange = (e) => {
        const category = categories.find(category => category._id == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
    }

    const submitPageForm =(e) =>{
        //e.target.preventDefault();

        

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        console.log(title, desc, categoryId, type, banners, products);

        dispatch(createPage(form));
        setTitle('');
        
        setCreateModal(false);
    }

    const renderCreatePageModal = () => {
        return (
            <NewModal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            <select
                                className="form-control"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Desc'}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {
                            banners.length > 0 ?
                                banners.map((banner, index) =>
                                    <Row key={index}>
                                        <Col>{banner.name}</Col>
                                    </Row>
                                ) : null
                        }
                        <Col>
                            <Input
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Row>
                        {
                            products.length > 0 ?
                                products.map((product, index) =>
                                    <Row key={index}> 
                                        <Col>{product.name}</Col>
                                    </Row>
                                ) : null
                        }
                        <Col>
                            <Input
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                                className="form-control"
                            />
                        </Col>
                    </Row>
                </Container>

            </NewModal>
        )
    }

    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create Page</button>
        </Layout>
    )

}

export default NewPage