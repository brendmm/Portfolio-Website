import React from 'react';
import Home from "./HomePhone.js"
import About from "./AboutPhone.js"
import Gallery from "./GalleryPhone.js"
import Projects from "./ProjectsPhone.js"
import {colorScheme} from "../../ColorScheme.js"

import './PhoneView.css';


export default class Phoneview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    this.homeRef = React.createRef()
    this.aboutRef = React.createRef()
    this.projectsRef = React.createRef()
    this.galleryRef = React.createRef()
    this.pages = [
      ['HomePage', this.homeRef],
      ['AboutPage', this.aboutRef],      
      ['ProjectsPage', this.projectsRef],      
      ['GalleryPage', this.galleryRef],
    ]
    this.screenTop = window.innerHeight*0.15
    this.currentRef = null
    this.currentPage = 'HomePage'


}

componentDidMount() {
  this.currentRef = this.homeRef
}

swipeDown = () => {
  if(this.currentPage !== 'GalleryPage'){
    for(let i=0; i < this.pages.length; i ++){
      console.log(i);
      console.log(this.pages[i][0]);
      console.log(this.currentPage);
      if (this.pages[i][0] === this.currentPage){
        this.currentRef = this.pages[i+1][1]
        this.currentPage = this.pages[i+1][0]
        break
      }
    }
  }
  window.scrollTo(0, this.currentRef.current.offsetTop)
}

swipeUp= () => {
  if(this.currentPage !== 'HomePage'){
      for(let i=3; i > 0; i --){
        if (this.pages[i][0] === this.currentPage){
          this.currentRef = this.pages[i-1][1]
          this.currentPage = this.pages[i-1][0]
          break
        }
      }
    }
    console.log(this.currentRef)
    window.scrollTo(0, this.currentRef.current.offsetTop)
}

calculatePage = (e) => {
  let lastTime = e.timeStamp
  let deltaY = this.lastPosition.y - this.startPosition.y
  let deltaTime = lastTime - this.startPosition.time
  // console.log(deltaX);
  console.log(deltaY);
  console.log(deltaTime);

  if (-(deltaY/deltaTime) > 0.1 ){
    this.swipeDown()
  }
  else if ((deltaY/deltaTime) > 0.1 ){
    this.swipeUp()
  }
  else{  
      window.scrollTo(0, this.currentRef.current.offsetTop)
  }

  console.log(deltaY/deltaTime);
}

calculateDelta = (e) => {
  this.lastPosition = {
    x:e.touches[0].clientX,
    y:e.touches[0].clientY,
    time: e.timeStamp
  }
}

swipeStart = (e) => {
  this.startPosition={
    x:e.touches[0].clientX,
    y:e.touches[0].clientY,
    time: e.timeStamp
  }
}

render() {
  console.log(this.currentPage);

      return (
        <div>

        <div style={{color:'black',position:'relative'}} onTouchEnd={this.calculatePage.bind(this)} onTouchMove={this.calculateDelta.bind(this)} onTouchStart={this.swipeStart.bind(this)}>

        <div className="AboutSection" 
          style={{zIndex:'0',position:'fixed',top:'15',bottom:'0',left:'0',right:'0',
                  width:'100%',height:'85vh',backgroundColor:colorScheme.second,textAlign:'center'}} >
          <About />
        </div>
        <div className = 'HomePage' ref={this.homeRef} style={{zIndex:'2',position:'relative',color:colorScheme.second,height: '85vh'}}>
         <Home/>
        </div>
        <div className = 'AboutPage' ref={this.aboutRef} style={{zIndex:'2',position:'relative',height: '85vh',backgroundColor:'transparent'}}>
          
        </div>
        <div className='ProjectsPage' ref={this.projectsRef} style={{zIndex:'2',position:'relative',height: '85vh'}}>
          <Projects />
        </div>
        <div className = 'GalleryPage' ref={this.galleryRef} style={{zIndex:'2',position:'relative',height: '85vh'}}>
          <Gallery />
         </div>

        </div>
        </div>
      );
    }
}
