
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
/**
* @author
* @function Modal
**/

const NewModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>

            {
                props.buttons ? <Modal.Footer> {props.buttons.map((btn, index) =>
                    <Button key={index} variant={btn.color} onClick={btn.onClick}>
                        {btn.label}
                    </Button>)}
                </Modal.Footer>
                    :
                    <Modal.Footer>
                        <Button className="btn-sm" variant="primary" onClick={props.handleClose}>
                            Save
                        </Button>
                        <Button variant="secondary" className="btn-sm" onClick={props.handleCancel}>
                            Cancel
                        </Button>
                    </Modal.Footer>
            }


        </Modal>
    )

}

export default NewModal