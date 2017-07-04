import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPatient, saveProtocol, addMed, deleteMed, resetProtocol } from '../actions'
import {
  PROTOCOL_METHODS,
  PROTOCOL_VOLUME_TYPES,
  PROTOCOL_FREQUENCY,
  PROTOCOL_START
} from '../common/constants';

class Protocol extends Component {
  componentWillMount() {
    if (!this.props.patient) {
      const { id } = this.props.match.params;
      this.props.fetchPatient(id);
    }
  }

  addMed(elem) {
    const inputIDs = [
      "medicine",
      "dosage",
      "method",
      "frequency",
      "start",
      "volume.value",
      "volume.type"
    ];

    let values = {"volume": {}};

    inputIDs.forEach((inputID) => {
      const elem = document.getElementById(inputID);
      const value = elem.value;
      if (inputID.startsWith("volume")) {
        const splitID = inputID.split(".");
        values["volume"][splitID[1]] = value;
      } else {
        values[inputID] = value;
      }
    });

    this.props.addMed(values);

    inputIDs.forEach((inputID) => {
      document.getElementById(inputID).value= "";
    });
  }

  deleteMed(elem) {
    this.props.deleteMed(elem.target.closest('tr').rowIndex - 1);
  }

  saveProtocol() {
    const { id } = this.props.match.params;
    const { protocol } = this.props;
    this.props.saveProtocol(id,
                            protocol,
                            () => this.props.history.push(`/main/patient/${id}`));
  }

  renderMeds() {
    const { protocol } = this.props;

    return protocol.map((med, index) => {
      const { medicine, dosage, method, volume, frequency, start} = med;
      return (
        <tr key={index}>
          <td>{medicine}</td>
          <td>{dosage}</td>
          <td>{method}</td>
          <td>{`${volume.value} ${volume.type}`}</td>
          <td>{frequency}</td>
          <td>{start}</td>
          <td>
            <button className="btn clickable_icon" onClick={(elem) => this.deleteMed(elem)}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </td>
        </tr>
      );
    });
  }

  renderOptions(options) {
    return options.map((option) => {
      return(
        <option key={option} value={option}>
          {option}
        </option>
      )
    });
  }

  render () {
    return (
      <div>
        <button
          className="btn btn-primary pull-right"
          onClick={() => this.saveProtocol()}
        >
          Salvar
        </button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Medicação</th>
              <th>Dose</th>
              <th>Via</th>
              <th>Volume</th>
              <th>Frequência</th>
              <th>Início</th>
            </tr>
          </thead>
          <tbody>
            {this.renderMeds()}
            <tr>
              <td>
                <input
                  className="form-control"
                  id="medicine"
                  type="text"
                />
              </td>
              <td>
                <input
                  className="form-control"
                  id="dosage"
                  type="text"
                />
              </td>
              <td>
                <select
                  className="form-control"
                  id="method"
                  type="select"
                >
                  {this.renderOptions(PROTOCOL_METHODS)}
                </select>
              </td>
              <td>
                <input
                  className="form-control"
                  id="volume.value"
                  type="text"
                />
                <select
                  className="form-control"
                  id="volume.type"
                  type="select"
                >
                  {this.renderOptions(PROTOCOL_VOLUME_TYPES)}
                </select>
              </td>
              <td>
                <select
                  className="form-control"
                  id="frequency"
                  type="select"
                >
                  {this.renderOptions(PROTOCOL_FREQUENCY)}
                </select>
              </td>
              <td>
                <select
                  className="form-control"
                  id="start"
                  type="select"
                >
                  {this.renderOptions(PROTOCOL_START)}
                </select>
              </td>
              <td>
                <button className="btn clickable_icon" onClick={(elem) => this.addMed(elem)}>
                  <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ patients, protocol }, ownProps) {
  const patient = patients[ownProps.match.params.id];
  return { patient, protocol };
}

export default connect(mapStateToProps, { fetchPatient, saveProtocol, addMed, deleteMed, resetProtocol })(Protocol);
