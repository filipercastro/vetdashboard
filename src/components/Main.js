import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import requireAuth from './hocs/RequireAuth';
import Header from './Header';
import PatientsList from './PatientsList';
import PatientNew from './PatientNew';
import PatientView from './PatientView';
import Protocol from './Protocol';

class Main extends Component {

  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/main" component={PatientsList} />
          <Route exact path="/main/patient/new" component={PatientNew} />
          <Route exact path="/main/patient/:id" component={PatientView} />
          <Route path="/main/patient/:id/protocol" component={Protocol} />
        </Switch>
      </div>
    )
  }
}

export default requireAuth(Main);
