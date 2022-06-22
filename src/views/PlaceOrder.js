import React, { useState, Fragment } from "react";
// import Highlight from "../components/Highlight";

import { 
  Container, Row, Col, // used for framing
  Card, CardText, CardBody, // used for graceful redirect
  CardTitle, CardSubtitle, Button, 
  Form, FormGroup, Label, Input, FormFeedback,  // used for pizza form
  CustomInput, 
  Alert // used to display verify email warning
} from "reactstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Ordertile from "../components/OrderTile";
var num = 0
const orders = []


export const PizzaOrder = () => {
  const { apiOrigin = "http://localhost:3001"} = getConfig();
  
  const { user } = useAuth0();
  const isEmailVerified = user['email_verified'];

  const ordersArray = []

  const [orderState, setOrder] = useState(ordersArray)

  // react functional component state
  const [state, setState] = useState({
    loading: false,
    orderForm: {
      orderFor: user.name,
      quantity: 1,
      crustType: 'plain',
      toppings:[],
      nameValid: true
    },
    submitting: false,
    order: {},
    orderComplete: false,
    error: null,
  });

 // a = Array.from(state.orderForm)

  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const callApi = async () => {
    try {
      
     // setState({ ...state, submitting: true});

      const token = await getAccessTokenSilently();
      console.log("Token: " + token)

      // strip extra state info
    const order = { ...state.orderForm };
    // const orderr = { ...state.orderForm };
    console.log(order)
    console.log(user.sub)

    

    //state.orders.push(...state.orderForm );
    orders.push(order)
    
    
    console.log("Orders " + JSON.stringify(...orders))
    //a.push(state.orderForm)
    // a['myOrders'].push("order");
    // console.log("HERE")
    //console.log(JSON.stringify(...a))

    //str = "" + num + order

    // setOrder([...ordersArray, ...state.orderForm])
    // console.log("Orders: " + ordersArray)
    
    var obj={}
    obj[num] = { order }

    // console.log(a)
    // setState(
    // {
    //   orders: state.orders['myOrders'].push("ORders")
    // });
    console.log("HERE")
    

        const options = {
          method: 'PATCH',
          // url: 'https://dev-uz8vcmit.us.auth0.com/api/v2/',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFUWExVWllUNE5UajloT2xoY3NBSSJ9.eyJpc3MiOiJodHRwczovL2Rldi11ejh2Y21pdC51cy5hdXRoMC5jb20vIiwic3ViIjoiTzdzYWdvd1JGZVBPY2ZUUWxkcmVCSzdkdHZkbmtVZDRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LXV6OHZjbWl0LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU1ODQ5NDAyLCJleHAiOjE2NTU5MzU4MDIsImF6cCI6Ik83c2Fnb3dSRmVQT2NmVFFsZHJlQks3ZHR2ZG5rVWQ0Iiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnNfc3VtbWFyeSByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.QLHQpCt8ZWARYj_4ouWLjXS8etuJQptwvoZZ5Nc1jmTtgXv8OFntDO_ATZaMQRWM3WRonwTjUdlkyTUh3oVHxKUWrHzVHzux7b_p_qk6IJwyueRZ5aQXWVjHtzclxUqrm9kPbo21RNFj_kW1W22uwkiniV0Cc2yZeA57G6ptm-mjVC8as43LYGqLJapNMkepHM8GEClwcwgBIr3hGfox2awdyEtI-Aj9X0Nl7oOPRX6S9ONfxvWXt7KH75gWKAK65whN1VIH2qQnoMfUw7ZKWrcaH24h5IRcgmAN6Y34XolfGogJs94NqZ7Q7QaNhq5uL8PdXypp9wALJavAl-iNkA',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'user_metadata': {
            orders
          }
        })
          // data: {
          //   user_metadata: {
          //     addresses: {
          //       home: '123 Main Street, Anytown, ST 12345',
          //       work: '100 Industrial Way, Anytown, ST 12345'
          //     }
          //   }
          // }
        }
        const response = await fetch('https://dev-uz8vcmit.us.auth0.com/api/v2/users/' + user.sub, options)
        const responseData = await response.json();
        console.log(responseData)
        num++
        console.log("Num " + num)


        

        // var axios = require("axios").default;

        // var options = {
        //   method: 'POST',
        //   url: 'https://dev-uz8vcmit.us.auth0.com/api/v2/users',
        //   headers:  {
        //         Authorization: `Bearer ${token}`,
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json'
        //       },
        //   data: {
        //     audience: "https://dev-uz8vcmit.us.auth0.com/api/v2/users",
        //     user_metadata: {hobby: 'surfing'},
        //     app_metadata: {plan: 'full'}
        //   }
        // };

        // axios.request(options).then(function (response) {
        //   console.log(response.data);
        // }).catch(function (error) {
        //   console.error(error);
        // });

        // var request = require("request");

        // var options = { method: 'POST',
        //   url: 'https://dev-uz8vcmit.us.auth0.com/oauth/token',
        //   headers: { 'content-type': 'application/json' },
        //   body: '{"client_id":"H8eNfxX49PU3CYSohNNnnUfMMg93XW8B","client_secret":"QlS_hTkMrHAH48Af7QHA64VLFGvv-Jtg4uNhYE8CO3Zfq1TFOyGxCajjHOJJN007","audience":"https://dev-uz8vcmit.us.auth0.com/oauth/token","grant_type":"client_credentials"}' };

        // request(options, function (error, response, body) {
        //   if (error) throw new Error(error);

        //   console.log(body);
        // });



     // delete order['nameValid'];

      // const response = await fetch(`${apiOrigin}/orderpizza`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   }
      // });

      // const responseData = await response.json();
      setState({
        ...state,
        showResult: true,
        submitting: false,
        order:order,
        // orders:a,
        orderComplete: true
      })

      // console.log("Orders: " + JSON.stringify(...state.orders))
    } catch (error) {
      setState({
        ...state,
        submitting: false,
        error: error.error,
      });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  // category optional parameter for checkboxes
  const modifyOrder = (key, type, value, category) => {

    const newOrderForm = state.orderForm;

    // if its straight key value pair, set it
    if(type === 'text' || type === 'select-one') {
      newOrderForm[key] = value;

      // check name to make sure its not blank
      if(key === 'orderFor' && value.length < 1){
        newOrderForm.nameValid = false;
      } else if(key === 'orderFor' && value.length >= 1){
        newOrderForm.nameValid = true;
      }
    }

    // if its checkbox, use logic to either add or remove it from the array
    if(category && type==='checkbox') {
      
      // add case
      if(value) {
          // if it doesn't exist, add it
          if(newOrderForm[category].indexOf(key) === -1) {
            newOrderForm[category].push(key);
          } 

      } else { // remove case

          // if it exists, remove it
          const index = newOrderForm[category].indexOf(key)
          if(index !== -1) {
            newOrderForm[category].splice(index,1);
          } 
      }
    }
    // set the new state
    setState(
      {
        orderForm: newOrderForm
      }
    );


  }

  return (
    <Fragment>
      {
        !state.orderComplete && 
          <Form>

              {/* Keep default api handlers */}
              {state.error === "consent_required" && (
                <Alert color="warning">
                  You need to{" "}
                  <a
                    href="#/"
                    class="alert-link"
                    onClick={(e) => handle(e, handleConsent)}
                  >
                    consent to get access to Pizza ordering
                  </a>
                </Alert>
              )}

              {state.error === "login_required" && (
                <Alert color="warning">
                  You need to{" "}
                  <a
                    href="#/"
                    class="alert-link"
                    onClick={(e) => handle(e, handleLoginAgain)}
                  >
                    log in again
                  </a>
                </Alert>
              )}

            {!isEmailVerified && 
              <Alert color="warning">
                Please verify your email with Pizza42 prior to placing an order. 
              </Alert>
            }
            <FormGroup>
              <Label for="Name"><b>Order for:</b></Label>
              <Input invalid={!state.orderForm.nameValid} name="orderFor" id="OrderFor" defaultValue={user.name} onChange={(e) => {modifyOrder(e.target.name, e.target.type, e.target.value)}}/>
              <FormFeedback>Please enter a name.</FormFeedback>
            </FormGroup>
            <FormGroup row>
              <Label for="CrustType" sm={2}><b>Select Crust Type:</b></Label>
              <Col sm={10}>
                <Input type="select" name="crustType" id="CrustType" onChange={(e) => {modifyOrder(e.target.name, e.target.type, e.target.value)}}>
                  <option>Plain</option>
                  <option>Crispy</option>
                  <option>Breaded</option>
                  <option>Gluten Free</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Quantity" sm={2}><b>Quantity:</b></Label>
              <Col sm={10}>
                <Input type="select" name="quantity" id="Quantity" onChange={(e) => {modifyOrder(e.target.name, e.target.type, e.target.value)}}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}><b>Select Topping(s):</b></Label>
              <Col sm={10}>
                <CustomInput type="checkbox" id="Pepperoni" label="Pepperoni" onChange={(e) => {modifyOrder(e.target.id, e.target.type, e.target.checked, 'toppings')}}/>
                <CustomInput type="checkbox" id="Mushroom" label="Mushroom" onChange={(e) => {modifyOrder(e.target.id, e.target.type, e.target.checked, 'toppings')}}/>
                <CustomInput type="checkbox" id="Pineapples" label="Pineapples" onChange={(e) => {modifyOrder(e.target.id, e.target.type, e.target.checked, 'toppings')}}/>
                <CustomInput type="checkbox" id="Onions" label="Onions" onChange={(e) => {modifyOrder(e.target.id, e.target.type, e.target.checked, 'toppings')}}/>
                <CustomInput type="checkbox" id="Olives" label="Olives" onChange={(e) => {modifyOrder(e.target.id, e.target.type, e.target.checked, 'toppings')}}/>
                <CustomInput type="checkbox" id="Sausage" label="Sausage" onChange={(e) => {modifyOrder(e.target.id, e.target.type, e.target.checked, 'toppings')}}/>
              </Col>
            </FormGroup>
            
            {!isEmailVerified && <div><span>Place Order is disabled until email is verified</span><br/></div>}
            <Button disabled={!isEmailVerified || !state.orderForm.nameValid || state.submitting} onClick={callApi}>Place Order</Button>
            
          </Form>
      }
      {
        state.orderComplete && 
        <Ordertile order={state.order}/>
      }


    </Fragment>
    
  );
};

