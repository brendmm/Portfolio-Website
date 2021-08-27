import React from 'react';
import {colorScheme} from "../../ColorScheme.js"
import './ShadeSlider.css'


export default class ShadeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        enteredValue: 40
    };
}
handleChange = (e,v) => {
    this.setState({enteredValue:e.target.value})
    this.props.setValue(e.target.value)
}
  render() {
      return (
        <div>
            <input type="range" min="1" max="100" style= {{ cursor:'pointer',backgroundColor: colorScheme.first, color: colorScheme.second, outline:'none',transform: 'rotate(270deg) ', zIndex:'8', position: 'absolute'}}
            value={this.state.enteredValue} id="myRange" onChange={(event, value) => this.handleChange(event, value)}>

            </input>
        </div>
      );
    }
}