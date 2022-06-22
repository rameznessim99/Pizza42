import React, { useState, useEffect, Fragment } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

import { 
  Container, Row, Col, // used for framing
  Card, CardText, CardBody, // used for graceful redirect
  CardTitle, CardSubtitle, NavLink, Button
} from "reactstrap";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Ordertile from "../components/OrderTile";
import Loading from "../components/Loading";

const myOrders = []

export const MyOrders = () => {
  const { apiOrigin = "http://localhost:3001" } = getConfig();
  
  // react functional component state
  const [state, setState] = useState({
    orders: [],
    error: null,
    //loading:true
    loading:false
  });

  const {
    getAccessTokenSilently,
  } = useAuth0();


  const callApi = async () => {
    // try {
    //   const token = await getAccessTokenSilently();

    //   // strip extra state info
    //   const order = { ...state.orderForm };
    //   delete order['nameValid'];

    //   const response = await fetch(`${apiOrigin}/api/myOrders`, {
    //     // may need CORS in here depending on Heroku implementation
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   });

    //   const responseData = await response.json();

    //   const newState = {...state}

    //   if(typeof responseData.order === "object") {
    //     newState.orders = responseData.order
    //   }

    //   newState.loading = false;

    //   setState(newState);
    // } catch (error) {
    //   setState({
    //     ...state,
    //     error: error.error,
    //   });
    // }


    try {
    //   const token = await getAccessTokenSilently();
      
    //   const response = await fetch(`${apiOrigin}/api/myOrders`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
        
    //  const responseData = await response.json();
    //  const rd = responseData.orders
    
    const options = {
      method: 'GET',
      // url: 'https://dev-uz8vcmit.us.auth0.com/api/v2/',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFUWExVWllUNE5UajloT2xoY3NBSSJ9.eyJpc3MiOiJodHRwczovL2Rldi11ejh2Y21pdC51cy5hdXRoMC5jb20vIiwic3ViIjoiTzdzYWdvd1JGZVBPY2ZUUWxkcmVCSzdkdHZkbmtVZDRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LXV6OHZjbWl0LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU1ODQ5NDAyLCJleHAiOjE2NTU5MzU4MDIsImF6cCI6Ik83c2Fnb3dSRmVQT2NmVFFsZHJlQks3ZHR2ZG5rVWQ0Iiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnNfc3VtbWFyeSByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.QLHQpCt8ZWARYj_4ouWLjXS8etuJQptwvoZZ5Nc1jmTtgXv8OFntDO_ATZaMQRWM3WRonwTjUdlkyTUh3oVHxKUWrHzVHzux7b_p_qk6IJwyueRZ5aQXWVjHtzclxUqrm9kPbo21RNFj_kW1W22uwkiniV0Cc2yZeA57G6ptm-mjVC8as43LYGqLJapNMkepHM8GEClwcwgBIr3hGfox2awdyEtI-Aj9X0Nl7oOPRX6S9ONfxvWXt7KH75gWKAK65whN1VIH2qQnoMfUw7ZKWrcaH24h5IRcgmAN6Y34XolfGogJs94NqZ7Q7QaNhq5uL8PdXypp9wALJavAl-iNkA',
    },
      // data: {
      //   user_metadata: {
      //     addresses: {
      //       home: '123 Main Street, Anytown, ST 12345',
      //       work: '100 Industrial Way, Anytown, ST 12345'
      //     }
      //   }
      // }
    }
    const response = await fetch('https://dev-uz8vcmit.us.auth0.com/api/v2/users/google-oauth2%7C118314779660166923270?fields=user_metadata', options)
    const responseData = await response.json();
    console.log(responseData.user_metadata)

    // myOrders = responseData.user_metadata['orders']
    // console.log("My orders: " + myOrders)
    
    const a = Array.from(state)
    a.push(responseData.user_metadata)
    // setState(a)

    // console.log(a)
    // onsole.log(a[0]['orders'])

    
    myOrders.push(a[0]['orders'])
    // console.log(myOrders[0])


     setState({
          ...state,
          apiMessage: responseData,
      })

      // console.log("Orders: " + JSON.stringify(...state.orders))
      
      // mountComp()

    var format = ""
    
    for(var i=0; i<a[0]['orders'].length; i++) {
      console.log(a[0]['orders'][i])
      // console.log(<Ordertile key={1} order={myOrders[0][i]}/>)
      format += "<div> <h3>Order For: " + a[0]['orders'][i].orderFor + 
                "</h3> <p><b>Quantity:</b>" + a[0]['orders'][i].quantity + 
                "</p> <p><b>Crust Type:</b> " + a[0]['orders'][i].crustType +
                "</p> <p><b>Toppings:</b> ";
      // console.log(a[0]['orders'][i]['toppings'])
      for(var j=0; j<a[0]['orders'][i]['toppings'].length; j++) {
        format += "" + a[0]['orders'][i]['toppings'][j] + ". ";
      }     
      format += "</div><hr>";

    }
    console.log(format)
    document.getElementById("ordersDisplay").innerHTML = format;
    
   
    } catch (error) {
      setState({
            ...state,
            error: error.error,
      });
    }
  };



  // debounce load
  useEffect(() => {
    callApi();

    // https://css-tricks.com/run-useeffect-only-once/
    // eslint-disable-next-line 
  }, []);

  // function displayOrder() {
  //   var format = ""
  //   for(var i=0; i<=myOrders.length; i++) {
  //     console.log(myOrders[0][i])
  //     // console.log(<Ordertile key={1} order={myOrders[0][i]}/>)
  //     format += "<h1>HERE</h1>";
  //   }
  //   //console.log(format)
  //   document.getElementById("ordersDisplay").innerHTML = format;
  // }

  return ( 
    <Fragment>
      {
        state.loading && (
          <Loading/>
        )
      }

      {/* {
        myOrders !== undefined && (
          <Button onClick={callApi}>View Order History</Button>
        )
      } */}

      {
        
        // !state.loading && state.orders !== undefined && state.orders.length!== 0 && 
          // (
            <div id="ordersDisplay">
              
              {/* {myOrders[0].map((order) => {
                return <Ordertile key={1} order={order}/>
              })} */}
            </div>
          // )
        
      }
      {
         !state.loading && myOrders === undefined && (
          <Container className="mb-5">
          <Row className="align-items-center profile-header mb-5 text-center text-md-center">
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Welcome to Pizza42!</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">Try our pizza</CardSubtitle>
                  <CardText>Looks like you've never ordered before! </CardText>
                  <NavLink
                      tag={RouterNavLink}
                      to="/PlaceOrder"
                      exact
                      activeClassName="router-link-exact-active"
                  >
                  Place Order
                </NavLink>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
         )
      }
    </Fragment>
  );
};

export default withAuthenticationRequired(MyOrders, {
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