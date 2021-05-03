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
      if(this.props.currentPage === 'GalleryPage'){
        let display = document.querySelector(".GallerySection")
        display.style.animation = 'scrollUp 0.5s'
        display.style.animationFillMode = 'forwards'
      }
      else if(this.props.currentPage === 'ProjectsPage' && this.props.prevPage === 'GalleryPage'){
        let display = document.querySelector(".GallerySection")
        display.style.animation = 'scrollDown 0.5s'
        display.style.animationFillMode = 'forwards'
      }
    }
  }

  render() {
      return (
        <div className="GallerySection" style={{width:'100%',height:'90vh',position: 'fixed', top: '100vh',color:colorScheme.first,backgroundColor:colorScheme.fourth}} >
          Gallery Page
        </div>
      );
    }
}
