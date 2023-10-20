var require = meteorInstall({"client":{"exit":{"final-mid-survey":{"FinalMidSurvey1.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/final-mid-survey/FinalMidSurvey1.jsx                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => FinalMidSurveyOne
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 1);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 2);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 3);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    playerIsOnline,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-radio"
  }, /*#__PURE__*/React.createElement("input", {
    className: "quiz-button",
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange
  }), label, " ", playerIsOnline ? "" : " (offline)");
};

class FinalMidSurveyOne extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};

    this.handleChange = event => {
      const {
        player
      } = this.props;
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      event.preventDefault(); // TODO: log player response to survey question

      player.set("final_survey_1", this.state);
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      this.props.onSubmit(this.state);
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      response
    } = this.state;
    const network = player.get("neighbors");
    const surveyNumber = 1;
    const completedWidth = 590 / 5 * surveyNumber;
    const uncompletedWidth = 590 - completedWidth;
    const offset = 590 / 5 * 0.5;
    const stageNumPosition = completedWidth - offset;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " To complete the challenge, please fill in the following questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-heading",
      style: {
        marginLeft: stageNumPosition
      }
    }, " ", surveyNumber, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color-dark.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " Did your group have a leader? If so, who?"), network.map(otherNodeId => {
      const otherPlayer = game.players.find(p => p.get("nodeId") === parseInt(otherNodeId));
      const otherPlayerId = otherPlayer.get("anonymousName"); // const playerIsOnline = otherPlayer.online === true && !otherPlayer.get("inactive");

      const playerIsOnline = !otherPlayer.get("inactive");
      return /*#__PURE__*/React.createElement(Radio, {
        selected: response,
        key: otherPlayerId,
        name: "response",
        value: otherPlayerId,
        label: otherPlayerId,
        playerIsOnline: playerIsOnline,
        onChange: this.handleChange
      });
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "myself",
      label: "Myself",
      playerIsOnline: true,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "team",
      label: "We worked as a team",
      playerIsOnline: true,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "none",
      label: "Our team did not have a leader",
      playerIsOnline: true,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !response ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !response,
      type: "submit"
    }, " Submit "))));
  }

}

FinalMidSurveyOne.stepName = "FinalMidSurveyOne";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"FinalMidSurvey2.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/final-mid-survey/FinalMidSurvey2.jsx                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => FinalMidSurveyTwo
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Slider;
module.link("meteor/empirica:slider", {
  default(v) {
    Slider = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 4);

class FinalMidSurveyTwo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};

    this.renderLabels = val => {
      if (val === 0) {
        // Min value
        return "".concat(val, " Unhappy");
      } else if (val === 3) {
        return "".concat(val, " Neutral");
      } else if (val === 6) {
        // Max value
        return "".concat(val, " Happy");
      }

      return "";
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      event.preventDefault(); // TODO: log player response to survey question

      player.set("final_survey_2", this.state);
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      this.props.onSubmit(this.state);
    };
  }

  componentDidMount() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    player.get("neighbors").forEach(otherNodeId => {
      const otherPlayerId = game.players.find(p => p.get("nodeId") === parseInt(otherNodeId)).get("anonymousName");
      this.setState({
        [otherPlayerId]: 0
      });
    });
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const network = player.get("neighbors");
    const surveyNumber = 2;
    const completedWidth = 590 / 5 * surveyNumber;
    const uncompletedWidth = 590 - completedWidth;
    const offset = 590 / 5 * 0.5;
    const stageNumPosition = completedWidth - offset;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " To complete the challenge, please fill in the following questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-heading",
      style: {
        marginLeft: stageNumPosition
      }
    }, " ", surveyNumber, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color-dark.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " Please rate how well you have been working with each teammate in the recent trials?"), network.map(otherNodeId => {
      const otherPlayer = game.players.find(p => p.get("nodeId") === parseInt(otherNodeId));
      const otherPlayerId = otherPlayer.get("anonymousName"); // const playerIsOnline = otherPlayer.online === true && !otherPlayer.get("inactive");

      const playerIsOnline = !otherPlayer.get("inactive");

      const handleSliderChange = num => {
        // Rounding the number to 2 decimals max
        this.setState({
          [otherPlayerId]: num
        });
        player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      };

      return /*#__PURE__*/React.createElement("div", {
        className: "player-slider-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "player-label"
      }, " ", otherPlayerId, " ", playerIsOnline ? "" : " (offline)", " "), /*#__PURE__*/React.createElement(Slider, {
        key: otherNodeId,
        min: 0,
        max: 6,
        stepSize: 1,
        disabled: false,
        showTrackFill: false,
        name: otherPlayerId,
        value: this.state[otherPlayerId],
        labelRenderer: this.renderLabels,
        onChange: handleSliderChange
      }), /*#__PURE__*/React.createElement("div", {
        className: "slider-value-container",
        style: {
          width: "15%"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "slider-value"
      }, this.state[otherPlayerId], " ")));
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: "arrow-button button-submit",
      type: "submit"
    }, " Submit "))));
  }

}

FinalMidSurveyTwo.stepName = "FinalMidSurveyTwo";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"FinalMidSurvey3.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/final-mid-survey/FinalMidSurvey3.jsx                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => FinalMidSurveyThree
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Slider;
module.link("meteor/empirica:slider", {
  default(v) {
    Slider = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 4);

class FinalMidSurveyThree extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      sliderValue: 0
    };

    this.handleSliderChange = num => {
      const {
        stage,
        player
      } = this.props; // Rounding the number to 2 decimals max

      this.setState({
        sliderValue: num
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    };

    this.renderLabels = val => {
      if (val === 0) {
        // Min value
        return "".concat(val, " Unhappy");
      } else if (val === 3) {
        return "".concat(val, " Neutral");
      } else if (val === 6) {
        // Max value
        return "".concat(val, " Happy");
      }

      return "";
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      event.preventDefault(); // TODO: log player response to survey question

      player.set("final_survey_3", this.state);
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      this.props.onSubmit(this.state);
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      response
    } = this.state;
    const surveyNumber = 3;
    const completedWidth = 590 / 5 * surveyNumber;
    const uncompletedWidth = 590 - completedWidth;
    const offset = 590 / 5 * 0.5;
    const stageNumPosition = completedWidth - offset;
    const sliderValue = this.state.sliderValue;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " To complete the challenge, please fill in the following questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-heading",
      style: {
        marginLeft: stageNumPosition
      }
    }, " ", surveyNumber, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color-dark.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " How did you like your job in the team during the recent trials? "), /*#__PURE__*/React.createElement(Slider, {
      min: 0,
      max: 6,
      stepSize: 1,
      disabled: false,
      showTrackFill: false,
      value: sliderValue,
      labelRenderer: this.renderLabels,
      onChange: this.handleSliderChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "slider-value-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "slider-value"
    }, sliderValue, " "))), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: "arrow-button button-submit",
      type: "submit"
    }, " Submit "))));
  }

}

FinalMidSurveyThree.stepName = "FinalMidSurveyThree";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"FinalMidSurvey4.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/final-mid-survey/FinalMidSurvey4.jsx                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => FinalMidSurveyFour
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Slider;
module.link("meteor/empirica:slider", {
  default(v) {
    Slider = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 4);

class FinalMidSurveyFour extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      sliderValue: 0
    };

    this.handleSliderChange = num => {
      const {
        stage,
        player
      } = this.props; // Rounding the number to 2 decimals max

      this.setState({
        sliderValue: num
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    };

    this.renderLabels = val => {
      if (val === 0) {
        // Min value
        return "".concat(val, " Poor");
      } else if (val === 3) {
        return "".concat(val, " Neutral");
      } else if (val === 6) {
        // Max value
        return "".concat(val, " Great");
      }

      return "";
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      event.preventDefault(); // TODO: log player response to survey question

      player.set("final_survey_4", this.state);
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      this.props.onSubmit(this.state);
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      response
    } = this.state;
    const surveyNumber = 4;
    const completedWidth = 590 / 5 * surveyNumber;
    const uncompletedWidth = 590 - completedWidth;
    const offset = 590 / 5 * 0.5;
    const stageNumPosition = completedWidth - offset;
    const sliderValue = this.state.sliderValue;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " To complete the challenge, please fill in the following questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-heading",
      style: {
        marginLeft: stageNumPosition
      }
    }, " ", surveyNumber, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color-dark.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " On the scale below, rate how your team has been working in the recent trials "), /*#__PURE__*/React.createElement(Slider, {
      min: 0,
      max: 6,
      stepSize: 1,
      disabled: false,
      showTrackFill: false,
      value: sliderValue,
      labelRenderer: this.renderLabels,
      onChange: this.handleSliderChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "slider-value-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "slider-value"
    }, sliderValue, " "))), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: "arrow-button button-submit",
      type: "submit"
    }, " Submit "))));
  }

}

FinalMidSurveyFour.stepName = "FinalMidSurveyFour";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"FinalMidSurvey5.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/final-mid-survey/FinalMidSurvey5.jsx                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => FinalMidSurveyFive
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Slider;
module.link("meteor/empirica:slider", {
  default(v) {
    Slider = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 4);

class FinalMidSurveyFive extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      response: ""
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSliderChange = num => {
      const {
        stage,
        player
      } = this.props; // Rounding the number to 2 decimals max

      this.setState({
        sliderValue: num
      });
    };

    this.renderLabels = val => {
      if (val === 0) {
        // Min value
        return "".concat(val, " Unhappy");
      } else if (val === 3) {
        return "".concat(val, " Neutral");
      } else if (val === 6) {
        // Max value
        return "".concat(val, " Happy");
      }

      return "";
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      event.preventDefault(); // TODO: log player response to survey question

      player.set("final_survey_5", this.state);
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      this.props.onSubmit(this.state);
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      response
    } = this.state;
    const surveyNumber = 5;
    const completedWidth = 590 / 5 * surveyNumber;
    const uncompletedWidth = 590 - completedWidth;
    const offset = 590 / 5 * 0.5;
    const stageNumPosition = completedWidth - offset;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " To complete the challenge, please fill in the following questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-heading",
      style: {
        marginLeft: stageNumPosition
      }
    }, " ", surveyNumber, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color-dark.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " Do you think your group could improve its efficiency? If so, how? "), /*#__PURE__*/React.createElement("textarea", {
      className: "survey-textarea",
      dir: "auto",
      id: "response",
      name: "response",
      value: response,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !response ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !response,
      type: "submit"
    }, " Submit "))));
  }

}

FinalMidSurveyFive.stepName = "FinalMidSurveyFive";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ExitSurvey.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/ExitSurvey.jsx                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => ExitSurvey
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    onChange,
    required
  } = _ref;
  return /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange,
    required: required ? "required" : ""
  }), label);
};

const GenderButtonSet = (_ref2) => {
  let {
    color,
    genderSelected,
    handleGenderSelect
  } = _ref2;
  const genders = ["Male", "Female", "Not Enough Information"];
  return /*#__PURE__*/React.createElement("div", {
    className: "gender-input-row"
  }, /*#__PURE__*/React.createElement("label", {
    className: "gender-input-label"
  }, " ", color, " "), /*#__PURE__*/React.createElement("div", {
    className: "gender-input-buttons-container"
  }, genders.map((gender, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: "".concat(color, "-").concat(gender),
      className: gender === genderSelected ? "network-relationship-button selected" : "network-relationship-button",
      onClick: () => handleGenderSelect(color, gender),
      style: {
        margin: "0px 10px"
      }
    }, " ", gender, " ");
  })));
};

class ExitSurvey extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleGenderSelect = (color, genderSelected) => {
      this.setState({
        [color]: genderSelected
      });
    };

    this.handleSubmit = event => {
      event.preventDefault();
      this.props.onSubmit(this.state);
    };

    this.state = {
      age: "",
      gender: "",
      strength: "",
      fair: "",
      feedback: ""
    };
    const network = this.props.player.get("neighbors");
    console.log(network);
    network.map(otherNodeId => {
      const otherPlayer = this.props.game.players.find(p => p.get("nodeId") === parseInt(otherNodeId));
      const otherPlayerColor = otherPlayer.get("anonymousName");
      this.state[otherPlayerColor] = "";
    });
  }

  render() {
    const {
      player,
      game
    } = this.props;
    const {
      age,
      gender,
      strength,
      fair,
      feedback,
      education
    } = this.state;
    const basePay = game.treatment.basePay;
    const conversionRate = game.treatment.conversionRate;
    const network = player.get("neighbors"); // Checks if every key in this.state has a non-empty value

    const filledOut = Object.values(this.state).every(val => val !== '');
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "exit-survey"
    }, /*#__PURE__*/React.createElement("h1", null, " Exit Survey "), /*#__PURE__*/React.createElement("p", null, "Please submit the following code to receive your bonus:", " ", /*#__PURE__*/React.createElement("strong", null, " C1FLL9CG "), "."), /*#__PURE__*/React.createElement("p", null, player.exitReason === "minPlayerCountNotMaintained" ? "Unfortunately, there were too few players active in this game and the game had to be cancelled. To be fair to other players that complete the entire session, please return your submission and we will compensate you for the time you played today." : ""), /*#__PURE__*/React.createElement("p", null, "Your team got a total of ", /*#__PURE__*/React.createElement("strong", null, player.get("score")), " correct.", basePay && conversionRate ? " You will receive an additional performance bonus of ".concat(player.get("score"), " x $").concat(conversionRate, ".") : " You will receive a base pay of $2 and an additional performance bonus of ".concat(player.get("score"), " x 1, for a total of ").concat(2 + parseInt(player.get("score")) * 1, ".")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Please answer the following short survey."), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-line"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      id: "age",
      type: "number",
      min: "0",
      max: "150",
      step: "1",
      dir: "auto",
      name: "age",
      value: age,
      onChange: this.handleChange,
      required: true
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "gender"
    }, "Gender"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      id: "gender",
      type: "text",
      dir: "auto",
      name: "gender",
      value: gender,
      onChange: this.handleChange,
      required: true,
      autoComplete: "off"
    })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Highest Education Qualification"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "high-school",
      label: "High School",
      onChange: this.handleChange,
      required: true
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "bachelor",
      label: "US Bachelor's Degree",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "master",
      label: "Master's or higher",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "other",
      label: "Other",
      onChange: this.handleChange
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "strength"
    }, "What gender do you think your teammates were?"), network.map(otherNodeId => {
      const otherPlayer = game.players.find(p => p.get("nodeId") === parseInt(otherNodeId));
      const otherPlayerColor = otherPlayer.get("anonymousName");
      return /*#__PURE__*/React.createElement(GenderButtonSet, {
        key: otherPlayerColor,
        color: otherPlayerColor,
        genderSelected: this.state[otherPlayerColor],
        handleGenderSelect: this.handleGenderSelect
      });
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-line thirds"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "strength"
    }, "How would you describe your strength in the game?"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", {
      dir: "auto",
      id: "strength",
      name: "strength",
      value: strength,
      onChange: this.handleChange,
      required: true
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "fair"
    }, "Do you feel the pay was fair?"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", {
      dir: "auto",
      id: "fair",
      name: "fair",
      value: fair,
      onChange: this.handleChange,
      required: true
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "feedback"
    }, "Feedback, including problems you encountered."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", {
      dir: "auto",
      id: "feedback",
      name: "feedback",
      value: feedback,
      onChange: this.handleChange,
      required: true
    })))), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: !filledOut ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !filledOut
    }, " Submit")))));
  }

}

ExitSurvey.stepName = "ExitSurvey";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"FailedAttentionCheck.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/FailedAttentionCheck.jsx                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => FailedAttentionCheck
});
let React, Component;
module.link("react", {
  default(v) {
    React = v;
  },

  Component(v) {
    Component = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 2);

class FailedAttentionCheck extends Component {
  render() {
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "failed-attention-container"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "failed-attention-text"
    }, "YOU FAILED THE ATTENTION CHECK, AND HAVE NOT BEEN SELECTED TO PLAY. PLEASE DO NOT TRY TO COMPLETE THE TASK AGAIN. THANK YOU FOR YOUR TIME. PLEASE RETURN YOUR SUBMISSION BY CLOSING THE SURVEY AND CLICKING 'STOP WITHOUT COMLPETING' ON PROLIFIC.\"")));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PreQualExitSurvey.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/PreQualExitSurvey.jsx                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => PreQualExitSurvey
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    onChange,
    required
  } = _ref;
  return /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange,
    required: required ? "required" : ""
  }), label);
};

class PreQualExitSurvey extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      age: "",
      gender: "",
      feedback: ""
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      event.preventDefault();
      this.props.onSubmit(this.state);
    };
  }

  render() {
    const {
      player,
      game
    } = this.props;
    const {
      age,
      gender,
      feedback,
      education
    } = this.state;
    const basePay = game.treatment.basePay;
    const conversionRate = game.treatment.conversionRate;
    const filledOut = Object.values(this.state).every(val => val !== '');
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "exit-survey"
    }, /*#__PURE__*/React.createElement("h1", null, " Exit Survey "), /*#__PURE__*/React.createElement("p", null, "Please submit the following code:", " ", /*#__PURE__*/React.createElement("strong", null, " CZ586HD9 ")), /*#__PURE__*/React.createElement("p", null, player.exitReason === "minPlayerCountNotMaintained" ? "Unfortunately, there were too few players active in this game and the game had to be cancelled." : ""), /*#__PURE__*/React.createElement("p", null, "Thank you for taking time to take this pre-qualification survey ! We will finish screening all the players and send out a date and time to those that qualify for our future game.", basePay && conversionRate ? " You will receive a base pay of $".concat(basePay, " for taking this pre-qualification.") : " You will receive a base pay of $2 for taking this pre-qualification."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, "Please answer the following short survey."), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-line"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      id: "age",
      type: "number",
      min: "0",
      max: "150",
      step: "1",
      dir: "auto",
      name: "age",
      value: age,
      onChange: this.handleChange,
      required: true
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "gender"
    }, "Gender"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      id: "gender",
      type: "text",
      dir: "auto",
      name: "gender",
      value: gender,
      onChange: this.handleChange,
      required: true,
      autoComplete: "off"
    })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Highest Education Qualification"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "high-school",
      label: "High School",
      onChange: this.handleChange,
      required: true
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "bachelor",
      label: "US Bachelor's Degree",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "master",
      label: "Master's or higher",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: education,
      name: "education",
      value: "other",
      label: "Other",
      onChange: this.handleChange
    }))), /*#__PURE__*/React.createElement("div", {
      className: "form-line thirds"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "feedback"
    }, "Feedback, including problems you encountered."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", {
      dir: "auto",
      id: "feedback",
      name: "feedback",
      value: feedback,
      onChange: this.handleChange,
      required: true
    })))), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: !filledOut ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !filledOut
    }, " Submit")))));
  }

}

PreQualExitSurvey.stepName = "ExitSurvey";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Sorry.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/Sorry.jsx                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Sorry
});
let React, Component;
module.link("react", {
  default(v) {
    React = v;
  },

  Component(v) {
    Component = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 2);
let FailedAttentionCheck;
module.link("./FailedAttentionCheck", {
  default(v) {
    FailedAttentionCheck = v;
  }

}, 3);

class Sorry extends Component {
  render() {
    const {
      player,
      game
    } = this.props;
    let msg;

    switch (player.exitStatus) {
      case "gameFull":
        msg = "All games you are eligible for have filled up too fast... Sorry, there will be no more games in the near future.";
        break;

      case "gameLobbyTimedOut":
        msg = "There were NOT enough players for the game to start... Thank you for participating in this game."; // msg = "There were NOT enough players for the game to start... Thank you for participating in this game, you will still get paid the base amount for passing the attention check. Please submit your MTurk Worker Id to the HIT and we will make sure you get paid accordingly.";

        break;

      case "playerEndedLobbyWait":
        msg = "You decided to stop waiting, we are sorry it was too long a wait.";
        break;

      default:
        msg = "Unfortunately, the Game was cancelled... Either there were not enough players or there was a technical issue with the game. If it was the latter, please contact us and we can restart the game."; // msg = "Unfortunately, the Game was cancelled... Thank you for participating in this game, please submit your MTurk Worker ID to the HIT and we will make sure you get paid accordingly.";

        break;
    }

    if (player.exitReason === "failedQuestion") {
      return /*#__PURE__*/React.createElement(FailedAttentionCheck, null);
    }

    if (player.exitReason === "returnSubmission") {
      msg = "You did not consent to participating for the whole duration of our future games. Please return your submission by closing the survey and clicking 'Stop Without Completing' on Prolific.";
    }

    if (player.exitReason === "inactive") {
      msg = "You were inactive for too long, and we had to end the game. Thank you for participating in this game, you will still get paid including any bonuses for the rounds you successfully passed. Please submit the following completion code: C1FLL9CG"; // msg = "You were inactive for too long, and we had to end the game. Thank you for participating in this game, you will still get paid the base amount including any bonuses for the rounds you successfully passed. Please submit your MTurk Worker Id to the HIT and we will make sure you get paid accordingly.";
    }

    if (player.exitReason === "someoneInactive") {
      msg = "A player was inactive for too long, and we had to end the game. Thank you for participating in this game, you will still get paid including any bonuses for the rounds you successfully passed. Please submit the following completion code: C1FLL9CG"; // msg = "A player was inactive for too long, and we had to end the game. Thank you for participating in this game, you will get paid the base amount including any bonuses for the rounds you successfully passed. Please submit your MTurk Worker ID to the HIT and we will make sure you get paid accordingly. ";
    }

    if (player.exitReason === "failedEnglishScreen") {
      // msg = "You did not pass English Screening. For this game, we require strong communication skills and English fluency. Thank you for taking your time and participating in this game."
      msg = "You did not pass English Screening. For this game, we require strong communication skills and English fluency. Thank you for taking your time and participating in this survey. Please return your submission by closing the survey and clicking 'Stop Without Completing' on Prolific.";
    }

    if (player.exitReason === "minPlayerCountNotMaintained") {
      msg = "Unfortunately, there were too few players active in this game and the game had to be cancelled. Thank you for participating in this game, please submit the following completion code: C1FLL9CG"; // msg = `Unfortunately, there were too few players active in this game and the game had to be cancelled. Thank you for participating in this game, please submit the follow code ${player._id} to the HIT and we will make sure you get paid accordingly. `
    } // Only for dev


    if (!game && Meteor.isDevelopment) {
      msg = "Unfortunately the Game was cancelled because of failed to init Game (only visible in development, check the logs).";
    }

    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Sorry!"), /*#__PURE__*/React.createElement("p", null, "Sorry, you were not able to play today! ", msg), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Please contact the researcher to see if there are more games available."))));
  }

}

