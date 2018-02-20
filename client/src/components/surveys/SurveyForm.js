// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  { label: 'Survey Title', name: 'title', noValueError: 'a title' },
  { label: 'Subject Line', name: 'subject', noValueError: 'a subject' },
  { label: 'Email Body', name: 'body', noValueError: 'a body' },
  { label: 'Recipient List', name: 'emails', noValueError: 'an email address' }
];

class SurveyForm extends Component {
  renderFields() {
    //return _.map(FIELDS, ({ label, name }) => { });
    return FIELDS.map(({ name, label }) => {
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
        <form onSubmit={this.props.handleSubmit(values => console.log('form', values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn btn-flat white-text">Cancel</Link>
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

  if (values.emails) {
    errors.emails = validateEmails(values.emails || '');
  }

  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]
      || (Array.isArray(values[name]) && values[name].length < 1)) {
      errors[name] = `You must provide ${noValueError}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);