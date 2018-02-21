import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

import logo from '../logo.svg';
import './App.css';

class Header extends Component {
  constructor() {
    super()

    this.state = { mobileWidth: false };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    if (window.innerWidth < 520) {
      this.setState({ mobileWidth: true });
    } else {
      this.setState({ mobileWidth: false });
    }
  }

  mobileWidth() {
    return this.state.mobileWidth;
  }

  renderLogo() {
    return (
      <Link
        to={this.props.auth ? '/surveys' : '/'}
        className={this.mobileWidth() ? "center brand-logo" : "left brand-logo"}
      >
        <img
          src={logo}
          className={this.mobileWidth() ? "App-logo-mobile" : "App-logo-hidden"}
          alt="logo" />
        Emaily
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
    );
  }

  renderNav() {
    if (this.mobileWidth()) {
      return (
        <nav className="nav-extended">
          <div className="nav-wrapper">
            {this.renderLogo()}
          </div>
          {this.renderContent()}
        </nav>
      );
    }

    return (
      <nav>
        <div className="nav-wrapper">
          {this.renderLogo()}
          {this.renderContent()}
        </div>
      </nav>
    );
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className={this.mobileWidth() ? "nav-content" : "right"}>
            <ul className={this.mobileWidth() ? "tabs tabs-transparent" : ""}>
              <li
                className={this.mobileWidth() ? "tab" : ""}>
                <a href="/auth/google">
                  Login With Google
              </a>
              </li>
            </ul>
          </div>
        );
      default:
        if (this.mobileWidth()) {
          return (
            <div className="nav-content">
              <ul className="tabs tabs-transparent">
                {this.renderTabs()}
              </ul>
            </div>
          );
        }

        return (
          <ul className="right">
            {this.renderTabs()}
          </ul>
        );
    }
  }

  renderTabs() {
    return [
      <li key="1" className={this.mobileWidth() ? "tab" : ""}>
        <Payments mobileWidth={this.mobileWidth()} />
      </li>,
      <li key="3" className={this.mobileWidth() ? "tab" : ""} style={{ margin: '0 10px' }}>
        Credits: {this.props.auth.credits}
      </li>,
      <li key="2" className={this.mobileWidth() ? "tab" : ""}>
        <a href="/api/logout">Logout</a>
      </li>
    ];
  }

  render() {
    return (
      <div>{this.renderNav()}</div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);