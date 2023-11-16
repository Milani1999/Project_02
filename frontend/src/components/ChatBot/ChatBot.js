import React, { Component } from "react";

class Chat extends Component {
  componentDidMount() {
    (function (d, m) {
      var kommunicateSettings = {
        appId: process.env.REACT_APP_CHAT_BOT,
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      console.log(process.env.REACT_APP_CHAT_BOT);
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = process.env.REACT_APP_CHAT_SRC;
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Chat;