Sorry.stepName = "Sorry";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Thanks.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/exit/Thanks.jsx                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Thanks
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 1);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 2);

class Thanks extends React.Component {
  render() {
    const {
      player,
      game
    } = this.props;
    const basePay = game.treatment.basePay;
    const conversionRate = game.treatment.conversionRate;
    return /*#__PURE__*/React.createElement("div", {
      className: "finished"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Finished!"), player.exitReason === "preQualSuccess" ?
    /*#__PURE__*/
    // TODO: mturk
    // <p>Thank you for participating! Please submit the following code to receive your bonus 
    // { basePay && conversionRate ? ` of $${basePay} : ` : " "} 
    // <strong>{player._id}</strong>
    // </p> 
    // TODO: Prolific
    React.createElement("p", null, "Thank you for participating! Please submit the following code: CZ586HD9") : /*#__PURE__*/React.createElement("p", null, "Thank you for participating! Please submit the following code: C1FLL9CG"))));
  }

}

Thanks.stepName = "Thanks";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"game":{"mid-survey":{"MidSurvey1.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/mid-survey/MidSurvey1.jsx                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => MidSurveyOne
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 1);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 2);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 3);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    playerIsOnline,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-radio"
  }, /*#__PURE__*/React.createElement("input", {
    className: "quiz-button",
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange
  }), label, " ", playerIsOnline ? "" : " (offline)");
};

class MidSurveyOne extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};

    this.handleChange = event => {
      const {
        player
      } = this.props;
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      const surveyNumber = player.get("surveyNumber");
      event.preventDefault(); // TODO: log player response to survey question

      player.round.set("survey_".concat(surveyNumber), this.state);
      stage.append("log", {
        verb: "survey_".concat(surveyNumber),
        subjectId: player.id,
        object: this.state,
        at: moment(TimeSync.serverTime(null, 1000))
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      onNext();
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      response
    } = this.state;
    const network = player.get("neighbors");
    const surveyNumber = player.get("surveyNumber");
    const completedWidth = 590 / 5 * surveyNumber;
    const uncompletedWidth = 590 - completedWidth;
    const offset = 590 / 5 * 0.5;
    const stageNumPosition = completedWidth - offset;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " To complete the challenge, please fill in the following questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-heading",
      style: {
        marginLeft: stageNumPosition
      }
    }, " ", surveyNumber, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color-dark.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " Did your group have a leader? If so, who?"), network.map(otherNodeId => {
      const otherPlayer = game.players.find(p => p.get("nodeId") === parseInt(otherNodeId));
      const otherPlayerId = otherPlayer.get("anonymousName"); // const playerIsOnline = otherPlayer.online === true && !otherPlayer.get("inactive");

      const playerIsOnline = !otherPlayer.get("inactive");
      return /*#__PURE__*/React.createElement(Radio, {
        selected: response,
        key: otherPlayerId,
        name: "response",
        value: otherPlayerId,
        label: otherPlayerId,
        playerIsOnline: playerIsOnline,
        onChange: this.handleChange
      });
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "myself",
      label: "Myself",
      playerIsOnline: true,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "team",
      label: "We worked as a team",
      playerIsOnline: true,
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "none",
      label: "Our team did not have a leader",
      playerIsOnline: true,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !response ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !response,
      type: "submit"
    }, " Submit "))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MidSurvey2.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/mid-survey/MidSurvey2.jsx                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => MidSurveyTwo
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Slider;
module.link("meteor/empirica:slider", {
  default(v) {
    Slider = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 4);

class MidSurveyTwo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};

    this.renderLabels = val => {
      if (val === 0) {
        // Min value
        return "".concat(val, " Unhappy");
      } else if (val === 3) {
        return "".concat(val, " Neutral");
      } else if (val === 6) {
        // Max value
        return "".concat(val, " Happy");
      }

      return "";
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      const surveyNumber = player.get("surveyNumber");
      event.preventDefault(); // TODO: log player response to survey question

      player.round.set("survey_".concat(surveyNumber), this.state);
      stage.append("log", {
        verb: "survey_".concat(surveyNumber),
        subjectId: player.id,
        object: this.state,
        at: moment(TimeSync.serverTime(null, 1000))
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      onNext();
    };
  }

  componentDidMount() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    player.get("neighbors").forEach(otherNodeId => {
      const otherPlayerId = game.players.find(p => p.get("nodeId") === parseInt(otherNodeId)).get("anonymousName");
      this.setState({
        [otherPlayerId]: 0
      });
    });
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      response
    } = this.state;
    const network = player.get("neighbors");
    const surveyNumber = player.get("surveyNumber");
    const completedWidth = 590 / 5 * surveyNumber;
    const uncompletedWidth = 590 - completedWidth;
    const offset = 590 / 5 * 0.5;
    const stageNumPosition = completedWidth - offset;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " To complete the challenge, please fill in the following questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-heading",
      style: {
        marginLeft: stageNumPosition
      }
    }, " ", surveyNumber, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color-dark.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " Please rate how well you have been working with each teammate in the recent trials?"), network.map(otherNodeId => {
      const otherPlayer = game.players.find(p => p.get("nodeId") === parseInt(otherNodeId));
      const otherPlayerId = otherPlayer.get("anonymousName"); // const playerIsOnline = otherPlayer.online === true && !otherPlayer.get("inactive");

      const playerIsOnline = !otherPlayer.get("inactive");

      const handleSliderChange = num => {
        // Rounding the number to 2 decimals max
        this.setState({
          [otherPlayerId]: num
        });
        player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      };

      return /*#__PURE__*/React.createElement("div", {
        className: "player-slider-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "player-label"
      }, " ", otherPlayerId, " ", playerIsOnline ? "" : " (offline)", " "), /*#__PURE__*/React.createElement(Slider, {
        key: otherNodeId,
        min: 0,
        max: 6,
        stepSize: 1,
        disabled: false,
        showTrackFill: false,
        name: otherPlayerId,
        value: this.state[otherPlayerId],
        labelRenderer: this.renderLabels,
        onChange: handleSliderChange
      }), /*#__PURE__*/React.createElement("div", {
        className: "slider-value-container",
        style: {
          width: "15%"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "slider-value"
      }, this.state[otherPlayerId], " ")));
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: "arrow-button button-submit",
      type: "submit"
    }, " Submit "))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MidSurvey3.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/mid-survey/MidSurvey3.jsx                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => MidSurveyThree
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Slider;
module.link("meteor/empirica:slider", {
  default(v) {
    Slider = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 4);

class MidSurveyThree extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      sliderValue: 0
    };

    this.handleSliderChange = num => {
      const {
        stage,
        player
      } = this.props; // Rounding the number to 2 decimals max

      this.setState({
        sliderValue: num
      });
      player.stage.set("sliderValue", num);
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    };

    this.renderLabels = val => {
      if (val === 0) {
        // Min value
        return "".concat(val, " Unhappy");
      } else if (val === 3) {
        return "".concat(val, " Neutral");
      } else if (val === 6) {
        // Max value
        return "".concat(val, " Happy");
      }

      return "";
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      const surveyNumber = player.get("surveyNumber");
      event.preventDefault(); // TODO: log player response to survey question

      player.round.set("survey_".concat(surveyNumber), this.state);
      stage.append("log", {
        verb: "survey_".concat(surveyNumber),
        subjectId: player.id,
        object: this.state,
        at: moment(TimeSync.serverTime(null, 1000))
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      onNext();
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      response
    } = this.state;
    const surveyNumber = player.get("surveyNumber");
    const completedWidth = 590 / 5 * surveyNumber;
    const uncompletedWidth = 590 - completedWidth;
    const offset = 590 / 5 * 0.5;
    const stageNumPosition = completedWidth - offset;
    const sliderValue = this.state.sliderValue;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " To complete the challenge, please fill in the following questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-heading",
      style: {
        marginLeft: stageNumPosition
      }
    }, " ", surveyNumber, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color-dark.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " How did you like your job in the team during the recent trials? "), /*#__PURE__*/React.createElement(Slider, {
      min: 0,
      max: 6,
      stepSize: 1,
      disabled: false,
      showTrackFill: false,
      value: sliderValue,
      labelRenderer: this.renderLabels,
      onChange: this.handleSliderChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "slider-value-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "slider-value"
    }, sliderValue, " "))), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: "arrow-button button-submit",
      type: "submit"
    }, " Submit "))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MidSurvey4.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/mid-survey/MidSurvey4.jsx                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => MidSurveyFour
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Slider;
module.link("meteor/empirica:slider", {
  default(v) {
    Slider = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 4);

class MidSurveyFour extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      sliderValue: 0
    };

    this.handleSliderChange = num => {
      const {
        stage,
        player
      } = this.props; // Rounding the number to 2 decimals max

      this.setState({
        sliderValue: num
      });
      player.stage.set("sliderValue", num);
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    };

    this.renderLabels = val => {
      if (val === 0) {
        // Min value
        return "".concat(val, " Poor");
      } else if (val === 3) {
        return "".concat(val, " Neutral");
      } else if (val === 6) {
        // Max value
        return "".concat(val, " Great");
      }

      return "";
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      const surveyNumber = player.get("surveyNumber");
      event.preventDefault(); // TODO: log player response to survey question

      player.round.set("survey_".concat(surveyNumber), this.state);
      stage.append("log", {
        verb: "survey_".concat(surveyNumber),
        subjectId: player.id,
        object: this.state,
        at: moment(TimeSync.serverTime(null, 1000))
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      onNext();
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      response
    } = this.state;
    const surveyNumber = player.get("surveyNumber");
    const completedWidth = 590 / 5 * surveyNumber;
    const uncompletedWidth = 590 - completedWidth;
    const offset = 590 / 5 * 0.5;
    const stageNumPosition = completedWidth - offset;
    const sliderValue = this.state.sliderValue;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " To complete the challenge, please fill in the following questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-heading",
      style: {
        marginLeft: stageNumPosition
      }
    }, " ", surveyNumber, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color-dark.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " On the scale below, rate how your team has been working in the recent trials "), /*#__PURE__*/React.createElement(Slider, {
      min: 0,
      max: 6,
      stepSize: 1,
      disabled: false,
      showTrackFill: false,
      value: sliderValue,
      labelRenderer: this.renderLabels,
      onChange: this.handleSliderChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "slider-value-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "slider-value"
    }, sliderValue, " "))), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: "arrow-button button-submit",
      type: "submit"
    }, " Submit "))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MidSurvey5.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/mid-survey/MidSurvey5.jsx                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => MidSurveyFive
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Slider;
module.link("meteor/empirica:slider", {
  default(v) {
    Slider = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 4);

class MidSurveyFive extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      response: ""
    };
    this.updateLastActive = _.throttle(player => player.set("lastActive", moment(TimeSync.serverTime(null, 1000))), 5000, {
      leading: true
    });

    this.handleChange = event => {
      const {
        player
      } = this.props;
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
      this.updateLastActive(player);
    };

    this.handleSliderChange = num => {
      const {
        stage,
        player
      } = this.props; // Rounding the number to 2 decimals max

      this.setState({
        sliderValue: num
      });
      player.stage.set("sliderValue", num);
    };

    this.renderLabels = val => {
      if (val === 0) {
        // Min value
        return "".concat(val, " Unhappy");
      } else if (val === 3) {
        return "".concat(val, " Neutral");
      } else if (val === 6) {
        // Max value
        return "".concat(val, " Happy");
      }

      return "";
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      const surveyNumber = player.get("surveyNumber");
      event.preventDefault(); // TODO: log player response to survey question

      player.round.set("survey_".concat(surveyNumber), this.state);
      stage.append("log", {
        verb: "survey_".concat(surveyNumber),
        subjectId: player.id,
        object: this.state,
        at: moment(TimeSync.serverTime(null, 1000))
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      player.set("submitted", true);
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      response
    } = this.state;
    const submitted = player.get("submitted");
    const surveyNumber = player.get("surveyNumber");
    const completedWidth = 590 / 5 * surveyNumber;
    const uncompletedWidth = 590 - completedWidth;
    const offset = 590 / 5 * 0.5;
    const stageNumPosition = completedWidth - offset;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " To complete the challenge, please fill in the following questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "completed-heading",
      style: {
        marginLeft: stageNumPosition
      }
    }, " ", surveyNumber, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color-dark.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "7px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " Do you think your group could improve its efficiency? If so, how? "), /*#__PURE__*/React.createElement("textarea", {
      className: "survey-textarea",
      dir: "auto",
      id: "response",
      name: "response",
      value: response,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !response ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !response,
      type: "submit"
    }, " Submit "))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"About.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/About.jsx                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => About
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);

class About extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "Here be the presentation of the experiement(ers).");
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"GameTimer.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/GameTimer.jsx                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let StageTimeWrapper;
module.link("meteor/empirica:core", {
  StageTimeWrapper(v) {
    StageTimeWrapper = v;
  }

}, 0);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);

class timer extends React.Component {
  render() {
    const {
      remainingSeconds,
      game
    } = this.props;
    const classes = ["timer"];

    if (remainingSeconds <= 5) {
      classes.push("lessThan5");
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10");
    }

    const gameStartTime = moment(game.get("gameStartTime"));
    const gameEndTime = moment(game.get("maxGameEndTime"));
    const currentTime = moment(TimeSync.serverTime(null, 1000));
    const timeDiff = gameEndTime.diff(currentTime, 'seconds');
    const activePlayers = game.players.filter(p => !p.get("inactive"));

    if (timeDiff < 0) {
      activePlayers.forEach(p => {
        p.exit("maxGameTimeReached");
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      className: classes.join(" "),
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "results-text",
      style: {
        margin: "0px 0px"
      }
    }, "Total Game Time Left: ", timeDiff)));
  }

}

module.exportDefault(GameTimer = StageTimeWrapper(timer));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"InactiveTimer.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/InactiveTimer.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Timer;
module.link("./Timer.jsx", {
  default(v) {
    Timer = v;
  }

}, 1);
let StageTimeWrapper;
module.link("meteor/empirica:core", {
  StageTimeWrapper(v) {
    StageTimeWrapper = v;
  }

}, 2);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 3);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 4);
let Modal;
module.link("./Modal", {
  default(v) {
    Modal = v;
  }

}, 5);

let _;

module.link("lodash", {
  default(v) {
    _ = v;
  }

}, 6);

class inactiveTimer extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenModal = () => {
      this.setState({
        modalIsOpen: true
      });
    };

    this.onCloseModal = () => {
      const {
        player,
        game
      } = this.props;
      const inactiveDuration = game.treatment.userInactivityDuration;
      const extra30Seconds = inactiveDuration - game.treatment.idleWarningTime;

      if (!player.get("inactiveWarningUsed")) {
        player.set("lastActive", moment(TimeSync.serverTime(null, 1000)).subtract(extra30Seconds, 'seconds'));
        player.set("inactiveWarningUsed", true);
      }

      this.setState({
        modalIsOpen: false
      });
    };

    this.onPlayerInactive = (player, game) => {
      if (player.get("inactive") === false) {
        player.set("inactive", true);
        player.set("submitted", false);
        game.set("checkForSimilarSymbol", true);
      }
    };

    this.checkEveryoneLastActive = _.throttle((game, player) => {
      const currentTime = moment(TimeSync.serverTime(null, 1000));
      const inactiveDuration = game.treatment.userInactivityDuration;
      const inactiveDurationPlus30 = inactiveDuration + game.treatment.idleWarningTime;
      const activePlayers = game.players.filter(p => !p.get("inactive"));
      activePlayers.forEach(p => {
        const playerLastActive = p.get("lastActive");
        const timeDiff = currentTime.diff(playerLastActive, 'seconds');

        if (!p.get("inactiveWarningUsed")) {
          if (timeDiff >= inactiveDurationPlus30) {
            this.onPlayerInactive(p, game);
            p.exit("inactive");
          } else if (timeDiff >= inactiveDuration) {
            if (!this.state.modalIsOpen && p._id === player._id) {
              this.onOpenModal();
            }
          }
        } else {
          if (timeDiff >= inactiveDuration) {
            this.onPlayerInactive(p, game);
            p.exit("inactive");
          }
        }
      });
    }, 1000, {
      leading: true
    });
    this.state = {
      modalIsOpen: false
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    this.checkEveryoneLastActive(game, player); // const currentTime = moment(TimeSync.serverTime(null, 1000));
    // const inactiveDuration = game.treatment.userInactivityDuration;
    // const inactiveDurationPlus30 = inactiveDuration + game.treatment.idleWarningTime;
    // const activePlayers = game.players.filter(p => !p.get("inactive"));
    // activePlayers.forEach((p) => {
    //     console.log("checking");
    //     const playerLastActive = p.get("lastActive");
    //     const timeDiff = currentTime.diff(playerLastActive, 'seconds');
    //     if (!p.get("inactiveWarningUsed")) {
    //         if (timeDiff >= inactiveDurationPlus30) {
    //             this.onPlayerInactive(p,game);
    //             p.exit("inactive");
    //         }
    //         else if (timeDiff >= inactiveDuration) {
    //             if (!this.state.modalIsOpen && p._id === player._id){
    //                 this.onOpenModal();
    //             }
    //         }
    //     } else {
    //         if (timeDiff >= inactiveDuration) {
    //             this.onPlayerInactive(p,game);
    //             p.exit("inactive");
    //         }
    //     }
    // })
    // const playerLastActive = player.get("lastActive");
    // const inactiveDuration = game.treatment.userInactivityDuration;
    // const timeDiff = currentTime.diff(playerLastActive, 'seconds');
    // if (timeDiff >= inactiveDuration) {
    //     this.onPlayerInactive();
    //     player.exit("inactive");
    //     // this.onPlayerInactive();
    // } else if (timeDiff > inactiveDuration - game.treatment.idleWarningTime) {
    //     if (!this.state.modalIsOpen) {
    //         this.onOpenModal();
    //     }
    // }

    const currentTime = moment(TimeSync.serverTime(null, 1000));
    const playerLastActive = player.get("lastActive");
    const timeDiffForMe = currentTime.diff(playerLastActive, 'seconds');
    return /*#__PURE__*/React.createElement("div", null, this.state.modalIsOpen && /*#__PURE__*/React.createElement(Modal, {
      game: game,
      player: player,
      onCloseModal: this.onCloseModal
    }), "Last Active: ", timeDiffForMe);
  }

}

module.exportDefault(InactiveTimer = StageTimeWrapper(inactiveTimer));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Modal.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/Modal.jsx                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Modal
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);

class Modal extends React.Component {
  render() {
    const {
      game,
      player,
      onCloseModal
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "dark-bg",
      onClick: onCloseModal
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-centered"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, "Warning, you seem to be inactive. This was your ONE warning. Next time, you will be kicked without a warning. If you are still inactive in the next ", game.treatment.idleWarningTime, " seconds, you will be kicked. Do you understand?"), /*#__PURE__*/React.createElement("button", {
      className: "modal-button",
      onClick: onCloseModal
    }, "Yes"))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MyNetwork.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/MyNetwork.jsx                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => MyNetwork
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let PlayerTab;
module.link("./PlayerTab", {
  default(v) {
    PlayerTab = v;
  }

}, 1);

