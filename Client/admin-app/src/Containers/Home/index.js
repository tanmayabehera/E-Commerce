import React, { useEffect, useState } from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import Layout from '../../Components/Layout';
import { NavLink } from 'react-router-dom';
import './style.css';
import { useSelector } from "react-redux";

/**
* @author
* @function Home
**/

const Home = (props) => {

  const auth = useSelector((state) => state.auth)
  const [greeting, setGreeting] = useState('');

  const hour = new Date().getHours();
  useEffect(() => {
    if (hour < 12) {
      setGreeting("Good Morning");
    }
    else if (hour < 17) {
      setGreeting("Good Afternoon");
    }
    else {
      setGreeting("Good Evening");
    }
  }, [hour])


  return (
    <Layout sidebar >
      <Jumbotron style={{
        margin: '5rem', background: 'aliceblue', fontFamily: 'cursive',
        borderRadius: '35px'
      }} className="text-center">
        <h1>Hii {auth.user.firstName}, {greeting}!</h1>
      </Jumbotron>
    </Layout>
  )

}

export default Home