import { default as React, PropTypes } from "react";
class Recaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captcha: {}
    }
  }
  loadCaptcha() {
    const captcha = grecaptcha.render(this.props.elementID, {
      "sitekey": this.props.sitekey,
      "callback": this.props.verifyCallback,
      "expired-callback": this.props.expiredCallback,
      "theme": this.props.theme,
      "render": this.props.render,
      "type": this.props.type,
      "size": this.props.size
    });
    this.setState({ captcha });
  }
  componentDidMount() {
    if (typeof grecaptcha !== "undefined") {
      this.loadCaptcha();
    } else {
      window[this.props.onloadCallbackName] = function() {
        this.loadCaptcha();
        if (this.props.onloadCallback) {
          this.props.onloadCallback();
        }
      }.bind(this);
    }
  }
  componentWillUnmount() {
    this.resetCaptcha();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.reset){
      this.resetCaptcha();
    }
  }
  resetCaptcha() {
    if (typeof grecaptcha !== "undefined") {
      grecaptcha.reset(this.state.captcha);
      if(this.props.resetCallback) {
        this.props.resetCallback();
      }
    }
  }
  render() {
    return (
      <div id={this.props.elementID}></div>
    );
  }
};
Recaptcha.propTypes  = {
  sitekey: PropTypes.string,
  elementID: PropTypes.string,
  onloadCallbackName: PropTypes.string,
  onloadCallback: PropTypes.func,
  verifyCallback: PropTypes.func,
  render: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  expiredCallback: PropTypes.func,
  reset: PropTypes.bool,
  resetCallback: PropTypes.func
};

Recaptcha.defaultProps = {
  elementID: "g-recaptcha",
  onloadCallback: undefined,
  onloadCallbackName: "recaptchaLoaded",
  verifyCallback: undefined,
  expiredCallback: undefined,
  resetCallback: undefined,
  reset: undefined,
  render: "explicit",
  theme: "light",
  type: "image",
  size: "normal"
};

module.exports = Recaptcha;
