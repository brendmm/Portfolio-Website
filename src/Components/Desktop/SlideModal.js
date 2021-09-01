import React from 'react';
import "./Gallery.css"
import {colorScheme} from "../../ColorScheme.js"
import './SlideModal.css';
import CloseIcon from '../../Images/CloseIcon.png'

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
  transform: 'translate(-55%, -50%)',
  position:'absolute',
  width:'100%'
}
const centeringText = {
  // display:'inline-block',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  marginTop: '3vh',
  marginLeft: '3vh',
  paddingRight: '3vh',
  position:'relative',
  width:'90%',
  textAlign: 'left'}

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
        <div className="SlideModal" style={{cursor:'pointer',opacity:'0.85',zIndex:'5',...mainStyle, ...centering, textAlign:'left',position:'absolute',top:'-15vh',width:'70vw',height:'12vh', backgroundColor:colorScheme.third, fontSize:'0.7em', margin:'3vw', borderRadius:'5px'}}
        onClick={()=>this.closeModal()}
        >
        <div style={{ ...centeringText}}>
            <span>We will save this image for you using </span>
            <a
            style={{color:colorScheme.fourth}}
            href="https://www.dummies.com/education/internet-basics/defining-and-dealing-with-web-cookies/" target="_blank" rel="noopener noreferrer"
            >cookies</a>. Cookies allow us to store your customizations and improve your experience. If you do not want to use cookies, just unsave the this image

        </div>
        <img className="Icon-Image" src={CloseIcon} alt='placeholder' width="40" height="40"
        style={{
          position: 'absolute',
          right:'2vh',
          top:'2vh'
        }}/>
        </div>
    );
  }


}
