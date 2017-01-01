const React = require("react");
const ReactDOM = require("react-dom");

const JsonEditor = require('./JsonEditor/JsonEditor.jsx');
const BlobList = require('./BlobList/BlobList.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBlob: null
    };
  }

  onBlobSelect(blob, viewMode) {
    this.setState({
      selectedBlob: blob,
      viewMode: viewMode
    });
  }

  render() {
    return (
      <div>
        <JsonEditor 
          viewMode={this.state.viewMode}
          blob={this.state.selectedBlob} 
        />
        <BlobList 
          onBlobSelect={this.onBlobSelect.bind(this)} 
        />
      </div>
    ); 
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
