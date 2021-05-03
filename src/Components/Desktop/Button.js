import React from 'react';
import './Button.css';
//import {colorScheme, buttonStyle} from "../ColorScheme.js"
import axios from 'axios';

const mainStyle = {
  cursor:'pointer',
  width:'100%',
  height:'100%',
  textAlign:'center',
  position:'relative',
  overflow: 'hidden'
}
const centering = {
  display:'inline-block',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position:'absolute',
  width:'100%'
}

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}

  ripple(e) {
      let btn = document.querySelector(".btn1");

      let ripple = document.createElement("span1");
      ripple.classList.add("ripple");

      let x = e.screenX - btn.getBoundingClientRect().left;
      let y = e.screenY - btn.getBoundingClientRect().top;

      ripple.style.background = this.props.rippleEffect
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      btn.appendChild(ripple);

  }

  async slide(e){
    let btn = document.querySelector(".btnSlide");
    let inner = document.querySelector(".inner");
    let slide = document.createElement("spanTemp");
    inner.innerHTML = this.props.onClickContent;

    btn.style.cursor = 'auto'

    btn.removeChild(inner)
    btn.appendChild(slide);
    btn.appendChild(inner)
    await axios({
          url: 'http://10.0.0.118:5000/backend/resume',
          method: 'GET',
          responseType: 'blob', // important
        })
        .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'BrendanMuldowneyResume.pdf');
            document.body.appendChild(link);
            link.click();

        }).catch((error) => {
              console.log(error)
            });
            let inner1 = document.querySelector(".inner");
            let slide1 = document.createElement("spanTemp1");
            inner1.innerHTML = "Downloaded";

            btn.style.cursor = 'auto'

            btn.removeChild(inner1)
            btn.appendChild(slide1);
            btn.appendChild(inner1)
  }

  directionIn(e){
    let btn = document.querySelector(".btn2");
    let inner = document.querySelector(".inner1");
    // inner.style.color='rgba(40,44,52,1)'
    inner.style.color='#ffffff'

    let ripple = document.createElement("span3");
    ripple.classList.add("ripple");

    let x = e.screenX - btn.getBoundingClientRect().left;
    let y = e.screenY - btn.getBoundingClientRect().top;

    ripple.style.background = 'rgba(20,22,26,1)'

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);
    btn.appendChild(inner);
  }
  directionOut(e){
    let btn = document.querySelector(".btn2");
    let inner = document.querySelector(".inner1");
    inner.style.color='white'

    let ripple = document.createElement("span4");
    ripple.classList.add("ripple");
    let x = e.screenX - btn.getBoundingClientRect().left;
    let y = e.screenY - btn.getBoundingClientRect().top;
    ripple.style.background = 'rgba(40,44,52,1)'
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    btn.appendChild(ripple);
    btn.appendChild(inner);
  }

  render() {
    if(this.props.type === 'ripple'){
      return (
        <div className='btn1'
          style={{...mainStyle, ...this.props.style}}
          onClick={this.ripple.bind(this)}
        >
        <div
          style={{ ...centering}}
        >
          {this.props.content}
          </div>
        </div>

      );
    }
    if(this.props.type === 'slide'){
      return (
        <div className='btnSlide'
          style={{...mainStyle, ...this.props.style}}
          onClick={this.slide.bind(this)}
        >
        <div
          className='inner'
          style={{ ...centering}}
        >
          {this.props.content}
          </div>
        </div>

      );
    }
    if(this.props.type === 'direction in'){
      return (
        <div style={{width:this.props.style.width,height:this.props.style.height}}>
        <div className='btn2'
          style={{...mainStyle, ...this.props.style}}
          onMouseEnter={this.directionIn.bind(this)}
          onMouseLeave={this.directionOut.bind(this)}
        >
        <div
          className='inner1'
          style={{ ...centering}}
        >
          {this.props.content}
          </div>
        </div>
        </div>


      );
    }
    else{
    return (
      <div className='btn3'
        style={{...mainStyle, ...this.props.style}}
      >
      <div
        style={{ ...centering}}
      >
        {this.props.content}
        </div>
      </div>

    );
}
  }
}


// slideInHover(e){
//   let btn = document.querySelector(".btn");
//
//   let ripple = document.createElement("span2");
//   ripple.classList.add("ripple");
//   ripple.style.borderRadius=this.props.style.borderRadius
//   ripple.style.animation = 'slideIn 1.0s'
//
//
//   btn.appendChild(ripple);
// }
// slideOutHover(e){
//   console.log('here');
//   let btn = document.querySelector(".btn");
//
//   let ripple = document.createElement("span2");
//   ripple.classList.add("ripple");
//   ripple.style.animation = 'slideOut 1.0s'
//
//   btn.appendChild(ripple);
// }
