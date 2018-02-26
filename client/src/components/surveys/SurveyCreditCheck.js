// Added this page so that SurveyFormReview remained un-react
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConfirmModal from '../modals/ConfirmModal';
import { creditsRequired } from '../../actions';

class SurveyCreditCheck extends Component {
  constructor() {
    super();

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(confirmed) {
    this.props.creditsRequired(false);
  }

  render() {
    return (
      <ConfirmModal
        closeModal={this.closeModal}
        open={this.props.modal ? true : false}
        header="Credits Required"
        body="You have insufficient credits. Please purchase more to continue."
        endQuestion="Purchase Credits?"
        mode={"SurveyCreditCheck"}
      />
    );
  };
}

function mapStateToProps({ modal }) {
  return { modal };
}

export default connect(mapStateToProps, { creditsRequired })(SurveyCreditCheck);