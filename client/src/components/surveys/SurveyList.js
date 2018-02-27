import React, { Component } from 'react';
import { connect } from 'react-redux';
import MicroBarChart from 'react-micro-bar-chart';
import { Link } from 'react-router-dom';

import { fetchSurveys, showLoader, deleteSurvey } from '../../actions';
import ConfirmModal from '../modals/ConfirmModal';

let loadComplete = false;

class SurveList extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      surveyId: null,
      surveyTitle: '',
      mobileWidth: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    this.props.showLoader({ show: true, message: 'Loading surveys ...' });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    this.props.fetchSurveys();
  }

  componentDidUpdate() {
    this.props.showLoader({ show: false });
    loadComplete = true;
  }

  updateDimensions() {
    if (window.innerWidth < 520) {
      this.setState({ mobileWidth: true });
    } else {
      this.setState({ mobileWidth: false });
    }
  }

  openModal = (surveyId, surveyTitle) => this.setState({ open: true, surveyId, surveyTitle });

  closeModal(confirmed) {
    this.setState({ open: false });

    if (confirmed) {
      this.props.deleteSurvey(this.state.surveyId);
    }
  }

  displayModal() {
    if (this.state.open === true) {
      return (
        <ConfirmModal
          closeModal={this.closeModal}
          open={this.state.open}
          header="Delete Survey"
          body={`This will permanently delete the survey '${this.state.surveyTitle}'.`}
          endQuestion="Continue?"
        />);
    }
  }

  btnResendClick(surveyId) {
    console.log('test', surveyId);
  }

  renderSurveys() {
    if (!this.props.auth) {
      return (
        <h5 style={{ display: 'none' }}>
          Loading surveys ...
      </h5>
      );
    }
    else if (this.props.surveys.length < 1 && loadComplete === true) {
      return (
        <div>
          <h4>No surveys to show</h4>
          <span>Create and send a survey to view results</span>
        </div>
      );
    }

    return this.props.surveys.map(survey => {
      let dataArray = [survey.yes, survey.no];

      return (
        <div className="card blue-grey darken-0" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">
              {survey.title}
              <i className="right material-icons">
                <a
                  style={{ color: 'white' }}
                  className="modal-trigger"
                  onClick={this.openModal.bind(this, survey._id, survey.title)}
                >
                  close
                </a>
              </i>
            </span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString('en-GB')}
            </p>
            <br style={survey.lastResponded ? {} : { display: 'none' }} />
            <p className="right" >
              {survey.lastResponded ? `Last Response: ${new Date(survey.lastResponded).toLocaleDateString('en-GB')}` : ""}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
            <a style={{ marginRight: '0px' }}>
              <MicroBarChart
                data={dataArray}
                hoverColor="#ffd8a6"
                fillColor="#ffab40"
                width={this.state.mobileWidth ? 50 : 100}
              />
            </a>
            <Link
              className="right"
              style={{ marginRight: '0px' }}
              to={`/surveys/new?cloneId=${survey._id}`}
              onClick={this.btnResendClick.bind(this, survey._id)}
            >
              clone
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.displayModal()}
        <ul>
          {this.renderSurveys()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ surveys, auth }) {
  return { surveys, auth };
}

export default connect(mapStateToProps, { fetchSurveys, showLoader, deleteSurvey })(SurveList);