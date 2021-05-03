import React from 'react';
import "./Gallery.css"
import {colorScheme} from "../../ColorScheme.js"

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
}
  componentDidUpdate(prevProps) {
    if(prevProps.page !== this.props.page){
      this.processPageState()
    }
  }


  processPageState = () => {
    let myPage = document.querySelector(".GalleryMain")
    if(this.props.page === "ProjectsPage"){
      myPage.style.animation = "slideRight 0.5s"
      myPage.style.animationFillMode = "forwards"
    }
    else{
      myPage.style.animation = "slideLeft 0.5s"
      myPage.style.animationFillMode = "forwards"
    }
  }
  render() {
      return (
        <div className="GalleryMain" style={{width:'100%', textAlign:'center',overflow:'hidden',height:'100%',color:colorScheme.third,background:colorScheme.fourth}}>
            Gallery
        </div>
      );
    }
}
