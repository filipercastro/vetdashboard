import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePatient, fetchVets, fetchSystems } from '../actions'
import Header from './Header';
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
    this.props.savePatient(values, () => this.props.history.push('/home'));
  }

  render() {
    const { vets, systems, exams, history } = this.props;
    return (
      <div className="container">
        <Header />
        <PatientForm
          onSubmit = {(values) => this.onSubmit(values)}
          redirectHome = {() => history.push('/home')}
          vets = {vets}
          systems = {systems}
          disabled = {false}
        />
        <div className="row">
          <div className="col-xs-4">
            <DoneExams done = {exams.done}/>
          </div>
          <div className="col-xs-8">
            <PendingExams pending = {exams.pending} />
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