export default withAuthenticationRequired(PizzaOrder, {
  onRedirecting: () => {
    return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-center">
        <Col xs="12">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Welcome to Pizza42</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Try our pizza</CardSubtitle>
              <CardText>For security purposes, you are being redirected to our login / signup page prior to ordering.</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    )
  },
});







// import React, {Component, useState} from "react";
// import { withAuth0, useAuth0 } from '@auth0/auth0-react';
// import { Alert } from "reactstrap";
// import { getConfig } from "../config";
// // import SuccessOrder from "./SuccessOrder";
// const { apiOrigin = "http://localhost:3001" } = getConfig();


// //submit button to check if user is verified && add order to user token && route to profile if successfull




// class OrderForm extends Component {
//   constructor(props) {
//     super(props);
//     this.plain = ""
//     this.italian = ""
//     this.veggie = ""
//     this.pepperoni = ""
//     this.finalOrder = ""
//     this.setMessage = {
    
//     }
//     this.state = {
//       showComponent: false
//     };

    
//   }

  

//   checkAuth(){
//     console.log("enters")
//     const {isAuthenticated} = this.props.auth0;
//     console.log(isAuthenticated)
//     if(isAuthenticated){
//       return true
//     } 
//     else{
//       return false
//     }

//   }

//   checkEmailVerification(){
//     const {user} = this.props.auth0;
//     if(user.email_verified){
//       return true
//     } 
//     else{
//       return false
//     }

