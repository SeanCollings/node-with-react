// Rendering layer control (React Router)
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader-advanced';
import { ScaleLoader } from 'halogenium';

import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const spinner = (
      <span>
        <ScaleLoader color="#ee6e73" size="32px" margin="4px" />
        {this.props.loader ? this.props.loader.message : ''}
      </span>);

    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Loader
            show={this.props.loader ? this.props.loader.show : false}
            message={spinner} messageStyle={{ color: 'darkGrey' }}
            contentBlur={1}
            backgroundStyle={{ backgroundColor: 'none' }}
          >
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </Loader>
        </div>
      </BrowserRouter>
    )
  };
};

function mapStateToProps({ loader }) {
  return { loader };
}

export default connect(mapStateToProps, actions)(App);