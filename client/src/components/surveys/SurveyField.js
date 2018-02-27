import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import 'react-tagsinput/react-tagsinput.css';
import './SurveyField.css';
import { getSurvey } from '../../actions';

class SurveyField extends Component {
  errorStyle = () => ({
    marginBottom: '5px',
    borderBottom: this.isError() ? '1px solid red' : '',
    //backgroundColor: this.isError() ? '#FFAAAA' : '',
    boxShadow: this.isError() ? '0 1px 0 0 red' : ''
  });

  isError = () => {
    const { meta: { error, touched } } = this.props;
    return touched && error;
  };

  handleChange = (tags) => {
    this.props.input.onChange(tags);
  };

  renderField = () => {
    const { input } = this.props;

    if (input.name !== 'recipients')
      return <input {...input}
        style={this.errorStyle()}
        placeholder={`Add a ${input.name}`}
      />;
    else {
      return (
        <TagsInput
          inputProps={{
            className: this.isError() ? "error-style" : "",
            placeholder: "Add an email"
          }}
          value={input.value || []}
          onChange={this.handleChange}
          addKeys={[9, 13, 32, 186, 188]}
        />
      );
    }
  }

  render() {
    const { label } = this.props;

    const parsed = new URLSearchParams(this.props.location.search);
    const cloneId = parsed.get('cloneId');
    console.log(cloneId);

    this.props.getSurvey(cloneId);

    return (
      <div>
        <label>{label}</label>
        {this.renderField()}
        <div className="red-text" style={{ marginBottom: '20px' }}>
          {this.isError()}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { getSurvey })(withRouter(SurveyField));