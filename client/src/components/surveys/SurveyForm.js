// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    //return _.map(formFields, ({ label, name }) => { });
    return formFields.map(({ name, label }) => {
      return (
        <Field
          key={name}
          label={label}
          type="text"
          name={name}
          component={SurveyField} />
      );
    });
  }

  render() {
    return (
      <div>
        <form
          style={{ marginBottom: '10px' }}
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit /*() => this.props.onSur()*/)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  };
}

function validate(values) {
  const errors = {};

  if (values.recipients) {
    errors.recipients = validateEmails(values.recipients || '');
  }

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]
      || (Array.isArray(values[name]) && values[name].length < 1)) {
      errors[name] = `You must provide ${noValueError}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);