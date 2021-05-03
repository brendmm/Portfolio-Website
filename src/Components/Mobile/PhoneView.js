import React from 'react';
import {colorScheme} from "../../ColorScheme.js"

import Home from "./HomePhone.js"
import About from "./AboutPhone.js"
import Gallery from "./GalleryPhone.js"
import Projects from "./ProjectsPhone.js"

import './PhoneView.css';

export default class Phoneview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      currentPage: 'HomePage',
      prevPage: 'AboutPage',
    }
}

componentDidMount() {
  window.addEventListener("scroll", this.handleScroll.bind(this));
  window.addEventListener('resize', this.updateWindowDimensions.bind(this));
}
componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
  window.removeEventListener("scroll", this.handleScroll.bind(this));
}

updateWindowDimensions(e) {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}

handleScroll = (e) => {
  let page = []

  page = ['HomePage','ProjectsPage','GalleryPage','AboutPage']

  let best = Math.pow(10, 1000);
  let bestName = ""
  for(let i=0;i<page.length;i++){
    let myPage = document.querySelector("."+page[i])
    let top = myPage.getBoundingClientRect().top

    if(Math.abs(top) < best){
        best = Math.abs(top)
        bestName = page[i]
    }
  }
  if(bestName !== this.state.currentPage){
    this.setState({prevPage:this.state.currentPage,currentPage:bestName})
  }
}

render() {
      return (
        <div style={{color:'black'}}>
        <div className = 'HomePage' ref={this.homeRef} style={{height: '85vh'}}>
         <Home/>
        </div>
        <div className = 'AboutPage' ref={this.aboutRef} style={{height: '85vh'}}>
          <About currentPage={this.state.currentPage} prevPage={this.state.prevPage}/>
        </div>
        <div className='ProjectsPage' ref={this.projectsRef} style={{height: '85vh'}}>
          <Projects currentPage={this.state.currentPage} prevPage={this.state.prevPage}/>
        </div>
        <div className = 'GalleryPage' ref={this.galleryRef} style={{height: '85vh'}}>
          <Gallery currentPage={this.state.currentPage} prevPage={this.state.prevPage}/>
         </div>
        </div>
      );
    }
}
