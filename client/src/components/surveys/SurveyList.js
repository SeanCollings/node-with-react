import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSurveys } from '../../actions';

class SurveList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    //console.log(this.props.auth);
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card blue-grey darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString('en-GB')}
            </p>
            <br />
            <p className="right">
              {survey.lastResponded ? `Last Response: ${new Date(survey.lastResponded).toLocaleDateString('en-GB')}` : ""}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div >
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

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveList);