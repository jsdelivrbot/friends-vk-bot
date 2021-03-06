import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

import './Message.scss';

class Message extends Component{

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      messageInfo: {},
    };
  }

  queue = [];

  componentDidUpdate(prevProps) {
    if (this.props.message && this.props.message !== prevProps.message) {
      this.addMessageToQueue(this.props.message);
    }
  }

  addMessageToQueue = message => {
    this.queue.push(message);

    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const { text, variant, key } = this.state.messageInfo;
    return (
      <div>
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
        >
          <SnackbarContent
            className={'message ' + variant}
            message={text}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
    );
  }

}

Message.propTypes = {
  message: PropTypes.object,
};

export default Message;