class MyNetwork extends React.Component {
  render() {
    const {
      game,
      stage,
      round,
      player,
      onOpenChat
    } = this.props;
    const network = player.get("neighbors");
    return /*#__PURE__*/React.createElement("div", {
      className: "network-container"
    }, /*#__PURE__*/React.createElement("p", {
      className: "network-header"
    }, " MY NETWORK"), /*#__PURE__*/React.createElement("div", {
      className: "network-all-players-container"
    }, network.map(otherNodeId => {
      // const otherPlayerId = game.players.find(p => p.get("nodeId") === parseInt(otherNodeId)).id;
      return /*#__PURE__*/React.createElement(PlayerTab, {
        game: game,
        otherPlayerNodeId: otherNodeId,
        openChat: onOpenChat
      });
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PlayerProfile.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/PlayerProfile.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => PlayerProfile
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Timer;
module.link("./Timer.jsx", {
  default(v) {
    Timer = v;
  }

}, 1);

class PlayerProfile extends React.Component {
  renderProfile() {
    const {
      player
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "profile-score"
    }, /*#__PURE__*/React.createElement("h3", null, "Your Profile"), /*#__PURE__*/React.createElement("img", {
      src: player.get("avatar"),
      className: "profile-avatar"
    }));
  }

  renderScore() {
    const {
      player
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "profile-score"
    }, /*#__PURE__*/React.createElement("h4", null, "Total score"), /*#__PURE__*/React.createElement("span", null, (player.get("score") || 0).toFixed(2)));
  }

  render() {
    const {
      stage
    } = this.props;
    return /*#__PURE__*/React.createElement("aside", {
      className: "player-profile"
    }, this.renderProfile(), this.renderScore(), /*#__PURE__*/React.createElement(Timer, {
      stage: stage
    }));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PlayerTab.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/PlayerTab.jsx                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => PlayerTab
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);

class PlayerTab extends React.Component {
  constructor() {
    super(...arguments);

    this.handleOpenChat = () => {
      const {
        otherPlayerNodeId,
        openChat
      } = this.props;
      openChat(otherPlayerNodeId);
    };
  }

  render() {
    const {
      game,
      otherPlayerNodeId,
      openChat
    } = this.props;
    const otherPlayerId = game.players.find(p => p.get("nodeId") === parseInt(otherPlayerNodeId)).id;
    return /*#__PURE__*/React.createElement("div", {
      className: "network-player-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "network-name-container",
      onClick: this.handleOpenChat
    }, otherPlayerId), /*#__PURE__*/React.createElement("div", {
      className: "network-avatar-container"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/icon-profile-white.png",
      width: "25px",
      height: "25px"
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Results.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/Results.jsx                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Round
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Timer;
module.link("./Timer.jsx", {
  default(v) {
    Timer = v;
  }

}, 1);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 2);

class Round extends React.Component {
  render() {
    const {
      stage,
      round,
      game
    } = this.props;
    const result = round.get("result");
    const correctMessage = "Your team was correct, congratulations!";
    const incorrectMessage = "Your team was not correct, better luck on the next one.";
    return /*#__PURE__*/React.createElement("div", {
      className: "results-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "results-content"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "results-text"
    }, " ", result ? correctMessage : incorrectMessage, " "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "200px",
      height: "3px"
    }), /*#__PURE__*/React.createElement(Timer, {
      stage: stage
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Round.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/Round.jsx                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let _extends;

module.link("@babel/runtime/helpers/extends", {
  default(v) {
    _extends = v;
  }

}, 0);
module.export({
  default: () => Round
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let PlayerProfile;
module.link("./PlayerProfile.jsx", {
  default(v) {
    PlayerProfile = v;
  }

}, 1);
let SocialExposure;
module.link("./SocialExposure.jsx", {
  default(v) {
    SocialExposure = v;
  }

}, 2);
let MyNetwork;
module.link("./MyNetwork.jsx", {
  default(v) {
    MyNetwork = v;
  }

}, 3);
let RoundMetaData;
module.link("./RoundMetaData.jsx", {
  default(v) {
    RoundMetaData = v;
  }

}, 4);
let Results;
module.link("./Results.jsx", {
  default(v) {
    Results = v;
  }

}, 5);
let Task;
module.link("./Task.jsx", {
  default(v) {
    Task = v;
  }

}, 6);
let MidSurveyOne;
module.link("./mid-survey/MidSurvey1", {
  default(v) {
    MidSurveyOne = v;
  }

}, 7);
let MidSurveyTwo;
module.link("./mid-survey/MidSurvey2", {
  default(v) {
    MidSurveyTwo = v;
  }

}, 8);
let MidSurveyThree;
module.link("./mid-survey/MidSurvey3", {
  default(v) {
    MidSurveyThree = v;
  }

}, 9);
let MidSurveyFour;
module.link("./mid-survey/MidSurvey4", {
  default(v) {
    MidSurveyFour = v;
  }

}, 10);
let MidSurveyFive;
module.link("./mid-survey/MidSurvey5", {
  default(v) {
    MidSurveyFive = v;
  }

}, 11);
let InactiveTimer;
module.link("./InactiveTimer.jsx", {
  default(v) {
    InactiveTimer = v;
  }

}, 12);
let Modal;
module.link("./Modal", {
  default(v) {
    Modal = v;
  }

}, 13);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 14);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 15);
let GameTimer;
module.link("./GameTimer.jsx", {
  default(v) {
    GameTimer = v;
  }

}, 16);

class Round extends React.Component {
  constructor(props) {
    super(props);
    this.audio = new Audio("sounds/Game Start Countdown Sound.wav");

    this.onOpenModal = () => {
      this.setState({
        modalIsOpen: true
      });
    };

    this.onCloseModal = () => {
      const {
        player
      } = this.props;
      this.setState({
        modalIsOpen: false
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    };

    this.onNext = () => {
      const {
        player
      } = this.props;
      const curSurveyNumber = player.get("surveyNumber");
      player.set("surveyNumber", curSurveyNumber + 1);
    };

    this.renderSurvey = () => {
      const {
        game,
        player
      } = this.props;
      const submitted = player.get("submitted");

      if (submitted) {
        return this.renderSubmitted();
      }

      const surveyNumber = player.get("surveyNumber");

      if (surveyNumber === 1) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MidSurveyOne, _extends({}, this.props, {
          onNext: this.onNext
        })), /*#__PURE__*/React.createElement(InactiveTimer, {
          game: game,
          player: player
        }));
      } else if (surveyNumber === 2) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MidSurveyTwo, _extends({}, this.props, {
          onNext: this.onNext
        })), /*#__PURE__*/React.createElement(InactiveTimer, {
          game: game,
          player: player
        }));
      } else if (surveyNumber === 3) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MidSurveyThree, _extends({}, this.props, {
          onNext: this.onNext
        })), /*#__PURE__*/React.createElement(InactiveTimer, {
          game: game,
          player: player
        }));
      } else if (surveyNumber === 4) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MidSurveyFour, _extends({}, this.props, {
          onNext: this.onNext
        })), /*#__PURE__*/React.createElement(InactiveTimer, {
          game: game,
          player: player
        }));
      } else if (surveyNumber === 5) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MidSurveyFive, _extends({}, this.props, {
          onNext: this.onNext
        })), /*#__PURE__*/React.createElement(InactiveTimer, {
          game: game,
          player: player
        }));
      }
    };

    this.state = {
      // activeChats : [],
      modalIsOpen: false
    };
  }

  componentDidMount() {
    const {
      round,
      stage,
      player
    } = this.props; // Set the player's first activity at the start of the round

    player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));

    if (round.index === 0 && stage.index === 0) {
      // Play game start sound cue
      this.audio.play();
    }
  }

  renderSubmitted() {
    const {
      stage,
      round,
      player,
      game
    } = this.props; // Create a list of dots to show how many players submitted
    // const completedWidth = 590/game.players.length * round.get("numPlayersSubmitted");
    // const uncompletedWidth = 590 - completedWidth;

    const windowOffset = 75; // const numActivePlayers = game.players.filter(p => p.online === true && !p.get("inactive")).length;

    const numActivePlayers = game.players.filter(p => !p.get("inactive")).length;
    let completedWidth = window.innerWidth / numActivePlayers * round.get("numPlayersSubmitted");
    let uncompletedWidth = window.innerWidth - completedWidth;
    completedWidth -= windowOffset;
    uncompletedWidth -= windowOffset; // <div className="completed-bar">
    //     <img src={`images/hr-color.png`} width={`${completedWidth} px`} height="7px" />
    // </div>

    const currentTime = moment(TimeSync.serverTime(null, 1000));
    const playerLastActive = player.get("lastActive");
    const timeDiff = currentTime.diff(playerLastActive, 'seconds');

    if (timeDiff > 10) {
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "survey-wait-container"
    }, /*#__PURE__*/React.createElement("img", {
      className: "survey-wait-static-image",
      src: "images/title-please-hold.png"
    }), /*#__PURE__*/React.createElement("div", {
      className: "survey-wait-content"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "results-text"
    }, "Waiting for all members "), /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "".concat(completedWidth, " px"),
      height: "3px"
    }), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-white.png",
      width: "".concat(uncompletedWidth, " px"),
      height: "3px"
    }))));
  }

  render() {
    const {
      stage,
      round,
      player,
      game
    } = this.props; // const numActivePlayers = game.players.filter(p => p.online === true && !p.get("inactive")).length;

    const numActivePlayers = game.players.filter(p => !p.get("inactive")).length;

    if (stage.name === "Result") {
      return /*#__PURE__*/React.createElement("div", {
        className: "round"
      }, /*#__PURE__*/React.createElement(Results, {
        game: game,
        round: round,
        stage: stage
      }));
    } else if (stage.name === "Survey") {
      return this.renderSurvey();
    } else {
      // Load the round
      return /*#__PURE__*/React.createElement("div", {
        className: "round"
      }, /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "round-task-container"
      }, /*#__PURE__*/React.createElement(RoundMetaData, {
        game: game,
        round: round,
        stage: stage,
        player: player
      }), /*#__PURE__*/React.createElement(Task, {
        game: game,
        round: round,
        stage: stage,
        player: player
      })), /*#__PURE__*/React.createElement(SocialExposure, {
        game: game,
        round: round,
        stage: stage,
        player: player // onOpenChat = {(otherPlayerNodeId) => this.onOpenChat(otherPlayerNodeId)} 
        // onCloseChat={(customKey) => this.onCloseChat(customKey)} 
        ,
        activeChats: this.state.activeChats
      })));
    }
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"RoundMetaData.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/RoundMetaData.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => RoundMetaData
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Timer;
module.link("./Timer.jsx", {
  default(v) {
    Timer = v;
  }

}, 1);
let TaskTimer;
module.link("./TaskTimer.jsx", {
  default(v) {
    TaskTimer = v;
  }

}, 2);
let InactiveTimer;
module.link("./InactiveTimer", {
  default(v) {
    InactiveTimer = v;
  }

}, 3);

class RoundMetaData extends React.Component {
  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const taskWarningTime = game.treatment.taskWarningTime;
    const playerId = player.id;
    const taskName = stage.displayName;
    const totalTaskRounds = game.treatment.numTaskRounds;
    const playerScore = player.get("score"); // const allSymbols = [];
    // game.players.forEach(player => {
    //     const taskSymbols = 
    // })

    return /*#__PURE__*/React.createElement("div", {
      className: "metadata-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "round-number-container"
    }, /*#__PURE__*/React.createElement("div", null, " ", taskName, " of ", totalTaskRounds, " "), /*#__PURE__*/React.createElement("div", null, " Current Score : ", playerScore, " ")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    }, game.treatment.maxGameTime && /*#__PURE__*/React.createElement(GameTimer, {
      game: game
    }), /*#__PURE__*/React.createElement("p", null, "Your player name is ", player.get("anonymousName"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, taskWarningTime && /*#__PURE__*/React.createElement(TaskTimer, {
      game: game,
      stage: stage,
      player: player
    }), /*#__PURE__*/React.createElement(InactiveTimer, {
      game: game,
      player: player
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SocialExposure.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/SocialExposure.jsx                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => SocialExposure
});
module.link("../chat/style.less");
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Chat;
module.link("@empirica/chat", {
  Chat(v) {
    Chat = v;
  }

}, 1);
let ChatContainer;
module.link("../chat/ChatContainer.js", {
  default(v) {
    ChatContainer = v;
  }

}, 2);
let Message;
module.link("../chat/Message.js", {
  default(v) {
    Message = v;
  }

}, 3);
let Footer;
module.link("../chat/Footer.js", {
  default(v) {
    Footer = v;
  }

}, 4);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 5);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 6);
let Slider;
module.link("meteor/empirica:slider", {
  default(v) {
    Slider = v;
  }

}, 7);

class SocialExposure extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenChat = customKey => {
      const {
        player
      } = this.props;

      if (!this.state.activeChats.includes(customKey)) {
        this.state.activeChats.push(customKey);
        player.set("activeChats", this.state.activeChats);
      }
    };

    this.onCloseChat = customKey => {
      const {
        player
      } = this.props;
      const newActiveChats = this.state.activeChats.filter(chat => chat !== customKey);
      this.setState({
        activeChats: newActiveChats
      });
      player.set("activeChats", newActiveChats);
    };

    this.audio = new Audio("sounds/notification-sound-7062.mp3");

    this.logIncomingMessage = (msgs, customKey) => {
      const {
        game,
        round,
        stage,
        player
      } = this.props;
      const messages = round.get("".concat(customKey));
      const mostRecentMsg = messages[messages.length - 1];
      const sender = mostRecentMsg.player._id; // TODO: Check if this only appends if player chat is open
      // onIncomingMessage logs the message for both sender and receiver
      // Only log one copy of the message

      if (player._id === sender) {
        const pairOfPlayers = customKey.split("-");
        const receiverId = pairOfPlayers.filter(id => parseInt(id) !== player.get("nodeId"));
        const receiver = game.players.find(p => p.get("nodeId") === parseInt(receiverId));
        const receiverChats = receiver.get("activeChats");

        if (!receiverChats.includes(customKey)) {
          const newReceiverChats = [...receiverChats, customKey];
          receiver.set("activeChats", newReceiverChats);
          receiver.set("getNotified", true);
        }
      }

      if (player._id !== sender) {
        stage.append("log", {
          verb: "messageLog",
          subjectId: player.id,
          object: mostRecentMsg,
          at: moment(TimeSync.serverTime(null, 1000))
        });
        const activeChats = player.get("activeChats");

        if (!activeChats.includes(customKey)) {
          console.log("Chat closed but message delivered");
        }

        this.audio.play();
      }
    };

    this.state = {
      activeChats: []
    };
  }

  componentDidMount() {
    const {
      player
    } = this.props; // Set the player's first activity at the start of the round

    const activeChats = player.get("activeChats");
    this.setState({
      activeChats: activeChats
    });
  }

  render() {
    const {
      game,
      round,
      player,
      activeChats
    } = this.props;
    const network = player.get("neighbors"); // reactive time value only updates at 1000 ms

    const timeStamp = new Date(TimeSync.serverTime(null, 1000));

    if (player.get("getNotified")) {
      this.audio.play();
      player.set("getNotified", false);
    }

    if (network.length === 0) {
      return null;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "all-chats-container"
    }, network.map(otherNodeId => {
      var pairOfPlayers = [player.get("nodeId"), parseInt(otherNodeId)];
      pairOfPlayers.sort((p1, p2) => p1 - p2);
      const otherPlayer = game.players.find(p => p.get("nodeId") === parseInt(otherNodeId));
      const otherPlayerId = otherPlayer.get("anonymousName"); // const playerIsOnline = otherPlayer.online === true && !otherPlayer.get("inactive");

      const playerIsOnline = !otherPlayer.get("inactive");
      const chatKey = "".concat(pairOfPlayers[0], "-").concat(pairOfPlayers[1]);
      const activeChats = player.get("activeChats");
      return (
        /*#__PURE__*/
        // <div style={{height: "80%"}}>
        React.createElement(ChatContainer, {
          docked: true,
          key: otherNodeId,
          player: player,
          otherPlayer: otherPlayerId,
          scope: round,
          timeStamp: timeStamp,
          customClassName: "ray-chat-container",
          message: Message,
          footer: Footer,
          onIncomingMessage: this.logIncomingMessage,
          customKey: chatKey // isActive={activeChats.includes(chatKey)}
          ,
          isOpen: activeChats.includes(chatKey),
          playerIsOnline: playerIsOnline,
          onOpenChat: customKey => this.onOpenChat(customKey),
          onCloseChat: customKey => this.onCloseChat(customKey)
        }) // </div>

      );
    }));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SymbolButton.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/SymbolButton.jsx                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => SymbolButton
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);

class SymbolButton extends React.Component {
  /* 
    @prop id - id of the symbol
    @prop name - name of the symbol (TESTING PURPOSES)
  */
  constructor(props) {
    super(props);

    this.handleClick = () => {
      const {
        game,
        player,
        stage,
        name,
        handleButtonSelect
      } = this.props;

      if (!player.get("submitted")) {
        player.set("symbolSelected", name);
        handleButtonSelect(name);
      }
    };
  } // When button is selected, player sets the id of the button he selected


  render() {
    const {
      game,
      stage,
      player,
      name,
      selected,
      totalSymbols
    } = this.props;
    const size = 100 / totalSymbols;
    return /*#__PURE__*/React.createElement("div", {
      className: "symbol-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: "".concat(selected ? "symbolButtonSelected" : "symbolButtonUnselected", " ").concat(player.get("submitted") ? "noHover" : ""),
      onClick: this.handleClick
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/symbols/tangrams/".concat(name, ".png"),
      style: {
        maxWidth: "100%",
        maxHeight: "100%"
      }
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Task.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/Task.jsx                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Task
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let TaskResponse;
module.link("./TaskResponse", {
  default(v) {
    TaskResponse = v;
  }

}, 1);

class Task extends React.Component {
  render() {
    const {
      stage,
      player,
      game
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "task-container"
    }, /*#__PURE__*/React.createElement(TaskResponse, this.props));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"TaskResponse.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/TaskResponse.jsx                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => TaskResponse
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Slider;
module.link("meteor/empirica:slider", {
  default(v) {
    Slider = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);
let SymbolButton;
module.link("./SymbolButton.jsx", {
  default(v) {
    SymbolButton = v;
  }

}, 4);

class TaskResponse extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = event => {
      const {
        stage,
        player,
        game
      } = this.props;
      event.preventDefault();
      stage.append("log", {
        verb: "playerSubmitted",
        subjectId: player.id,
        object: true,
        at: moment(TimeSync.serverTime(null, 1000))
      });
      player.set("submitted", true);
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    };

    this.handleReconsider = event => {
      const {
        stage,
        player,
        game
      } = this.props;
      event.preventDefault();
      player.set("submitted", false);
      stage.append("log", {
        verb: "playerReconsidered",
        subjectId: player.id,
        object: true,
        at: moment(TimeSync.serverTime(null, 1000))
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000))); // this.setState({selectedButton: ""});
    };

    this.handleButtonSelect = symbolName => {
      const {
        stage,
        player,
        game
      } = this.props; // stage.set("selectedButton", symbolName);

      this.setState({
        selectedButton: symbolName
      });
      stage.append("log", {
        verb: "selectingSymbol",
        subjectId: player.id,
        object: symbolName,
        at: moment(TimeSync.serverTime(null, 1000))
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    };

    this.state = {
      selectedButton: props.player.get("symbolSelected") | ""
    };
  }

  renderSubmitted() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Waiting on other players..."), "Please wait until all players are ready. If you would like to reconsider your answer, click on the reconsider button.");
  }

  renderSlider() {
    const {
      player
    } = this.props;
    const value = player.round.get("value");
    return /*#__PURE__*/React.createElement(Slider, {
      min: 0,
      max: 1,
      stepSize: 0.01,
      labelStepSize: 0.25,
      onChange: this.handleChange,
      value: value,
      hideHandleOnEmpty: true
    });
  }

  renderButton() {
    const {
      stage,
      player,
      game
    } = this.props; // const task = stage.get("task");

    const selectedSymbol = player.get("symbolSelected");
    const task = player.get("".concat(stage.displayName));
    return task.map(symbol => /*#__PURE__*/React.createElement(SymbolButton, {
      key: symbol,
      name: symbol,
      handleButtonSelect: symbolName => this.handleButtonSelect(symbolName),
      selected: selectedSymbol === symbol,
      stage: stage,
      game: game,
      player: player,
      totalSymbols: task.length
    }));
  }

  render() {
    const {
      stage,
      round,
      player,
      game
    } = this.props;
    const selected = player.get("symbolSelected");
    const submitted = player.get("submitted"); // Create a list of dots to show how many players submitted

    const playersSubmitted = round.get("numPlayersSubmitted"); // const numActivePlayers = game.players.filter(p => p.online === true && !p.get("inactive")).length;

    const numActivePlayers = game.players.filter(p => !p.get("inactive")).length;
    const playersNotSubmitted = numActivePlayers - playersSubmitted;
    let filledDots = [];
    let unfilledDots = [];

    for (let i = 0; i < playersSubmitted; i++) {
      filledDots.push( /*#__PURE__*/React.createElement("span", {
        className: "filled-dot"
      }));
    }

    for (let i = 0; i < playersNotSubmitted; i++) {
      unfilledDots.push( /*#__PURE__*/React.createElement("span", {
        className: "empty-dot"
      }));
    } // If the player already submitted, don't show the slider or submit button


    const disabled = player.get("submitted");
    return /*#__PURE__*/React.createElement("div", {
      className: "task-response-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "task-response-header"
    }, /*#__PURE__*/React.createElement("p", {
      className: "header"
    }, " MY CARD"), /*#__PURE__*/React.createElement("div", {
      className: "submission-dots-container"
    }, /*#__PURE__*/React.createElement("p", {
      className: "header"
    }, " SUBMITTED ANSWERS "), filledDots, unfilledDots)), /*#__PURE__*/React.createElement("div", {
      className: "task-response-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "task-response"
    }, this.renderButton())), /*#__PURE__*/React.createElement("div", {
      className: "button-container"
    }, /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit,
      style: {
        opacity: submitted ? 0 : 1
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: !selected || submitted ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !selected || submitted ? true : false,
      type: "submit"
    }, " Submit ")), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleReconsider,
      style: {
        opacity: !submitted ? 0 : 1
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: !submitted ? "arrow-button button-reconsider-disabled" : "arrow-button button-reconsider",
      disabled: !submitted ? true : false
    }, " Reconsider "))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"TaskTimer.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/TaskTimer.jsx                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Timer;
module.link("./Timer.jsx", {
  default(v) {
    Timer = v;
  }

}, 1);
let StageTimeWrapper;
module.link("meteor/empirica:core", {
  StageTimeWrapper(v) {
    StageTimeWrapper = v;
  }

}, 2);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 3);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 4);
let TaskWarningModal;
module.link("./TaskWarningModal", {
  default(v) {
    TaskWarningModal = v;
  }

}, 5);

class taskTimer extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenModal = () => {
      this.setState({
        modalIsOpen: true,
        warningShown: true
      });
    };

    this.onCloseModal = () => {
      const {
        player
      } = this.props;
      this.setState({
        modalIsOpen: false
      });
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
    };

    this.state = {
      modalIsOpen: false,
      warningShown: false
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player,
      remainingSeconds
    } = this.props;
    const taskWarningTime = game.treatment.taskWarningTime;
    const classes = ["timer"];

    if (remainingSeconds <= 5) {
      classes.push("lessThan5");
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10");
    }

    if (remainingSeconds <= taskWarningTime && !this.state.modalIsOpen && !this.state.warningShown) {
      this.onOpenModal();
    }

    return /*#__PURE__*/React.createElement("div", {
      className: classes.join(" "),
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "results-text",
      style: {
        margin: "0px 0px"
      }
    }, "Time Left for Task: ", remainingSeconds)), this.state.modalIsOpen && /*#__PURE__*/React.createElement(TaskWarningModal, {
      game: game,
      player: player,
      onCloseModal: this.onCloseModal
    }));
  }

}

module.exportDefault(TaskTimer = StageTimeWrapper(taskTimer));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"TaskWarningModal.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/TaskWarningModal.jsx                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => TaskWarningModal
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);

class TaskWarningModal extends React.Component {
  render() {
    const {
      game,
      player,
      onCloseModal
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "dark-bg",
      onClick: onCloseModal
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-centered"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, "Warning, this round is ending in 30 seconds. Please submit your final answer."), /*#__PURE__*/React.createElement("button", {
      className: "modal-button",
      onClick: onCloseModal
    }, "Okay"))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Timer.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/game/Timer.jsx                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let StageTimeWrapper;
module.link("meteor/empirica:core", {
  StageTimeWrapper(v) {
    StageTimeWrapper = v;
  }

}, 0);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 1);

class timer extends React.Component {
  render() {
    const {
      remainingSeconds,
      stage
    } = this.props;
    const classes = ["timer"];

    if (remainingSeconds <= 5) {
      classes.push("lessThan5");
    } else if (remainingSeconds <= 10) {
      classes.push("lessThan10");
    }

    return /*#__PURE__*/React.createElement("div", {
      className: classes.join(" "),
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }
    }, stage.name === "Result" ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "results-text"
    }, "Next Round In"), /*#__PURE__*/React.createElement("h1", {
      className: "results-text",
      style: {
        margin: "0px 0px"
      }
    }, remainingSeconds)) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "results-text",
      style: {
        margin: "0px 0px"
      }
    }, "Time Left for Task: ", remainingSeconds)));
  }

}

