import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Input from '../../../Components/UI/Input';
import NewModal from '../../../Components/Modals';
import { getAllCategory, updateCategories } from '../../../actions';
import { useDispatch } from 'react-redux';

const UpdateCategoriesModal = (props) => {
    const dispatch = useDispatch();

    const { 
        updateCategoryModal,
        handleCancel,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        createCategoryList,
        handleCategoryImage,
        category,
        setUpdateCategoryModal
    } = props;

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });

        dispatch(updateCategories(form));

        setUpdateCategoryModal(false);
    };

    return (
        <NewModal
            show={updateCategoryModal}
            handleClose={updateCategoriesForm}
            handleCancel={handleCancel}
            modalTitle={"Update Categories"}
            size="lg"
        >
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <Row>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder="Category Name"
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </Col>
                        <Col>
                            <select
                                class="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option>Select Category</option>
                                {
                                    createCategoryList(category.categories).map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select class="form-control" value={item.type}
                            onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}>
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            <h6>Checked Categories</h6>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <Row>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder="Category Name"
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Col>
                        <Col>
                            <select
                                class="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option>Select Category</option>
                                {
                                    createCategoryList(category.categories).map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select class="form-control"
                            value={item.type}
                            onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}>
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                        <Col>
                            <input type="file" class="form-control" name="categoryImage" onChange={handleCategoryImage} />
                        </Col>
                    </Row>
                )
            }
        </NewModal>
    );
};

export default UpdateCategoriesModal;