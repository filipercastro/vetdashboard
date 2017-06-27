import React, { Component } from "react";
import { connect } from 'react-redux';
import { addDoneExam, deleteDoneExam } from '../actions'

class DoneExams extends Component {
  deleteExam(elem) {
    this.props.deleteDoneExam(elem.target.closest('tr').rowIndex - 1);
  }

  addExam(elem) {
    const inputElem = elem.target.closest('tr').querySelector('input')
    this.props.addDoneExam(inputElem.value);
    inputElem.value = "";
  }

  renderExams() {
    const { done } = this.props.exams;

    return done.map((exam, index) => {
      return (
        <tr key={index}>
          <td>{exam}</td>
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
              <th>Exames completos</th>
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

function mapStateToProps({ exams }) {
  return { exams };
}

export default connect(mapStateToProps, { addDoneExam, deleteDoneExam })(DoneExams);
