import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Alert, Breadcrumb, Card, Container, Form, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import Navigation from './Component/Navigation';
import { Router } from 'react-router-dom';
import history from './Services/history';


function App() {
  return (
  <Router history={history}>
  <Navigation />
  </Router>
  );
  }

export default App;


/*function App2() {
  return (
    <div className="App">
      <header className="App=Header">
        <Container>
        <Form>
            <Row>
              <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="xxx@email.com"/>
              </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
              </Col>
            </Row>
        <Button variant='info'>Sign in</Button>
        </Form>
        
        <Card className="mb-3" style={{color: "#000", width: '60rem'}}>
          <Card.Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK4aQGQczM3a39lujDohb4FjYXLKTexZU1MQ&usqp=CAU/160/50"/>
          <Card.Body>
            <Card.Title>
              CoShop
            </Card.Title>
            <Card.Text>
            Collaborative Shopping
            </Card.Text>
          </Card.Body>
        </Card>
        <Breadcrumb>
          <Breadcrumb.Item>Stores</Breadcrumb.Item>
          <Breadcrumb.Item>Location</Breadcrumb.Item>
          <Breadcrumb.Item active>Test</Breadcrumb.Item>
        </Breadcrumb>

        


        </Container>
      </header>
    </div>
  );
}*/

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">CoShop</h1>

        <p className="subtitle">
          Collaborative Shopping{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
            Flexbox
          </a>
        </p>

        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="Input" />
          </div>
        </div>

        <div className="field">
          <p className="control">
            <span className="select">
              <select>
                <option>Select dropdown</option>
              </select>
            </span>
          </p>
        </div>

        <div className="buttons">
          <a className="button is-primary">Signin</a>
          <a className="button is-link"></a>
        </div>
      </div>
    );
  }
} */

