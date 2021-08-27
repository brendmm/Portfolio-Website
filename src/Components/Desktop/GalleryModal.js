import React from 'react';
import "./Gallery.css"
import {colorScheme} from "../../ColorScheme.js"
import axios from 'axios';

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoList:[],
      visible:1,
      introClosed:false
    };
}

  componentDidMount(){
     axios.get(`https://whispering-fjord-93482.herokuapp.com/backend/allImages`).then(res => {
      this.setState({photoList:res.data})

    }).catch((error) => {
            console.log(error)
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.page !== this.props.page){
      this.processPageState()
    }
  }


  processPageState = () => {
    let myPage = document.querySelector(".GalleryMain")
    let GalleryIntro = document.querySelector(".GalleryIntro")
    let GalleryIntroShade = document.querySelector(".GalleryIntroShade")
    // if(this.props.page === "ProjectsPage"){
    //   myPage.style.animation = "slideRight 0.5s"
    //   myPage.style.animationFillMode = "forwards"
    // }
    // else{
    //   myPage.style.animation = "slideLeft 0.5s"
    //   myPage.style.animationFillMode = "forwards"
    // }
    if(!this.state.introClosed){
    if(this.props.page === "GalleryPage"){
      GalleryIntro.style.animation = "addIntro 0.5s"
      GalleryIntro.style.animationFillMode = "forwards"

      GalleryIntroShade.style.animation = "addIntro 0.5s"
      GalleryIntroShade.style.animationFillMode = "forwards"
    }
    else{
      GalleryIntro.style.animation = "removeIntro 0.5s"
      GalleryIntro.style.animationFillMode = "forwards"

      GalleryIntroShade.style.animation = "removeIntro 0.5s"
      GalleryIntroShade.style.animationFillMode = "forwards"
    }
  }
  }

  goToPrevSlide = async () => {
    let index = this.state.visible
    let length = this.state.photoList.length
    if(index === length-1){
      index = 0
    }
    else{
      index++
    }
    let left = document.querySelector(".leftImg")
    let main = document.querySelector(".mainImg")

    main.style.animation = 'slideRightMain 0.5s'
    left.style.animation = 'slideImgRight 0.5s'
    await timeout(500);

    this.setState({
      visible:index
    })
  }

  goToNextSlide = async () => {
    let index = this.state.visible
    let length = this.state.photoList.length
    if(index < 1){
      index = length -1
    }
    else{
      index--
    }

    let right = document.querySelector(".rightImg")
    let main = document.querySelector(".mainImg")

    right.style.animation = 'slideImgLeft 0.5s'
    main.style.animation = 'slideLeftMain 0.5s'

    await timeout(500);
    this.setState({
      visible:index
    })
  }
  createCarosel = () => {
    
    let left = 0
    let right = 0
    if(this.state.visible === 0){
      left=this.state.photoList.length-1
    }
    else{
      left = this.state.visible-1
    }
    if(this.state.visible === this.state.photoList.length-1){
      right=0
    }
    else{
      right = this.state.visible+1
    }

    let urlLeft = `url(${this.state.photoList[left]})`
    let urlRight = `url(${this.state.photoList[right]})`
    let urlMain = `url(${this.state.photoList[this.state.visible]})`
    return(
      <div style={{overflow:'hidden'}}>
        <div
          className='leftImg' key={this.state.photoList[left]}
          style={{backgroundImage: urlRight, left: '-100%',
                  position:'absolute',  backgroundSize: 'cover', backgroundPosition: 'center', 
                  backgroundRepeat: 'no-repeat', height: '90vh', width: '100%'
                }}
        >
        </div>
        <div
          className='mainImg' key={urlMain}
          style={{backgroundImage: urlMain, 
            position:'absolute',  backgroundSize: 'cover', backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', height: '90vh', width: '100%'
          }}
        >
        </div>
        <div
          className='rightImg' key={this.state.photoList[right]}
          style={{backgroundImage: urlLeft, left:'100%',
            position:'absolute',  backgroundSize: 'cover', backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', height: '90vh', width: '100%'
          }}
        >
        </div>
      </div>
    )

  }
  removeIntro = () => {
    console.log('here');
    let GalleryIntro = document.querySelector(".GalleryIntro")
    let GalleryIntroShade = document.querySelector(".GalleryIntroShade")

    GalleryIntro.style.animation = 'removeIntro 0.5s'
    GalleryIntroShade.style.animation = 'removeIntro 0.5s'

    GalleryIntro.style.animationFillMode = 'forwards'
    GalleryIntroShade.style.animationFillMode = 'forwards'

    this.setState({      
      introClosed:true
    })
  }
  render() {
      return (
        <div className="GalleryMain" style={{width:'100%', position:'relative',textAlign:'center',overflow:'hidden',height:'90vh',color:colorScheme.third}}>
            <div onClick={()=>this.goToPrevSlide()} style={{position:'absolute', zIndex: '1', top: '0', left:'0',height:'90vh',width:'15vw',backgroundColor:'clear',color:'white',cursor:'pointer'}}>
              
            </div>
            <div className="Images">
            
              {this.createCarosel()}
            
            </div>
            <div onClick={()=>this.goToNextSlide()} style={{position:'absolute', zIndex: '1', top: '0', right:'0',height:'90vh',width:'15vw',backgroundColor:'clear',color:'white',cursor:'pointer'}}>
            
          </div>
          <div className="GalleryIntroShade " style={{animationFillMode:'forwards', position:'absolute', top: '0', right:'0',height:'90vh',width:'0vw',color:'white',cursor:'pointer'}}>
              
              </div>
          <div className="GalleryIntro" onClick={()=>this.removeIntro()}  style={{paddingTop:'20vh', fontSize:'1.5em',  animationFillMode:'forwards', position:'absolute', zIndex: '2', top: '0', right:'0',height:'90vh',width:'0vw',backgroundColor:'clear',color:'white',cursor:'pointer'}}>

            Gallery Intro
            <br/><br/><br/><br/><br/>
            <div style={{fontSize:'0.7em'}}>Describe intro of interest in photography</div>
            
            </div>
        </div>
      );
    }
}
