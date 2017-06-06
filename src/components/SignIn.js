import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { logIn } from '../actions';

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
      <div className="form-group">
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && error && <span>{error}</span>}
        </div>
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
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="email"
          type="text"
          component={this.renderField}
          label="Username"
        />
        <Field
          name="password"
          type="password"
          component={this.renderField}
          label="Password"
        />
        <div>{this.state.error.message}</div>
        <div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}>
            Log In
          </button>
          <button
            className="btn btn-danger"
            type="button"
            disabled={pristine || submitting}
            onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signIn' // a unique identifier for this form
})(
  connect(null, { logIn })(SignIn)
);
