import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../Components/Layout';
import Input from '../../Components/UI/Input';
import { login} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
/**
* @author
* @function Signin
**/

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const dispath = useDispatch();




    const userLogin = (e) => {

            e.preventDefault();

            const user = {
                email, password
            }

            dispath(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={'/'} />
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: "50px" }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                label="Email address"
                                type="email"
                                placeholder="Enter email"
                                value= {email}
                                instructionMessage="We'll never share your email with anyone else."
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Password"
                                value= {password}
                                onChange = {(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )

}

export default Signin