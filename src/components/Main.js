import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import requireAuth from './hocs/require_auth';
import Header from './Header';
import PatientsList from './PatientsList';
import PatientNew from './PatientNew';
import PatientView from './PatientView';

class Main extends Component {

  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/main" component={PatientsList} />
          <Route path="/main/patient/new" component={PatientNew} />
          <Route path="/main/patient/:id" component={PatientView} />
          {/*<Route path="/protocol/:id" component={ProtocolView} /> */}
        </Switch>
      </div>
    )
  }
}

export default requireAuth(Main);
