import React from 'react'
import Input from '../../../Components/UI/Input';
import { Row, Col } from 'react-bootstrap';
import NewModal from '../../../Components/Modals';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../actions';


const AddCategoryModal = (props) => {
    const dispatch = useDispatch();

    const {
        show,
        handleCancel,
        categoryName,
        parentCategoryId,
        setCategoryName,
        setParentCategoryId,
        createCategoryList,
        handleCategoryImage,
        category,
        setShow,
        categoryImage,
        setCategoryImage
    } = props;

    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));

        setCategoryName('');
        setParentCategoryId('');
        setCategoryImage('');

        setShow(false);
    };


    return (
        <NewModal
            show={show}
            handleClose={handleClose}
            handleCancel={handleCancel}
            modalTitle={"Add Category"}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder="Enter Category Name"
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Col>
                <Col>
                    <select
                        class="form-control"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>Select Category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>

        </NewModal>
    );
};

export default AddCategoryModal;