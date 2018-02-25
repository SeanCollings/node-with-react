import React, { Component } from 'react';
import { connect } from 'react-redux';
import MicroBarChart from 'react-micro-bar-chart';

import { fetchSurveys, showLoader } from '../../actions';

let loadComplete = false;

class SurveList extends Component {
  componentWillMount() {
    this.props.showLoader({ show: true, message: 'Loading surveys ...' });
  }

  componentDidMount() {
    this.props.fetchSurveys();
  }

  componentDidUpdate() {
    this.props.showLoader({ show: false });
    loadComplete = true;
  }

  renderSurveys() {
    if (!this.props.auth) {
      return (<h5 style={{ display: 'none' }}>Test</h5>);
    }
    else if (this.props.surveys.length < 1 && loadComplete === true) {
      return (
        <div>
          <h4>No surveys to show</h4>
          <span>Create and send a survey to view results</span>
        </div>
      );
    }

    return this.props.surveys.reverse().map(survey => {
      let dataArray = [survey.yes, survey.no];

      return (
        <div className="card blue-grey darken-0" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">
              {survey.title}
              <i className="right material-icons">mail_outline</i>
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
            <a>
              <MicroBarChart
                data={dataArray}
                hoverColor="#ffd8a6"
                fillColor="#ffab40"
              />
            </a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
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

export default connect(mapStateToProps, { fetchSurveys, showLoader })(SurveList);