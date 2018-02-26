// SurveyFormReview sh0ws users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import Payments from './Payments';

//import ConfirmModal from '../modals/ConfirmModal';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history, showLoader, auth } /*instead of 'props'*/) => {
  const displayEmails = (name) => {
    let emailString = '';

    formValues[name].map((email, i) => {
      if (formValues[name].length === i + 1)
        return emailString += email;
      else
        return emailString += email + ', ';
    });

    return emailString;
  };

  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name} >
        <label style={{ marginBottom: '5px' }}>{label}</label>
        <div style={{ marginBottom: '20px' }}>
          {!Array.isArray(formValues[name]) ? formValues[name] : displayEmails(name)}
        </div>
      </div>
    );
  });

  const submitClick = () => {
    if (auth.credits > 0) {
      showLoader({ show: true, message: 'Sending survey...' });
      submitSurvey(formValues, history);
    }
    else { }
  };

  const showModal = () => {
    /*return (
      <ConfirmModal
        closeModal={this.closeModal}
        open={this.state.open}
        header="Delete Survey"
        body="This will delete the selected survey."
      />
    );*/
  }

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel} >
        Back
      </button>
      <button
        onClick={() => submitClick()}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
      {showModal()}
    </div>
  );
}

function mapStateToProps({ form: { surveyForm }, auth }) {
  return { formValues: surveyForm.values, auth };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));