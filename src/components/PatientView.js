import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatient, savePatient, fetchVets, fetchSystems } from '../actions'
import Header from '../components/Header';
import PatientForm from './PatientForm';

class PatientView extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const {id} = this.props.match.params;
    this.props.fetchPatient(id);
    this.props.fetchVets();
    this.props.fetchSystems();
  }

  onSubmit(values) {
    this.props.savePatient(values, () => this.setState({disabled: true}));
  }

  render() {
    const { patient, vets, systems, history } = this.props;

    if (!patient) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Header />
        <PatientForm
          onSubmit = {(values) => this.onSubmit(values)}
          redirectHome = {() => history.push('/home')}
          vets = {vets}
          systems = {systems}
          patient = {patient}
          initialValues = {patient}
          disabled = {true}
          editing = {true}
        />
      </div>
    )
  }
}

function mapStateToProps({ patients, vets, systems }, ownProps) {
  const patient = patients[ownProps.match.params.id];
  return {
           patient,
           vets,
           systems,
         };
}

export default connect(mapStateToProps, { fetchPatient, savePatient, fetchVets, fetchSystems })(PatientView);
