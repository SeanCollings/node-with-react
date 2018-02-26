import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

class ConfirmModal extends Component {
  constructor() {
    super();
    this.close = this.close.bind(this);
  }

  close(confirmed) {
    this.props.closeModal(confirmed);
  }

  render() {
    return (
      <div>
        <Modal
          visible={this.props.open}
          effect="fadeInUp"
          width="500px"
          onClickAway={() => this.close(false)}
        >
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <i className="right material-icons" onClick={() => this.close(false)}>
              close
            </i>
            <h4 style={{ paddingLeft: '35px' }}>{this.props.header}</h4>
            <p>{this.props.body}</p>
            <p>Continue?</p>
            <hr />
            <button
              className="btn btn-flat red white-text btn-margin"
              onClick={() => this.close(false)}
            >
              No
            </button>
            <button
              className="btn btn-flat teal white-text btn-margin"
              onClick={() => this.close(true)}
            >
              Yes
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ConfirmModal;