module.exportDefault(Timer = StageTimeWrapper(timer));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"intro":{"english-screening":{"EnglishQuestions.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/english-screening/EnglishQuestions.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  englishScreeningQuestions: () => englishScreeningQuestions
});
const englishScreeningQuestions = [{
  passage: "The car salesman was trying to remember who he promised the special deal this morning.",
  question: "Was the car salesman trying to remember the price of the new car?",
  answer: "No",
  question_number: "1"
}, {
  passage: "The prosecutor had no idea who the lawyer would bring as the expert witness.",
  question: "Was the prosecutor clueless about the identity of the expert witness?",
  answer: "Yes",
  question_number: "2"
}, {
  passage: "The dean tried to figure out why the professor persistently recommended the lecturer who was not qualified for the job.",
  question: "Was the dean puzzled by the professor's recommendation?",
  answer: "Yes",
  question_number: "3"
}, {
  passage: "The surgeon tried to figure out who was assisting the pathologist during the lab tests.",
  question: "Did the surgeon want to know the identity of the pathologist's assistant?",
  answer: "Yes",
  question_number: "4"
}, {
  passage: "The psychology student tried to remember who demonstrated what when.",
  question: "Did the psychology student try to demonstrate something?",
  answer: "No",
  question_number: "5"
}, {
  passage: "The dancer could not figure out what annoyed the choreographer so much recently.",
  question: "Was the dancer annoyed recently?",
  answer: "No",
  question_number: "6"
}, {
  passage: "The statistician tried to figure out who won what.",
  question: "Did the statistician try to win something?",
  answer: "No",
  question_number: "7"
}, {
  passage: "The seamstress tried to remember when she promised the client to finish the dress.",
  question: "Did the seamstress try to remember when the deadline for an order was?",
  answer: "Yes",
  question_number: "8"
}, {
  passage: "The athlete was asking his doctor about what medicine he should take for the pain and how often.",
  question: "Was the doctor asking the athlete about the frequency of his pains?",
  answer: "No",
  question_number: "9"
}, {
  passage: "The trainer could not understand why the tigers were misbehaving.",
  question: "Was the trainer puzzled by the tigers' behavior?",
  answer: "Yes",
  question_number: "10"
} // {
//   passage: "The house owner came downstairs to find out what made such a racket but she didn't see anything suspicious.",
//   question: "Did the house owner make a racket?",
//   answer: "No",
//   question_number: "11",
// },
// {
//   passage: "The students could not wait to find out what surprise the teacher was talking about in class.",
//   question: "Were the students preparing a surprise for the teacher?",
//   answer: "No",
//   question_number: "12",
// },
// {
//   passage: "The secretary for the clinic tried to figure out who prescribed what.",
//   question: "Did the secretary try to prescribe something?",
//   answer: "No",
//   question_number: "13",
// },
// {
//   passage: "The film director could not remember who played the lead role in the film his colleague just finished shooting.",
//   question: "Was the film director trying to remember something about his colleague's film?",
//   answer: "Yes",
//   question_number: "14",
// },
// {
//   passage: "The general was trying to decide when would be the best time to attack.",
//   question: "Was the general planning an attack?",
//   answer: "Yes",
//   question_number: "15",
// },
// {
//   passage: "The writer could not decide who the main character would marry in the end of the novel.",
//   question: "Was the writer trying to figure out the ending of the novel?",
//   answer: "Yes",
//   question_number: "16",
// },
// {
//   passage: "The student tried to find out why he got a bad grade on the test.",
//   question: "Did the student want to know the reason for a bad grade?",
//   answer: "Yes",
//   question_number: "17",
// },
// {
//   passage: "The telemarketer asked who the head of the household was, and the man just hung up the phone.",
//   question: "Did the telemarketer hang up the phone?",
//   answer: "No",
//   question_number: "18",
// },
// {
//   passage: "The administrator tried to remember what who donated to whom.",
//   question: "Did the administrator try to donate something?",
//   answer: "No",
//   question_number: "19",
// },
// {
//   passage: "The farmer was trying to decide what achievement to submit to the fair this year.",
//   question: "Did the farmer decide not to go to the fair this year?",
//   answer: "No",
//   question_number: "20",
// },
];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"EnglishScreen.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/english-screening/EnglishScreen.jsx                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => EnglishScreen
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let englishScreeningQuestions;
module.link("./EnglishQuestions", {
  englishScreeningQuestions(v) {
    englishScreeningQuestions = v;
  }

}, 1);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 2);

const Question = (_ref) => {
  let {
    selected,
    passage,
    question,
    question_number,
    name,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "question-section"
  }, /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-question"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "bold"
    }
  }, "Sentence ", question_number, ": "), passage), /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-question"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "bold"
    }
  }, "Question ", question_number, ": "), question), /*#__PURE__*/React.createElement("div", {
    className: "english-screening-buttons"
  }, /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-radio",
    style: {
      marginRight: "15px"
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "quiz-button",
    type: "radio",
    name: name,
    value: "Yes",
    checked: selected === "Yes",
    onChange: onChange
  }), "Yes"), /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-radio"
  }, /*#__PURE__*/React.createElement("input", {
    className: "quiz-button",
    type: "radio",
    name: name,
    value: "No",
    checked: selected === "No",
    onChange: onChange
  }), "No")), /*#__PURE__*/React.createElement("p", null, "----------------------------------------------------------------------------------------------------"));
};

class EnglishScreen extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      q10: ""
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.passCorrectThreshold = () => {
      const {
        player
      } = this.props;
      let numCorrect = 0;
      const totalNumQuestions = englishScreeningQuestions.length;
      englishScreeningQuestions.forEach(questionSet => {
        const {
          passage,
          question,
          answer,
          question_number
        } = questionSet;

        if (this.state["q".concat(question_number)] === answer) {
          numCorrect += 1;
        }
      });
      player.set("englishScreenPercentage", numCorrect / totalNumQuestions);
      return numCorrect / totalNumQuestions >= 0.8;
    };

    this.handleSubmit = event => {
      const {
        hasPrev,
        hasNext,
        onNext,
        onPrev,
        game,
        player
      } = this.props;
      event.preventDefault();
      player.set("name", player.id);

      if (this.passCorrectThreshold()) {
        player.set("englishScreenPassed", this.state);
        onNext();
      } else {
        player.set("englishScreenFailed", this.state);
        player.exit("failedEnglishScreen");
      }
    };
  }

  componentDidMount() {
    const {
      player
    } = this.props;
    player.set("passedPreQual", false);
  }

  render() {
    const allSelected = Object.keys(this.state).every(key => this.state[key] !== "");
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " Questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("h2", null, " This game will require heavy communication in English with other players. Thus, we will begin with a quick questionnaire to test your English fluency. "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h2", null, "Instructions:"), /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("p", null, "1. Read the target sentence")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("p", null, "2. Answer the question immediately following"))), /*#__PURE__*/React.createElement("div", null, "Because some users answer questions randomly, we will reject users with error rates of 25% or larger. Consequently, if you cannot answer 75% of the questions correctly, please do not fill out the survey."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, "Note: ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: "bold"
      }
    }, "Please read the sentence "), " before answering the question!"), englishScreeningQuestions.map(questionSet => {
      const {
        passage,
        question,
        answer,
        question_number
      } = questionSet;
      return /*#__PURE__*/React.createElement(Question, {
        key: question_number,
        selected: this.state["q".concat(question_number)],
        name: "q".concat(question_number),
        passage: passage,
        question: question,
        question_number: question_number,
        onChange: this.handleChange
      });
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !allSelected ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !allSelected,
      type: "submit"
    }, " Submit "))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"network-survey":{"NetworkSurveyContactsEC.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/network-survey/NetworkSurveyContactsEC.jsx                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => NetworkSurveyContactsEC
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);
let HTMLSelect;
module.link("@blueprintjs/core", {
  HTMLSelect(v) {
    HTMLSelect = v;
  }

}, 2);

const DropdownSelect = (_ref) => {
  let {
    id,
    name,
    handleChange
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "bp4-html-select"
  }, /*#__PURE__*/React.createElement("select", {
    className: "dropdown-select-input",
    defaultValue: "",
    id: id,
    name: name,
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disbaled: "true",
    hidden: true
  }), /*#__PURE__*/React.createElement("option", {
    value: "EC"
  }, "Especially Close"), /*#__PURE__*/React.createElement("option", {
    value: "S"
  }, "Strangers"), /*#__PURE__*/React.createElement("option", {
    value: "M"
  }, "Neither")));
};

class NetworkSurveyContactsEC extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player
      } = this.props;
      event.preventDefault();
      const {
        tie12,
        tie13,
        tie14,
        tie15,
        tie23,
        tie24,
        tie25,
        tie34,
        tie35,
        tie45
      } = this.state;
      const networkSurveyResponse = {
        tie12: tie12,
        tie13: tie13,
        tie14: tie14,
        tie15: tie15,
        tie23: tie23,
        tie24: tie24,
        tie25: tie25,
        tie34: tie34,
        tie35: tie35,
        tie45: tie45
      };
      player.set("networkResponseContactsEC", networkSurveyResponse); // TODO: log player response to survey question

      onNext();
    };

    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.props.player.get("networkResponse1");
    this.state = {
      tie12: "",
      tie13: "",
      tie14: "",
      tie15: "",
      tie23: "",
      tie24: "",
      tie25: "",
      tie34: "",
      tie35: "",
      tie45: "",
      name1: name1,
      name2: name2,
      name3: name3,
      name4: name4,
      name5: name5
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      tie12,
      tie13,
      tie14,
      tie15,
      tie23,
      tie24,
      tie25,
      tie34,
      tie35,
      tie45
    } = this.state;
    const filledOut = tie12 && tie13 && tie14 && tie15 && tie23 && tie24 && tie25 && tie34 && tie35 && tie45;
    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "network-survey-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "network-survey-header"
    }, /*#__PURE__*/React.createElement("p", null, "THIS QUESTION ASKS FOR YOUR VIEW OF CONNECTIONS AMONG THE PEOPLE YOU NAMED. YOU ARE ALMOST FINISHED.")), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png"
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-survey-body"
    }, /*#__PURE__*/React.createElement("p", null, "The people you cited on the previous page are listed in the table below. Next, please think about connections between the people you mentioned. Some of them can be total strangers in the sense that they wouldn't recognize the other person if they bumped into one other on the street. Some of them can be especially close, as close or closer to each other as they are to you. Please select the appropriate box to describe how close the people you know are with each other."), /*#__PURE__*/React.createElement("ul", {
      className: "network-list"
    }, /*#__PURE__*/React.createElement("li", null, "\u201CEspecially Close\u201D indicates this is one of your closest personal contacts."), /*#__PURE__*/React.createElement("li", null, "\"Strangers\" indicates that they rarely work together, are total strangers as far as you know, or do not enjoy one another's company."), /*#__PURE__*/React.createElement("li", null, "\u201CNeither\" indicates this is someone you don't mind working with, but have no wish to develop a friendship.")), /*#__PURE__*/React.createElement("form", {
      className: "network-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("table", {
      className: "name-matrix-table"
    }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "How close is __ with __ ?"), /*#__PURE__*/React.createElement("th", null, name2), /*#__PURE__*/React.createElement("th", null, name3), /*#__PURE__*/React.createElement("th", null, name4), /*#__PURE__*/React.createElement("th", null, name5)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, " ", name1), _.times(4, i => {
      return (
        /*#__PURE__*/
        // tie12, tie13, tie14, tie15
        React.createElement("td", {
          key: "tie1".concat(i + 2)
        }, /*#__PURE__*/React.createElement(DropdownSelect, {
          id: "tie1".concat(i + 2),
          name: "tie1".concat(i + 2),
          handleChange: this.handleChange
        }), " ")
      );
    })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, " ", name2), _.times(4, i => {
      // tie23, tie24, tie25
      return i > 0 ? /*#__PURE__*/React.createElement("td", {
        key: "tie2".concat(i + 2)
      }, /*#__PURE__*/React.createElement(DropdownSelect, {
        id: "tie2".concat(i + 2),
        name: "tie2".concat(i + 2),
        handleChange: this.handleChange
      }), " ") : /*#__PURE__*/React.createElement("td", null);
    })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, " ", name3), _.times(4, i => {
      // tie34, tie35
      return i > 1 ? /*#__PURE__*/React.createElement("td", {
        key: "tie3".concat(i + 2)
      }, /*#__PURE__*/React.createElement(DropdownSelect, {
        id: "tie3".concat(i + 2),
        name: "tie3".concat(i + 2),
        handleChange: this.handleChange
      }), " ") : /*#__PURE__*/React.createElement("td", null);
    })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, " ", name4), _.times(4, i => {
      // tie45
      return i > 2 ? /*#__PURE__*/React.createElement("td", {
        key: "tie4".concat(i + 2)
      }, /*#__PURE__*/React.createElement(DropdownSelect, {
        id: "tie4".concat(i + 2),
        name: "tie4".concat(i + 2),
        handleChange: this.handleChange
      }), " ") : /*#__PURE__*/React.createElement("td", null);
    })))), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: !filledOut ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !filledOut,
      type: "submit"
    }, " Submit")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NetworkSurveyContactsFrequency.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/network-survey/NetworkSurveyContactsFrequency.jsx                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => NetworkSurveyContactsFrequency
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);
let HTMLSelect;
module.link("@blueprintjs/core", {
  HTMLSelect(v) {
    HTMLSelect = v;
  }

}, 2);

const DropdownSelect = (_ref) => {
  let {
    id,
    name,
    handleChange
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "bp4-html-select"
  }, /*#__PURE__*/React.createElement("select", {
    className: "dropdown-select-input",
    defaultValue: "",
    id: id,
    name: name,
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disbaled: "true",
    hidden: true
  }), /*#__PURE__*/React.createElement("option", {
    value: "daily"
  }, "Daily"), /*#__PURE__*/React.createElement("option", {
    value: "weekly"
  }, "Weekly"), /*#__PURE__*/React.createElement("option", {
    value: "lessoften"
  }, "Less often")));
};

class NetworkSurveyContactsFrequency extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player
      } = this.props;
      event.preventDefault();
      const {
        tie12,
        tie13,
        tie14,
        tie15,
        tie23,
        tie24,
        tie25,
        tie34,
        tie35,
        tie45
      } = this.state;
      const networkSurveyResponse = {
        tie12: tie12,
        tie13: tie13,
        tie14: tie14,
        tie15: tie15,
        tie23: tie23,
        tie24: tie24,
        tie25: tie25,
        tie34: tie34,
        tie35: tie35,
        tie45: tie45
      };
      player.set("networkResponseContactsFrequency", networkSurveyResponse);
      player.set("networkResponse3", networkSurveyResponse); // TODO: log player response to survey question

      onNext();
    };

    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.props.player.get("networkResponse1");
    this.state = {
      tie12: "",
      tie13: "",
      tie14: "",
      tie15: "",
      tie23: "",
      tie24: "",
      tie25: "",
      tie34: "",
      tie35: "",
      tie45: "",
      name1: name1,
      name2: name2,
      name3: name3,
      name4: name4,
      name5: name5
    };
  }

  render() {
    const {
      game,
      round,
      stage,
      player
    } = this.props;
    const {
      tie12,
      tie13,
      tie14,
      tie15,
      tie23,
      tie24,
      tie25,
      tie34,
      tie35,
      tie45
    } = this.state;
    const filledOut = tie12 && tie13 && tie14 && tie15 && tie23 && tie24 && tie25 && tie34 && tie35 && tie45;
    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "network-survey-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "network-survey-header"
    }, /*#__PURE__*/React.createElement("p", null, "THIS QUESTION ASKS FOR YOUR VIEW OF CONNECTIONS AMONG THE PEOPLE YOU NAMED. YOU ARE ALMOST FINISHED.")), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png"
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-survey-body"
    }, /*#__PURE__*/React.createElement("p", null, "The people you cited on the previous page are listed in the table below. The task is to indicate how often the people you know communicate with each other."), /*#__PURE__*/React.createElement("ul", {
      className: "network-list"
    }, /*#__PURE__*/React.createElement("li", null, "\u201CDaily\u201D means that to the best of your knowledge, the two people communicate daily."), /*#__PURE__*/React.createElement("li", null, "\u201CWeekly\u201D indicates the two people usually interact and communicate on a weekly basis."), /*#__PURE__*/React.createElement("li", null, "\u201CLess often\u201D indicates, again, as best you know, that the two people communicate infrequently or not at all.")), /*#__PURE__*/React.createElement("form", {
      className: "network-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("table", {
      className: "name-matrix-table"
    }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "How often does __ communicate with __ ?"), /*#__PURE__*/React.createElement("th", null, name2), /*#__PURE__*/React.createElement("th", null, name3), /*#__PURE__*/React.createElement("th", null, name4), /*#__PURE__*/React.createElement("th", null, name5)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, " ", name1), _.times(4, i => {
      return (
        /*#__PURE__*/
        // tie12, tie13, tie14, tie15
        React.createElement("td", {
          key: "tie1".concat(i + 2)
        }, /*#__PURE__*/React.createElement(DropdownSelect, {
          id: "tie1".concat(i + 2),
          name: "tie1".concat(i + 2),
          handleChange: this.handleChange
        }), " ")
      );
    })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, " ", name2), _.times(4, i => {
      // tie23, tie24, tie25
      return i > 0 ? /*#__PURE__*/React.createElement("td", {
        key: "tie2".concat(i + 2)
      }, /*#__PURE__*/React.createElement(DropdownSelect, {
        id: "tie2".concat(i + 2),
        name: "tie2".concat(i + 2),
        handleChange: this.handleChange
      }), " ") : /*#__PURE__*/React.createElement("td", null);
    })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, " ", name3), _.times(4, i => {
      // tie34, tie35
      return i > 1 ? /*#__PURE__*/React.createElement("td", {
        key: "tie3".concat(i + 2)
      }, /*#__PURE__*/React.createElement(DropdownSelect, {
        id: "tie3".concat(i + 2),
        name: "tie3".concat(i + 2),
        handleChange: this.handleChange
      }), " ") : /*#__PURE__*/React.createElement("td", null);
    })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, " ", name4), _.times(4, i => {
      // tie45
      return i > 2 ? /*#__PURE__*/React.createElement("td", {
        key: "tie4".concat(i + 2)
      }, /*#__PURE__*/React.createElement(DropdownSelect, {
        id: "tie4".concat(i + 2),
        name: "tie4".concat(i + 2),
        handleChange: this.handleChange
      }), " ") : /*#__PURE__*/React.createElement("td", null);
    })))), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: !filledOut ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !filledOut,
      type: "submit"
    }, " Submit")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NetworkSurveyGenderInterpreter.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/network-survey/NetworkSurveyGenderInterpreter.jsx                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => NetworkSurveyGenderInterpreter
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

let _;

module.link("lodash", {
  default(v) {
    _ = v;
  }

}, 2);

const GenderButtonSet = (_ref) => {
  let {
    contactName,
    tie,
    genders,
    genderSelected,
    handleGenderSelect
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "relationship-input-row",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "relationship-input-label",
    htmlFor: tie
  }, " ", /*#__PURE__*/React.createElement("p", null, contactName), " "), /*#__PURE__*/React.createElement("div", {
    className: "relationship-buttons-container"
  }, genders.map((gender, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: "".concat(contactName, "-").concat(gender),
      className: gender === genderSelected ? "network-relationship-button selected" : "network-relationship-button",
      onClick: () => handleGenderSelect(tie, gender)
    }, " ", gender, " ");
  })));
}; // This section asks the user what their personal emotional closeness is to the listed 5 people.


class NetworkSurveyGenderInterpreter extends React.Component {
  constructor(props) {
    super(props);

    this.handleGenderSelect = (tie, gender) => {
      this.state[tie] = gender;
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player
      } = this.props;
      const networkSurveyResponse = {
        tie1: this.state.tie1,
        tie2: this.state.tie2,
        tie3: this.state.tie3,
        tie4: this.state.tie4,
        tie5: this.state.tie5
      };
      event.preventDefault(); // TODO: log player response to survey question

      player.set("networkResponseGenderInterpreter", networkSurveyResponse);
      onNext();
    };

    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.props.player.get("networkResponse1");
    this.state = {
      tie1: "",
      tie2: "",
      tie3: "",
      tie4: "",
      tie5: "",
      name1: name1,
      name2: name2,
      name3: name3,
      name4: name4,
      name5: name5
    };
  }

  render() {
    const {
      player
    } = this.props;
    const filledOut = this.state.tie1 && this.state.tie2 && this.state.tie3 && this.state.tie4 && this.state.tie5;
    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.state;
    const names = [name1, name2, name3, name4, name5];
    const genders = ["Male", "Female", "N/A"];
    return /*#__PURE__*/React.createElement("div", {
      className: "network-survey-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "network-survey-header"
    }, /*#__PURE__*/React.createElement("p", null, "WHAT ARE THE GENDERS OF THE PEOPLE IN YOUR NETWORK?")), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png"
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-survey-body"
    }, /*#__PURE__*/React.createElement("p", null, "The people you cited on the previous page are listed in the table below. Please select the option next to each name that best describes each listed person's gender. "), /*#__PURE__*/React.createElement("ul", {
      className: "network-list"
    }), /*#__PURE__*/React.createElement("form", {
      className: "network-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("p", null, " What is the gender of each person? "), names.map((name, i) => {
      return /*#__PURE__*/React.createElement(GenderButtonSet, {
        key: i,
        contactName: name,
        tie: "tie".concat(i + 1),
        genders: genders,
        genderSelected: this.state["tie".concat(i + 1)],
        handleGenderSelect: this.handleGenderSelect
      });
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: !filledOut ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !filledOut,
      type: "submit"
    }, " Next Page")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NetworkSurveyPersonalQuestions.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/network-survey/NetworkSurveyPersonalQuestions.jsx                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => NetworkSurveyPersonalQuestions
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

let _;

module.link("lodash", {
  default(v) {
    _ = v;
  }

}, 2);
let elevationClass;
module.link("@blueprintjs/core/lib/esm/common/classes", {
  elevationClass(v) {
    elevationClass = v;
  }

}, 3);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange,
    required: true,
    style: {
      marginRight: "5px"
    }
  }), label);
};

const AgeQuestionSet = (_ref2) => {
  let {
    ageValue,
    handleAgeChange
  } = _ref2;
  return /*#__PURE__*/React.createElement("div", {
    className: "personal-input-container-row"
  }, /*#__PURE__*/React.createElement("p", null, " What is your age? "), /*#__PURE__*/React.createElement("input", {
    id: "age",
    type: "number",
    min: "0",
    max: "150",
    step: "1",
    dir: "auto",
    name: "age",
    value: ageValue,
    onChange: handleAgeChange,
    style: {
      height: "fit-content",
      margin: "0em 1em"
    },
    required: true
  }));
};

