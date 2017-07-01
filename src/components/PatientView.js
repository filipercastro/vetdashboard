import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatient, savePatient, fetchVets, fetchSystems, disableEdit } from '../actions'
import PatientForm from './PatientForm';
import PendingExams from './PendingExams';
import DoneExams from './DoneExams';

class PatientView extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const {id} = this.props.match.params;

    this.props.disableEdit();
    this.props.fetchPatient(id);
    this.props.fetchVets();
    this.props.fetchSystems();
  }

  onSubmit(values) {
    values.exams = this.props.exams;
    this.props.savePatient(values, () => this.props.disableEdit());
  }

  render() {
    const { patient, vets, systems, exams, disabled, history } = this.props;

    if (!patient) {
      return <div>Loading...</div>
    }

    return (
      <div className="container">
        <PatientForm
          onSubmit = {(values) => this.onSubmit(values)}
          redirectMain = {() => history.push('/main')}
          vets = {vets}
          systems = {systems}
          initialValues = {patient}
          disabled = {disabled}
          editing = {true}
        />
        <div className="row">
          <div className="col-xs-4">
            <DoneExams
              done = {exams.done}
              disabled = {disabled}
            />
          </div>
          <div className="col-xs-8">
            <PendingExams
              pending = {exams.pending}
              disabled = {disabled}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ patients, vets, systems, exams, disabled }, ownProps) {
  const patient = patients[ownProps.match.params.id];
  return {
           patient,
           vets,
           systems,
           exams,
           disabled
         };
}

export default connect(mapStateToProps, { fetchPatient, savePatient, fetchVets, fetchSystems, disableEdit })(PatientView);
