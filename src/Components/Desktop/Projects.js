import React from 'react';
import {colorScheme} from "../../ColorScheme.js"
import "./Projects.css"


export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  componentDidMount() {
     window.addEventListener('resize', this.updateWindowDimensions.bind(this));
   }

  componentWillUnmount() {
     clearInterval(this.interval);
     window.removeEventListener('resize', this.updateWindowDimensions);
   }

  updateWindowDimensions(e) {
     this.setState({ width: window.innerWidth, height: window.innerHeight });
   }

  componentDidUpdate(prevProps) {
   if(prevProps.page !== this.props.page || prevProps.about !== this.props.about){
     this.processPageState()
   }
 }

  processPageState = () => {
    let myPage = document.querySelector(".ProjectsMain")

    if(this.props.page === 'ProjectsPage'){
      if(myPage.clientWidth > this.state.width *0.9){
        myPage.style.animation = "SlideRight 0.5s"
      }
      else if(myPage.clientWidth < this.state.width *0.75){
        myPage.style.animation = "SlideRightHalf 0.5s"
      }
    }
    else if(this.props.page === 'HomePage'){
      if(this.props.about){
        if(myPage.clientWidth > this.state.width *0.9){
          myPage.style.animation = "SlideHalf 0.5s"
        }
        else{
          myPage.style.animation = "Slide8050 0.5s"
        }
      }
      else{
        if(myPage.clientWidth > this.state.width *0.75){
          myPage.style.animation = "Slide80100 0.5s"
        }
        else{
          myPage.style.animation = "SlideFull 0.5s"
        }
      }
    }
    else if(myPage.clientWidth > this.state.width *0.9){
      myPage.style.animation = "Slide80100 0.5s"
    }
    myPage.style.animationFillMode = "forwards"
  }

  projectSelection = () => {
    return(
      <div style={{marginTop:'5vh'}}>
      The Project ID is {this.props.projectSelection} test
      </div>
    )
  }
  render() {
      return (
        <div className="ProjectsMain" style={{color:colorScheme.third,height:'100vh',position:'relative', overflow:'hidden'}} >
          <div style={{display:"inline-block",textAlign:'center'}}>
          {this.projectSelection()}
          </div>
        </div>
      );
    }


}
