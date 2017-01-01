const React = require("react");
const ReactDOM = require("react-dom");
const _map = require('lodash/map');
const _values = require('lodash/values');

const Blob = require('./../Blob/Blob.jsx');

const StorageService = require('./../../services/jsonblob-storage-service.js');
const ApiService = require('./../../services/jsonblob-api-service.js');

class BlobList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blobList: {},
      selectedBlob: {} 
    };
  }

  componentDidMount() {
    StorageService.getAllBlobs().then(this.updateBlobList.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    StorageService.getAllBlobs().then(this.updateBlobList.bind(this));
    this.setState({
      selectedBlob: nextProps.selectedBlob,
    });
  }

  updateBlobList(blobs) {
    this.setState({
      blobList: blobs
    });
  }

  onBlobSelect(blob, viewMode) {
    this.props.onBlobSelect(blob, viewMode);
    this.setState({
      selectedBlob: blob
    });
  }

  onBlobRemove(blob) {
    StorageService.removeBlob(blob.id)
      .then(StorageService.getAllBlobs)
      .then(this.updateBlobList.bind(this));
    ApiService.removeBlob(blob.id);
  }

  render() {
    if(_values(this.state.blobList).length) {
      let blobList = _map(this.state.blobList, blob => {
        return (
          <Blob 
            key={blob.id} 
            blob={blob} 
            onBlobSelect={this.onBlobSelect.bind(this)}
            onBlobRemove={this.onBlobRemove.bind(this)}
          />
        );
      });

      return (
        <div>
          {blobList}
        </div>
      );
    }
    return (
      <h1>Loading...</h1> 
    );
  }
}

module.exports = BlobList;
