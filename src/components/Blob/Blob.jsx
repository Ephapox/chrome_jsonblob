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

  onBlobSelect(blob, view) {
    ApiService.getBlob(blob.id)
      .then(jsonblob => {
        blob.jsonblob = jsonblob;
        this.props.onBlobSelect(blob, view);
      });
  }

  render() {
    return(
      <div className="jsonblob__blob">
        <p>{this.props.blob.id}</p> 
        <p>{this.props.blob.name}</p> 
        <p onClick={this.onBlobSelect.bind(this, this.props.blob, "view")}>View</p>
        <p onClick={this.onBlobSelect.bind(this, this.props.blob, "code")}>Edit</p>
        <p>Remove</p>
      </div>
    );
  }
}

module.exports = Blob;