const GenderButtonSet = (_ref3) => {
  let {
    genderSelected,
    handleGenderSelect
  } = _ref3;
  const genders = ["Male", "Female", "N/A"];
  return /*#__PURE__*/React.createElement("div", {
    className: "personal-input-container-row"
  }, /*#__PURE__*/React.createElement("p", null, " What is your gender? "), /*#__PURE__*/React.createElement("div", {
    className: "relationship-buttons-container",
    style: {
      width: "30%"
    }
  }, genders.map((gender, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: "".concat(index),
      name: "gender",
      value: gender,
      className: gender === genderSelected ? "network-relationship-button selected" : "network-relationship-button",
      onClick: () => handleGenderSelect(gender)
    }, " ", gender, " ");
  })));
};

const HispanicQuestionSet = (_ref4) => {
  let {
    selected,
    handleIsHispanicChange
  } = _ref4;
  const options = ["No, not Spanish/Hispanic/Latino", "Yes, Mexican, Mexican-American, Chicano", "Yes, Puerto Rican", "Yes, Cuban", "Yes, other Spanish, Hispanic, or Latino"];
  return /*#__PURE__*/React.createElement("div", {
    className: "personal-input-container"
  }, /*#__PURE__*/React.createElement("p", null, "Are you Spanish, Hispanic, or Latino?"), /*#__PURE__*/React.createElement("div", {
    className: "personal-input-radio-list-container"
  }, options.map(option => {
    return /*#__PURE__*/React.createElement(Radio, {
      key: option,
      selected: selected,
      name: "isHispanic",
      value: option,
      label: option,
      onChange: handleIsHispanicChange
    });
  })));
};

const RaceSpecific = (_ref5) => {
  let {
    race,
    message,
    textValue,
    handleRaceChange
  } = _ref5;
  return /*#__PURE__*/React.createElement("div", {
    className: "personal-input-race-specific-container"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0px 0px",
      fontSize: "100%"
    }
  }, " ", message), /*#__PURE__*/React.createElement("input", {
    className: "personal-input-race-specific-input",
    id: "raceSpecific",
    type: "text",
    dir: "auto",
    name: "raceSpecific",
    value: textValue,
    onChange: handleRaceChange,
    required: true
  }));
};

const RaceQuestionSet = (_ref6) => {
  let {
    selected,
    textValue,
    handleRaceChange
  } = _ref6;
  const options = ["White", "Black or African American", "Indian (American)", "Eskimo", "Aleut", "Chinese", "Filipino", "Hawaiian", "Korean", "Vietnamese", "Japanese", "Asian Indian", "Samoan", "Guamanian", "Other Asian or Pacific Islander", "Some other race", "Multiracial or biracial"];
  const askRaceSpecific = {
    "Indian (American)": "Please specify the name of the enrolled or principal tribe",
    "Other Asian or Pacific Islander": "Print race",
    "Some other race": "Print race",
    "Multiracial or biracial": "Print races"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "personal-input-container"
  }, /*#__PURE__*/React.createElement("p", null, "What is your race/ethnicity?"), /*#__PURE__*/React.createElement("div", {
    className: "personal-input-radio-list-container"
  }, options.map(option => {
    return /*#__PURE__*/React.createElement("div", {
      className: "personal-input-radio-container"
    }, /*#__PURE__*/React.createElement(Radio, {
      key: option,
      selected: selected,
      name: "race",
      value: option,
      label: option,
      onChange: handleRaceChange
    }), selected in askRaceSpecific && option == selected ? /*#__PURE__*/React.createElement(RaceSpecific, {
      race: selected,
      message: askRaceSpecific[selected],
      textValue: textValue,
      handleRaceChange: handleRaceChange
    }) : null);
  })));
};

const EducationQuestionSet = (_ref7) => {
  let {
    selected,
    handleEducationChange
  } = _ref7;
  const options = ["High school graduate", "Some college, no degree", "Associate's degree", "Bachelor's degree", "Master's degree", "Professional degree (e.g., MD, JD)", "Doctoral degree"];
  return /*#__PURE__*/React.createElement("div", {
    className: "personal-input-container"
  }, /*#__PURE__*/React.createElement("p", null, "What is your highest education qualification?"), /*#__PURE__*/React.createElement("div", {
    className: "personal-input-radio-list-container"
  }, options.map(option => {
    return /*#__PURE__*/React.createElement(Radio, {
      key: option,
      selected: selected,
      name: "education",
      value: option,
      label: option,
      onChange: handleEducationChange
    });
  })));
};

const EmploymentQuestionSet = (_ref8) => {
  let {
    selected,
    handleEmploymentChange
  } = _ref8;
  const options = ["Yes", "No"];
  return /*#__PURE__*/React.createElement("div", {
    className: "personal-input-container"
  }, /*#__PURE__*/React.createElement("p", null, "Are you currently employed?"), /*#__PURE__*/React.createElement("div", {
    className: "personal-input-radio-list-container"
  }, options.map(option => {
    return /*#__PURE__*/React.createElement(Radio, {
      key: option,
      selected: selected,
      name: "employed",
      value: option,
      label: option,
      onChange: handleEmploymentChange
    });
  })));
};

const JobTitleQuestionSet = (_ref9) => {
  let {
    textValue,
    handleJobTitleChange
  } = _ref9;
  return /*#__PURE__*/React.createElement("div", {
    className: "personal-input-container"
  }, /*#__PURE__*/React.createElement("p", null, "What is your job title?"), /*#__PURE__*/React.createElement("input", {
    className: "personal-input-job-title-input",
    id: "jobTitle",
    type: "text",
    dir: "auto",
    name: "jobTitle",
    value: textValue,
    onChange: handleJobTitleChange,
    required: true
  }));
}; // This section asks the user what their personal emotional closeness is to the listed 5 people.


class NetworkSurveyPersonalQuestions extends React.Component {
  constructor(props) {
    super(props); // Age, gender, race, level of education, employment, job title, how many people report to you

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleGenderSelect = gender => {
      this.setState({
        gender: gender
      });
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player
      } = this.props;
      const networkSurveyResponse = this.state;
      event.preventDefault(); // TODO: log player response to survey question

      player.set("networkResponsePersonalQuestions", networkSurveyResponse);
      onNext();
    };

    this.state = {
      age: "",
      gender: "",
      isHispanic: "",
      race: "",
      raceSpecific: "",
      education: "",
      employed: "",
      jobTitle: ""
    };
  }

  render() {
    const {
      player
    } = this.props;
    const filledOut = this.state.age && this.state.gender && this.state.race && this.state.education && this.state.employed;
    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.state;
    const names = [name1, name2, name3, name4, name5];
    return /*#__PURE__*/React.createElement("div", {
      className: "network-survey-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "network-survey-header"
    }, /*#__PURE__*/React.createElement("p", null, "PLEASE ANSWER SOME QUESTIONS ABOUT YOURSELF")), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png"
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-survey-body"
    }, /*#__PURE__*/React.createElement("p", null, "Please answer some questions about yourself. "), /*#__PURE__*/React.createElement("ul", {
      className: "network-list"
    }), /*#__PURE__*/React.createElement("form", {
      className: "network-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement(AgeQuestionSet, {
      ageValue: this.state.age,
      handleAgeChange: this.handleChange
    }), /*#__PURE__*/React.createElement(GenderButtonSet, {
      genderSelected: this.state.gender,
      handleGenderSelect: this.handleGenderSelect
    }), /*#__PURE__*/React.createElement(HispanicQuestionSet, {
      selected: this.state.isHispanic,
      handleIsHispanicChange: this.handleChange
    }), /*#__PURE__*/React.createElement(RaceQuestionSet, {
      selected: this.state.race,
      textValue: this.state.raceSpecific,
      handleRaceChange: this.handleChange
    }), /*#__PURE__*/React.createElement(EducationQuestionSet, {
      selected: this.state.education,
      handleEducationChange: this.handleChange
    }), /*#__PURE__*/React.createElement(EmploymentQuestionSet, {
      selected: this.state.employed,
      handleEmploymentChange: this.handleChange
    }), this.state.employed == "Yes" && /*#__PURE__*/React.createElement(JobTitleQuestionSet, {
      textValue: this.state.jobTitle,
      handleJobTitleChange: this.handleChange
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container",
      style: {
        marginTop: "2em"
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: !filledOut ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !filledOut,
      type: "submit"
    }, " Next Page")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NetworkSurveyRelationshipInterpreter.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/network-survey/NetworkSurveyRelationshipInterpreter.jsx                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => NetworkSurveyRelationshipInterpreter
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

let _;

module.link("lodash", {
  default(v) {
    _ = v;
  }

}, 2);

const RelationshipButtonSet = (_ref) => {
  let {
    contactName,
    tie,
    categories,
    categoriesSelected,
    handleCategorySelect
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "relationship-input-row",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "relationship-input-label",
    htmlFor: tie
  }, " ", /*#__PURE__*/React.createElement("p", null, contactName), " "), /*#__PURE__*/React.createElement("div", {
    className: "relationship-buttons-container"
  }, categories.map((category, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: "".concat(contactName, "-").concat(category),
      className: categoriesSelected[index] ? "network-relationship-button selected" : "network-relationship-button",
      onClick: () => handleCategorySelect(tie, index)
    }, " ", category, " ");
  })));
}; // This section asks the user what their personal emotional closeness is to the listed 5 people.


class NetworkSurveyRelationshipInterpreter extends React.Component {
  constructor(props) {
    super(props);

    this.handleCategorySelect = (tie, category_i) => {
      this.state[tie][category_i] = !this.state[tie][category_i];
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player
      } = this.props;
      const networkSurveyResponse = {
        tie1: this.state.tie1,
        tie2: this.state.tie2,
        tie3: this.state.tie3,
        tie4: this.state.tie4,
        tie5: this.state.tie5,
        categories: this.state.categories
      };
      event.preventDefault(); // TODO: log player response to survey question

      player.set("networkResponseRelationshipInterpreter", networkSurveyResponse);
      onNext();
    };

    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.props.player.get("networkResponse1");
    this.state = {
      tie1: [false, false, false, false],
      tie2: [false, false, false, false],
      tie3: [false, false, false, false],
      tie4: [false, false, false, false],
      tie5: [false, false, false, false],
      name1: name1,
      name2: name2,
      name3: name3,
      name4: name4,
      name5: name5,
      categories: ["Current Colleague", "Previous Colleague", "Spouse", "Other kin", "Other"]
    };
  }

  render() {
    const {
      player
    } = this.props;
    const filledOut = this.state.tie1 && this.state.tie2 && this.state.tie3 && this.state.tie4 && this.state.tie5;
    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.state;
    const names = [name1, name2, name3, name4, name5];
    return /*#__PURE__*/React.createElement("div", {
      className: "network-survey-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "network-survey-header"
    }, /*#__PURE__*/React.createElement("p", null, "WHAT ARE YOUR RELATIONSHIPS TO THE PEOPLE IN YOUR NETWORK?")), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png"
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-survey-body"
    }, /*#__PURE__*/React.createElement("p", null, "The people you cited on the previous page are listed in the table below. Please select the options next to each name that best describes your relationship with each listed person. For each person, you are allowed to select multiple options. "), /*#__PURE__*/React.createElement("ul", {
      className: "network-list"
    }, /*#__PURE__*/React.createElement("li", null, "\u201CCurrent Colleague\u201D indicates someone who works at the same organization you do."), /*#__PURE__*/React.createElement("li", null, "\"Previous Colleague\" indicates someone with whom you used to work with."), /*#__PURE__*/React.createElement("li", null, "\u201CSpouse\" indicates that you and this person are, or were, married, or lived together as if married at some time."), /*#__PURE__*/React.createElement("li", null, "\"Other kin\" indicates any family relative other than spouse."), /*#__PURE__*/React.createElement("li", null, "\"Other\" indicates someone that does not fall within one of the above categories")), /*#__PURE__*/React.createElement("form", {
      className: "network-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("p", null, " What is their relationship to you? (Select all that applies) "), names.map((name, i) => {
      return /*#__PURE__*/React.createElement(RelationshipButtonSet, {
        key: i,
        contactName: name,
        tie: "tie".concat(i + 1),
        categories: this.state.categories,
        categoriesSelected: this.state["tie".concat(i + 1)],
        handleCategorySelect: this.handleCategorySelect
      });
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: !filledOut ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !filledOut,
      type: "submit"
    }, " Next Page")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NetworkSurveySelfContacts.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/network-survey/NetworkSurveySelfContacts.jsx                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => NetworkSurveySelfContacts
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class NetworkSurveySelfContacts extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      name1: "",
      name2: "",
      name3: "",
      name4: "",
      name5: ""
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player
      } = this.props;
      event.preventDefault();
      const networkSurveyResponse = this.state;
      player.set("networkResponseSelfContacts", networkSurveyResponse);
      player.set("networkResponse1", networkSurveyResponse);
      onNext();
    };
  }

  render() {
    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.state;
    const filledOut = name1 && name2 && name3 && name4 && name5;
    return /*#__PURE__*/React.createElement("div", {
      className: "network-survey-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "network-survey-header"
    }, /*#__PURE__*/React.createElement("p", null, "THIS EXPERIMENT IS ABOUT COMMUNICATION NETWORKS. WE BEGIN WITH A QUICK SENSE OF YOUR CURRENT NETWORK. ", /*#__PURE__*/React.createElement("br", null), "HERE IS A GENERIC QUESTION OFTEN USED IN SURVEY RESEARCH:")), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png"
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-survey-body"
    }, /*#__PURE__*/React.createElement("p", null, "From time to time, most people discuss important matters with other people, people they trust. The range of important matters varies from person to person across work, leisure, family, politics, whatever. The range of relations varies across work, family, friends, and advisors. "), /*#__PURE__*/React.createElement("p", null, "If you look back over the last six months, who are the five people with whom you most discussed matters important to you? Use any symbol that identifies the person for you -- first name, initials, or any name that will let you identify the person. "), /*#__PURE__*/React.createElement("p", null, "To ensure confidentiality the names typed here will only be recorded in your local browser, and will NOT be sent to the server. It will be erased from your browser when you close or reload the tab. "), /*#__PURE__*/React.createElement("form", {
      className: "network-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      className: "input-label",
      htmlFor: "name1"
    }, " Name: "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "name1",
      name: "name1",
      onChange: this.handleChange,
      required: true
    })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      className: "input-label",
      htmlFor: "name2"
    }, " Name: "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "name2",
      name: "name2",
      onChange: this.handleChange,
      required: true
    })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      className: "input-label",
      htmlFor: "name3"
    }, " Name: "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "name3",
      name: "name3",
      onChange: this.handleChange,
      required: true
    })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      className: "input-label",
      htmlFor: "name4"
    }, " Name: "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "name4",
      name: "name4",
      onChange: this.handleChange,
      required: true
    })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      className: "input-label",
      htmlFor: "name5"
    }, " Name: "), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "name5",
      name: "name5",
      onChange: this.handleChange,
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: !filledOut ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !filledOut,
      type: "submit"
    }, " Next Page")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NetworkSurveySelfEC.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/network-survey/NetworkSurveySelfEC.jsx                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => NetworkSurveySelfEC
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);
let HTMLSelect;
module.link("@blueprintjs/core", {
  HTMLSelect(v) {
    HTMLSelect = v;
  }

}, 2);

const DropdownSelect = (_ref) => {
  let {
    id,
    name,
    handleChange
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "bp4-html-select"
  }, /*#__PURE__*/React.createElement("select", {
    className: "dropdown-select-input",
    defaultValue: "",
    id: id,
    name: name,
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disbaled: "true",
    hidden: true
  }), /*#__PURE__*/React.createElement("option", {
    value: "EC"
  }, "Especially Close"), /*#__PURE__*/React.createElement("option", {
    value: "C"
  }, "Close"), /*#__PURE__*/React.createElement("option", {
    value: "LTC"
  }, "Less Than Close")));
}; // This section asks the user what their personal emotional closeness is to the listed 5 people.


class NetworkSurveySelfEC extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player
      } = this.props;
      const networkSurveyResponse = {
        tie1: this.state.tie1,
        tie2: this.state.tie2,
        tie3: this.state.tie3,
        tie4: this.state.tie4,
        tie5: this.state.tie5
      };
      event.preventDefault(); // TODO: log player response to survey question

      player.set("networkResponseSelfEC", networkSurveyResponse);
      onNext();
    };

    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.props.player.get("networkResponse1");
    this.state = {
      tie1: "",
      tie2: "",
      tie3: "",
      tie4: "",
      tie5: "",
      name1: name1,
      name2: name2,
      name3: name3,
      name4: name4,
      name5: name5
    };
  }

  render() {
    const {
      player
    } = this.props;
    const filledOut = this.state.tie1 && this.state.tie2 && this.state.tie3 && this.state.tie4 && this.state.tie5;
    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "network-survey-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "network-survey-header"
    }, /*#__PURE__*/React.createElement("p", null, "HOW CLOSE ARE YOU TO THE PEOPLE IN YOUR NETWORK?")), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png"
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-survey-body"
    }, /*#__PURE__*/React.createElement("p", null, "The people you cited on the previous page are listed in the table below. Please select the option next to each name that best describes how close you feel with each listed person. For each person, are you \u201Cespecially close\u201D (EC), \u201Cclose\u201D (C), or \u201Cless than close\u201D (LTC)? "), /*#__PURE__*/React.createElement("ul", {
      className: "network-list"
    }, /*#__PURE__*/React.createElement("li", null, "\u201CEspecially Close\u201D indicates this is one of your closest personal contacts."), /*#__PURE__*/React.createElement("li", null, "\u201CClose\u201D indicates this is someone you enjoy, but don't count him or her among your closest personal contacts."), /*#__PURE__*/React.createElement("li", null, "\u201CLess Than Close\" indicates this is someone you don't mind working with, but have no wish to develop a friendship.")), /*#__PURE__*/React.createElement("form", {
      className: "network-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("p", null, " How often do you communicate with _ ? "), /*#__PURE__*/React.createElement("div", {
      className: "input-row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "dropdown-input-label",
      htmlFor: "tie1"
    }, " ", /*#__PURE__*/React.createElement("p", null, name1), " "), /*#__PURE__*/React.createElement(DropdownSelect, {
      id: "tie1",
      name: "tie1",
      handleChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "input-row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "dropdown-input-label",
      htmlFor: "tie2"
    }, " ", /*#__PURE__*/React.createElement("p", null, name2), " "), /*#__PURE__*/React.createElement(DropdownSelect, {
      id: "tie2",
      name: "tie2",
      handleChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "input-row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "dropdown-input-label",
      htmlFor: "tie3"
    }, " ", /*#__PURE__*/React.createElement("p", null, name3), " "), /*#__PURE__*/React.createElement(DropdownSelect, {
      id: "tie3",
      name: "tie3",
      handleChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "input-row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "dropdown-input-label",
      htmlFor: "tie4"
    }, " ", /*#__PURE__*/React.createElement("p", null, name4), " "), /*#__PURE__*/React.createElement(DropdownSelect, {
      id: "tie4",
      name: "tie4",
      handleChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "input-row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "dropdown-input-label",
      htmlFor: "tie5"
    }, " ", /*#__PURE__*/React.createElement("p", null, name5), " "), /*#__PURE__*/React.createElement(DropdownSelect, {
      id: "tie5",
      name: "tie5",
      handleChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: !filledOut ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !filledOut,
      type: "submit"
    }, " Next Page")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NetworkSurveySelfFrequency.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/network-survey/NetworkSurveySelfFrequency.jsx                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => NetworkSurveySelfFrequency
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);
let HTMLSelect;
module.link("@blueprintjs/core", {
  HTMLSelect(v) {
    HTMLSelect = v;
  }

}, 2);

const DropdownSelect = (_ref) => {
  let {
    id,
    name,
    handleChange
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "bp4-html-select"
  }, /*#__PURE__*/React.createElement("select", {
    className: "dropdown-select-input",
    defaultValue: "",
    id: id,
    name: name,
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disbaled: "true",
    hidden: true
  }), /*#__PURE__*/React.createElement("option", {
    value: "daily"
  }, "Daily"), /*#__PURE__*/React.createElement("option", {
    value: "weekly"
  }, "Weekly"), /*#__PURE__*/React.createElement("option", {
    value: "lessoften"
  }, "Less often")));
};

class NetworkSurveySelfFrequency extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player
      } = this.props;
      const networkSurveyResponse = {
        tie1: this.state.tie1,
        tie2: this.state.tie2,
        tie3: this.state.tie3,
        tie4: this.state.tie4,
        tie5: this.state.tie5
      };
      event.preventDefault(); // TODO: log player response to survey question

      player.set("networkResponseSelfFrequency", networkSurveyResponse);
      player.set("networkResponse2", networkSurveyResponse);
      onNext();
    };

    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.props.player.get("networkResponse1");
    this.state = {
      tie1: "",
      tie2: "",
      tie3: "",
      tie4: "",
      tie5: "",
      name1: name1,
      name2: name2,
      name3: name3,
      name4: name4,
      name5: name5
    };
  }

  render() {
    const {
      player
    } = this.props;
    const filledOut = this.state.tie1 && this.state.tie2 && this.state.tie3 && this.state.tie4 && this.state.tie5;
    const {
      name1,
      name2,
      name3,
      name4,
      name5
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "network-survey-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "network-survey-header"
    }, /*#__PURE__*/React.createElement("p", null, "HOW CLOSE ARE YOU TO THE PEOPLE IN YOUR NETWORK?")), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png"
    }), /*#__PURE__*/React.createElement("div", {
      className: "network-survey-body"
    }, /*#__PURE__*/React.createElement("p", null, "The people you cited on the previous page are listed in the table below. The task is indicate how often you communicate and interact with each of them. "), /*#__PURE__*/React.createElement("ul", {
      className: "network-list"
    }, /*#__PURE__*/React.createElement("li", null, "\u201CDaily\u201D means this is someone you communicate with daily."), /*#__PURE__*/React.createElement("li", null, "\u201CWeekly\u201D indicates this is someone you usually interact with and communicate on a weekly basis."), /*#__PURE__*/React.createElement("li", null, "\u201CLess often\u201D indicates this is someone you speak to infrequently.")), /*#__PURE__*/React.createElement("form", {
      className: "network-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("p", null, " How often do you communicate with _ ? "), /*#__PURE__*/React.createElement("div", {
      className: "input-row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "dropdown-input-label",
      htmlFor: "tie1"
    }, " ", /*#__PURE__*/React.createElement("p", null, name1), " "), /*#__PURE__*/React.createElement(DropdownSelect, {
      id: "tie1",
      name: "tie1",
      handleChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "input-row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "dropdown-input-label",
      htmlFor: "tie2"
    }, " ", /*#__PURE__*/React.createElement("p", null, name2), " "), /*#__PURE__*/React.createElement(DropdownSelect, {
      id: "tie2",
      name: "tie2",
      handleChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "input-row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "dropdown-input-label",
      htmlFor: "tie3"
    }, " ", /*#__PURE__*/React.createElement("p", null, name3), " "), /*#__PURE__*/React.createElement(DropdownSelect, {
      id: "tie3",
      name: "tie3",
      handleChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "input-row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "dropdown-input-label",
      htmlFor: "tie4"
    }, " ", /*#__PURE__*/React.createElement("p", null, name4), " "), /*#__PURE__*/React.createElement(DropdownSelect, {
      id: "tie4",
      name: "tie4",
      handleChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "input-row"
    }, /*#__PURE__*/React.createElement("label", {
      className: "dropdown-input-label",
      htmlFor: "tie5"
    }, " ", /*#__PURE__*/React.createElement("p", null, name5), " "), /*#__PURE__*/React.createElement(DropdownSelect, {
      id: "tie5",
      name: "tie5",
      handleChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: !filledOut ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !filledOut,
      type: "submit"
    }, " Next Page")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"quiz":{"AllQuiz.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/quiz/AllQuiz.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => AllQuiz
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);
let AttentionCheckModal;
module.link("./AttentionCheckModal", {
  default(v) {
    AttentionCheckModal = v;
  }

}, 2);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-radio"
  }, /*#__PURE__*/React.createElement("input", {
    className: "quiz-button",
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange
  }), label);
};

