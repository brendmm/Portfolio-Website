import React from 'react';
import "./Gallery.css"
import {colorScheme} from "../../ColorScheme.js"
import './SlideModal.css';

const mainStyle = {
  width:'100%',
  height:'100%',
  textAlign:'center',
  position:'relative',
  overflow: 'hidden'
}
const centering = {
  display:'inline-block',
  // top: '50%',
  left: '50%',
  transform: 'translate(-51.3%, -50%)',
  position:'absolute',
  width:'100%'
}
const centeringText = {
  display:'inline-block',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position:'absolute',
  width:'100%',
  textAlign: 'center'
}

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: '100vw',
      imageHeight: '50vh',
      width: window.innerWidth,
      height: window.innerHeight,
      inView: false,
      hold:false
    };
}

componentDidMount() {
 }

 componentWillUnmount() {
 }

closeModal = () => {
  let modal = document.querySelector('.SlideModal')
  modal.style.animation = 'closeSlideModal 0.5s'
  modal.style.animationFillMode = 'forwards'
}

render() {

    return (
        <div className="SlideModal" style={{opacity:'0.8',zIndex:'5',...mainStyle, ...centering, textAlign:'left',position:'absolute',top:'-15vh',width:'70vw',height:'7vh', backgroundColor:colorScheme.third, fontSize:'0.6em', margin:'1vw', borderRadius:'5px'}}
        onClick={()=>this.closeModal()}
        >
        <div style={{ ...centeringText}}>
            <span>We will save this image for you using </span>
            <a
            style={{color:colorScheme.fourth}}
            href="https://www.dummies.com/education/internet-basics/defining-and-dealing-with-web-cookies/" target="_blank" rel="noopener noreferrer"
            >cookies</a> to improve your experience. If you do not want to use cookies, just unsave the this image
        </div>
        </div>
    );
  }


}
