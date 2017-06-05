import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { firebaseApp } from '../firebase';

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
    const { email, password } = values;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
     .then(() => {this.props.history.push('/home')})
     .catch(error => {
       this.setState({error})
     })
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
})(SignIn)