class AllQuiz extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      q1: "",
      q2: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      modalIsOpen: false
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.allCorrect = () => {
      return this.state.q1 === 'yes' && this.state.q2 === 'yes' && this.state.q4 === 'yes' && this.state.q5 === 'one' && this.state.q6 === 'false' && this.state.q7 === 'false' && this.state.q8 === 'yes';
    };

    this.handleSubmit = event => {
      const {
        hasPrev,
        hasNext,
        onNext,
        onPrev,
        game,
        player
      } = this.props;
      event.preventDefault();

      if (this.allCorrect()) {
        const currentTriesLeft = player.get("attentionCheckTries");
        const attentionCheckAnswers = this.state;
        player.set("attentionCheck-".concat(currentTriesLeft), attentionCheckAnswers);
        onNext();
      } else {
        const currentTriesLeft = player.get("attentionCheckTries"); // Log the attention check answers

        const attentionCheckAnswers = this.state;
        player.set("attentionCheck-".concat(currentTriesLeft), attentionCheckAnswers); // Log how many tries they have left

        player.set("attentionCheckTries", currentTriesLeft - 1); // If player uses all their attention check tries, they fail; otherwise show them how many tries they have left

        if (player.get("attentionCheckTries") <= 0) {
          player.exit("failedQuestion");
        } else {
          this.onOpenModal();
        }
      }
    };

    this.onOpenModal = () => {
      this.setState({
        modalIsOpen: true
      });
    };

    this.onCloseModal = () => {
      this.setState({
        modalIsOpen: false
      });
    };
  }

  componentDidMount() {
    const {
      player
    } = this.props;

    if (!player.get("attentionCheckTries")) {
      player.set("attentionCheckTries", 2);
    }
  }

  render() {
    const {
      game,
      onPrev,
      player
    } = this.props;
    const {
      q1,
      q2,
      q4,
      q5,
      q6,
      q7,
      q8
    } = this.state;
    const allSelected = Object.keys(this.state).every(key => this.state[key] !== "");
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " Questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "question-section"
    }, game.treatment.isPreQualification ? /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "In the near future, are you willing to participate in an online team exercise that could last for approximately 45-", game.treatment.maxGameTime, " minutes?") : /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "Are you willing to participate in an online team exercise that could last for approximately 45-", game.treatment.maxGameTime, " minutes?"), /*#__PURE__*/React.createElement(Radio, {
      selected: q1,
      name: "q1",
      value: "yes",
      label: "Yes",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: q1,
      name: "q1",
      value: "no",
      label: "No",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "question-section"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, game.treatment.endGameIfPlayerIdle ? /*#__PURE__*/React.createElement("span", null, "If you do not interact with the application for a while, your session will timeout and the game will end for EVERYONE in your team. ", game.treatment.idleWarningTime, " seconds before the timeout you will be notified you are about to timeout, and be given ONE warning and be able to reset this timer.") : /*#__PURE__*/React.createElement("span", null, "If you do not interact with the application for a while, your session will timeout and you will be kicked out from the game. ", game.treatment.idleWarningTime, " seconds before the timeout you will be notified you are about to timeout, and be given a ONE warning and be able to reset this timer."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'bolder'
      }
    }, game.treatment.endGameIfPlayerIdle ?
    /*#__PURE__*/
    // TODO: MTurk
    // <span>NOTE: If you allow your session to timeout, your HIT will not be accepted. If a team member causes a timeout you will be sent to the end of challenge page, and your HIT will be accepted.</span> :
    // <span>NOTE: If you allow your session to timeout, your HIT will not be accepted.</span>
    // TODO: Prolific
    React.createElement("span", null, "NOTE: If you allow your session to timeout, your submission will not be accepted. If a team member causes a timeout you will be sent to the end of challenge page, and your submission will be accepted.") : /*#__PURE__*/React.createElement("span", null, "NOTE: If you allow your session to timeout, your submission will not be accepted."))), /*#__PURE__*/React.createElement(Radio, {
      selected: q2,
      name: "q2",
      value: "yes",
      label: "PROCEED",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: q2,
      name: "q2",
      value: "no",
      label: "DO NOT PROCEED",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "question-section"
    }, /*#__PURE__*/React.createElement("p", {
      className: "questionnaire-question"
    }, "Next you will be asked questions about the instruction you just read. You need to get the answers correct in order to be accepted into the exercise. ")), /*#__PURE__*/React.createElement("div", {
      className: "question-section"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "Is the following statement true or false?", game.treatment.endGameIfPlayerIdle ? /*#__PURE__*/React.createElement("span", null, " If any member of my team doesn't register a guess or communicate with a colleague for a long time, the task will end and the entire team (including myself) will be sent to the exit page of the survey.") : /*#__PURE__*/React.createElement("span", null, " If a member of my team doesn't register a guess or communicate with a colleague for a long time, the inactive player will be kicked and the task will continue for the rest of the team.")), /*#__PURE__*/React.createElement(Radio, {
      selected: q4,
      name: "q4",
      value: "yes",
      label: "Yes",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: q4,
      name: "q4",
      value: "no",
      label: "No",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "question-section"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "On any trial, how many abstract symbols will you and any member of your team have in common?"), /*#__PURE__*/React.createElement(Radio, {
      selected: q5,
      name: "q5",
      value: "one",
      label: "Only 1",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: q5,
      name: "q5",
      value: "many",
      label: "More than 1",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "question-section"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "Is the following statement true or false? I will be able to communicate with my team members using an overall group chat."), /*#__PURE__*/React.createElement(Radio, {
      selected: q6,
      name: "q6",
      value: "true",
      label: "True",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: q6,
      name: "q6",
      value: "false",
      label: "False",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "question-section"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "The reconsider button will only appear if I submit an incorrect answer."), /*#__PURE__*/React.createElement(Radio, {
      selected: q7,
      name: "q7",
      value: "true",
      label: "True",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: q7,
      name: "q7",
      value: "false",
      label: "False",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "question-section"
    }, game.treatment.isPreQualification ?
    /*#__PURE__*/
    // TODO: MTurk
    // <label className="questionnaire-question"> In the near future, if you pass all the qualifications, you may participate in this game. During that game, you will receive a flat fee of ${game.treatment.basePay} for participating. You will also receive ${game.treatment.conversionRate} bonus each time your team correctly identifies the shared symbol. If you complete all trials of the experiment, you could earn up to ${game.treatment.basePay + game.treatment.numTaskRounds * game.treatment.conversionRate}.</label>
    // TODO: Prolific
    React.createElement("label", {
      className: "questionnaire-question"
    }, " In the near future, if you pass all the qualifications, you may participate in this game. During that game, you will receive the hourly wage for participating. You will also receive a small bonus each time your team correctly identifies the shared symbol. (Amount TBD)") :
    /*#__PURE__*/
    // TODO  MTurk
    React.createElement("label", {
      className: "questionnaire-question"
    }, "If you pass the attention check, you may participate in this task. You will receive a flat fee of $", game.treatment.basePay, " for participating. You will also receive $", game.treatment.conversionRate, " bonus each time your team correctly identifies the shared symbol. If you complete all trials of the experiment, you could earn up to $", game.treatment.basePay + game.treatment.numTaskRounds * game.treatment.conversionRate, "."), /*#__PURE__*/React.createElement(Radio, {
      selected: q8,
      name: "q8",
      value: "yes",
      label: "PROCEED",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: q8,
      name: "q8",
      value: "no",
      label: "DO NOT PROCEED",
      onChange: this.handleChange
    }))), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !allSelected ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !allSelected,
      type: "submit"
    }, " Submit ")), this.state.modalIsOpen && /*#__PURE__*/React.createElement(AttentionCheckModal, {
      player: player,
      onPrev: onPrev,
      onCloseModal: this.onCloseModal
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AttentionCheckModal.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/quiz/AttentionCheckModal.jsx                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => AttentionCheckModal
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);

class AttentionCheckModal extends React.Component {
  render() {
    const {
      player,
      triesLeft,
      onCloseModal
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "dark-bg",
      onClick: onCloseModal
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-centered"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, "You got this comprehension check question wrong. You have ", triesLeft, " try left. Please carefully reread the instructions."), /*#__PURE__*/React.createElement("div", {
      className: "attention-check-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: "modal-button",
      onClick: onCloseModal
    }, "Try Again")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"QuizFive.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/quiz/QuizFive.jsx                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => QuizFive
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);
let AttentionCheckModal;
module.link("./AttentionCheckModal", {
  default(v) {
    AttentionCheckModal = v;
  }

}, 2);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-radio"
  }, /*#__PURE__*/React.createElement("input", {
    className: "quiz-button",
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange
  }), label);
};

class QuizFive extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      modalIsOpen: false
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        hasPrev,
        hasNext,
        onNext,
        onPrev,
        game,
        player
      } = this.props;
      event.preventDefault();

      if (this.state.response === 'one') {
        const currentTriesLeft = player.get("attentionCheck1Tries");
        const attentionCheck1Answer = this.state.response;
        player.set("attentionCheck1-".concat(currentTriesLeft), attentionCheck1Answer);
        onNext();
      } else {
        const currentTriesLeft = player.get("attentionCheck1Tries");
        const attentionCheck1Answer = this.state.response;
        player.set("attentionCheck1-".concat(currentTriesLeft), attentionCheck1Answer);
        player.set("attentionCheck1Tries", currentTriesLeft - 1);

        if (currentTriesLeft - 1 <= 0) {
          player.exit("failedQuestion");
        } else {
          this.onOpenModal();
        }
      }
    };

    this.onOpenModal = () => {
      this.setState({
        modalIsOpen: true
      });
    };

    this.onCloseModal = () => {
      this.setState({
        modalIsOpen: false
      });
    };
  }

  componentDidMount() {
    const {
      player
    } = this.props;

    if (!player.get("attentionCheck1Tries")) {
      player.set("attentionCheck1Tries", 2);
    }
  }

  render() {
    const {
      player
    } = this.props;
    const {
      response
    } = this.state;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " Questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, " The task requires that members of a small network work together to identify abstract symbols for multiple trials. At the beginning of each trial, each member of your network will be assigned a set of symbols. One and only one of those symbols will be shared among you. Your job is to discover the shared symbol by communicating with the members of your network within the time allotted. Your symbols are illustrated in the \"my card\" box. When you believe you have identified the shared symbol, select it and then hit the submit answer button. If your team runs out of time, your team will be marked incorrect and you will move onto the next round.  "), /*#__PURE__*/React.createElement("p", null, "----------------------------------------------------------------------------------------------------"), /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "On any trial, how many abstract symbols will you and any member of your team have in common?"), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "zero",
      label: "0",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "one",
      label: "1",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "two",
      label: "2",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "many",
      label: "More than 2",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !response ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !response,
      type: "submit"
    }, " Submit ")), this.state.modalIsOpen && /*#__PURE__*/React.createElement(AttentionCheckModal, {
      player: player,
      triesLeft: player.get("attentionCheck1Tries"),
      onCloseModal: this.onCloseModal
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"QuizOne.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/quiz/QuizOne.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => QuizOne
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-radio"
  }, /*#__PURE__*/React.createElement("input", {
    className: "quiz-button",
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange
  }), label);
};

class QuizOne extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        hasPrev,
        hasNext,
        onNext,
        onPrev,
        game,
        player
      } = this.props;
      event.preventDefault();

      if (this.state.response === 'yes') {
        onNext();
      } else {
        player.exit("returnSubmission");
      }
    };
  }

  render() {
    const {
      game,
      player
    } = this.props;
    const {
      response
    } = this.state;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " Questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "Are you willing to participate in an online team exercise (in the future) that could last for approximately ", game.treatment.maxGameTime, " minutes?"), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "yes",
      label: "Yes",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "no",
      label: "No",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !response ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !response,
      type: "submit"
    }, " Submit "))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"QuizOverview.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/quiz/QuizOverview.jsx                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => QuizOverview
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class QuizOverview extends React.Component {
  constructor() {
    super(...arguments);

    this.handleSubmit = event => {
      const {
        hasPrev,
        hasNext,
        onNext,
        onPrev,
        game,
        player
      } = this.props;
      event.preventDefault();
      onNext();
    };
  }

  render() {
    const {
      game,
      onPrev,
      player
    } = this.props;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " Important Game Overview "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "question-section"
    }, /*#__PURE__*/React.createElement("p", {
      className: "questionnaire-question"
    }, " PLEASE READ THE FOLLOWING CAREFULLY "), /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "1. This game may last up to ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'bolder'
      }
    }, "  ", game.treatment.maxGameTime, " minutes"), ". If you cannot make this commitment, please leave and wait for the next session."), /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "2. If you are inactive for longer than ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'bolder'
      }
    }, "  ", game.treatment.userInactivityDuration / 60, " minutes"), ", you will be kicked from the game. You will only get ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'bolder'
      }
    }, " ONE warning "), " about your inactivity. If you are still inactive in the next 30 seconds, you will be kicked. If you become active, your timer will reset. Thus, actively speak with your teammates until everyone has submitted. ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'bolder'
      }
    }, " Your inactive timer will still run after you submit. ")), /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "3. If a player is kicked from the game, the ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'bolder'
      }
    }, " entire game for everyone will end "), "  after the round is finished."), /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "4. For each trial, there will be ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'bolder'
      }
    }, " only 1 common symbol "), " amongst everyone. Some symbols may be the same amongst a few of you, but only one that you all share."), /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "5. Each player will have different 1-on-1 chats with people to communicate with. You may not have the same chats as others. Some may only have one chat, while others may have more."), /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "6. After selecting a symbol and submitting it, you are allowed to reconsider your answer if you find more information from your team."), game.treatment.conversionRate && game.treatment.basePay ? /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "7. You will receive a $", game.treatment.conversionRate, " bonus each time your team correctly identifies the shared symbol. If you complete all trials of the experiment, you could earn up to an additional $", game.treatment.numTaskRounds * game.treatment.conversionRate, ".") : /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "7. You will receive $1 bonus each time your team correctly identifies the shared symbol. If you complete all trials of the experiment, you could earn up to $", game.treatment.numTaskRounds * 1, "."), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: "arrow-button button-submit",
      type: "submit"
    }, " Proceed ")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"QuizSeven.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/quiz/QuizSeven.jsx                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => QuizSeven
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);
let AttentionCheckModal;
module.link("./AttentionCheckModal", {
  default(v) {
    AttentionCheckModal = v;
  }

}, 2);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-radio"
  }, /*#__PURE__*/React.createElement("input", {
    className: "quiz-button",
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange
  }), label);
};

class QuizSeven extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      modalIsOpen: false
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        hasPrev,
        hasNext,
        onNext,
        onPrev,
        game,
        player
      } = this.props;
      event.preventDefault();

      if (this.state.response === 'self') {
        const currentTriesLeft = player.get("attentionCheck3Tries");
        const attentionCheck3Answer = this.state.response;
        player.set("attentionCheck3-".concat(currentTriesLeft), attentionCheck3Answer);
        onNext();
      } else {
        const currentTriesLeft = player.get("attentionCheck3Tries");
        const attentionCheck3Answer = this.state.response;
        player.set("attentionCheck3-".concat(currentTriesLeft), attentionCheck3Answer);
        player.set("attentionCheck3Tries", currentTriesLeft - 1);

        if (currentTriesLeft - 1 <= 0) {
          player.exit("failedQuestion");
        } else {
          this.onOpenModal();
        }
      }
    };

    this.onOpenModal = () => {
      this.setState({
        modalIsOpen: true
      });
    };

    this.onCloseModal = () => {
      this.setState({
        modalIsOpen: false
      });
    };
  }

  componentDidMount() {
    const {
      player
    } = this.props;

    if (!player.get("attentionCheck3Tries")) {
      player.set("attentionCheck3Tries", 2);
    }
  }

  render() {
    const {
      player
    } = this.props;
    const {
      response
    } = this.state;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " Questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "You guess the symbol by selecting it and then selecting the submit answer button. While you are waiting for your team members to submit an answer, you will have an opportunity to reconsider your choice. The reconsider button does not indicate you have made an incorrect choice. "), /*#__PURE__*/React.createElement("p", null, "----------------------------------------------------------------------------------------------------"), /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "When will the reconsider button appear?"), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "incorrect",
      label: "After I submit an incorrect answer",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "self",
      label: "After I submit my symbol",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "team",
      label: "After all my teammates submit a symbol",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !response ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !response,
      type: "submit"
    }, " Submit ")), this.state.modalIsOpen && /*#__PURE__*/React.createElement(AttentionCheckModal, {
      player: player,
      triesLeft: player.get("attentionCheck3Tries"),
      onCloseModal: this.onCloseModal
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"QuizSix.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/quiz/QuizSix.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => QuizSix
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);
let AttentionCheckModal;
module.link("./AttentionCheckModal", {
  default(v) {
    AttentionCheckModal = v;
  }

}, 2);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-radio"
  }, /*#__PURE__*/React.createElement("input", {
    className: "quiz-button",
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange
  }), label);
};

