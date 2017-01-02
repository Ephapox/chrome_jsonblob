require('style!css!./../libs/buttons.css');
require('style!css!./../libs/grids.css');

require('style!css!./Blob/Blob.css');
require('style!css!./app.css');
  
const React = require("react");
const ReactDOM = require("react-dom");

const JsonEditor = require('./JsonEditor/JsonEditor.jsx');
const BlobList = require('./BlobList/BlobList.jsx');
const AddBlob = require('./AddBlob/AddBlob.jsx');

const ApiService = require('./../services/jsonblob-api-service.js');
const StorageService = require('./../services/jsonblob-storage-service.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBlob: {}
    };
    this.data = {
      newBlob: {}
    };
  }

  onBlobSelect(blob, viewMode) {
    this.setState({
      selectedBlob: blob,
      viewMode: viewMode
    });
  }

  onJsonEditorChange(blob) {
    this.data.newBlob = blob;
  }

  saveBlob() {
    let newBlob = this.data.newBlob;
    if(newBlob === "invalid") {
    } else {
      ApiService.createBlob(newBlob)
        .then(res => {
          let id = res.headers.get('x-jsonblob');
          let date = new Date().toLocaleString()
          return {id: id, name: date, jsonblob: newBlob};
        })
        .then(StorageService.saveBlob)
        .then(blob => {
          this.setState({
            selectedBlob: blob
          });
        });
    }
  }

  newBlob() {
    this.setState({
      selectedBlob: {
        id: "New",
        jsonblob: {}
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
          <button 
              className='pure-button button-success pure-u-1-3'
              onClick={this.newBlob.bind(this)}>
            New Blob
          </button>
          <button 
              className='pure-button button-secondary pure-u-1-3'
              onClick={this.saveBlob.bind(this)}>
            Save Blob
          </button>
        </div>
        <BlobList 
          selectedBlob={this.state.selectedBlob}
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
