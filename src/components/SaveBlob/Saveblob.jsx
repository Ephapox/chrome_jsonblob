const React = require('react');

const ApiService = require('./../../services/jsonblob-api-service.js');
const StorageService = require('./../../services/jsonblob-storage-service.js');

class SaveBlob extends React.Component {
  constructor(props) {
    super(props);

    this.selectedBlob = {};
  }

  componentWillReceiveProps(nextProps) {
    this.selectedBlob = nextProps.selectedBlob;
    this.selectedBlob.jsonblob = nextProps.selectedBlobJson;
  }

  saveBlob(selectedBlob) {
    if(selectedBlob === "invalid") {
    } else {
      ApiService[`${selectedBlob.method}Blob`](selectedBlob.jsonblob, selectedBlob.id)
        .then(res => {
          let id = res.headers.get('x-jsonblob');
          let date = new Date().toLocaleString();
          return {
            id: id, 
            name: date, 
            jsonblob: selectedBlob.jsonblob
          };
        })
        .then(StorageService.saveBlob)
        .then(blob => {
          this.props.onBlobSave(blob);
        });
    }
  }

  render() {
    return (
      <button 
          className='pure-button button-primary pure-u-1-3'
          onClick={this.saveBlob.bind(this, this.selectedBlob)}>
        Save Blob
      </button>
    );
  }
}

module.exports = SaveBlob;
