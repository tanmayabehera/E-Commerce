import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import Layout from '../../Components/Layout';
import { NavLink } from 'react-router-dom';
import './style.css'

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <Layout sidebar>
      Container
        {/*<Jumbotron style={{margin: '5rem', background: 'white'}} className="text-center">
            <h1>Welcome to Admin Dashboard</h1>
            <p1>This site is made by Tanmay for the purpose of learning MERN Stack.</p1>
  </Jumbotron>*/}
    </Layout>
   )

 }

export default Home