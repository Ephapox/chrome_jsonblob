const React = require('react');
const ReactDOM = require('react-dom');

class AddBlob extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.saveBlob.bind(this)}>Save Blob</button>
      </div>
    );
  }
}

module.exports = AddBlob;
