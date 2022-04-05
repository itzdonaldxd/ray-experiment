import "./style.less";

import PropTypes from "prop-types";
import React from "react";
import Footer from "./Footer";
import Message from "./Message";
import Messages from "./Messages";
import ChatHeader from "./ChatHeader";
import ErrorBoundary from "./ErrorBoundary";

export default class ChatContainer extends React.PureComponent {
  state = { 
    isActive: true,
    isOpen: true,
  };

  onTitleClick = () => {
    this.setState({ isOpen: !this.state.isOpen});
  };

  onXClick = () => {
    const {customKey, onCloseChat} = this.props;
    onCloseChat(customKey);
    // this.setState({ isActive: !this.state.isActive})
  };

  onNewMessage = (msg) => {
    const { onNewMessage, scope, customKey } = this.props;

    if (onNewMessage) {
      msg = onNewMessage(msg);
      if (!msg) {
        return;
      }
    }

    scope.append(customKey, msg);
  };

  componentDidMount = () => {
    const { dockStartOpen, docked } = this.props;
    if (docked && !dockStartOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  render() {
    const { isOpen, forceOpen } = this.state;
    const {
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
      isActive,
      onCloseChat,
      ...rest
    } = this.props;

    const common = { player, scope, customKey };
    if (!isActive) {
      return null;
    }

    return (
      <ErrorBoundary>
        <div
          className={`${
            customClassName ? customClassName : "empirica-chat-container"
          } ${docked ? "undocked" : "undocked"}`}
        >
          <div className={`chat ${isOpen ? "open" : ""}`}>
            {docked && (
              <HeaderComp {...common} otherPlayer={otherPlayer} onTitleClick={this.onTitleClick} onXClick={this.onXClick} isOpen={isOpen} />
            )}
            {isOpen ? (
              <>
                <Messages
                  {...common}
                  messageComp={MessageComp}
                  filter={filter}
                  onIncomingMessage={onIncomingMessage}
                  {...rest}
                />
                <FooterComp
                  {...common}
                  timeStamp={timeStamp}
                  onNewMessage={this.onNewMessage}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
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
  footer: Footer,
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
  footer: PropTypes.elementType.isRequired,
};
