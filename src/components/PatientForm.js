import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from './form_fields/TextField';
import SelectField from './form_fields/SelectField';
import CheckboxField from './form_fields/CheckboxField';
import FwdField from './form_fields/FwdField';
import '../style/patientForm.css';

class PatientForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      disabled: props.disabled
    }
  }

  render() {
    const {
      handleSubmit,
      submitting,
      pristine,
      editing,
      reset,
      systems,
      vets,
      onSubmit} = this.props;

    const { disabled } = this.state;

    return (
      <div className="patientForm">
        <form
          className="form-inline"
          onSubmit={handleSubmit((values) => {
            onSubmit(values);
            this.setState({disabled: true});
          })}
        >
          <div className="row formHeader">
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
              onClick={() => {
                this.setState({disabled: true});
                reset();
              }}
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
              component={TextField}
              label="Paciente"
              className = "col-xs-3"
              disabled = {disabled}
            />
            <Field
              name="register"
              component={TextField}
              label="Ficha"
              className = "col-xs-3"
              disabled = {disabled}
            />
            <Field
              name="species"
              component={SelectField}
              options={["Cachorro", "Gato"]}
              label="Espécie"
              className = "col-xs-3"
              disabled = {disabled}
            />
            <Field
              name="race"
              component={TextField}
              label="Raça"
              className = "col-xs-3"
              disabled = {disabled}
            />
          </div>
          <div className="row formRow">
            <Field
              name="age"
              component={TextField}
              label="Idade"
              className = "col-xs-3"
              disabled = {disabled}
            />
            <Field
              name="weight"
              component={TextField}
              label="Peso (Kg)"
              className = "col-xs-3"
              disabled = {disabled}
            />
            <Field
              name="genre"
              component={SelectField}
              label="Sexo"
              options={["M", "F"]}
              className = "col-xs-2"
              disabled = {disabled}
            />
            <Field
              name="admissionVet"
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
              component={SelectField}
              label="Sistema Envolvido"
              options={systems}
              className = "col-xs-5"
              disabled = {disabled}
            />
            <Field
              name="preDiagnose"
              component={TextField}
              label="Suspeitas"
              className = "col-xs-7"
              disabled = {disabled}
            />
          </div>
          <div className="row formRow">
            <Field
              name = "fwd"
              component = {CheckboxField}
              label = "Encaminhado"
              className = "col-xs-2"
              disabled = {disabled}
            />
            <div id="col-xs-10 row">
              <Field
                name="fwdInfo.vet"
                component={FwdField}
                label="M.V."
                className = "col-xs-3"
                disabled = {disabled}
              />
              <Field
                name="fwdInfo.clinic"
                component={FwdField}
                label="Clínica"
                className = "col-xs-3"
                disabled = {disabled}
              />
              <Field
                name="fwdInfo.cel"
                component={FwdField}
                label="Cel"
                className = "col-xs-3"
                disabled = {disabled}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'patientEdit',
  enableReinitialize : true
})(PatientForm);