class QuizSix extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      modalIsOpen: false
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        hasPrev,
        hasNext,
        onNext,
        onPrev,
        game,
        player
      } = this.props;
      event.preventDefault();

      if (this.state.response === 'individual') {
        const currentTriesLeft = player.get("attentionCheck2Tries");
        const attentionCheck2Answer = this.state.response;
        player.set("attentionCheck2-".concat(currentTriesLeft), attentionCheck2Answer);
        onNext();
      } else {
        const currentTriesLeft = player.get("attentionCheck2Tries");
        const attentionCheck2Answer = this.state.response;
        player.set("attentionCheck2-".concat(currentTriesLeft), attentionCheck2Answer);
        player.set("attentionCheck2Tries", currentTriesLeft - 1);

        if (currentTriesLeft - 1 <= 0) {
          player.exit("failedQuestion");
        } else {
          this.onOpenModal();
        }
      }
    };

    this.onOpenModal = () => {
      this.setState({
        modalIsOpen: true
      });
    };

    this.onCloseModal = () => {
      this.setState({
        modalIsOpen: false
      });
    };
  }

  componentDidMount() {
    const {
      player
    } = this.props;

    if (!player.get("attentionCheck2Tries")) {
      player.set("attentionCheck2Tries", 2);
    }
  }

  render() {
    const {
      player
    } = this.props;
    const {
      response
    } = this.state;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " Questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "Each player will have a network of people they can talk to through individual chats. Each member of your network has an unique dialogue box and you can have multiple dialogue boxes open on your screen as you communicate during a trial. You can open or close a box. You can also scroll up and down within a box to view the messages you have exchanged with a specific contact. There will be no overall team chat where you can talk to everyone at once. "), /*#__PURE__*/React.createElement("p", null, "----------------------------------------------------------------------------------------------------"), /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "How will I communicate with my team members?"), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "individual",
      label: "1-on-1 chats",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "group",
      label: "Overall team group chat",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "none",
      label: "There is no communication",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !response ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !response,
      type: "submit"
    }, " Submit ")), this.state.modalIsOpen && /*#__PURE__*/React.createElement(AttentionCheckModal, {
      player: player,
      triesLeft: player.get("attentionCheck2Tries"),
      onCloseModal: this.onCloseModal
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"QuizTwo.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/quiz/QuizTwo.jsx                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => QuizTwo
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);
let AttentionCheckModal;
module.link("./AttentionCheckModal", {
  default(v) {
    AttentionCheckModal = v;
  }

}, 2);

const Radio = (_ref) => {
  let {
    selected,
    name,
    value,
    label,
    onChange
  } = _ref;
  return /*#__PURE__*/React.createElement("label", {
    className: "questionnaire-radio"
  }, /*#__PURE__*/React.createElement("input", {
    className: "quiz-button",
    type: "radio",
    name: name,
    value: value,
    checked: selected === value,
    onChange: onChange
  }), label);
};

class QuizTwo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      modalIsOpen: false
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        hasPrev,
        hasNext,
        onNext,
        onPrev,
        game,
        player
      } = this.props;
      event.preventDefault();

      if (this.state.response === 'end') {
        const currentTriesLeft = player.get("attentionCheck4Tries");
        const attentionCheck4Answer = this.state.response;
        player.set("attentionCheck4-".concat(currentTriesLeft), attentionCheck4Answer);
        onNext();
      } else {
        const currentTriesLeft = player.get("attentionCheck4Tries");
        const attentionCheck4Answer = this.state.response;
        player.set("attentionCheck4-".concat(currentTriesLeft), attentionCheck4Answer);
        player.set("attentionCheck4Tries", currentTriesLeft - 1);

        if (currentTriesLeft - 1 <= 0) {
          player.exit("failedQuestion");
        } else {
          this.onOpenModal();
        }
      }
    };

    this.onOpenModal = () => {
      this.setState({
        modalIsOpen: true
      });
    };

    this.onCloseModal = () => {
      this.setState({
        modalIsOpen: false
      });
    };
  }

  componentDidMount() {
    const {
      player
    } = this.props;

    if (!player.get("attentionCheck4Tries")) {
      player.set("attentionCheck4Tries", 2);
    }
  }

  render() {
    const {
      player,
      game
    } = this.props;
    const {
      response
    } = this.state;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " Questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "questionnaire-question"
    }, "If you do not interact within the game for a while, you will be kicked and the game will end for EVERYONE in your team. You will be given ONE warning the first time you reach the inactivity limit. If you still are not active within ", game.treatment.idleWarningTime, " seconds, you will be kicked. If you are active, your inactivity timer will reset."), /*#__PURE__*/React.createElement("p", null, "----------------------------------------------------------------------------------------------------"), /*#__PURE__*/React.createElement("label", null, "After receiving an inactivity warning, if I still do not interact within the game for a while, what will happen?"), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "warning",
      label: "I will get another inactivity warning",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "continue",
      label: "I will be kicked but the game will continue without me",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "end",
      label: "I will be kicked and the game will end for everyone in my team",
      onChange: this.handleChange
    }), /*#__PURE__*/React.createElement(Radio, {
      selected: response,
      name: "response",
      value: "nothing",
      label: "Nothing will happen",
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("button", {
      className: !response ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: !response,
      type: "submit"
    }, " Submit ")), this.state.modalIsOpen && /*#__PURE__*/React.createElement(AttentionCheckModal, {
      player: player,
      triesLeft: player.get("attentionCheck4Tries"),
      onCloseModal: this.onCloseModal
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"tutorial":{"TutorialPageFour.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/tutorial/TutorialPageFour.jsx                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => TutorialPageFour
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class TutorialPageFour extends React.Component {
  render() {
    const {
      hasPrev,
      hasNext,
      onNext,
      onPrev,
      game
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "tutorial-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title-static-image"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/title-tut3.png"
    })), /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "two-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tutorial-static-image"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/tut3-slide4.png",
      width: "100%"
    })), /*#__PURE__*/React.createElement("div", {
      className: "tutorial-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading"
    }, " RECONSIDER"), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "180px",
      height: "2px"
    }), /*#__PURE__*/React.createElement("div", {
      className: "tutorial-body"
    }, "You guess the symbol by selecting it and then selecting the submit answer button. While you are waiting for your team members to submit an answer, you will have an opportunity to reconsider your choice. The reconsider button does not indicate you have made an incorrect choice.")))), hasPrev && /*#__PURE__*/React.createElement("button", {
      className: "arrow-button tutorial-prev-btn",
      type: "button",
      onClick: onPrev,
      disabled: !hasPrev
    }, "Previous"), hasNext && /*#__PURE__*/React.createElement("button", {
      className: "arrow-button tutorial-next-btn",
      type: "button",
      onClick: onNext,
      disabled: !hasNext
    }, "Attention Check"));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"TutorialPageOne.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/tutorial/TutorialPageOne.jsx                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => TutorialPageOne
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class TutorialPageOne extends React.Component {
  render() {
    const {
      hasPrev,
      hasNext,
      onNext,
      onPrev,
      game
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "tutorial-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title-static-image"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/title-tut3.png"
    })), /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "two-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tutorial-static-image"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/tut3-slide1.png",
      width: "100%"
    })), /*#__PURE__*/React.createElement("div", {
      className: "tutorial-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading"
    }, " THIS IS MY CARD "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "180px",
      height: "2px"
    }), /*#__PURE__*/React.createElement("div", {
      className: "tutorial-body"
    }, "This is an experiment on effective communication. The task requires that members of a small network work together to identify abstract symbols for multiple trials. At the beginning of each trial, each member of your network will be assigned a set of symbols. One and only one of those symbols will be shared among you. Your job is to discover the shared symbol by communicating with the members of your network within the time allotted. Your symbols are illustrated in the \"my card\" box. When you believe you have identified the shared symbol, select it and then hit the submit answer button. If your team runs out of time, your team will be marked incorrect and you will move onto the next round.")))), hasNext && /*#__PURE__*/React.createElement("button", {
      className: "arrow-button tutorial-next-btn",
      type: "button",
      onClick: onNext,
      disabled: !hasNext
    }, "Next"));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"TutorialPageThree.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/tutorial/TutorialPageThree.jsx                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => TutorialPageThree
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class TutorialPageThree extends React.Component {
  render() {
    const {
      hasPrev,
      hasNext,
      onNext,
      onPrev,
      game
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "tutorial-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title-static-image"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/title-tut3.png"
    })), /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "two-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tutorial-static-image"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/tut3-slide3.png",
      width: "100%"
    })), /*#__PURE__*/React.createElement("div", {
      className: "tutorial-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading"
    }, " NETWORK CONVERSATIONS "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "180px",
      height: "2px"
    }), /*#__PURE__*/React.createElement("div", {
      className: "tutorial-body"
    }, "Each player will have a network of people they can talk to through individual chats. Each member of your network has an unique dialogue box and you can have multiple dialogue boxes open on your screen as you communicate during a trial. You can open or close a box. You can also scroll up and down within a box to view the messages you have exchanged with a specific contact. There will be no overall team chat where you can talk to everyone at once.")))), hasPrev && /*#__PURE__*/React.createElement("button", {
      className: "arrow-button tutorial-prev-btn",
      type: "button",
      onClick: onPrev,
      disabled: !hasPrev
    }, "Previous"), hasNext && /*#__PURE__*/React.createElement("button", {
      className: "arrow-button tutorial-next-btn",
      type: "button",
      onClick: onNext,
      disabled: !hasNext
    }, "Next"));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"TutorialPageTwo.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/tutorial/TutorialPageTwo.jsx                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => TutorialPageTwo
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class TutorialPageTwo extends React.Component {
  render() {
    const {
      hasPrev,
      hasNext,
      onNext,
      onPrev,
      game
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "tutorial-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title-static-image"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/title-tut3.png"
    })), /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "two-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tutorial-static-image"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/tut3-slide2.png",
      width: "100%"
    })), /*#__PURE__*/React.createElement("div", {
      className: "tutorial-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading"
    }, " THIS IS MY NETWORK "), /*#__PURE__*/React.createElement("img", {
      src: "images/hr-color.png",
      width: "180px",
      height: "2px"
    }), /*#__PURE__*/React.createElement("div", {
      className: "tutorial-body"
    }, "The members of your communication network are indicated in the \u201Cmy network\u201D box. You can communicate with a member of your network by selecting that individual\u2019s name in the \u201Cmy network\u201D box. A communication box will open on your screen. Type the message you would like to send and when you hit return the message will be sent to the contact you selected.")))), hasPrev && /*#__PURE__*/React.createElement("button", {
      className: "arrow-button tutorial-prev-btn",
      type: "button",
      onClick: onPrev,
      disabled: !hasPrev
    }, "Previous"), hasNext && /*#__PURE__*/React.createElement("button", {
      className: "arrow-button tutorial-next-btn",
      type: "button",
      onClick: onNext,
      disabled: !hasNext
    }, "Next"));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Consent.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/Consent.jsx                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Consent
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Centered, ConsentButton;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  },

  ConsentButton(v) {
    ConsentButton = v;
  }

}, 1);

class Consent extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "consent"
    }, /*#__PURE__*/React.createElement("h1", null, " Consent Form "), /*#__PURE__*/React.createElement("p", null, "This experiment is part of a MIT scientific project. Your decision to participate in this experiment is entirely voluntary. There are no known or anticipated risks to participating in this experiment. There is no way for us to identify you. The only information we will have, in addition to your responses, is the timestamps of your interactions with our site. The results of our research may be presented at scientific meetings or published in scientific journals. Clicking on the \"AGREE\" button indicates that you are at least 18 years of age, and agree to participate voluntary."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(ConsentButton, {
      text: "I AGREE"
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"DescribeSymbolQuestion.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/DescribeSymbolQuestion.jsx                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => DescribeSymbolQuestion
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
module.link("../../public/css/intro.css");
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class DescribeSymbolQuestion extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      response: ""
    };

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        [el.name]: el.value
      });
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player,
        stage
      } = this.props;
      event.preventDefault(); // TODO: log player response to survey question

      player.set("symbolDescription", this.state.response);
      onNext();
    };
  }

  render() {
    const {
      response
    } = this.state;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", {
      className: "intro-heading questionnaire-heading"
    }, " Questionnaire "), /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-content-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "questionnaire-body"
    }, /*#__PURE__*/React.createElement("h2", null, " Please describe the following symbol below as if you were trying to explain it to another player. Try to be more descriptive than not.", /*#__PURE__*/React.createElement("br", null), "Note: If there are too many participants filling out the survey at once, there may be some server delays. If you click submit and you do not immediately proceed to the next page, please be patient as it will eventually submit."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
      className: "symbol-container",
      style: {
        width: "100%",
        backgroundColor: "#051A46",
        borderRadius: "0%",
        display: "flex",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/symbols/tangrams/t7.png"
    })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("form", {
      className: "questionnaire-btn-container",
      style: {
        flexDirection: "column",
        width: "100%"
      },
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "survey-textarea",
      dir: "auto",
      id: "response",
      name: "response",
      value: response,
      onChange: this.handleChange,
      required: true
    }), /*#__PURE__*/React.createElement("button", {
      className: response === "" ? "arrow-button button-submit-disabled" : "arrow-button button-submit",
      disabled: response === "",
      style: {
        marginLeft: "auto"
      },
      type: "submit"
    }, " Submit")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"NewPlayer.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/NewPlayer.jsx                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => NewPlayer
});
let React, Component;
module.link("react", {
  default(v) {
    React = v;
  },

  Component(v) {
    Component = v;
  }

}, 0);
let Centered;
module.link("meteor/empirica:core", {
  Centered(v) {
    Centered = v;
  }

}, 1);

class NewPlayer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      id: ""
    };

    this.handleUpdate = event => {
      const {
        value,
        name
      } = event.currentTarget;
      this.setState({
        [name]: value
      });
    };

    this.handleSubmit = event => {
      event.preventDefault();
      const {
        handleNewPlayer
      } = this.props;
      const {
        id
      } = this.state;
      handleNewPlayer(id);
    };
  }

  render() {
    const {
      id
    } = this.state;
    return /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("h1", null, "Identification"), /*#__PURE__*/React.createElement("p", null, "Please enter your Prolific ID:"), /*#__PURE__*/React.createElement("input", {
      dir: "auto",
      type: "text",
      name: "id",
      id: "id",
      value: id,
      onChange: this.handleUpdate,
      required: true,
      autoComplete: "off"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Submit")))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Schedule.jsx":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/intro/Schedule.jsx                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 0);
module.export({
  default: () => Schedule
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);
let Checkbox;
module.link("@blueprintjs/core", {
  Checkbox(v) {
    Checkbox = v;
  }

}, 1);

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      const el = event.currentTarget;
      this.setState({
        availability: _objectSpread({}, this.state.availability, {
          [el.name]: !this.state.availability[el.name]
        })
      });
    };

    this.handleSubmit = event => {
      const {
        onNext,
        player
      } = this.props;
      event.preventDefault();
      player.set("timeAvailabilities", this.state.availability);
      player.set("passedPreQual", true);
      player.exit("preQualSuccess");
    };

    this.state = {
      availability: {},
      dates: ['3/10/23', '3/11/23', '3/12/23'],
      times: ['9-10 AM', '10-11 AM', '11-12 PM', '12-1 PM', '1-2 PM', '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM', '6-7 PM', ' 7-8 PM', '8-9 PM', '9-10 PM']
    };
    this.state.dates.forEach(date => {
      this.state.times.forEach(time => {
        this.state.availability["".concat(date, " ").concat(time)] = false;
      });
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "network-survey-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "network-survey-header"
    }, /*#__PURE__*/React.createElement("p", null, "Please fill out all the times you will be available to play this game.", /*#__PURE__*/React.createElement("br", null), "The time with the most overlapping players will be chosen.", /*#__PURE__*/React.createElement("br", null), "Note: If there are too many participants filling out the survey at once, there may be some server delays. If you click submit and you do not immediately proceed to the exit page, please be patient as it will eventually submit.")), /*#__PURE__*/React.createElement("form", {
      className: "network-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("table", {
      className: "name-matrix-table"
    }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: {
        textAlign: "right"
      }
    }, " Time (EST) "), /*#__PURE__*/React.createElement("th", null, " 3/10/23 (Fri) "), /*#__PURE__*/React.createElement("th", null, " 3/11/23 (Sat) "), /*#__PURE__*/React.createElement("th", null, " 3/12/23 (Sun) ")), this.state.times.map(time => {
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
        style: {
          textAlign: "right"
        }
      }, " ", time, " "), this.state.dates.map(date => {
        return /*#__PURE__*/React.createElement("td", {
          style: {
            textAlign: "center"
          }
        }, /*#__PURE__*/React.createElement(Checkbox // checked={this.state[`${date} ${time}`]}
        , {
          key: "".concat(date, " ").concat(time),
          checked: this.state.availability["".concat(date, " ").concat(time)],
          name: "".concat(date, " ").concat(time),
          onChange: this.handleChange
        }));
      }));
    }))), /*#__PURE__*/React.createElement("div", {
      className: "network-button-container",
      style: {
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "arrow-button button-submit",
      type: "submit"
    }, " Submit"))));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"chat":{"ChatContainer.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/chat/ChatContainer.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let _extends;

module.link("@babel/runtime/helpers/extends", {
  default(v) {
    _extends = v;
  }

}, 0);

let _objectWithoutProperties;

module.link("@babel/runtime/helpers/objectWithoutProperties", {
  default(v) {
    _objectWithoutProperties = v;
  }

}, 1);
module.export({
  default: () => ChatContainer
});
module.link("./style.less");
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 0);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 1);
let Footer;
module.link("./Footer", {
  default(v) {
    Footer = v;
  }

}, 2);
let Message;
module.link("./Message", {
  default(v) {
    Message = v;
  }

}, 3);
let Messages;
module.link("./Messages", {
  default(v) {
    Messages = v;
  }

}, 4);
let ChatHeader;
module.link("./ChatHeader", {
  default(v) {
    ChatHeader = v;
  }

}, 5);
let ErrorBoundary;
module.link("./ErrorBoundary", {
  default(v) {
    ErrorBoundary = v;
  }

}, 6);

class ChatContainer extends React.PureComponent {
  constructor() {
    super(...arguments);

    this.onTitleClick = () => {
      const {
        isOpen,
        customKey,
        onOpenChat,
        onCloseChat
      } = this.props;

      if (!isOpen) {
        onOpenChat(customKey);
      } else {
        onCloseChat(customKey);
      } // this.setState({ isOpen: !this.state.isOpen});

    };

    this.onNewMessage = msg => {
      const {
        onNewMessage,
        scope,
        customKey
      } = this.props;

      if (onNewMessage) {
        msg = onNewMessage(msg);

        if (!msg) {
          return;
        }
      }

      scope.append(customKey, msg);
    };

    this.componentDidMount = () => {
      const {
        dockStartOpen,
        docked
      } = this.props;

      if (docked && !dockStartOpen) {}
    };
  }

  render() {
    const _this$props = this.props,
          {
      player,
      scope,
      customKey,
      customClassName,
      docked,
      onIncomingMessage,
      filter,
      timeStamp,
      otherPlayer,
      header: HeaderComp,
      message: MessageComp,
      footer: FooterComp,
      isOpen,
      playerIsOnline,
      onOpenChat,
      onCloseChat
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["player", "scope", "customKey", "customClassName", "docked", "onIncomingMessage", "filter", "timeStamp", "otherPlayer", "header", "message", "footer", "isOpen", "playerIsOnline", "onOpenChat", "onCloseChat"]);

    const common = {
      player,
      scope,
      customKey,
      otherPlayer
    };
    return /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
      className: "".concat(customClassName ? customClassName : "empirica-chat-container", " ").concat(docked ? "undocked" : "undocked", " ").concat(isOpen ? "open" : "closed")
    }, /*#__PURE__*/React.createElement("div", {
      className: "chat ".concat(isOpen ? "open" : "closed")
    }, docked && /*#__PURE__*/React.createElement(HeaderComp, _extends({}, common, {
      onTitleClick: this.onTitleClick,
      onXClick: this.onXClick,
      isOpen: isOpen,
      playerIsOnline: playerIsOnline
    })), isOpen ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Messages, _extends({}, common, {
      messageComp: MessageComp,
      filter: filter,
      onIncomingMessage: onIncomingMessage
    }, rest)), /*#__PURE__*/React.createElement(FooterComp, _extends({}, common, {
      timeStamp: timeStamp,
      onNewMessage: this.onNewMessage
    }))) : "")));
  }

}

ChatContainer.defaultProps = {
  customKey: "chat",
  docked: false,
  customClassName: "",
  dockStartOpen: true,
  hideAvatar: false,
  hideName: false,
  svgAvatar: false,
  hideNotificiationBadge: false,
  // header: ({ onClick, isOpen }) => (
  //   <div className="header">
  //     <span className="title">CHAT </span>
  //     <span className="close-button" onClick={onClick}>
  //       {isOpen ? "-" : "+"}
  //     </span>
  //   </div>
  // ),
  header: ChatHeader,
  message: Message,
  footer: Footer
};
ChatContainer.propTypes = {
  player: PropTypes.object.isRequired,
  scope: PropTypes.object.isRequired,
  customKey: PropTypes.string.isRequired,
  timeStamp: PropTypes.instanceOf(Date),
  docked: PropTypes.bool,
  dockStartOpen: PropTypes.bool,
  hideAvatar: PropTypes.bool,
  hideName: PropTypes.bool,
  svgAvatar: PropTypes.bool,
  customClassName: PropTypes.string,
  onNewMessage: PropTypes.func,
  onIncomingMessage: PropTypes.func,
  filter: PropTypes.func,
  header: PropTypes.elementType.isRequired,
  message: PropTypes.elementType.isRequired,
  footer: PropTypes.elementType.isRequired
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ChatHeader.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/chat/ChatHeader.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => ChatHeader
});
module.link("./style.less");
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);

class ChatHeader extends React.PureComponent {
  render() {
    const {
      otherPlayer,
      onTitleClick,
      onXClick,
      playerIsOnline
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "header ".concat(otherPlayer.toLowerCase())
    }, /*#__PURE__*/React.createElement("span", {
      className: "title",
      onClick: onTitleClick
    }, " ", otherPlayer, " ", playerIsOnline ? "" : " (offline)"), /*#__PURE__*/React.createElement("span", {
      className: "close-button",
      onClick: onXClick
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/icon-net-window-close.png",
      width: "17px",
      height: "17px"
    })));
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ErrorBoundary.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/chat/ErrorBoundary.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => ErrorBoundary
});
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 0);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("error on chat package ", error);
    console.error("error on chat package:info ", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/React.createElement("h1", null, "Something went wrong.");
    }

    return this.props.children;
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Footer.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/chat/Footer.js                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let _objectSpread;

module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }

}, 0);
module.export({
  default: () => Footer
});
module.link("./style.less");
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 0);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 1);
let TimeSync;
module.link("meteor/mizzao:timesync", {
  TimeSync(v) {
    TimeSync = v;
  }

}, 2);
let moment;
module.link("moment", {
  default(v) {
    moment = v;
  }

}, 3);

let _;

module.link("lodash", {
  default(v) {
    _ = v;
  }

}, 4);

class Footer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      comment: "",
      rows: 1,
      minRows: 1,
      maxRows: 5,
      buttonHeight: 30
    };
    this.updateLastActive = _.throttle(player => player.set("lastActive", moment(TimeSync.serverTime(null, 1000))), 5000, {
      leading: true
    });

    this.handleSubmit = e => {
      e.preventDefault();
      const text = this.state.comment.trim();

      if (text === "") {
        return;
      }

      const {
        player,
        onNewMessage,
        timeStamp
      } = this.props;
      let msg = {
        text,
        player: {
          _id: player._id,
          avatar: player.get("avatar"),
          name: player.get("name") || player._id
        }
      };

      if (timeStamp) {
        msg = _objectSpread({}, msg, {
          timeStamp
        });
      }

      onNewMessage(msg);
      player.set("lastActive", moment(TimeSync.serverTime(null, 1000)));
      this.setState({
        comment: ""
      });
    };

    this.handleChange = e => {
      const {
        player
      } = this.props;
      const el = e.currentTarget;
      const textareaLineHeight = 24;
      const {
        minRows,
        maxRows
      } = this.state;
      const previousRows = e.target.rows;
      e.target.rows = minRows; // reset number of rows in textarea

      const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

      if (currentRows === previousRows) {
        e.target.rows = currentRows;
      }

      if (currentRows >= maxRows) {
        e.target.rows = maxRows;
        e.target.scrollTop = e.target.scrollHeight;
      }

      const usedRows = currentRows < maxRows ? currentRows : maxRows;
      this.updateLastActive(player);
      this.setState({
        [el.name]: el.value,
        rows: usedRows
      }, () => {
        this.setState({
          buttonHeight: document.getElementById("chat-input").offsetHeight
        });
      });
    };
  }

  render() {
    const {
      comment,
      rows,
      buttonHeight
    } = this.state;
    return /*#__PURE__*/React.createElement("form", {
      className: "chat-footer-form",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "chat-footer"
    }, /*#__PURE__*/React.createElement("textarea", {
      id: "chat-input",
      name: "comment",
      className: "chat-input",
      placeholder: "My message",
      value: comment,
      onKeyPress: e => {
        if (e.key === "Enter") {
          this.handleSubmit(e);
        }
      },
      rows: rows,
      onChange: this.handleChange,
      autoComplete: "off"
    })), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      form: "chat-input",
      className: "chat-button-send",
      disabled: !comment,
      onClick: this.handleSubmit
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/icon-enter.png",
      width: "15px",
      height: "17px"
    })));
  }

}

Footer.propTypes = {
  player: PropTypes.object.isRequired,
  scope: PropTypes.object.isRequired,
  customKey: PropTypes.string.isRequired,
  onNewMessage: PropTypes.func,
  timeStamp: PropTypes.instanceOf(Date)
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Message.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/chat/Message.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({
  default: () => Message
});
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 0);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 1);
let isString;
module.link("lodash", {
  isString(v) {
    isString = v;
  }

}, 2);

class Message extends React.Component {
  constructor() {
    super(...arguments);

    this.renderTime = timeStamp => {
      const hours = new Date(timeStamp).getHours();
      const minutes = new Date(timeStamp).getMinutes();

      if (!hours || !minutes) {
        return null;
      }

      const time = "".concat(hours.toString().padStart(2, 0), ":").concat(minutes.toString().padStart(2, 0));
      return /*#__PURE__*/React.createElement("div", {
        className: "timeStamp"
      }, time);
    };

    this.renderName = (isSelf, name) => {
      return /*#__PURE__*/React.createElement("div", {
        className: "name"
      }, isSelf ? "You" : name);
    };
  }

