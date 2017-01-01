const React = require("react");
const ReactDOM = require("react-dom");
const JSONEditor = require('jsoneditor');

let jsoneditorCSS = require('style-loader!css-loader!./jsoneditor.css');

const jsonEditorConfig = {
  mode: "code",
  modes: ["code", "view"]
};

class JsonEditor extends React.Component { 
  constructor(props) {
    super(props);
  }

  init(container, options) {
    this.jsonEditor = new JSONEditor(container, options);
  }

  componentDidMount() {
    this.init(document.getElementById('jsonEditor'), jsonEditorConfig);
  }

  componentWillUnmount() {
    this.jsonEditor.destroy();
  }

  componentWillReceiveProps(nextProps) {
    this.jsonEditor.set(nextProps.blob.jsonblob);
    this.jsonEditor.setMode(nextProps.viewMode || "view");
  }

  render() {
    return (
      <div id='jsonEditor'></div>
    );
  }
}

module.exports = JsonEditor;
