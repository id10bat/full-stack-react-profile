import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// api
import profileApis from './api/requestApis'

// page
import {LogIn} from './components/signin';
import personalProfile from './components/profile_personal';
import publicProfile from './components/profile_public';
import OnAuth from './components/onauth';
import publicProfileOffline from './components/profile_public_offline';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
      uri_id: []
    }
  }
  
  componentDidMount() {
    profileApis.onAuthState((auth) => {
      if (auth !== false) {
        this.setState({ authed: true, loading: false })

      } else {
        this.setState({ authed: false, loading: false })
      }
    })


  }

  render() {
    const { uri_id } = this.state;

    return this.state.loading === true ? <div>loading</div>
      : (
        <Router>
          {this.state.authed
            ? <div>
              <Route exact path="/" component={OnAuth} />
              <Route path={`/profile/:UrlIDs`} component={publicProfile} />
              <Route path={`/profile/id=:UrlID`} component={personalProfile} />
              
            </div>
            : <div>
              <Route exact path="/" component={LogIn} />
              <Route path={`/profile/:ID`} component={publicProfileOffline} />
              </div>
          }

        </Router>
      );

  }

}

var Child = ({ match }) =>  {
  profileApis.personalUser((user) => {
    if (user !== null) {
      console.log(user);
      

    } else {

    }
  }, match.params.id)
}

export default App;