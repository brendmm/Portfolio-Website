import React from 'react';
import Sketch from "react-p5";


export default class LockIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        lock:false
    };
    this.percentLock = 100
  }

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(70, 70).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };

  draw = p5 => {

    let s = 20
    let x = 1.2*s
    let y = 1.3*s
    if(this.state.lock){
        // p5.stroke(161,68,44)
    }
    else{
        p5.stroke(238,233,229)
    }
    p5.background(80,104,104)
    p5.strokeWeight(5);
    p5.circle(x+(s/2),y+((s/2)-(s/5)),s*2.5)
    p5.strokeWeight(3);
    
    //Lock Body
    p5.fill(0,0,0,0)
    p5.rect(x,y,s,s,s/5);
    p5.fill(0,0,0)
    p5.circle(x+(s/2),y+((s/2)-(s/6)),s/10)
    p5.line(x+(s/2),y+((s/2)-(s/6)),x+(s/2),y+(s/2))

    //Lock Bar
    p5.fill(0,0,0,0)
    p5.arc((x+(s/2)), y-s/3, s/2, s/2, p5.PI, 0);
    p5.line((x+(s)/2)+s/4,y,(x+(s)/2)+s/4,y-(s/3))
    p5.line((x+(s)/2)-s/4,y-((s/3)*(this.percentLock/100)),(x+(s)/2)-s/4,y-(s/3))


    if(this.state.lock && this.percentLock > 0){
        this.percentLock = this.percentLock - 10
    }
    if(!this.state.lock && this.percentLock < 100){
        this.percentLock = this.percentLock + 10
    }
  
}
toggleLock = () => {
    this.props.setLock(!this.state.lock)

    this.setState({lock:!this.state.lock})
}
  render() {
      return (
        <div onClick={()=>this.toggleLock()} style={{cursor:'pointer'}}>
            <Sketch setup={this.setup} draw={this.draw} style={{height:'50',width:'50',zIndex:'10',display:'flex',marginLeft:'1vw'}}
            
            />
        </div>
      );
    }
}
