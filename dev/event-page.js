const SEND_MESSAGE = {
  browserActionClick: {
    message: {
      type: "browserActionClick"
    },
    frame: {},
    responseCb: function(response) {
    
    }
  }
};

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(
    tab.id, 
    SEND_MESSAGE.browserActionClick.message,
    SEND_MESSAGE.browserActionClick.frame,
    SEND_MESSAGE.browserActionClick.responseCb
  );
});
