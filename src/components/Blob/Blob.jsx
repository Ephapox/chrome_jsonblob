const React = require("react");
const ReactDOM = require("react-dom");

const ApiService = require('./../../services/jsonblob-api-service.js');

class Blob extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(nextProps, nextState) {
    this.onBlobSelect(this.props.blob);
  }

  formatBlobUrl(id) {
    return `https://jsonblob.com/${id}`;
  }

  onBlobSelect(blob, view) {
    ApiService.getBlob(blob.id)
      .then(jsonblob => {
        blob.jsonblob = jsonblob;
        blob.method = "update";
        this.props.onBlobSelect(blob, view);
      });
  }

  render() {
    return(
      <div className="jsonblob__blob">
        <p>{this.props.blob.name}</p> 
        <p>
          <a
              href={this.formatBlobUrl(this.props.blob.id)}>
            {this.props.blob.id}
          </a> 
        </p>
        <div className='pure-g'>
          <button 
              className='pure-button button-secondary pure-u-1-3'
              onClick={this.onBlobSelect.bind(this, this.props.blob, "view")}>
            View
          </button>
          <button 
              className='pure-button pure-u-1-3'
              onClick={this.onBlobSelect.bind(this, this.props.blob, "code")}>
            Edit
          </button>
          <button 
              className='pure-button button-error pure-u-1-3'
              onClick={this.props.onBlobRemove.bind(this, this.props.blob)}>
            Remove
          </button>
        </div>
      </div>
    );
  }
}

module.exports = Blob;
