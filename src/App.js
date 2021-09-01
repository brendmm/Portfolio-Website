import React from 'react';
import './App.css';
import Burger from './Components/Desktop/Burger.js'
import LinkedIn from './Images/LinkedInOffWhite.png'
import Github from './Images/GithubOffWhite.png'
import Shuffle from './Images/ShuffleOffWhite.png'
import HeartWhite from './Images/HeartOffWhite.png'
import HeartRed from './Images/HeartRed.png'
import SlideModal from './Components/Desktop/SlideModal.js'
import Cookies from "universal-cookie";
import SlidePanel from './Components/Desktop/SlidePanel.js'
import {colorScheme} from "./ColorScheme.js"
import Home from "./Components/Desktop/Home.js"
import Projects from "./Components/Desktop/Projects.js"
import BackgroundImage from "./Components/Desktop/BackgroundImage.js"
import axios from 'axios';
import Logo from "./Components/Desktop/Logo.js"
import LogoSmall from "./Components/Desktop/LogoSmall.js"
import About from "./Components/Desktop/About.js"
import Gallery from "./Components/Desktop/Gallery.js"
import TrackBar from "./Components/Desktop/TrackBar.js"
import PhoneView from "./Components/Mobile/PhoneView.js"
const cookies = new Cookies();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      locked: false,
      linkColorBlack: false,
      dropdownOpen: false,
      page: "Home",
      img:'0',
      heart:HeartWhite,
      modal: true,
      currentPage: '',
      prevPage: '',
      aboutActivated: false,
      projectSelection:0,
      gitLink:'https://github.com/abbym1/ECE4534_T8',
      appHeight:0,
      projectLock: this.registerLock
    };
    this.homeRef = React.createRef()
    this.aboutRef = React.createRef()
    this.projectsRef = React.createRef()
    this.galleryRef = React.createRef()
    this.getStarted = this.getStarted.bind(this);
}

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    let app = document.querySelector(".App")
    let img = cookies.get("img")
    if(img === undefined){
      axios.get(`https://whispering-fjord-93482.herokuapp.com/backend/background`).then(res => {
          this.setState({img:res.data,heart:HeartWhite, appHeight:app.clientHeight,bottom:document.querySelector(".AboutPage").clientHeight})
        }).catch((error) => {
                console.error(error)
        });
    }
    else{
      this.setState({img:img,heart:HeartRed, appHeight:app.clientHeight,bottom:document.querySelector(".AboutPage").clientHeight})

    }
    if(this.state.width>760){
      let navbar = document.querySelector(".Menu")
      let top = navbar.getBoundingClientRect().top
      let goal = this.state.height*0.05
      if(((top - 1) < goal) && !this.state.locked) {
        this.setState({locked:true})
        let base = document.querySelector(".Background-Base")
        base.style.animation = "fade-color 0.5s"
        base.style.animationFillMode = "forwards";
        let menuOption = document.querySelectorAll(".Menu-Item")
        let logo = document.querySelector("#Logo");
        logo.style.animation = "grow 0.5s"
        logo.style.animationFillMode = "forwards";
        for(let i=0;i<menuOption.length;i++){
          menuOption[i].style.animation = "shrink 0.5s"
          menuOption[i].style.animationFillMode = "forwards";
        }
        let icons = document.querySelectorAll(".Menu-Item-Icons");
        for(let i=0;i<icons.length;i++){
          icons[i].style.animation = "growRight 0.5s"
          icons[i].style.animationFillMode = "forwards";
          icons[i].style.overflow="visible"
        }
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions(e) {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  handleScroll = (e) => {
    let app = document.querySelector(".App")
    this.determinePage()
    if(this.state.width>760){
    let navbar = document.querySelector(".Menu")
    let top = navbar.getBoundingClientRect().top
    let goal = this.state.height*0.05
    if(((top + 1) > goal) && ((top - 1) < goal) && !this.state.locked) {
      let img = cookies.get("img")
      if(img === undefined){
        axios.get(`https://whispering-fjord-93482.herokuapp.com/backend/background`).then(res => {
          this.state.img = res.data
        }).catch((error) => {
                  console.error(error)
          });
      }
      this.setState({locked:true,appHeight:app.clientHeight})
      let base = document.querySelector(".Background-Base")
      base.style.animation = "fade-color 0.5s"
      base.style.animationFillMode = "forwards";
      let menuOption = document.querySelectorAll(".Menu-Item")
      let logo = document.querySelector("#Logo");
      logo.style.animation = "grow 0.5s"
      logo.style.animationFillMode = "forwards";
      for(let i=0;i<menuOption.length;i++){
        menuOption[i].style.animation = "shrink 0.5s"
        menuOption[i].style.animationFillMode = "forwards";
      }
      let icons = document.querySelectorAll(".Menu-Item-Icons");
      for(let i=0;i<icons.length;i++){
        icons[i].style.animation = "growRight 0.5s"
        icons[i].style.animationFillMode = "forwards";
        icons[i].style.overflow="visible"
      }
    }
    if(((top - 1) > goal) && this.state.locked) {
      this.setState({locked:false,appHeight:app.clientHeight})
      let base = document.querySelector(".Background-Base")
      base.style.animation = "fade-out 0.5s"
      let logo = document.querySelector("#Logo");
      logo.style.animation = "shrinkBack 0.5s"
      let menuOption = document.querySelectorAll(".Menu-Item")
      for(let i=0;i<menuOption.length;i++){
        menuOption[i].style.animation = "growBack 0.5s"
      }
      let navbar = document.querySelector(".Menu")
      navbar.style.animation = "fade-in 0.5s"
      let icons = document.querySelectorAll(".Menu-Item-Icons");
      for(let i=0;i<icons.length;i++){
        icons[i].style.overflow="hidden"
        icons[i].style.animation = "shrinkBackRight 0.5s"
      }
    }
    let projects = document.querySelector(".ProjectsPage")
    let top2 = projects.getBoundingClientRect().top
    // let bottom2 = projects.getBoundingClientRect().bottom
    goal = this.state.height*0.1
    let temp = (this.state.panelState !== 'projectsFromLeft') || (this.state.panelState !== 'projectsFromRight')
    if(((top2 + 1) > goal) && ((top2 - 1) < goal) && temp){
      if(this.state.panelState==='about'){
        this.setState({tempPanelState: this.state.panelState, panelState:'projectsFromRight',appHeight:app.clientHeight})
      }
      else{
        this.setState({tempPanelState: this.state.panelState, panelState:'projectsFromLeft',appHeight:app.clientHeight})
      }
    }
    else if(((top2 + 1) > goal) && ((top2 - 1) < goal) && !temp){
      if(this.state.panelState==='projectsFromRight'){
        this.setState({tempPanelState: this.state.panelState, panelState:'about',appHeight:app.clientHeight})
      }
      else{
        this.setState({tempPanelState: this.state.panelState, panelState:'closedProjects',appHeight:app.clientHeight})
      }
    }

  }
  };
  directionIn(id){
    let background = document.querySelector("#"+id);
    background.style.animation = 'hoverIn 0.5s'
      background.style.animationFillMode = "forwards"
  }
  directionOut(id){
    let background = document.querySelector("#"+id);
    background.style.animation = "hoverOut 0.5s";
  }
  directionInIcon(id){
    let background = document.querySelector("#"+id);
    background.style.opacity = '100%'
  }
  directionOutIcon(id){
    if(this.state.heart !== HeartRed || id !== "Heart"){
  }

  }
  dropDown(e){
    if(this.state.dropdownOpen === true){
      this.setState({dropdownOpen:false})
      let dropdown = document.querySelector(".Dropdown-Body")
      dropdown.style.animation = "rise 0.5s"
    }
    else{
    let dropdown = document.querySelector(".Dropdown-Body")
    dropdown.style.animation = "fall 0.5s"
    dropdown.style.animationFillMode = "forwards";
    this.setState({dropdownOpen:true})

    }
  }
  selection(id){
    if(this.state.width > 760){
    this.setState({page:id})
    let height = this.state.height * 0.10
    if(id==="Home"){
      window.scrollTo(0, this.homeRef.current.offsetTop-height)
    }
    else if(id==="About"){
      window.scrollTo(0, this.aboutRef.current.offsetTop-height)
    }
    else if(id==="Projects"){
      window.scrollTo(0, this.projectsRef.current.offsetTop-height)
    }
    else if(id==="Gallery"){
      window.scrollTo(0, this.galleryRef.current.offsetTop-height)
    }
    else if(id==="Logo"){
      window.scrollTo(0, 0)
    }
  }
  }
  shuffleBackground=async ()=>{
    await axios.get(`https://whispering-fjord-93482.herokuapp.com/backend/background`).then(res => {
        let item = document.querySelector('.Icon-Image-Shuffle')
        this.setState({img:res.data})
        this.setState({heart:HeartWhite})
        item.style.animation = ''
        cookies.remove("img")

      }).catch((error) => {
              console.log(error)
      });
  }
  save=()=>{
    let item = document.querySelector('.Icon-Image-Shuffle')
    if(this.state.heart === HeartRed){
      this.setState({heart:HeartWhite})
      item.style.animation = ''
      cookies.remove("img")
      if(!this.state.modal){
        let modal = document.querySelector('.SlideModal')
        modal.style.animation = 'closeSlideModal 0.5s'
        this.setState({modal:true})

      }

    }
    else{
      if(this.state.modal){
        let modal = document.querySelector('.SlideModal')
        modal.style.animation = 'slideModal 0.5s'
        modal.style.animationFillMode = 'forwards'
        this.setState({modal:false})
      }
      item.style.animation = 'growHeart 0.5s'
      cookies.set("img", this.state.img);
      this.setState({heart:HeartRed})

    }
  }
  activatePanel=()=>{
    if(this.state.currentPage !== "HomePage"){
      this.selection("Home")
      this.setState({aboutActivated:true})
    }
    else{
      if(!this.state.aboutActivated){
        this.selection("Home")
      }
      this.setState({aboutActivated:!this.state.aboutActivated})
    }
  }
  determinePage = () => {
    let page = []
    if(this.state.width>760){
      page = ['Background-Base','HomePage','ProjectsPage','GalleryPage','AboutPage']
    }
    else{
      page = ['HomePage','ProjectsPage','GalleryPage','AboutPage']
    }

    let best = Math.pow(10, 1000);
    let bestName = ""
    for(let i=0;i<page.length;i++){
      let myPage = document.querySelector("."+page[i])
      let top = myPage.getBoundingClientRect().top

      if(Math.abs(top) < best*0.5){
        if(i===0){
          if(myPage.getBoundingClientRect().bottom > this.state.height*.15){
            best = Math.abs(top)
            bestName = page[i]
          }
        }
        else{
          best = Math.abs(top)
          bestName = page[i]
        }
      }
    }
    if(bestName !== this.state.currentPage){
      this.setState({prevPage:this.state.currentPage,currentPage:bestName})
    }
  }
  selectProject = (id,gitLink) => {
    if(this.state.projectSelection!==id){
      this.setState({projectSelection:id,gitLink:gitLink})
    }
  }
  getStarted = () => {
    this.selection("Projects")
  }
  registerLock = (registerLock) => {
    this.setState({projectLock: registerLock})
  }
  render() {
    if(this.state.img === 0){
      return (
        <div>
        WAIT
        </div>
      );
    }
    else{
      let topCenterWidth = (this.state.width*0.86) - 350
      return (
        <div className="SlideContainer">
        <div className="App" style={{backgroundColor:colorScheme.first,color:colorScheme.first}}>

        <link href="https://fonts.googleapis.com/css2?family=Abel&display=swap" rel="stylesheet"></link>
        {/* ########### NAVBAR ########### */}
        { this.state.width > 760 ?

          <header className="App-header">
          {/* ########### Desktop Navbar Start ########### */}
          <BackgroundImage img={this.state.img}/>
          <div
          className="Background-Base"
          >
          </div>

          <div className="Header-Body">

          <div
          style={{float:'left',textAlign:'left', width: topCenterWidth}}
          >
          <div className="Icon-Shuffle"
          onMouseEnter={() => this.directionInIcon("Heart")}
          onMouseLeave={() => this.directionOutIcon("Heart")}
          onClick={()=>this.save()}
          id="Heart"
          >
          <img className="Icon-Image-Shuffle" src={this.state.heart} alt='placeholder' width="40" height="40"/>
          </div>
          <div className="Icon-Shuffle"
          onMouseEnter={() => this.directionInIcon("Shuffle")}
          onMouseLeave={() => this.directionOutIcon("Shuffle")}
          onClick={()=>this.shuffleBackground()}
          id="Shuffle"
          >
          <img className="Icon-Image" src={Shuffle} alt='placeholder' width="40" height="40"/>
          </div>
          </div>
          <div className = "Icon-Main">
          <div className="Icons"
          onMouseEnter={() => this.directionInIcon("Github")}
          onMouseLeave={() => this.directionOutIcon("Github")}
          id="Github"
          >
          <a  href="https://github.com/brendmm" target="_blank" rel="noopener noreferrer" >
          <img className="Icon-Image" src={Github} alt='placeholder' width="40" height="40"/>
          </a>
          </div>
          <div className="Icons"
          onMouseEnter={() => this.directionInIcon("LinkedIn")}
          onMouseLeave={() => this.directionOutIcon("LinkedIn")}
          id="LinkedIn">
          <a  href="https://www.linkedin.com/in/brendan-muldowney-892895132/" target="_blank" rel="noopener noreferrer" >
          <img className="Icon-Image" src={LinkedIn} alt='placeholder' width="40" height="40"/>
          </a>
          </div>
          </div>
          <div className="Logo">
          <Logo width={this.state.width}/>
          </div>
          <SlideModal/>
          <div className="Menu" style={{color:colorScheme.first}}>
          <div  className="Menu-Logo"
          onClick={()=>this.selection("Logo")}
          id="Logo"
          >
          <LogoSmall/>
          </div>
            <div  className="Menu-Item"
            id="Home"
            >
            <div className="Menu-Item-Text"
            onClick={()=>this.selection("Home")}
            >
            HOME
            </div>
            </div>

            <div  className="Menu-Item"
            id="Projects"
            >
            <div className="Menu-Item-Text"
            onClick={()=>this.selection("Projects")}>
            PROJECTS
            </div>
            </div>
            <div  className="Menu-Item"
            id="Gallery"
            >
            <div className="Menu-Item-Text"
            onClick={()=>this.selection("Gallery")}>
            GALLERY
            </div>
            </div>
            <div  className="Menu-Item"
            id="About"
            >
            <div className="Menu-Item-Text"
            onClick={()=>this.selection("About")}
            >
            CONTACT
            </div>
            </div>
            <div className="Menu-Item-Icons">
            <a  href="https://www.linkedin.com/in/brendan-muldowney-892895132/" target="_blank" rel="noopener noreferrer" >
            <img className="Icon-Image" src={LinkedIn} alt='placeholder' width="40" height="40"/>
            </a>
            </div>
            <div className="Menu-Item-Icons">
            <a  href="https://github.com/brendmm" target="_blank" rel="noopener noreferrer" >
            <img className="Icon-Image" src={Github} alt='placeholder' width="40" height="40"/>
            </a>
            </div>
          </div>

          </div>
          {/* ########### Desktop Navbar End ########### */}
          </header>
          :
          <div className="Burger-Nav">
          {/* ########### Mobile Navbar Start ########### */}
          <div style={{color:colorScheme.first,width:'100vw',position:'sticky',top:'0',height:'15vh',backgroundColor:'#314247'}}>
          <div style={{color:colorScheme.first,marginTop:'2vh',marginLeft:'3vw',float:'left', fontSize:'2em'}}>
          <LogoSmall/>
          </div>
          <div onClick={()=>this.dropDown()} style={{float:'right',marginTop:'5vh',marginRight:'5vw'}}>
          <Burger speed='0.5' style={{color:colorScheme.first,float:'right',width:'5vh',height:'3vh'}} open={this.state.dropdownOpen}/>
          </div>
          </div>
          <div className="Dropdown-Body" style={{width:'100vw',position:'sticky',top:'0',height:"0vh",backgroundColor:'#314247',overflow:'hidden'}}>
          <div className="Menu-Dropdown" onClick={()=>this.dropDown()} style={{color:colorScheme.first}}>
            <div  className="Menu-Item-Dropdown" style={{borderTop:'1px solid '+colorScheme.third}}
            onMouseEnter={() => this.directionIn("Home")}
            onMouseLeave={() => this.directionOut("Home")}
            onClick={()=>this.selection("Home")}
            >
            <div className="Menu-Background" id="Home" style={{backgroundColor:colorScheme.third}}>
            </div>
            <div className="Menu-Item-Dropdown-Text">
            HOME
            </div>
            </div>
            <div  className="Menu-Item-Dropdown" style={{borderTop:'1px solid '+colorScheme.third}}
            onMouseEnter={() => this.directionIn("Projects")}
            onMouseLeave={() => this.directionOut("Projects")}
            onClick={()=>this.selection("Projects")}
            >
            <div className="Menu-Background" id="Projects" style={{backgroundColor:colorScheme.third}}>
            </div>
            <div className="Menu-Item-Dropdown-Text">
            PROJECTS
            </div>
            </div>
            <div  className="Menu-Item-Dropdown" style={{borderTop:'1px solid '+colorScheme.third}}
            onMouseEnter={() => this.directionIn("Gallery")}
            onMouseLeave={() => this.directionOut("Gallery")}
            onClick={()=>this.selection("Gallery")}
            >
            <div className="Menu-Background" id="Gallery" style={{backgroundColor:colorScheme.third}}>
            </div>
            <div className="Menu-Item-Dropdown-Text">
            GALLERY
            </div>
            </div>
            <div  className="Menu-Item-Dropdown" style={{borderTop:'1px solid '+colorScheme.third}}
            onMouseEnter={() => this.directionIn("About")}
            onMouseLeave={() => this.directionOut("About")}
            onClick={()=>this.selection("About")}
            >
            <div className="Menu-Background" id="About" style={{backgroundColor:colorScheme.third}}>
            </div>
            <div className="Menu-Item-Dropdown-Text">
            CONTACT
            </div>
            </div>
            <div  className="Menu-Item-Dropdown" style={{borderTop:'1px solid '+colorScheme.third}}
            >
            <div className="Menu-Item-Icons-Dropdown">
            <div className="Menu-Item-Icon-Dropdown">
            <a  href="https://www.linkedin.com/in/brendan-muldowney-892895132/" target="_blank" rel="noopener noreferrer" >
            <img className="Icon-Image" src={LinkedIn} alt='placeholder' width="30" height="30"/>
            </a>
            </div>
            <div className="Menu-Item-Icon-Dropdown">
            <a  href="https://github.com/brendmm" target="_blank" rel="noopener noreferrer" >
            <img className="Icon-Image" src={Github} alt='placeholder' width="30" height="30"/>
            </a>
            </div>
            </div>
            </div>
          </div>
          </div>
          {/* ########### Mobile Navbar End ########### */}
          </div> }
        {/* ########### NAVBAR ########### */}
        { this.state.width > 760 ?
          <div>
        <TrackBar height={this.state.appHeight} bottom={this.state.bottom}/>
        <div className={{color:colorScheme.third}}>
        <SlidePanel  projectLock={this.state.projectLock} selectProject={this.selectProject}prevPage={this.state.prevPage} page={this.state.currentPage} aboutActivated={this.state.aboutActivated}/>

        <div className = 'HomePage' ref={this.homeRef} >
         <Home toggle={this.activatePanel} about={this.state.aboutActivated} page={this.state.currentPage}  getStarted={this.getStarted}/>
        </div>
        <div className='ProjectsPage' ref={this.projectsRef} >
        <Projects projectTop={this.getStarted} register={this.registerLock} projectSelection={this.state.projectSelection}  gitLink={this.state.gitLink} page={this.state.currentPage} about={this.state.aboutActivated}/>
        </div>
        <div className = 'GalleryPage' ref={this.galleryRef} >
          <Gallery/>
         </div>
         <div className = 'AboutPage' ref={this.aboutRef} style={{height: '90vh'}}>
         <About/>
         </div>

         </div>
         </div>
         : <PhoneView/> }
          </div>
        </div>
      );
    }
  }
}
