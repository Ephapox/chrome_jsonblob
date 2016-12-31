const React = require("react");
const ReactDOM = require("react-dom");

class Blob extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="jsonblob__blob">
        <p>{this.props.blob.id}</p> 
        <p>{this.props.blob.name}</p> 
        <p>View</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
    );
  }
}

module.exports = Blob;
