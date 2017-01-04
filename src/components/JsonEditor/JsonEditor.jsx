const React = require("react");
const JSONEditor = require('jsoneditor');

let jsoneditorCSS = require('style-loader!css-loader!./jsoneditor.css');


class JsonEditor extends React.Component { 
  constructor(props) {
    super(props);

    this.viewMode = "code";
    this.selectedBlobId = "New";
  }

  componentDidMount() {
    this.jsonEditor = new JSONEditor(
      document.getElementById("jsonEditor"), 
      {
        mode: "code",
        modes: ["code", "view"],
        onChange: this.onJsonEditorChange.bind(this),
        onError: this.onJsonEditorError.bind(this)
      }
    );
  }

  onJsonEditorChange() {
    let jsonData = {
      json: {},
      error: false
    };
    try {
      jsonData.json = this.jsonEditor.get();
      jsonData.error = false;
    } catch(e) {
      jsonData.error = true;
    } 
    this.props.onJsonEditorChange(jsonData);
  }

  onJsonEditorError(e) {
    console.debug(e);
  }

  componentWillUnmount() {
    this.jsonEditor.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if(this.viewMode !== nextProps.viewMode) {
      this.viewMode = nextProps.viewMode;
      this.jsonEditor.setMode(nextProps.viewMode || "view");
    }
    if(nextProps.selectedBlob.id !== this.selectedBlobId) {
      this.selectedBlobId = nextProps.selectedBlob.id;
      this.jsonEditor.set(nextProps.selectedBlob.jsonblob);
    }
  }

  render() {

    return (
      <div id='jsonEditor'></div>
    );
  }
}

module.exports = JsonEditor;
