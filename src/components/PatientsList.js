import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatientList } from '../actions'

class PatientsList extends Component {
  componentDidMount() {
    this.props.fetchPatientList();
  }

  renderPatients() {
    return _.map(this.props.patients, patient => {
      const { name, "exams": { pending, done }, discharge } = patient;
      return (
        <tr key={name}>
          <td>{name}</td>
          <td>{done}</td>
          <td>{pending}</td>
          <td><span className="glyphicon glyphicon-pushpin" aria-hidden="true"></span></td>
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
        <button className="btn btn-primary">
          Admitir novo paciente
        </button>
      </div>

    )
  }
}

function mapStateToProps({ patients }) {
  return { patients };
}

export default connect(mapStateToProps, { fetchPatientList })(PatientsList);
