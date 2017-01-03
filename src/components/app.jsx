require('style!css!./../libs/buttons.css');
require('style!css!./../libs/grids.css');

require('style!css!./Blob/Blob.css');
require('style!css!./app.css');
  
const React = require("react");
const ReactDOM = require("react-dom");

const JsonEditor = require('./JsonEditor/JsonEditor.jsx');
const BlobList = require('./BlobList/BlobList.jsx');
const NewBlob = require('./NewBlob/NewBlob.jsx');
const SaveBlob = require('./SaveBlob/SaveBlob.jsx');

const ApiService = require('./../services/jsonblob-api-service.js');
const StorageService = require('./../services/jsonblob-storage-service.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBlob: {
        id: "New",
        jsonblob: {},
        method: "create"
      },
      selectedBlobJson: {},
      viewMode: "code"
    };
    this.data = {
      selectedBlobJson: {}
    };
  }

  onBlobSelect(blob, viewMode) {
    this.setState({
      selectedBlob: blob,
      viewMode: viewMode
    });
  }

  onJsonEditorChange(blob) {
    if(blob.error) {
    } else {
      this.setState({
        selectedBlobJson: blob.json
      });
    }
  }

  onNewBlob(selectedBlob) {
    this.setState({
      selectedBlob: selectedBlob,
      viewMode: "code"
    });
  }

  onBlobSave(savedBlob) {
    this.setState({
      selectedBlob: savedBlob
    });
  }

  onBlobRemove() {
    this.setState({
      selectedBlob: {
        id: "New",
        jsonblob: {},
        method: "create"
      },
      viewMode: "code"
    });
  }

  render() {
    return (
      <div>
        <JsonEditor 
          viewMode={this.state.viewMode}
          selectedBlob={this.state.selectedBlob} 
          onJsonEditorChange={this.onJsonEditorChange.bind(this)}
        />
        <p>
          Selected <span className='selectedBlobId'>{this.state.selectedBlob.id}</span>
        </p>
        <div className='pure-g'>
          <NewBlob 
              onNewBlob={this.onNewBlob.bind(this)} 
          />
          <SaveBlob 
              selectedBlob={this.state.selectedBlob} 
              selectedBlobJson={this.state.selectedBlobJson}
              onBlobSave={this.onBlobSave.bind(this)}
          />
        </div>
        <BlobList 
          onBlobSelect={this.onBlobSelect.bind(this)} 
          onBlobRemove={this.onBlobRemove.bind(this)}
        />
      </div>
    ); 
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
