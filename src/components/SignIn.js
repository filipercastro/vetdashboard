import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { logIn } from '../actions';
import '../style/signin.css';

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
        <div>{touched && error && <span>{error}</span>}</div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.logIn(
      values,
      () => {this.props.history.push('/home');},
      (error) => {this.setState({error});}
    );
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props

    return (
      <div className="signinContainer">
        <h3 className="text-center">Vet Dashboard Sign In</h3>
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
            label="Password"
          />
          <div className="text-center">{this.state.error.message}</div>
          <div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={submitting || pristine}>
              Log In
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
    errors.email = "Enter an email";
  }

  if (!values.password) {
    errors.password = "Enter a password";
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
