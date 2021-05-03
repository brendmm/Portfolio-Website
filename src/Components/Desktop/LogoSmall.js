import React from 'react';
import {colorScheme} from "../../ColorScheme.js"
import Sketch from "react-p5";


export default class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width:0,
    }
    this.firstName = "B"
    this.lastName = "M"
    this.mirror = -3
    this.fontSize = 25
}

  handleWindowResize = () => {
      this.setState({ width: window.innerWidth});
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize());
    this.ready = true
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize());
  }

setup = (p5, canvasParentRef) => {
  if(this.state.width > 760){
    p5.createCanvas(this.state.width*0.24, 65).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  }
  else{
    p5.createCanvas(this.state.width*0.50, 65).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  }
};

draw = p5 => {
  let s
  p5.textAlign(p5.CENTER);

  p5.clear()
  p5.textSize(this.fontSize)
  p5.fill(colorScheme.first);

    p5.push()
    p5.translate(-(this.fontSize+10),0);
    p5.push()
    if(this.state.width > 760){
      p5.translate(this.state.width*.10, 60);
    }
    else{
      p5.translate(this.state.width*.20, 60);
    }    s = p5.map(0, 0, this.state.width, this.mirror, 3);
    p5.scale(s, 3);
    p5.text(this.firstName, 0, 0);
    p5.pop()

    p5.push()
    if(this.state.width > 760){
      p5.translate(this.state.width*.10, 60);
    }
    else{
      p5.translate(this.state.width*.20, 60);
    }
    s = p5.map(0, 0, this.state.width, 3, 3);
    p5.scale(s, 3);
    // p5.text(this.lastName, -(4 + this.fontSize/10), 0);
    p5.text("      " +this.lastName, -(6 + this.fontSize/10), 0);
    p5.pop()
    p5.pop()
  }

render() {
    return (
      <Sketch setup={this.setup} draw={this.draw} style={{display:'flex'}}/>
    );
  }

}
