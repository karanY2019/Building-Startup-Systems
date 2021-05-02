'use strict';
const headers = { 'Access-Control-Allow-Origin': '*' }
const firebaseTokenVerifier = require('firebase-token-verifier')
const projectId = 'coshop-cs5356' 

// Create DynamoDB document client
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

const checkUser = async (event) => {
  const token = event.headers['Authorization']
    if (!token) {
      throw new Error('Missing token')
    }
    const decodedUser = await firebaseTokenVerifier.validate(token, projectId)
    return decodedUser
}

module.exports.collabrators = async (event) => {
  // check first if its an OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
  return {
    statusCode: 200,
    //include CORS headers
    headers,    
  }
}

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
      //include CORS headers
      headers,
      body: JSON.stringify(
        [{name: 'Dan', loc: 'NYC', total: '$50',menuItems: [{ name: 'fried chicken', quantity: 2 }]},
        {name: 'Amy', loc: 'Boston', total: '$10',menuItems: [{ name: 'veg', quantity: 1 }]}]
      )
    }
  }
}

module.exports.feed = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': 'https://www.uscoshop.com' }
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      //include CORS headers
      headers, 
    }
  
  let user;
  try {
      user = await checkUser(event)
    } catch (err) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({message: err.message})
      }
    }

  if (event.path === '/feed' && event.httpMethod === "GET" ){
    const token = event.headers['Authorization']
    const items = await docClient.scan({
       TableName: "cs5356-social-media-feed",
       Limit: 10,
    }).promise()
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(items)
    }
  }



  if (event.path === '/whoami' && event.httpMethod === "GET" ){
    return {
      statusCode: 200,
      body: JSON.stringify({
        username: 'ky393'
      })
    }
  }
  
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: 'Go Serverless v1.0! Your function executed successfully!',
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };

  
};
}

// module.exports.feed = async (event) => {

//   if (event.path === '/feed' && event.httpMethod === "GET" ){
//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify(
//         [{username: 'cl2634', message: 'building stuff is cool'}]
//       )
//     }
//   }

// };

// /*const AWS = require("aws-sdk");
// const express = require("express");
// const serverless = require("serverless-http");

// const app = express();

// const USERS_TABLE = process.env.USERS_TABLE;
// const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

// app.use(express.json());

// app.get("/users/:userId", async function (req, res) {
//   const params = {
//     TableName: USERS_TABLE,
//     Key: {
//       userId: req.params.userId,
//     },
//   };

//   try {
//     const { Item } = await dynamoDbClient.get(params).promise();
//     if (Item) {
//       const { userId, name } = Item;
//       res.json({ userId, name });
//     } else {
//       res
//         .status(404)
//         .json({ error: 'Could not find user with provided "userId"' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not retreive user" });
//   }
// });

// app.post("/users", async function (req, res) {
//   const { userId, name } = req.body;
//   if (typeof userId !== "string") {
//     res.status(400).json({ error: '"userId" must be a string' });
//   } else if (typeof name !== "string") {
//     res.status(400).json({ error: '"name" must be a string' });
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };

//   try {
//     await dynamoDbClient.put(params).promise();
//     res.json({ userId, name });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not create user" });
//   }
// });

// app.use((req, res, next) => {
//   return res.status(404).json({
//     error: "Not Found",
//   });
// });


// module.exports.handler = serverless(app);


// /*module.exports.hello = async (event) => {
//   if (event.httpMethod === 'OPTIONS') {
//     return {
//       statusCode: 204,
//       headers
//     }
//   }

//   if (event.path === '/feed' && event.httpMethod === 'GET') {
//       const token = event.headers['Authorization']
//       if (!token) {
//        return {
//             statusCode: 401
//                }
//              }
//       try {
//         const decoded = await firebaseTokenVerifier.validate(token, projectId)
//         // user is now confirmed to be authorized
//         return {
//           statusCode: 200,
//           body: JSON.stringify([{
//             name: 'da335',
//             message: 'arent APIs great?',
//              likes: 0
//           }])
//          }
//        } catch (err) {
//           console.error(err)
//           return {
//             statusCode: 401
//           }
//         }
//         return {
//           statusCode: 405,
//         };
//   };
// }
//   /*if (event.path === '/orders' && event.httpMethod === 'GET') {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         id: 'order-id',
//         status: 'in-progress',
//         total: '$50',
//         menuItems: [{ name: 'fried chicken', quantity: 2 }]
//       },)
//     }
//   }*/
  
//   /*if (event.path === '/invite' && event.httpMethod === 'GET') {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         name: 'Amy',
//         relation: 'Friend',
//         id: "22JP9H",
//         location: "NYC"
//         },)
//     }
//   }

//   if (event.path === '/whoami' && event.httpMethod === 'GET') {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({username: 'ky393'})
//     }
//   } */   



// /*

// if (event.path === '/whoami' && event.httpMethod === 'GET') {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({username: 'ky393'})
//     }
//   }  */

