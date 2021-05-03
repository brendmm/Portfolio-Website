import React from 'react';
import {colorScheme} from "../../ColorScheme.js"
import Sketch from "react-p5";


export default class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width:0,
    }
    this.firstName = "Brendan"
    this.lastName = "Muldowney"
    this.count = 0
    this.count2 = 0
    this.mirror = 3
    this.speed = 15
    this.fontSize = 25
    this.await = 0
    this.width = 0
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
  this.width=this.state.width
  p5.createCanvas(this.props.width, 110).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
};

draw = p5 => {
  let s
  p5.textAlign(p5.CENTER);
  p5.clear()
  p5.textSize(this.fontSize)
  p5.fill(colorScheme.first);
  if(this.ready === true){
  if(this.await < 160){
    this.await = this.await + 1
    p5.translate(this.state.width/2, 90);
    s = p5.map(0, 0, this.state.width, 3, 3);
    p5.scale(s, 3);
    p5.text(this.firstName + " " + this.lastName, 0, 0);
    this.count = this.count + 1
  }
  else{

  if (this.lastName !== "M") {
    if (this.count % this.speed === 0) {
      this.lastName = this.lastName.slice(0, -1)
    }
  }
  else if (this.firstName !== "B") {
    if (this.count % this.speed === 0) {
      this.firstName = this.firstName.slice(0, -1)
    }
  }

  if (this.firstName === "B" && this.lastName === "M") {
    // p5.textAlign(p5.LEFT);
    if(this.count2>this.speed){
      p5.push()
      p5.translate(-(this.fontSize),0);
      p5.push()
      p5.translate(this.state.width/2, 90);
      s = p5.map(0, 0, this.state.width, this.mirror, 3);
      p5.scale(s, 3);
      if(this.mirror>0){
        p5.text(this.firstName+"  ", 0, 0);
      }
      else{
        p5.text(this.firstName, 0, 0);
      }
      p5.pop()

      p5.push()
      p5.translate(this.state.width/2, 90);
      s = p5.map(0, 0, this.state.width, 3, 3);
      p5.scale(s, 3);
      // p5.text(this.lastName, -(4 + this.fontSize/10), 0);
      p5.text("      "+this.lastName, -(8 + this.fontSize/10), 0);
      p5.pop()
      p5.pop()
      if (this.mirror > -3) {
        this.mirror = this.mirror - 0.3
      }
      else if(this.fontSize < 40){
        this.fontSize = this.fontSize + 1
      }
    }
    else{
      this.count2=this.count2+1
      p5.translate(this.state.width/2, 90);
      s = p5.map(0, 0, this.state.width, 3, 3);
      p5.scale(s, 3);
      p5.text(this.firstName + " " + this.lastName, 0, 0);
    }
  }
  else {

      p5.translate(this.state.width/2, 90);
      s = p5.map(0, 0, this.state.width, 3, 3);
      p5.scale(s, 3);
      p5.text(this.firstName + " " + this.lastName, 0, 0);
      this.count = this.count + 1
    }
  }
}

}

render() {
    return (
      <Sketch setup={this.setup} draw={this.draw} style={{display:'flex'}}/>
    );
  }

}
