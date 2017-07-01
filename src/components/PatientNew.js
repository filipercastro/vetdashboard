import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePatient, fetchVets, fetchSystems } from '../actions'
import PatientForm from './PatientForm';
import PendingExams from './PendingExams';
import DoneExams from './DoneExams';

class PatientNew extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchVets();
    this.props.fetchSystems();
  }

  onSubmit(values) {
    values.exams = this.props.exams;
    this.props.savePatient(values, () => this.props.history.push('/main'));
  }

  render() {
    const { vets, systems, exams, history } = this.props;
    return (
      <div className="container">
        <PatientForm
          onSubmit = {(values) => this.onSubmit(values)}
          redirectMain = {() => history.push('/main')}
          vets = {vets}
          systems = {systems}
          disabled = {false}
        />
        <div className="row">
          <div className="col-xs-4">
            <DoneExams
              done = {exams.done}
              disabled = {false}
            />
          </div>
          <div className="col-xs-8">
            <PendingExams
              pending = {exams.pending}
              disabled = {false}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ vets, systems, exams }) {
  return {
    exams,
    vets,
    systems
  };
}

export default connect(mapStateToProps, { savePatient, fetchVets, fetchSystems })(PatientNew);
