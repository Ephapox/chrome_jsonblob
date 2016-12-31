const React = require("react");
const ReactDOM = require("react-dom");
const _ = require('lodash');

const Blob = require('./../Blob/Blob.jsx');

const StorageService = require('./../../services/jsonblob-storage-service.js');

class BlobList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blobList: {} 
    };
  }

  componentDidMount() {
    StorageService.getAllBlobs().then(this.updateBlobList.bind(this));
  }

  updateBlobList(blobs) {
    this.setState({
      blobList: blobs
    });
  }

  render() {
    if(_.values(this.state.blobList).length) {
      let blobList = _.map(this.state.blobList, blob => {
        return (<Blob key={blob.id} blob={blob} />);
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
