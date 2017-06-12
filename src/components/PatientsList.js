import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatientList } from '../actions'
import { Link } from 'react-router-dom';

class PatientsList extends Component {
  componentWillMount() {
    this.props.fetchPatientList();
  }

  renderPatients() {
    return _.map(this.props.patients, patient => {
      const { register, name, "exams": { pending, done }, discharge } = patient;
      return (
        <tr key={register}>
          <td>
            <Link to={`/patient/${register}`}>
              <span>{register}</span>
            </Link>
          </td>
          <td>{name}</td>
          <td>{done}</td>
          <td>{pending}</td>
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
    return (
      <div className="container">
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
        <Link to="/patient/new" className="btn btn-primary">
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
