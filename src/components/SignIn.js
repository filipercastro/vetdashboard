import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { logIn } from '../actions'
import TextField from './form_fields/TextField';
import PasswordField from './form_fields/PasswordField';
import '../style/signin.css';
import logo from "../images/logo.png";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        message: ''
      }
    }
  }

  onSubmit(values) {
    this.props.logIn(
      values,
      () => {this.props.history.push('/')},
      error => {this.setState({error})}
    );
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props

    return (
      <div className="signinContainer">
        <div className="logo">
          <img src={logo} alt="Logo"/>
        </div>
        <div>
          <h3>Vet Dashboard</h3>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              name="email"
              component={TextField}
              placeholder="Email"
            />
            <Field
              name="password"
              component={PasswordField}
              placeholder="Senha"
            />
            <div className="error text-center">{this.state.error.message}</div>
            <div>
              <button
                className="btn btn-primary pull-right"
                type="submit"
                disabled={submitting || pristine}>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Email não pode estar vazio";
  }

  if (!values.password) {
    errors.password = "Senha não pode estar vazia";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'signIn'
})(
  connect(null, { logIn })(SignIn)
);
