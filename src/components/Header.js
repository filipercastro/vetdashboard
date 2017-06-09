import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { logOut } from '../actions';
import '../style/header.css';

class Header extends Component {
  render () {
    return (
      <div className="container">
        <div className="page-header row">
          <h2 className="col-xs-9">
            Bem Vindo, { this.props.user.name }!
          </h2>
          <button
            className="logout btn btn-danger col-xs-3"
            onClick={() => {
              this.props.logOut(() => {
                this.props.history.push('/signin');
              });
            }}
          >
            Sair
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(connect(mapStateToProps, { logOut })(Header));
