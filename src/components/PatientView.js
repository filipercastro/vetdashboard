import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchPatient, savePatient, fetchVets, fetchSystems } from '../actions'
import Header from '../components/Header'
import '../style/patientForm.css';

class PatientView extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchPatient(id);
    this.props.fetchVets();
    this.props.fetchSystems();
  }

  renderTextField(field) {
    return (
      <div className={`${field.className} form-group `}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          placeholder={field.placeholder}
          {...field.input}
        />
      </div>
    );
  }

  renderOptions(options) {
    return options.map((option) => {
      return(
        <option key={option} value={option}>
          {option}
        </option>
      )
    })
  }

  renderSelectField(field) {
    return (
      <div className={`form-group ${field.className}`}>
        <label>{field.label}</label>
        <select
          className="form-control"
          {...field.input}
        >
          {this.renderOptions(field.options)}
        </select>
      </div>
    );
  }

  onSubmit(values) {
    this.props.savePatient(values);
  }

  render() {
    const { patient } = this.props;

    if (!patient) {
      return <div>Loading...</div>
    }

    const { handleSubmit } = this.props;
    return (
      <div>
        <Header />
        <div className="container patientForm">
          <form className="form-inline" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className="row">
              <Field
                name="name"
                type="text"
                component={this.renderTextField}
                label="Paciente"
                className = "col-xs-3"
              />
              <Field
                name="register"
                type="text"
                component={this.renderTextField}
                label="Ficha"
                className = "col-xs-3"
              />
              <Field
                name="species"
                type="text"
                component={this.renderTextField}
                label="Espécie"
                className = "col-xs-3"
              />
              <Field
                name="race"
                type="text"
                component={this.renderTextField}
                label="Raça"
                className = "col-xs-3"
              />
            </div>
            <div className="row">
              <Field
                name="age"
                type="text"
                component={this.renderTextField}
                label="Idade"
                className = "col-xs-3"
              />
              <Field
                name="weight"
                type="text"
                component={this.renderTextField}
                label="Peso"
                className = "col-xs-3"
              />
              <Field
                name="genre"
                type="select"
                component={this.renderSelectField.bind(this)}
                label="Sexo"
                options={["M", "F"]}
                className = "col-xs-2"
              />
              <Field
                name="admissionVet"
                type="select"
                component={this.renderSelectField.bind(this)}
                label="Internado por"
                options={this.props.vets}
                className = "col-xs-4"
              />
            </div>
            <div className="row">
              <Field
                name="system"
                type="select"
                component={this.renderSelectField.bind(this)}
                label="Sistema Envolvido"
                options={this.props.systems}
                className = "col-xs-5"
              />
              <Field
                name="preDiagnose"
                type="text"
                component={this.renderTextField}
                label="Suspeitas"
                className = "col-xs-7"
              />
            </div>
            <div className="row">
              <Field
                name = "fwd"
                type = "checkbox"
                component = {this.renderTextField}
                label = "Encaminhado"
                className = "col-xs-3"
              />
              <Field
                name="fwdVet"
                type="text"
                component={this.renderTextField}
                placeholder="M.V."
                className = "fwdField col-xs-3"
              />
              <Field
                name="clinic"
                type="text"
                component={this.renderTextField}
                placeholder="Clínica"
                className = "fwdField col-xs-3"
              />
              <Field
                name="cel"
                type="text"
                component={this.renderTextField}
                placeholder="Cel"
                className = "fwdField col-xs-3"
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ patients, vets, systems }, ownProps) {
  return {
           initialValues: patients[ownProps.match.params.id],
           patient: patients[ownProps.match.params.id],
           vets,
           systems
         };
}

export default reduxForm({
  form: 'patientEdit'
})(
  connect(mapStateToProps, { fetchPatient, savePatient, fetchVets, fetchSystems })(PatientView)
);
