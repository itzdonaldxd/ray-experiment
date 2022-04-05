import PropTypes from "prop-types";
import React from "react";
import { isString } from 'lodash';


export default class Message extends React.Component {
  renderTime = (timeStamp) => {
    const hours = new Date(timeStamp).getHours();
    const minutes = new Date(timeStamp).getMinutes();

    if (!hours || !minutes) {
      return null;
    }

    const time = `${hours
      .toString()
      .padStart(2, 0)}:${minutes.toString().padStart(2, 0)}`;

    return <div className="timeStamp">{time}</div>;
  };

  renderName = (isSelf, name) => {
    return <div className="name">{isSelf ? "You" : name}</div>;
  };

  render() {
    const { message, player, hideName, hideAvatar, svgAvatar, avatar } = this.props;
    const { player: msgPlayer, text, timeStamp } = message;
    const isSelf = player._id == msgPlayer._id;
    let avatarImg;
    const useAvatar = !hideAvatar && (svgAvatar || avatar)
    if (useAvatar && avatar){
      if (isString(avatar)){
        console.warn("Deprecation: avatar should be an object containing a src or svg property")
        avatarImg = <img className="avatar" alt={''} src={avatar} />
      }
      else{
        const avatarSrc = avatar.svg || avatar.src
        if (avatar.svg) {
          avatarImg = <div
            dangerouslySetInnerHTML={{ __html: avatarSrc }}
            className="avatar"
          />
        } else{
          avatarImg = <img className="avatar" alt={avatar.alt} src={avatar.src} />
        }
      }
    }


    return (
      <div>
        {!isSelf ? 
          <div className="message" >    
            <div className="other-message-tick-container">
                  <img src={`images/net-bubble.png`} width="15px" height="10px"/>
            </div> 
            <div className={"text-container-other"}>
            {/* {!hideName && this.renderName(isSelf, msgPlayer.name)} */}
              <div className="text">{text}</div>
            </div>
          </div>
          : 
          <div className="message">    
            <div className={"text-container-self"}>
              {/* {!hideName && this.renderName(isSelf, msgPlayer.name)} */}
              <div className="text">{text}</div>
              {/* {timeStamp &&
              new Date(timeStamp).getTime() > 0 &&
              this.renderTime(timeStamp)} */}
            </div>
            <div className="self-message-tick-container">
              <img src={`images/my-bubble.png`} width="15px" height="10px"/>
            </div> 
          </div>
        }
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  self: PropTypes.bool,
  hideAvatar: PropTypes.bool,
  hideName: PropTypes.bool,
  svgAvatar: PropTypes.bool,
  avatar: PropTypes.shape({
    svg:  PropTypes.string,
    src:  PropTypes.string,
    alt:  PropTypes.string,
  }),
};
