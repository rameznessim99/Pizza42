// import ManagementClient from "auth0/src/management";
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

var ManagementClient = require('auth0').ManagementClient;

var auth0Client = new ManagementClient({
  domain: 'dev-uz8vcmit.us.auth0.com',
  clientId: "H8eNfxX49PU3CYSohNNnnUfMMg93XW8B",
  clientSecret: "QlS_hTkMrHAH48Af7QHA64VLFGvv-Jtg4uNhYE8CO3Zfq1TFOyGxCajjHOJJN007",
  audience: "https://dev-uz8vcmit.us.auth0.com/api/v2/",
  scope: 'update:users_app_metadata',
  scope: 'read:users'

});

var axios = require("axios").default;

app.get("/api/external", checkJwt, (req, res) => {
  console.log("HHERREE")
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

// app.get("/api/orderpizza", checkJwt, (req, res) => {
//   res.send({
//     msg: "Your access token was successfully validated!",
//   });
// });


/*****************************************************************************/
// const orders = {};

// // submits order for specific user
app.post("/api/orderpizza", checkJwt, async (req, res) => {
    
  // add order entry
  // const order = { ...req.body }
  // console.log("order: " + JSON.stringify(order))
  // console.log("sub: " + JSON.stringify({...req.body}))

  const id = req.user.sub
  console.log("id: " + id)
  // const timestamp = (new Date()).toLocaleString()
  const order = req.body
  console.log("Details: " + order) // DOES NOT PRINT THE ORDER

  const us = auth0Client.getUser({ id }); // ERROR 
                                          // unauthorized_client: 
                                          // {"error":"unauthorized_client",
                                          // "error_description":"Grant type 'client_credentials' not allowed for the client.",
                                          // "error_uri":"https://auth0.com/docs/clients/client-grant-types"}
  // console.log(us);

  console.log("User metadata: " + req.user.user_metadata)
  
  // let metadata = await auth0Client.getUser({ id }).then(user => user.user_metadata || {})
  // console.log(metadata)
  // order.id = orderId.generate();
  // order.createdOn = orderId.getTime(order.id);
  // order.email = request.user[`${user.email}`]
  // orders[req.user.sub].push(order);
  // order.crustType = _.startCase(order.crustType);
  // order.orderFor = _.startCase(order.orderFor);

  res.send({
    msg: "Order successfully completed",
    // order: order
  });
}); 

// app.get("/api/myOrders", checkJwt, (req, res) => {

//   res.send({
//     order: orders[req.user.order]
//   });
// });

/*****************************************************************************/

app.get("/api/myOrders",checkJwt, async (req, res) => {
  const id = req.user.sub
  const timestamp = (new Date()).getTime
  console.log(req.body)
  // const order = Object.assign(req.body, { timestamp })
  
  try {
  //  let metadata = await auth0Client.getUser({ id }).then(user => user.user_metadata || {})

   
  // res.status(200).send(metadata.pizzas);
   
  } catch (error) {
    res.status(error.status ?? 500).json({ message: `Error: ${error.message}`, stack: error.stack ?? [] }) 
  }
});

///////////////
// app.post("/api/orderpizza",checkJwt, async (req, res) => {
//   console.log("HERE")
//   const id = req.user.sub
//   // const timestamp = (new Date()).toLocaleString()
//   detail = req.body
  
//   //try {
//    let metadata = await axios.getUser({ id }).then(user => user.user_metadata || {})
//    console.log(metadata);
//   /* const detail = {
//     "typ2":"pepperoni, italian"
//    }
// */
//    const order = Object.assign(req.body, { timestamp })
//    // let namespacedata = metadata.pizzas ?? { orders: [] }
//    namespacedata.orders.push(order)
//    // metadata.pizzas = namespacedata
  
//   let resp = await auth0Client.updateUserMetadata({id}, metadata);

//   console.log("metadata: " + metadata)
//   res.status(200).send(metadata);
   
//   } catch (error) {
//     res.status(error.status ?? 500).json({ message: `Error: ${error.message}`, stack: error.stack ?? [] }) 
//   }
// });



app.listen(port, () => console.log(`API Server listening on port ${port}`));
