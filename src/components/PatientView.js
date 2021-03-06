import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatient, savePatient, fetchVets, saveExams } from '../actions'
import { SYSTEMS } from '../common/constants';
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

    this.props.fetchPatient(id);
    this.props.fetchVets();
  }

  onSubmit(values) {
    this.props.savePatient(values);
  }

  render() {
    const { patient, vets, exams, history } = this.props;
    const { id } = this.props.match.params;

    if (!patient) {
      return <div>Loading...</div>
    }

    return (
      <div className="container">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => history.push('/main')}
        >
          Voltar
        </button>
        <PatientForm
          onSubmit = {(values) => this.onSubmit(values)}
          vets = {vets}
          systems = {SYSTEMS}
          initialValues = {patient}
          disabled = {true}
          editing = {true}
        />
        <div className="row">
          <div className="col-xs-4">
            <DoneExams
              done = {exams.done}
            />
          </div>
          <div className="col-xs-8">
            <PendingExams
              pending = {exams.pending}
            />
          </div>
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => this.props.saveExams(id, exams)}
        >
          Salvar exames
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => this.props.history.push(`/main/patient/${id}/protocol`)}
        >
          Editar Protocolo
        </button>
      </div>
    )
  }
}

function mapStateToProps({ patients, vets, exams }, ownProps) {
  const patient = patients[ownProps.match.params.id];
  return {
           patient,
           vets,
           exams
         };
}

export default connect(mapStateToProps, { fetchPatient, savePatient, fetchVets, saveExams })(PatientView);
