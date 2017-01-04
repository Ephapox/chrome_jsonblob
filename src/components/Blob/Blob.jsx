const React = require("react");
const Clipboard = require("clipboard");

const ApiService = require('./../../services/jsonblob-api-service.js');
const iframeService = require('./../../services/iframe-msg-service.js');

class Blob extends React.Component {
  constructor(props) {
    super(props);

    this.blobURL = `https://jsonblob.com/api/${this.props.blob.id}`;
  }
  
  componentDidMount(nextProps, nextState) {
    this.onBlobSelect(this.props.blob);
    new Clipboard(".button__copyBlobId");
  }

  formatBlobUrl(id) {
    return `https://jsonblob.com/api/${id}`;
  }

  onBlobSelect(blob, view) {
    ApiService.getBlob(blob.id)
      .then(jsonblob => {
        blob.jsonblob = jsonblob;
        blob.method = "update";
        this.props.onBlobSelect(blob, view);
      });
  }

  openBlobLink(id) {
    iframeService.messageContentScript({
      type: "jsonblob",
      url: this.formatBlobUrl(id)
    });
  }

  render() {
    return(
      <div className="jsonblob__blob">
        <p>{this.props.blob.name}</p> 
        <p>
          <a
              href="#"
              onClick={this.openBlobLink.bind(this, this.props.blob.id)}>
            {this.props.blob.id}
          </a> 
        </p>
        <div className='pure-g'>
          <button 
              className='pure-button button-secondary pure-u-1-4'
              onClick={this.onBlobSelect.bind(this, this.props.blob, "view")}>
            View
          </button>
          <button 
              className='pure-button pure-u-1-4'
              onClick={this.onBlobSelect.bind(this, this.props.blob, "code")}>
            Edit
          </button>
          <button 
              className='button__copyBlobId pure-button button-warning pure-u-1-4'
              data-clipboard-text={this.blobURL}>
            Copy URL
          </button>
          <button 
              className='pure-button button-error pure-u-1-4'
              onClick={this.props.onBlobRemove.bind(this, this.props.blob)}>
            Remove
          </button>
        </div>
      </div>
    );
  }
}

module.exports = Blob;
