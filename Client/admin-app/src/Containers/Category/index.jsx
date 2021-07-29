import React, { useState } from 'react'
import Layout from '../../Components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxTree from 'react-checkbox-tree';
import { IoIosCheckboxOutline, IoIosCheckbox, IoMdArrowForward, IoMdArrowDown, IoIosAdd, IoIosTrash, IoIosCloudUpload } from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import DeleteCategoriesModal from './components/DeleteCategoriesModal';
import './style.css';
/**
* @author
* @function Category
**/

const Category = (props) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const category = useSelector(state => state.category);


    const handleShow = () => setShow(true);

    const handleCancel = () => setShow(false);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id,
                 name: category.name,
                  parentId: category.parentId,
                  type: category.type
                 });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    };

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        updateCheckedAndExpandedCategories();

    };

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    };

    const deleteCategoryModalShow = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd /><span>Add</span></button>
                                <button onClick={deleteCategoryModalShow}><IoIosTrash /><span>Delete</span></button>
                                <button onClick={updateCategory}><IoIosCloudUpload /><span>Update</span></button>
                            </div>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoMdArrowForward />,
                                expandOpen: <IoMdArrowDown />
                            }}
                        >
                        </CheckboxTree>
                    </Col>
                </Row>
            </Container>
            <AddCategoryModal
                show={show}
                handleCancel={handleCancel}
                categoryName={categoryName}
                parentCategoryId={parentCategoryId}
                setCategoryName={setCategoryName}
                setParentCategoryId={setParentCategoryId}
                createCategoryList={createCategoryList}
                handleCategoryImage={handleCategoryImage}
                category={category}
                setShow={setShow}
                categoryImage={categoryImage}
                setCategoryImage={setCategoryImage}
            />
            <UpdateCategoriesModal
                updateCategoryModal={updateCategoryModal}
                handleCancel={handleCancel}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                createCategoryList={createCategoryList}
                handleCategoryImage={handleCategoryImage}
                category={category}
                setUpdateCategoryModal={setUpdateCategoryModal}
            />
            <DeleteCategoriesModal
                deleteCategoryModal={deleteCategoryModal}
                setDeleteCategoryModal={setDeleteCategoryModal}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
            />
        </Layout>
    )
}

export default Category