  render() {
    const {
      message,
      player,
      hideName,
      hideAvatar,
      svgAvatar,
      avatar
    } = this.props;
    const {
      player: msgPlayer,
      text,
      timeStamp
    } = message;
    const isSelf = player._id == msgPlayer._id;
    let avatarImg;
    const useAvatar = !hideAvatar && (svgAvatar || avatar);

    if (useAvatar && avatar) {
      if (isString(avatar)) {
        console.warn("Deprecation: avatar should be an object containing a src or svg property");
        avatarImg = /*#__PURE__*/React.createElement("img", {
          className: "avatar",
          alt: '',
          src: avatar
        });
      } else {
        const avatarSrc = avatar.svg || avatar.src;

        if (avatar.svg) {
          avatarImg = /*#__PURE__*/React.createElement("div", {
            dangerouslySetInnerHTML: {
              __html: avatarSrc
            },
            className: "avatar"
          });
        } else {
          avatarImg = /*#__PURE__*/React.createElement("img", {
            className: "avatar",
            alt: avatar.alt,
            src: avatar.src
          });
        }
      }
    }

    return /*#__PURE__*/React.createElement("div", null, !isSelf ? /*#__PURE__*/React.createElement("div", {
      className: "message"
    }, /*#__PURE__*/React.createElement("div", {
      className: "other-message-tick-container"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/net-bubble.png",
      width: "15px",
      height: "10px"
    })), /*#__PURE__*/React.createElement("div", {
      className: "text-container-other"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text"
    }, text))) : /*#__PURE__*/React.createElement("div", {
      className: "message"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-container-self"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text"
    }, text)), /*#__PURE__*/React.createElement("div", {
      className: "self-message-tick-container"
    }, /*#__PURE__*/React.createElement("img", {
      src: "images/my-bubble.png",
      width: "15px",
      height: "10px"
    }))));
  }

}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    })
  }).isRequired,
  self: PropTypes.bool,
  hideAvatar: PropTypes.bool,
  hideName: PropTypes.bool,
  svgAvatar: PropTypes.bool,
  avatar: PropTypes.shape({
    svg: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string
  })
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Messages.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/chat/Messages.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let _objectWithoutProperties;

module.link("@babel/runtime/helpers/objectWithoutProperties", {
  default(v) {
    _objectWithoutProperties = v;
  }

}, 0);

let _extends;

module.link("@babel/runtime/helpers/extends", {
  default(v) {
    _extends = v;
  }

}, 1);
let PropTypes;
module.link("prop-types", {
  default(v) {
    PropTypes = v;
  }

}, 0);
let React;
module.link("react", {
  default(v) {
    React = v;
  }

}, 1);

function filteredMessages(WrappedComponent) {
  return class extends React.Component {
    render() {
      const {
        scope,
        customKey,
        filter
      } = this.props;
      let messages = scope.get(customKey) || [];

      if (filter) {
        messages = filter(messages);
      }

      return /*#__PURE__*/React.createElement(WrappedComponent, _extends({
        messages: [...messages]
      }, this.props));
    }

  };
}

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.messagesEl = React.createRef();
    this.state = {
      messageLength: 0
    };
  }

  componentDidMount() {
    this.messagesEl.current.scrollTop = this.messagesEl.current.scrollHeight;
    this.setState({
      messageLength: this.props.messages.length
    });
  }

  componentDidUpdate(prevProps) {
    const {
      messageLength
    } = this.state;
    const {
      messages: currentMessages,
      onIncomingMessage,
      customKey
    } = this.props;

    if (this.messagesEl.current !== null && currentMessages.length > messageLength) {
      this.setState({
        messageLength: currentMessages.length
      }, () => {
        if (onIncomingMessage) {
          onIncomingMessage(currentMessages.splice(this.state.messageLength), customKey);
        }

        this.messagesEl.current.scrollTop = this.messagesEl.current.scrollHeight;
      });
    }
  }

  render() {
    const _this$props = this.props,
          {
      player,
      messages,
      messageComp: MessageComp,
      otherPlayer
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["player", "messages", "messageComp", "otherPlayer"]);

    return /*#__PURE__*/React.createElement("div", {
      className: "messages",
      ref: this.messagesEl
    }, messages.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "empty"
    }, "No messages yet...") : null, messages.map((message, i) => {
      return /*#__PURE__*/React.createElement(MessageComp, _extends({
        key: i,
        message: message,
        player: player
      }, rest));
    }));
  }

}

Messages.propTypes = {
  player: PropTypes.object,
  messageComp: PropTypes.elementType,
  filter: PropTypes.func,
  onIncomingMessage: PropTypes.func,
  hideAvatar: PropTypes.bool,
  hideName: PropTypes.bool,
  svgAvatar: PropTypes.bool,
  customKey: PropTypes.string
};
module.exportDefault(filteredMessages(Messages));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"style.less":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/chat/style.less                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// These styles have already been applied to the document.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
let Empirica;
module.link("meteor/empirica:core", {
  default(v) {
    Empirica = v;
  }

}, 0);
let render;
module.link("react-dom", {
  render(v) {
    render = v;
  }

}, 1);
let ExitSurvey;
module.link("./exit/ExitSurvey", {
  default(v) {
    ExitSurvey = v;
  }

}, 2);
let PreQualExitSurvey;
module.link("./exit/PreQualExitSurvey", {
  default(v) {
    PreQualExitSurvey = v;
  }

}, 3);
let FinalMidSurveyOne;
module.link("./exit/final-mid-survey/FinalMidSurvey1", {
  default(v) {
    FinalMidSurveyOne = v;
  }

}, 4);
let FinalMidSurveyTwo;
module.link("./exit/final-mid-survey/FinalMidSurvey2", {
  default(v) {
    FinalMidSurveyTwo = v;
  }

}, 5);
let FinalMidSurveyThree;
module.link("./exit/final-mid-survey/FinalMidSurvey3", {
  default(v) {
    FinalMidSurveyThree = v;
  }

}, 6);
let FinalMidSurveyFour;
module.link("./exit/final-mid-survey/FinalMidSurvey4", {
  default(v) {
    FinalMidSurveyFour = v;
  }

}, 7);
let FinalMidSurveyFive;
module.link("./exit/final-mid-survey/FinalMidSurvey5", {
  default(v) {
    FinalMidSurveyFive = v;
  }

}, 8);
let Thanks;
module.link("./exit/Thanks", {
  default(v) {
    Thanks = v;
  }

}, 9);
let Sorry;
module.link("./exit/Sorry", {
  default(v) {
    Sorry = v;
  }

}, 10);
let About;
module.link("./game/About", {
  default(v) {
    About = v;
  }

}, 11);
let Round;
module.link("./game/Round", {
  default(v) {
    Round = v;
  }

}, 12);
let Consent;
module.link("./intro/Consent", {
  default(v) {
    Consent = v;
  }

}, 13);
let NetworkSurveySelfContacts;
module.link("./intro/network-survey/NetworkSurveySelfContacts", {
  default(v) {
    NetworkSurveySelfContacts = v;
  }

}, 14);
let NetworkSurveySelfEC;
module.link("./intro/network-survey/NetworkSurveySelfEC", {
  default(v) {
    NetworkSurveySelfEC = v;
  }

}, 15);
let NetworkSurveyContactsEC;
module.link("./intro/network-survey/NetworkSurveyContactsEC", {
  default(v) {
    NetworkSurveyContactsEC = v;
  }

}, 16);
let NetworkSurveySelfFrequency;
module.link("./intro/network-survey/NetworkSurveySelfFrequency", {
  default(v) {
    NetworkSurveySelfFrequency = v;
  }

}, 17);
let NetworkSurveyContactsFrequency;
module.link("./intro/network-survey/NetworkSurveyContactsFrequency", {
  default(v) {
    NetworkSurveyContactsFrequency = v;
  }

}, 18);
let NetworkSurveyRelationshipInterpreter;
module.link("./intro/network-survey/NetworkSurveyRelationshipInterpreter", {
  default(v) {
    NetworkSurveyRelationshipInterpreter = v;
  }

}, 19);
let NetworkSurveyGenderInterpreter;
module.link("./intro/network-survey/NetworkSurveyGenderInterpreter", {
  default(v) {
    NetworkSurveyGenderInterpreter = v;
  }

}, 20);
let NetworkSurveyPersonalQuestions;
module.link("./intro/network-survey/NetworkSurveyPersonalQuestions", {
  default(v) {
    NetworkSurveyPersonalQuestions = v;
  }

}, 21);
let TutorialPageOne;
module.link("./intro/tutorial/TutorialPageOne", {
  default(v) {
    TutorialPageOne = v;
  }

}, 22);
let TutorialPageTwo;
module.link("./intro/tutorial/TutorialPageTwo", {
  default(v) {
    TutorialPageTwo = v;
  }

}, 23);
let TutorialPageThree;
module.link("./intro/tutorial/TutorialPageThree", {
  default(v) {
    TutorialPageThree = v;
  }

}, 24);
let TutorialPageFour;
module.link("./intro/tutorial/TutorialPageFour", {
  default(v) {
    TutorialPageFour = v;
  }

}, 25);
let AllQuiz;
module.link("./intro/quiz/AllQuiz", {
  default(v) {
    AllQuiz = v;
  }

}, 26);
let QuizFive;
module.link("./intro/quiz/QuizFive", {
  default(v) {
    QuizFive = v;
  }

}, 27);
let QuizSix;
module.link("./intro/quiz/QuizSix", {
  default(v) {
    QuizSix = v;
  }

}, 28);
let QuizSeven;
module.link("./intro/quiz/QuizSeven", {
  default(v) {
    QuizSeven = v;
  }

}, 29);
let QuizTwo;
module.link("./intro/quiz/QuizTwo", {
  default(v) {
    QuizTwo = v;
  }

}, 30);
let QuizOne;
module.link("./intro/quiz/QuizOne", {
  default(v) {
    QuizOne = v;
  }

}, 31);
let QuizOverview;
module.link("./intro/quiz/QuizOverview", {
  default(v) {
    QuizOverview = v;
  }

}, 32);
let EnglishScreen;
module.link("./intro/english-screening/EnglishScreen", {
  default(v) {
    EnglishScreen = v;
  }

}, 33);
let DescribeSymbolQuestion;
module.link("./intro/DescribeSymbolQuestion", {
  default(v) {
    DescribeSymbolQuestion = v;
  }

}, 34);
let Schedule;
module.link("./intro/Schedule", {
  default(v) {
    Schedule = v;
  }

}, 35);
let NewPlayer;
module.link("./intro/NewPlayer", {
  default(v) {
    NewPlayer = v;
  }

}, 36);
// Get rid of Breadcrumb component
Empirica.breadcrumb(() => null); // Set the About Component you want to use for the About dialog (optional).

Empirica.about(About); // Set the Consent Component you want to present players (optional).

Empirica.consent(Consent); // Set the component for getting the player id (optional)

Empirica.newPlayer(NewPlayer); // Introduction pages to show before they play the game (optional).
// At this point they have been assigned a treatment. You can return
// different instruction steps depending on the assigned treatment.

Empirica.introSteps((game, treatment) => {
  // MidSurveyFive, MidSurveyFour, MidSurveyThree, MidSurveyTwo, MidSurveyOne,
  const durationConsent = [QuizOne];
  const englishScreen = [EnglishScreen];
  const networkSurvey = [NetworkSurveySelfContacts, NetworkSurveySelfEC, NetworkSurveySelfFrequency, NetworkSurveyContactsEC, NetworkSurveyRelationshipInterpreter, NetworkSurveyGenderInterpreter, NetworkSurveyPersonalQuestions];
  const tutorialSteps = [TutorialPageOne, TutorialPageThree, TutorialPageFour];
  const symbolDescription = [DescribeSymbolQuestion]; // const quizSteps = [QuizOne, QuizTwo, QuizThree, QuizFour, QuizFive, QuizSix, QuizSeven, QuizEight,];
  // const quizSteps = [AllQuiz];

  const quizSteps = [QuizFive, QuizSix, QuizSeven, QuizTwo];
  const quizOverview = [QuizOverview];
  const schedule = [Schedule];
  let steps;

  if (game.treatment.isPreQualification) {
    steps = durationConsent.concat(englishScreen, tutorialSteps, quizSteps, symbolDescription, networkSurvey, schedule); // steps = englishScreen.concat(networkSurvey,tutorialSteps,quizSteps, symbolDescription, schedule);
    // steps = quizSteps.concat(symbolDescription);
  } else {
    steps = tutorialSteps.concat(quizOverview);
  }

  if (treatment.skipIntro) {
    return [];
  }

  return steps;
}); // The Round component containing the game UI logic.
// This is where you will be doing the most development.
// See client/game/Round.jsx to learn more.

Empirica.round(Round); // End of Game pages. These may vary depending on player or game information.
// For example we can show the score of the user, or we can show them a
// different message if they actually could not participate the game (timed
// out), etc.
// The last step will be the last page shown to user and will be shown to the
// user if they come back to the website.
// If you don't return anything, or do not define this function, a default
// exit screen will be shown.

Empirica.exitSteps((game, player) => {
  if (player.exitStatus && player.exitStatus === "custom" && (player.exitReason === "maxGameTimeReached" || player.exitReason === "minPlayerCountNotMaintained")) {
    return [FinalMidSurveyOne, FinalMidSurveyTwo, FinalMidSurveyThree, FinalMidSurveyFour, FinalMidSurveyFive, ExitSurvey, Thanks];
  }

  if (player.exitStatus && player.exitStatus === "custom" && player.exitReason === "preQualSuccess") {
    return [PreQualExitSurvey, Thanks];
  }

  if (!game || player.exitStatus && player.exitStatus !== "finished" && player.exitReason !== "playerQuit") {
    return [Sorry];
  }

  return [ExitSurvey, Thanks];
}); // Start the app render tree.
// NB: This must be called after any other Empirica calls (Empirica.round(),
// Empirica.introSteps(), ...).
// It is required and usually does not need changing.

Meteor.startup(() => {
  render(Empirica.routes(), document.getElementById("app"));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"public":{"css":{"intro.css":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// public/css/intro.css                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = require("meteor/modules").addStyles(
  "/* Network Survey */\n.network-survey-container {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    font-family: \"Palatino Linotype\", \"Book Antiqua\", \"Palatino\", serif;\n}\n\n.network-survey-container p {\n    display: flex;\n    margin-block-start: 1em;\n    margin-block-end: 1em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n}\n\n.network-survey-header p {\n    font-weight: bold;\n    text-transform: uppercase;\n    color: var(--darkblue);\n    font-size: 16px;\n    padding: 2em;\n}\n\n.network-survey-body {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 2em;\n    width: 70%;\n    margin: auto;\n}\n\n.network-survey-body p  {\n    text-transform: none;\n    font-weight: normal;\n    color: var(--darkblue);\n    font-size: 16px;\n}\n\n.network-form {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 2em;\n    width: 100%;\n}\n\n.input-row {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    width: 50%;\n}\n\n.dropdown-input-label {\n    display: flex;\n    width: 70%;\n    align-items: center;\n    justify-content: center;\n}\n\n.input-label {\n    display: flex;\n    margin-right: 10px;\n}\n\n.relationship-input-row {\n    display: flex;\n    width: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\n.relationship-input-label {\n    display: flex;\n    width: 40%;\n    align-items: center;\n    justify-content: center;\n}\n\n.relationship-buttons-container {\n    display: flex;\n    width: 60%;\n    justify-content: space-evenly;\n}\n\n.network-relationship-button {\n    display: flex;\n    font-family: \"Palatino Linotype\", \"Book Antiqua\", Palatino, serif;\n    font-size: 16px;\n    align-items: center;\n    padding: 0.25em 1em;\n    border: 1px solid black;\n    border-radius: 5px;\n\n    background-color: transparent;\n}\n\n.network-relationship-button:hover {\n    background-color: rgb(142, 209, 205);\n}\n\n.network-relationship-button.selected {\n    text-decoration-color: white;\n    background-color: var(--turquoise);\n}\n\n.network-relationship-button.selected:hover {\n    background: #03a5a7;\n}\n\n.network-button-container {\n    display: flex;\n    width: 100%;\n    justify-content: flex-start;\n    margin-top: 23px;\n}\n\n.personal-input-container {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: flex-start;\n    width: 100%;\n}\n\n.personal-input-container-row {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n    width: 100%;\n}\n\n.personal-input-radio-list-container {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    padding-left: 1em;\n}\n\n.personal-input-radio-container{\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n}\n\n.personal-input-race-specific-container {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: flex-start;\n    margin-left: 1em;\n}\n\n.personal-input-race-specific-input {\n    font-size: \"10px\";\n    margin-bottom: 1em;\n    overflow: auto;\n}\n\n.personal-input-job-title-input {\n    font-size: \"10px\";\n    margin-left: 1em;\n    overflow: auto\n}\n\n.network-list {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    text-transform: none;\n    max-width: 75%;\n    margin: auto;\n}\n\n.network-list li {\n    display: list-item;\n    margin-left: 10px;\n    list-style-type: disc;\n    width: 100%;\n    padding: 1em 2em;\n    text-transform: none;\n    font-style: italic;\n    font-weight: normal;\n    color: var(--darkblue);\n    font-size: 16px;\n}\n\n.dropdown-select-input {\n    font-size: 14px;\n    color: var(--darkblue);\n    margin: 2px;\n    border-radius: 5px;\n}\n\n.name-matrix-table {\n    width: 60%;\n    margin: 0px auto 2em;\n    font-size: 16px;\n}\n\nthead, tbody, tfoot { vertical-align: middle } /* add this rule*/\ntd, th, tr { vertical-align: inherit } /* add this rule */\n\n/* Tutorial */\n\n.tutorial-container {\n    display: flex;\n    flex-direction: column;\n}\n\n.title-static-image {\n    display: flex;\n    justify-content: flex-start;\n    padding: 30px 15px;\n}\n\n.two-col {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    width: 60%;\n}\n\n.tutorial-content {\n    display: flex;\n    flex-direction: column;\n}\n\n.tutorial-static-image {\n    display:flex;\n    margin-right: 40px;\n    width: 45%;\n    justify-content: center;\n    align-items: center;\n}\n\n.tutorial-info {\n    width: 50%;\n}\n\n.intro-heading {\n    font-family:\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif; \n    font-style:italic; \n    text-transform:uppercase; \n    font-weight:normal;\n    margin: 0px 0px;\n    font-size: 26px;\n    color: var(--darkblue);\n}\n\n.tutorial-body {\n    font-size: 16px;\n    word-spacing: 0.3em;\n    margin-top: 1rem;\n    color: var(--darkblue);\n}\n\n/* BUTTON STYLING AND POSITIONING */\n\n.tutorial-next-btn {\n    position: fixed;\n    top: 50%;\n    right: 0;\n    text-align:left;\n    background: var(--turquoise); \n\n}\n\n.tutorial-next-btn:hover {\n    margin-right: 20px;\n    background:var(--periwinkle)\n}\n\n.tutorial-next-btn:after {border-left:21px solid var(--turquoise); transition:.35s ease; -moz-transition:.35s ease; -webkit-transition:.35s ease}\n.tutorial-next-btn:hover:after {border-left:21px solid var(--periwinkle)}\n\n.tutorial-prev-btn {\n    position: fixed;\n    top: 50%;\n    left: 0;\n    text-align:right;\n    background: var(--turquoise); \n}\n\n.tutorial-prev-btn:hover {\n    margin-left: 20px;\n    background:var(--periwinkle)\n}\n\n.tutorial-prev-btn:before {border-right:21px solid var(--turquoise); transition:.35s ease; -moz-transition:.35s ease; -webkit-transition:.35s ease}\n.tutorial-prev-btn:hover:before {border-right:21px solid var(--periwinkle)}\n\n\n\n\n/* QUESTIONNAIRE STYLING */\n\n.questionnaire-radio {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n\n}\n\n.questionnaire-radio .quiz-button {\n    margin-right: 5px;\n    cursor: pointer;\n}\n\n.english-screening-buttons {\n    display: flex;\n    flex-direction: row;\n}\n\n.english-screening-horizontal-bar {\n    display: flex;\n}\n\n.questionnaire-heading {\n    margin: 10% auto 5% auto;\n    display: flex;\n    justify-content: center;\n    width: 590px;\n    text-align: center;\n}\n\n.question-section {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    margin-top: 15px;\n}\n\n.questionnaire-question {\n    padding-bottom: 20px;\n}\n\n.questionnaire-content-container {\n    display:flex;\n    flex-direction:column;\n    align-items: flex-start;\n    width: 590px;\n}\n\n.questionnaire-body {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    background-color: white;\n    font-family: \"Trebuchet MS\", Arial, Helvetica, sans-serif;\n    color: var(--darkblue);\n    width: 100%;\n    font-size: 15px;\n    padding: 25px;\n}\n\n.questionnaire-btn-container {\n    display: flex;\n}\n\n.progress-bar {\n    display: flex;\n    flex-direction:row;\n    align-items: flex-end;\n}\n\n.completed-heading {\n    font-family: \"Trebuchet MS\", Arial, Helvetica, sans-serif;\n    color: var(--turquoise);\n    font-size: 20px;\n    font-weight: bold;\n}\n\n.completed-bar {\n    display: flex;\n    flex-direction: column;\n}\n\n.slider-value-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n}\n\n.slider-value {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid lightgrey;\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    background-color: lightgrey;\n}\n\n/* Customizing SLIDER */\n\n.player-slider-container {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    padding: 15px 0px;\n}\n\n.player-label {\n    display: flex;\n    width: 25%;\n    padding: 5px 5px;\n    overflow-wrap: anywhere;\n}\n\n.empirica-slider {\n    width: 100%;\n}\n\n.bp3-slider-axis {\n    display: flex;\n    justify-content: space-between;\n}\n\n.bp3-slider-label {\n    transform: translate(0%, 20px);\n    display: flex;\n    position: static;\n    padding: 2px 5px;\n    vertical-align: top;\n    line-height: 1;\n    font-size: 12px;\n}\n\n.bp3-slider-track {\n    background-color: var(--darkblue);\n}\n\n.bp3-slider-handle {\n    background-color: var(--turquoise);\n    border: 1px solid var(--turquoise);\n    border-radius: 50%;\n    background-image: none;\n    box-shadow: none;\n    width: 20px;\n    height: 20px;\n}\n\n/* Turn off label that appears below slider handle */\n.bp3-slider-handle .bp3-slider-label {\n    display: none;\n}\n\n\n.survey-textarea {\n    width: 100%;\n    resize: vertical;\n    padding: 5px 5px 5px 5px;\n    margin-bottom: 30px;\n}\n\n\n\n"
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".less",
    ".css",
    ".mjs",
    ".jsx"
  ]
});

var exports = require("/client/main.js");