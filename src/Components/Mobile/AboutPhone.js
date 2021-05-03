import React from 'react';
import {colorScheme} from "../../ColorScheme.js"
import './PhoneView.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
}

  componentDidMount() {
     window.addEventListener('resize', this.updateWindowDimensions.bind(this));
   }

  componentWillUnmount() {
     window.removeEventListener('resize', this.updateWindowDimensions);
   }

  updateWindowDimensions(e) {
     this.setState({ width: window.innerWidth, height: window.innerHeight });
   }

   componentDidUpdate(prevProps) {
    if(prevProps.currentPage !== this.props.currentPage){
      if(this.props.currentPage === 'AboutPage'){
        let display = document.querySelector(".AboutSection")
        display.style.animation = 'scrollUp 0.5s'
        display.style.animationFillMode = 'forwards'
      }
      else if(this.props.currentPage === 'HomePage' && this.props.prevPage === 'AboutPage'){
        let display = document.querySelector(".AboutSection")
        display.style.animation = 'scrollDown 0.5s'
        display.style.animationFillMode = 'forwards'
      }
    }
  }

  render() {
      return (
        <div className="AboutSection" style={{width:'100%',height:'90vh',position: 'fixed', top: '100vh',color:colorScheme.first,backgroundColor:colorScheme.second}} >
          <div style={{overflow:'hidden'}}>
          <div style={{position:'relative'}}>
          <div className="about1" style={{marginLeft:'10vw',float:'left',display:'inline-block',height:'50vh',marginTop:'10vw', textAlign:'left',position:'fixed',left:'0',top:'15vh',width:'80vw',overflow:'hidden'}}>
            <div style={{ fontSize:'2.2em'}}>
             I'm a software developer.
            </div>
            <div style={{marginTop:'7vh',fontSize: '1.2em'}}>
              I'm a Magna Cum Laude graduate from Virginia Tech with a degree in computer engineering
            </div>
          </div>
          </div>

          </div>

        </div>
      );
    }
}
