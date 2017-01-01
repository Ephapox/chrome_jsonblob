const React = require("react");
const ReactDOM = require("react-dom");
const JSONEditor = require('jsoneditor');

let jsoneditorCSS = require('style-loader!css-loader!./jsoneditor.css');


class JsonEditor extends React.Component { 
  constructor(props) {
    super(props);
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
    let jsonData;
    try {
      jsonData = this.jsonEditor.get();
    } catch(e) {
      jsonData = "invalid";
    } finally {
      this.props.onJsonEditorChange(jsonData);
    }
  }

  onJsonEditorError(e) {
    console.debug(e);
  }

  componentWillUnmount() {
    this.jsonEditor.destroy();
  }

  componentWillReceiveProps(nextProps) {
    this.jsonEditor.set(nextProps.selectedBlob.jsonblob);
    this.jsonEditor.setMode(nextProps.viewMode || "view");
  }

  render() {

    return (
      <div id='jsonEditor'></div>
    );
  }
}

module.exports = JsonEditor;
