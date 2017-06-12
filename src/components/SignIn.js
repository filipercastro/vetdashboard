import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { logIn } from '../actions'
import '../style/signin.css';
import doge from "../images/doge.png";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
        message: ''
      }
    }
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field;

    return (
      <div>
        <div className="form-group row">
          <label className="col-xs-3">{label}:</label>
          <div className="col-xs-9">
            <input {...input} className="form-control" placeholder={label} type={type} />
          </div>
        </div>
        {touched && error &&
          <div className="row">
            <div className="col-xs-3"></div>
            <div className="error col-xs-9">
              <i className="glyphicon glyphicon glyphicon-ban-circle"></i>
              &nbsp;
              <span>{error}</span>
            </div>
          </div>}
      </div>
    )
  }

  onSubmit(values) {
    this.props.logIn(
      values,
      () => {this.props.history.push('/home')},
      error => {this.setState({error})}
    );
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props

    return (
      <div className="signinContainer">
        <div className="header">
          <img src={doge} alt="Doge" height="42" width="42" />
          <h3 className="text-center">Vet Dashboard</h3>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="email"
            type="email"
            component={this.renderField}
            label="Email"
          />
          <Field
            name="password"
            type="password"
            component={this.renderField}
            label="Senha"
          />
          <div className="error text-center">{this.state.error.message}</div>
          <div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={submitting || pristine}>
              Entrar
            </button>
          </div>
        </form>
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
