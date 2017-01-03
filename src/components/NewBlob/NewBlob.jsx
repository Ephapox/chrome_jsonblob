const React = require('react');
const ReactDOM = require('react-dom');

class NewBlob extends React.Component {
  constructor(props) {
    super(props);
  }

  newBlob() {
    this.props.onNewBlob({
      id: "New",
      jsonblob: {},
      method: "create"
    });
  }

  render() {
    return (
      <button 
          className='pure-button button-success pure-u-1-3'
          onClick={this.newBlob.bind(this)}>
        New Blob
      </button>
    );
  }
}

module.exports = NewBlob;
