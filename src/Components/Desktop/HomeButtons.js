import React from 'react';
import {colorScheme} from "../../ColorScheme.js"
import './Button.css';
import './Home.css'

const mainStyle = {
  cursor:'pointer',
  width:'100%',
  height:'100%',
  textAlign:'center',
  position:'relative',
  overflow: 'hidden',
  // zIndex:'1'
}
const centering = {
  display:'inline-block',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position:'absolute',
  width:'100%'
}
export default class HomeButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  directionIn(e){
    let btn = document.querySelector(".btn2");
    let inner = document.querySelector(".inner1");
    // inner.style.color='rgba(40,44,52,1)'
    inner.style.color=colorScheme.first

    let ripple = document.createElement("span3");
    ripple.classList.add("ripple");

    let x = e.screenX - btn.getBoundingClientRect().left;
    let y = e.screenY - btn.getBoundingClientRect().top;

    ripple.style.background = colorScheme.second

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    while (btn.firstChild) {
          btn.removeChild(btn.firstChild);
      }
    btn.appendChild(ripple);
    btn.appendChild(inner);
  }
  directionOut(e){
    let btn = document.querySelector(".btn2");
    let inner = document.querySelector(".inner1");
    inner.style.color=colorScheme.first

    let ripple = document.createElement("span4");
    ripple.classList.add("ripple");
    let x = e.screenX - btn.getBoundingClientRect().left;
    let y = e.screenY - btn.getBoundingClientRect().top;
    ripple.style.background = colorScheme.third
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    btn.appendChild(ripple);
    btn.appendChild(inner);
  }
  move = () => {
    this.props.toggle()
  }

render() {
            return (
              <div style={{textAlign:'center',marginTop:'-20vh'}}>
                    <div style={{width:'200px',height:'50px',borderRadius:'5px',display:'inline-block'}}
                      onClick={() => this.move()}
                    >
                    <div className='btn2'
                      style={{...mainStyle, color: colorScheme.first,borderRadius:'10px',background:colorScheme.third,fontSize:'1.2em'}}
                      onMouseEnter={this.directionIn.bind(this)}
                      onMouseLeave={this.directionOut.bind(this)}
                    >
                    <div
                      className='inner1'
                      style={{ ...centering}}
                    >
                      Get Started
                      </div>
                    </div>
                    </div>
              </div>
            );
  }
}
