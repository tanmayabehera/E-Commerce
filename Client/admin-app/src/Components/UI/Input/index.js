import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
/**
* @author
* @function Input
**/

const Input = (props) => {
    return (
        <Form.Group >
            {props.label && <Form.Label>{props.label}</Form.Label>}
            <Form.Control className={props.className} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
            <Form.Text className="text-muted">
                {props.instructionMessage}
            </Form.Text>
        </Form.Group>
    )

}

export default Input