//   }
 
//   submitIt() {
//     try{
//       if(this.checkAuth()){
//         if (this.checkEmailVerification()){
//           const orders = [this.plain, this.pepperoni, this.veggie, this.italian]
//           const finalArray = []
//           var arrayLength = orders.length;
//           for (var i = 0; i < arrayLength; i++) {
//             if(orders[i]!=null && orders[i]!=""){
//              finalArray.push(orders[i])
//             }
//           }
//          this.finalOrder = finalArray.join();
//          this.count = 1;
//          console.log(this.finalOrder)
//          console.log(this.count)
//           //call a function to add orders to token && redirect to profile
//           this.placeorders()
//           if(this.finalOrder!=null && this.finalOrder!=''){
//           this.setState({
//             showComponent: true,
//           });
        
//         }
//         }
//         else{
//           console.log("email not verified")
//          // window.location.reload(false);
//         }
//       }
//       else{
//         console.log("not authenticated")
//         const { loginWithRedirect } = this.props.auth0;
//         loginWithRedirect();
//       }
//     }catch(e){
//       console.log(e)
//     }
//   }


//    placeorders = async () => {
//       try {

//         const { getAccessTokenSilently} = this.props.auth0;
//         const token = await getAccessTokenSilently();
//         console.log(token)
//         console.log(this.finalOrder)
//         const order = {
//           type: this.finalOrder
//         }
//         console.log(order);
//         const options = {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//             Accept: 'application/json'
//           },
//           body: JSON.stringify(order)
//         }
//         return await fetch(`${apiOrigin}/api/orderpizza`, options)


        
//       } catch (error) {
//         console.log("enters here")
//         console.log(error.message);
//       }
//   };

