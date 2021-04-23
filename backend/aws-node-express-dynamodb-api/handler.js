'use strict';
const headers = { 'Access-Control-Allow-Origin': '*' }
const firebaseTokenVerifier = require('firebase-token-verifier')
const projectId = 'coshop-cs5356' 

module.exports.hello = async (event) => {
  if (event.path === '/whoami' && event.httpMethod === "GET" ){
    return {
      statusCode: 200,
      body: JSON.stringify({
        username: 'cl2634'
      })
    }
  }
  if (event.path === '/feed' && event.httpMethod === "GET" ){
    return {
      statusCode: 200,
      body: JSON.stringify(
        [{username: 'da335', message: 'building stuff is cool'}]
      )
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.feed = async (event) => {

  if (event.path === '/feed' && event.httpMethod === "GET" ){
    return {
      statusCode: 200,
      body: JSON.stringify(
        [{username: 'cl2634', message: 'building stuff is cool'}]
      )
    }
  }

};

module.exports.collabrators = async (event) => {

  if (event.path === '/collabrators' && event.httpMethod === "GET" ){
    
    const token = event.headers['Authorization']
    // If no token is provided, or it is "", return a 401
    if (!token) {
      return {
        statusCode: 401
      }
    }

    try {
      // validate the token from the request
      const decoded = await firebaseTokenVerifier.validate(token, projectId)
    } catch (err) {
      // the token was invalid,
      console.error('wrong token', err)
      return {
        statusCode: 401
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        [{name: 'Dan', loc: 'NYC', total: '$50',menuItems: [{ name: 'fried chicken', quantity: 2 }]},
        {name: 'Amy', loc: 'Boston', total: '$10',menuItems: [{ name: 'veg', quantity: 1 }]}]
      )
    }
  }

};
/*module.exports.hello = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    }
  }

  if (event.path === '/feed' && event.httpMethod === 'GET') {
      const token = event.headers['Authorization']
      if (!token) {
       return {
            statusCode: 401
               }
             }
      try {
        const decoded = await firebaseTokenVerifier.validate(token, projectId)
        // user is now confirmed to be authorized
        return {
          statusCode: 200,
          body: JSON.stringify([{
            name: 'da335',
            message: 'arent APIs great?',
             likes: 0
          }])
         }
       } catch (err) {
          console.error(err)
          return {
            statusCode: 401
          }
        }
        return {
          statusCode: 405,
        };
  };
}
  /*if (event.path === '/orders' && event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: 'order-id',
        status: 'in-progress',
        total: '$50',
        menuItems: [{ name: 'fried chicken', quantity: 2 }]
      },)
    }
  }*/
  
  /*if (event.path === '/invite' && event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        name: 'Amy',
        relation: 'Friend',
        id: "22JP9H",
        location: "NYC"
        },)
    }
  }

  if (event.path === '/whoami' && event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({username: 'ky393'})
    }
  } */   



/*

if (event.path === '/whoami' && event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({username: 'ky393'})
    }
  }  

const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get("/users/:userId", async function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

app.post("/users", async function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({ userId, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
*/
