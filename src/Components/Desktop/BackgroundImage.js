import React from 'react';
import '../../App.css';
import ShadeSlider from "./ShadeSlider.js"


export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredValue:40
    };
}

  setValue = (v) => {
    this.setState({enteredValue:v})
  }
  render() {
    let url = `url(${this.props.img})`
    let val = this.state.enteredValue.toString() + '%'
      return (
        <div>
          <ShadeSlider setValue={this.setValue}/>
        <div
        className="Background-Image"
        style={{backgroundImage: url, opacity: val}}
        >
                    

        </div>
        
        </div>

      );
    }


}