//   plainHandle(e) {
//     const checked = e.target.checked;
//     if (checked){
//       this.plain = e.target.value
//     }
//     else{
//       this.plain = ""
//     }
//   }
//   pepperoniHandle(e) {
//     const checked = e.target.checked;
//     if (checked){
//       this.pepperoni = e.target.value
//     }
//     else{
//       this.pepperoni = ""
//     }
//   }
//   veggieHandle(e) {
//     const checked = e.target.checked;
//     if (checked){
//       this.veggie = e.target.value
//     }
//     else{
//       this.veggie = ""
//     }
//   }
//   italianHandle(e) {
//     const checked = e.target.checked;
//     if (checked){
//       this.italian = e.target.value
//     }
//     else{
//       this.italian = " "
//     }
//   }

//   render (){
//     let notice;
//     let orderSuccess
//     if(this.checkAuth() && !this.checkEmailVerification()){
//       console.log("hello")
//       notice = <Alert color="warning">Please Verify your email before placing an order</Alert>
//     }
//     else{
//       notice = <h1>Place your Order</h1>
//     }
//     if(this.count==1){
//       orderSuccess = <Alert color="success">Order Placed!</Alert>
//     }
//     return(
//       <div>
//        {notice}
//         <div>
//           <label><input type="checkbox" value="plain cheese" onChange={e=>this.plainHandle(e)} />Plain Cheese Pizza</label>
//           <label><input type="checkbox" value="pepperoni" onChange={e=>this.pepperoniHandle(e)} />Pepperoni Pizza</label>
//           <label><input type="checkbox" value="veggie" onChange={e=>this.veggieHandle(e)} />Veggie Pizza</label>
//           <label><input type="checkbox" value="italian" onChange={e=>this.italianHandle(e)} />Italian Sausage Pizza</label>
//           <button className="btn btn-primary " onClick={() => {this.submitIt()}}>Submit Order</button>
//         </div>
//         {/* {this.state.showComponent ?
//            <SuccessOrder /> :
//            null
//         } */}
//      </div>
//   )
//   }
// }

    
//  export default withAuth0(OrderForm);




 