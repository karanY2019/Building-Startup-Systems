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


var firebaseConfig = {
  apiKey: "AIzaSyANXg6kpBF53hSn-2smRbxdXT-JXztdN6s",
  authDomain: "coshop-cs5356.firebaseapp.com",
  projectId: "coshop-cs5356",
  storageBucket: "coshop-cs5356.appspot.com",
  messagingSenderId: "852483800520",
  appId: "1:852483800520:web:5aaed6423d886d21e814fd",
  measurementId: "G-8DPCYD26VD"
};

firebase.initializeApp(firebaseConfig);

class SignedInComponent extends React.Component {
  state = {
		data: null,
		newPostMessage: null
	}

	async refreshFeed() {
		const token = await firebase.auth().currentUser?.getIdToken()
		try {
       const response  = await fetch('http://localhost:4000/dev/feed', {
			 headers: {
			 	'Authorization': token
			 },
		});
    if (response.status === 401) {
       console.log('unauthorized')
    } else {
      const data = await response.json()
      this.setState({ data })
      
    }
  } catch (err) {
    console.error(err);
  }
		
	} 

	componentDidMount() {
		this.refreshFeed();
	}

	// onNewChatroomNameUpdated(event) {
	// 	this.setState({newChatroomName: event.target.value})
	// }

	async submit() {
		const token = await firebase.auth().currentUser?.getIdToken()

		// Make a POST request to your new API
    try {
		const response = await fetch('http://localhost:4000/dev/feedUpload', {
			method: 'POST',
			headers: {
				'Authorization': token
			},
			body: JSON.stringify({
				message: this.state.newPostMessage
			})
		});
    if (response.status === 401) {
      console.log('unauthorized')
   } else {
     this.refreshFeed();
     // this.setState({ chatrooms: results.Items })
   }
  }catch (err) {
   console.error(err);
 }
}


	render() {
			return (
				<div>
					<div className="title">My Feed</div>
					<ul>
	
             {/* {this.state.chatrooms && this.state.chatrooms.map(chatroom => { */}
							{/* return <li>Chat ID: {chatroom.chatId}</li> */}
            {this.state.data && this.state.data.Items.map((item,index) => {
						 	return (
               <li key={index}>
                 
                 {item.postId} on {item.timestamp}
               </li>  
              )
						})}
					</ul>
					<div>
						<div className="title">Create a post</div>

						{/* Use an input field with an onChange handler */}
						<input type="text" onChange={(event) => this.setState({newPostMessage: event.target.value})}></input>

						{/* Use a button with an onClick handler to create */}
						<button onClick={() => this.submit()}>Create</button>
					</div>
				</div>
			)
	}
}


class Collabrators extends React.Component {
  state = {
    orders: null
  }
  
  async componentDidMount() {
    
    const idToken = await firebase.auth().currentUser?.getIdToken()  
    //this.setState({data: idToken})
    const backend='https://0885t1ok71.execute-api.us-east-2.amazonaws.com/dev/collabrators'
    const local= 'http://localhost:4000/dev/collabrators'

    const response = await fetch(local, {
      headers: {
        'Authorization': idToken
      }
    })
    if (response.status === 401) {
      return console.log('unauthorized')
    }
    const collabrators = await response.json()
    // save it to your components state so you can use it during render
    this.setState({collabrators: collabrators})
    console.log(collabrators)
  }
  
  render() {
    return ( 
    <div>
    {console.log("PLEASE", this.state.collabrators)}
    <div className="title">My Collabrators </div>  
      <ul>      
      {        
        this.state.collabrators && this.state.collabrators.map((collabrators,index) =>  {
          return (
            <li key={index}>
              <div>
                <p class = "title is-4">collabrators Name: {collabrators.name}</p>
                <p class = "subtitle is-6">collabrators location: {collabrators.loc}</p>
              </div>
            </li>
          )
        })       
      }      
    </ul>
  </div>
    )  
  }  
}
 
class SignInScreen extends React.Component {
 
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };
  
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
       (user) => this.setState({isSignedIn: !!user})
    );
   
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>CoShop</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>CoShop</h1>
        <div class="align-login-item-centre">
        <Card className="mb-3" style={{color: "#000", width: '30rem'}}>
          <Card.Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK4aQGQczM3a39lujDohb4FjYXLKTexZU1MQ&usqp=CAU/160/50"/>
          <Card.Body>
            {/* <Card.Title> 
              CoShop
            </Card.Title>*/}
            <Card.Text>
            Collaborative Shopping
            </Card.Text>
          </Card.Body>
        </Card>

        <Breadcrumb>
          <Breadcrumb.Item>About</Breadcrumb.Item>
          <Breadcrumb.Item>Stores</Breadcrumb.Item>
          <Breadcrumb.Item>Location</Breadcrumb.Item>
          <Breadcrumb.Item active>Test</Breadcrumb.Item>
        </Breadcrumb>
        <Container>
        <p>Welcome ! You are now signed-in!</p>

        {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p> */}
        {/* <p> E-mail: {firebase.auth().currentUser.email}   </p> */}

        {/* <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
        {/* Fetch data from API */}
      
        {/* <button className="fetch-button" onClick={Collabrators }>Fetch Data</button> */}
        
        <SignedInComponent /> 
        <Collabrators /> 
        <Button variant="primary" block onClick={() => firebase.auth().signOut()}>Sign-out</Button> 
        </Container>
     </div>
  
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <SignInScreen />
      </header>
    </div>
  );
}

export default App;

/*function App() {
  return (
  <Router history={history}>
  <Navigation />
  </Router>
  );
  }*/


