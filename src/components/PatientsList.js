import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatientList } from '../actions'
import { Link } from 'react-router-dom';

class PatientsList extends Component {
  componentWillMount() {
    this.props.fetchPatientList();
  }

  renderPendingExams(exams) {
    return _.map(exams, exam => exam.name).join(', ');
  }

  renderPatients() {
    return _.map(this.props.patients, patient => {
      const { register, name, exams, discharge } = patient;
      const pending = exams ? exams.pending : [];
      const done = exams ? exams.done : [];
      return (
        <tr key={register}>
          <td>
            <Link to={`/main/patient/${register}`}>
              <span>{register}</span>
            </Link>
          </td>
          <td>{name}</td>
          <td>{done.join(', ')}</td>
          <td>{this.renderPendingExams(pending)}</td>
          <td>
            <Link to={`/protocol/${register}`}>
              <span className="glyphicon glyphicon-pushpin" aria-hidden="true"></span>
            </Link>
          </td>
          <td>{discharge}</td>
        </tr>
      );
    });
  }

  render() {
    const { patients } = this.props;

    if (!patients) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Ficha</th>
              <th>Internados</th>
              <th>Exames Realizados</th>
              <th>Exames Pendentes</th>
              <th>Protocolo</th>
              <th>Alta</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPatients()}
          </tbody>
        </table>
        <Link to="/main/patient/new" className="btn btn-primary">
          Admitir novo paciente
        </Link>
      </div>

    )
  }
}

function mapStateToProps({ patients }) {
  return { patients };
}

export default connect(mapStateToProps, { fetchPatientList })(PatientsList);
