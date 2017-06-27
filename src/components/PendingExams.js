import React, { Component } from "react";
import { connect } from 'react-redux';
import { addPendingExam, deletePendingExam } from '../actions'
import '../style/exams.css';

class PendingExams extends Component {
  deleteExam(elem) {
    this.props.deletePendingExam(elem.target.closest('tr').rowIndex - 1);
  }

  addExam(elem) {
    const inputElems = elem.target.closest('tr').getElementsByTagName('input');
    const value = {
      name: inputElems[0].value,
      day: inputElems[1].value,
      time: inputElems[2].value
    }
    this.props.addPendingExam(value);

    for (let i = 0; i < inputElems.length; i++)
    {
      inputElems[i].value = "";
    }
  }

  renderExams() {
    const { pending } = this.props;

    return pending.map((exam, index) => {
      return (
        <tr key={index}>
          <td>{exam.name}</td>
          <td>{exam.day}</td>
          <td>{exam.time}</td>
          <td>
            <button className="clickable_icon" onClick={(elem) => this.deleteExam(elem)}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </td>
        </tr>
      );
    });
  }

  render () {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Exames pendentes</th>
              <th>Dia</th>
              <th>Hora</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderExams()}
            <tr>
              <td>
                <input
                  className="form-control"
                  name="examName"
                  type="text"
                />
              </td>
              <td>
                <input
                  className="form-control"
                  name="examDay"
                  type="text"
                />
              </td>
              <td>
                <input
                  className="form-control"
                  name="examTime"
                  type="text"
                />
              </td>
              <td>
                <button className="clickable_icon" onClick={(elem) => this.addExam(elem)}>
                  <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default connect(null, { addPendingExam, deletePendingExam })(PendingExams);
