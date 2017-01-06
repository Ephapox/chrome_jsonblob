const React = require('react');

class NewBlob extends React.Component {
  constructor(props) {
    super(props);
  }

  onBlobSelect() {
    this.props.onBlobSelect({
      id: "New",
      name: "New Blob",
      jsonblob: {},
      method: "create"
    }, "code");
  }

  render() {
    return (
      <div>
        <button 
            className='pure-button button-success pure-u-1-3'
            onClick={this.onBlobSelect.bind(this)}>
          New Blob
        </button>
      </div>
    );
  }
}

module.exports = NewBlob;
