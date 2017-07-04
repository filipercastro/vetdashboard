import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePatient, fetchVets, resetExams } from '../actions'
import { SYSTEMS } from '../common/constants';
import PatientForm from './PatientForm';

class PatientNew extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.resetExams();
    this.props.fetchVets();
  }

  onSubmit(values) {
    const redirectURL = `/main/patient/${values.register}`;
    this.props.savePatient(values, () => this.props.history.push(redirectURL));
  }

  render() {
    const { vets, history } = this.props;
    return (
      <div className="container">
        <PatientForm
          onSubmit = {(values) => this.onSubmit(values)}
          redirectMain = {() => history.push('/main')}
          vets = {vets}
          systems = {SYSTEMS}
          disabled = {false}
        />
      </div>
    );
  }
}

function mapStateToProps({ vets }) {
  return {
    vets
  };
}

export default connect(mapStateToProps, { savePatient, fetchVets, resetExams })(PatientNew);
