import React from 'react';
import '../../App.css';


export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}

  render() {
    let url = `url(${this.props.img})`
      return (
        <div
        className="Background-Image"
        style={{backgroundImage: url}}
        >
        </div>
      );
    }


}
