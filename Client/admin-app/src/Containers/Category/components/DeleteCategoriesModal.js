import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteCategories, getAllCategory } from '../../../actions';
import NewModal from '../../../Components/Modals';


    const DeleteCategoriesModal = (props) => {
        const dispatch = useDispatch();


        const {
            deleteCategoryModal,
            setDeleteCategoryModal,
            expandedArray,
            checkedArray
        } = props;

        

        const deleteConfirmedCategories = () => {
            const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}));
            // const expandedIdsArray = expandedArray.map((item, index) => ({_id: item.value}));
            // const idsArray = expandedIdsArray.concat(checkedIdsArray);
            if(checkedIdsArray.length > 0){
                dispatch(deleteCategories(checkedIdsArray));
            }        
            setDeleteCategoryModal(false)
        };

        return (
            <NewModal
                show={deleteCategoryModal}
                handleClose={deleteConfirmedCategories}
                handleCancel={() => setDeleteCategoryModal(false)}
                modalTitle={"Confirm"}
                buttons={[
                    {
                        label: "No",
                        color: "primary",
                        onClick: () => {
                            setDeleteCategoryModal(false);
                        }
                    },
                    {   
                        label: "Yes",
                        color: "danger",
                        onClick: () => {deleteConfirmedCategories()}
                    }
                ]}
            >
                <h5>Expanded</h5>
                {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
                <h5>Checked</h5>
                {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
            </NewModal>
        );
    };

    export default DeleteCategoriesModal;