import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '../components/TextField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';
import FwdField from './FwdField';
import '../style/patientForm.css';

class PatientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: this.props.disabled
    };
  }

  render() {
    const {
      handleSubmit,
      submitting,
      pristine,
      editing,
      systems,
      vets,
      redirectHome,
      onSubmit} = this.props;

    const { disabled } = this.state;

    return (
      <div className="patientForm">
        <form
          className="form-inline"
          onSubmit={handleSubmit((values) => onSubmit(values))}
        >
          <div className="row formHeader">
            <button
              className="btn btn-primary"
              type="button"
              onClick={redirectHome}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary pull-right"
              type="submit"
              disabled={submitting || pristine || disabled}
            >
              Salvar
            </button>
            <button
              className="btn btn-danger pull-right"
              type="button"
              style={{display: (editing && !disabled) ? "" : "none"}}
              onClick={() => this.setState({disabled: true})}
            >
              Cancelar
            </button>
            <button
              className="btn btn-danger pull-right"
              type="button"
              style={{display: (editing && disabled ) ? "" : "none"}}
              onClick={() => this.setState({disabled: false})}
            >
              Editar
            </button>
          </div>
          <div className="row formRow">
            <Field
              name="name"
              type="text"
              component={TextField}
              label="Paciente"
              className = "col-xs-3"
              disabled = {disabled}
            />
            <Field
              name="register"
              type="text"
              component={TextField}
              label="Ficha"
              className = "col-xs-3"
              disabled = {disabled}
            />
            <Field
              name="species"
              type="text"
              component={SelectField}
              options={["Cachorro", "Gato"]}
              label="Espécie"
              className = "col-xs-3"
              disabled = {disabled}
            />
            <Field
              name="race"
              type="text"
              component={TextField}
              label="Raça"
              className = "col-xs-3"
              disabled = {disabled}
            />
          </div>
          <div className="row formRow">
            <Field
              name="age"
              type="text"
              component={TextField}
              label="Idade"
              className = "col-xs-3"
              disabled = {disabled}
            />
            <Field
              name="weight"
              type="text"
              component={TextField}
              label="Peso (Kg)"
              className = "col-xs-3"
              disabled = {disabled}
            />
            <Field
              name="genre"
              type="select"
              component={SelectField}
              label="Sexo"
              options={["M", "F"]}
              className = "col-xs-2"
              disabled = {disabled}
            />
            <Field
              name="admissionVet"
              type="select"
              component={SelectField}
              label="Internado por"
              options={vets}
              className = "col-xs-4"
              disabled = {disabled}
            />
          </div>
          <div className="row formRow">
            <Field
              name="system"
              type="select"
              component={SelectField}
              label="Sistema Envolvido"
              options={systems}
              className = "col-xs-5"
              disabled = {disabled}
            />
            <Field
              name="preDiagnose"
              type="text"
              component={TextField}
              label="Suspeitas"
              className = "col-xs-7"
              disabled = {disabled}
            />
          </div>
          <div className="row formRow">
            <Field
              name = "fwd"
              type = "checkbox"
              component = {CheckboxField}
              label = "Encaminhado"
              className = "col-xs-2"
              disabled = {disabled}
            />
            <div id="col-xs-10 row">
              <Field
                name="fwdInfo.vet"
                type="text"
                component={FwdField}
                label="M.V."
                className = "col-xs-3"
                disabled = {disabled}
              />
              <Field
                name="fwdInfo.clinic"
                type="text"
                component={FwdField}
                label="Clínica"
                className = "col-xs-3"
                disabled = {disabled}
              />
              <Field
                name="fwdInfo.cel"
                type="text"
                component={FwdField}
                label="Cel"
                className = "col-xs-3"
                disabled = {disabled}
              />
            </div>
          </div>
          {/* <div className="formRow">
            <Field
              name="exams.done"
              type="text"
              component={TextField}
              label="Exames realizados"
              disabled = {disabled}
            />
            </div>
            <div className="formRow">
            <Field
              name="exams.pending"
              type="text"
              component={TextField}
              label="Exames pendentes"
              disabled = {disabled}
            />
          </div> */}
        </form>
      </div>
    );
  }
}

export default reduxForm({
    form: 'patientForm',
    enableReinitialize : true
  })(PatientForm)