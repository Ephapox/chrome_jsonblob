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
        name: "New Blob",
        jsonblob: {},
        method: "create"
      },
      blobInputVal: "",
      viewMode: "code"
    };
  }

  onBlobSelect(blob, viewMode) {
    this.setState({
      selectedBlob: blob,
      blobInputVal: blob.name,
      viewMode: viewMode
    });
  }

  onJsonEditorChange(blob) {
    if(blob.error) {
    } else {
      const selectedBlob = this.state.selectedBlob;
      selectedBlob.jsonblob = blob.json;
      this.setState({
        selectedBlob: selectedBlob 
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
        method: "create",
        name: "New Blob"
      },
      viewMode: "code",
      blobInputVal: "New Blob"
    });
  }

  handleChange(event) {
    const selectedBlob = this.state.selectedBlob;
    selectedBlob.name = event.target.value;
    this.setState({
      blobInputVal: event.target.value,
      selectedBlob: selectedBlob
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
        <div className='selectedBlobContainer'>
          <p>Selected <span className='selectedBlobId'>{this.state.selectedBlob.id}</span></p>
          <div className='selectedBlobName'>
            <input 
                className='selectedBlobInput' 
                type="text" 
                name='selectedBlobName' 
                value={this.state.blobInputVal} 
                onChange={this.handleChange.bind(this)}
            />
          </div>
          
          <SaveBlob 
              selectedBlob={this.state.selectedBlob} 
              onBlobSave={this.onBlobSave.bind(this)}
          />
        </div>
        <NewBlob 
            onBlobSelect={this.onBlobSelect.bind(this)} 
        />
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
