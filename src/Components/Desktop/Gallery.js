import React from 'react';
import "./Gallery.css"
import {colorScheme} from "../../ColorScheme.js"
import GalleryGrid from "./GalleryGrid.js"

import axios from 'axios';
function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

// const [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizableElement)

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // photoList:[],
      visible:1,
      introClosed:false,
      rowCount: 0,
      width:window.innerWidth,
      modalOpen:false,
    };
    this.photoList=[]
    this.updateFunc={}
  }

  componentDidMount(){
     window.addEventListener('resize', this.updateWindowDimensions.bind(this));

     document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));

     window.addEventListener('DOMContentLoaded', (event) => {
      const gallery = document.querySelector('.GalleryContainer');
      gallery.addEventListener('click', () => {
        gallery.requestFullscreen();
      });
    });

    //  let intervalId = setInterval(this.timer, 5000);

     axios.get(`https://whispering-fjord-93482.herokuapp.com/backend/allImages`).then(res => {
     let rowCount = 0
     for(let i=3;i<5;i++){
       if (res.data.length % i === 0){
      rowCount = i

       }
     }
     for(let i=0; i<res.data.length;i++){
      this.photoList.push(`url(${res.data[i]})`)
     }
      // this.setState({rowCount:rowCount,intervalId:intervalId})
      this.setState({rowCount:rowCount})
      // this.timer()
    }).catch((error) => {
            console.log(error)
    });
  }
  componentDidUpdate(prevProps) {
    if(prevProps.page !== this.props.page){
      this.processPageState()
    }    
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    // clearInterval(this.state.intervalId);
  }

  handleFullscreenChange = (event) => {
    if (!document.fullscreenElement) {
      this.setState({modalOpen:false})
    }
  }

  getBrowserElemProp = () => {
    if (typeof document.fullscreenElement !== undefined){
      return "fullscreenElement"
    }
    else if (typeof document.mozFullScreenElement !== undefined){
      return "mozFullScreenElement"
    }
    else if (typeof document.msFullscreenElement !== undefined){
      return "msFullscreenElement"
    }
    else if (typeof document.webkitFullscreenElement !== undefined){
      return "webkitFullscreenElement"
    }
    else {
      throw new Error("Fullscreen is not supported")
    }
  }
  timer = () => {
    let firstId = Math.floor(Math.random() * this.photoList.length);
    let row = Math.floor(firstId/this.state.rowCount)
    let column = firstId % this.state.rowCount
    let numRows = this.photoList.length/this.state.rowCount
    let rowDir = Math.floor(Math.random() * 2)
    if (row === 0 || row === numRows-1){
      if(row === 0){
        rowDir = 0
      }
      else{
        rowDir = 1
      }
    }
    let colDir = Math.floor(Math.random() * 2)
    if (column === 0 || column === this.state.rowCount-1){
      if(column === 0){
        colDir = 0
      }
      else{
        colDir = 1
      }
    }
    let chooseDir = Math.floor(Math.random()*2)
    let secondId = ((row + (Math.pow(-1,rowDir)*chooseDir)) * this.state.rowCount) + (column - (Math.pow(-1,colDir)*(chooseDir-1)))

    let firstUrl = this.photoList[firstId]
    let secondUrl = this.photoList[secondId]
    this.photoList[firstId]=secondUrl
    this.photoList[secondId]=firstUrl
    this.updateFunc[firstId](secondUrl, chooseDir, rowDir, colDir)
    this.updateFunc[secondId](firstUrl, chooseDir, this.inverseChoice(rowDir), this.inverseChoice(colDir))

  }
  inverseChoice = (choice) => {
    if(choice===1){
      return 0
    }
    return 1
  }
  updateWindowDimensions(e) {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  toggelModal = (index) => {
    this.setState({modalOpen:!this.state.modalOpen,visible:index})
  }
  galleryGrid = () => {
    let htmlObj = [];
    for(let i=0;i<this.photoList.length;i++){
      let imgDimension = ((this.state.width / this.state.rowCount)).toString() + 'px'
      let obj = <GalleryGrid key={i} registration={this.registerChildren} url={this.photoList[i]} imgIndex={i} imgDimension={imgDimension} toggelModal={this.toggelModal}/>
      htmlObj.push(obj)
    }
    return (
      htmlObj.map(function(item, i){
        return(item)
      })
    )
  }
  registerChildren = (index, childFunction) => {
    this.updateFunc[index] = childFunction
  }
  processPageState = () => {
    let myPage = document.querySelector(".GalleryMain")
    let GalleryIntro = document.querySelector(".GalleryIntro")
    let GalleryIntroShade = document.querySelector(".GalleryIntroShade")
    if(this.props.page === "ProjectsPage"){
      myPage.style.animation = "slideRight 0.5s"
      myPage.style.animationFillMode = "forwards"
    }
    else{
      myPage.style.animation = "slideLeft 0.5s"
      myPage.style.animationFillMode = "forwards"
    }
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
    let length = this.photoList.length
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
    let length = this.photoList.length
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
      left=this.photoList.length-1
    }
    else{
      left = this.state.visible-1
    }
    if(this.state.visible === this.photoList.length-1){
      right=0
    }
    else{
      right = this.state.visible+1
    }

    let urlLeft = this.photoList[left]
    let urlRight = this.photoList[right]
    let urlMain = this.photoList[this.state.visible]
    let divHeight = '90vh'
    if(document.fullscreenElement){
      divHeight='100vh'
    }
    return(
      <div style={{overflow:'hidden'}}>
        <div
          className='leftImg' key={this.photoList[left]}
          style={{backgroundImage: urlRight, left: '-100%',
                  position:'absolute',  backgroundSize: 'cover', backgroundPosition: 'center', 
                  backgroundRepeat: 'no-repeat', height: divHeight, width: '100%'
                }}
        >
        </div>
        <div
          className='mainImg' key={urlMain}
          style={{backgroundImage: urlMain, 
            position:'absolute',  backgroundSize: 'cover', backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', height: divHeight, width: '100%'
          }}
        >
        </div>
        <div
          className='rightImg' key={this.photoList[right]}
          style={{backgroundImage: urlLeft, left:'100%',
            position:'absolute',  backgroundSize: 'cover', backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', height: divHeight, width: '100%'
          }}
        >
        </div>
      </div>
    )

  }
  removeIntro = () => {
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
    let height=(this.photoList.length/this.state.rowCount * this.state.width/this.state.rowCount).toString() + 'px'
    let divHeight = '90vh'
    if(document.fullscreenElement){
      divHeight='100vh'
    }
      return (
        <div className='GalleryContainer'>
        {this.state.modalOpen ? <div className="GalleryMain"   style={{width:'100%', position:'relative',textAlign:'center',overflow:'hidden',height:divHeight,color:colorScheme.third}}>
            <div onClick={()=>this.goToPrevSlide()} style={{position:'absolute', zIndex: '1', top: '0', left:'0',height:'90vh',width:'15vw',backgroundColor:'clear',color:'white',cursor:'pointer'}}>
              
            </div>
            <div className="Images">
            
              {this.createCarosel()}
              
            </div>
            <div onClick={()=>this.goToNextSlide()} style={{position:'absolute', zIndex: '1', top: '0', right:'0',height:'90vh',width:'15vw',backgroundColor:'clear',color:'white',cursor:'pointer'}}>
          </div>
        </div>
        : <div className="Temp" style={{width:'100%', height:height,display:'inline-block',position:'relative',textAlign:'center',color:colorScheme.third,backgroundColor:colorScheme.fourth}}>
                        <div style={{position:'relative', width:'100vw', height:height}}>
          <div className="GalleryIntroShade " style={{animationFillMode:'forwards', position:'absolute', top: '0', right:'0',height:height,width:'25vw',color:'white',cursor:'pointer',zIndex:'1'}}>
                        
                        </div>
                    <div className="GalleryIntro" onClick={()=>this.removeIntro()}  style={{paddingTop:'20vh', fontSize:'1.5em',  animationFillMode:'forwards', position:'absolute', zIndex: '2', top: '0', right:'0',height:height,width:'25vw',backgroundColor:'clear',color:'white',cursor:'pointer'}}>

                      Gallery Intro
                      <br/><br/><br/><br/><br/>
                      <div style={{fontSize:'0.7em'}}>Describe intro of interest in photography</div>
                      
                      </div>
                  </div>
                  <div style={{position:'absolute', top: '0', left:'0',height:height}}>
              {this.galleryGrid()}
              </div>
        </div>
        }




</div>



      );
  }
}
