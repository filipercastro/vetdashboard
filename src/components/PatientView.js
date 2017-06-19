import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchPatient, savePatient, fetchVets, fetchSystems } from '../actions'
import Header from '../components/Header';
import FwdField from '../components/FwdField';
import '../style/patientForm.css';

class PatientView extends Component {
  constructor(props) {
    super(props);

    this.renderSelectField = this.renderSelectField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const {id} = this.props.match.params;
    this.props.fetchPatient(id);
    this.props.fetchVets();
    this.props.fetchSystems();
  }

  renderTextField(field) {
    return (
      <div className={`form-group ${field.className}`}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
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

  renderCheckboxField(field) {
    return (
      <div className={`form-group ${field.className}`}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
      </div>
    )
  }

  onSubmit(values) {
    debugger;
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
          <form
            className="form-inline"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <div className="row formRow">
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
                component={this.renderSelectField}
                options={["Cachorro", "Gato"]}
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
            <div className="row formRow">
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
                label="Peso (Kg)"
                className = "col-xs-3"
              />
              <Field
                name="genre"
                type="select"
                component={this.renderSelectField}
                label="Sexo"
                options={["M", "F"]}
                className = "col-xs-2"
              />
              <Field
                name="admissionVet"
                type="select"
                component={this.renderSelectField}
                label="Internado por"
                options={this.props.vets}
                className = "col-xs-4"
              />
            </div>
            <div className="row formRow">
              <Field
                name="system"
                type="select"
                component={this.renderSelectField}
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
            <div className="row formRow">
              <Field
                name = "fwd"
                type = "checkbox"
                component = {this.renderCheckboxField}
                label = "Encaminhado"
                className = "col-xs-2"
              />
              <div id="col-xs-10 row">
                <Field
                  name="fwdInfo.vet"
                  type="text"
                  component={FwdField}
                  label="M.V."
                  className = "col-xs-3"
                />
                <Field
                  name="fwdInfo.clinic"
                  type="text"
                  component={FwdField}
                  label="Clínica"
                  className = "col-xs-3"
                />
                <Field
                  name="fwdInfo.cel"
                  type="text"
                  component={FwdField}
                  label="Cel"
                  className = "col-xs-3"
                />
              </div>
            </div>
            <div className="formRow">
              <Field
                name="exams.done"
                type="text"
                component={this.renderTextField}
                label="Exames realizados"
              />
            </div>
            <div className="formRow">
              <Field
                name="exams.pending"
                type="text"
                component={this.renderTextField}
                label="Exames pendentes"
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              //disabled={submitting || pristine}
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ patients, vets, systems }, ownProps) {
  const patient = patients[ownProps.match.params.id];
  return {
           patient,
           vets,
           systems,
           initialValues: patient
         };
}

export default connect(mapStateToProps, { fetchPatient, savePatient, fetchVets, fetchSystems })(
  reduxForm({
    form: 'patientEdit',
    enableReinitialize : true
  })(PatientView)
)
