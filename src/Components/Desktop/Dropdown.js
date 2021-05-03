import React from 'react';
import './Button.css';

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
}

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}

  render() {

    return (
      <div className='btn3'
        style={{...mainStyle, ...this.props.style}}
      >
      <div
        style={{ ...centering}}
      >
      Options
        </div>

        <div
          style={{ ...centering}}
        >
        >
          </div>
      </div>

    );
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
