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
      loadingBlobs: false
    };
  }

  componentDidMount() {
    this.setState({
      loadingBlobs: true
    });
    StorageService.getAllBlobs().then(this.updateBlobList.bind(this));
  }

  updateBlobList(blobs) {
    this.setState({
      blobList: blobs,
      loadingBlobs: false
    });
  }

  onBlobSelect(blob, viewMode) {
    this.props.onBlobSelect(blob, viewMode);
  }

  onBlobRemove(blob) {
    StorageService.removeBlob(blob.id)
      .then(StorageService.getAllBlobs)
      .then(this.updateBlobList.bind(this))
      .then(() => {
        this.props.onBlobRemove();
      });
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
    } else if(this.state.loadingBlobs) {
      return (
        <h1>Loading...</h1> 
      );
    } else {
      return (
        <h1>You have no blobs.</h1> 
      );
    }
  }
}

module.exports = BlobList;
