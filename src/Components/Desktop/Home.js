import React from 'react';
import {colorScheme} from "../../ColorScheme.js"
import './Home.css'
import Profile from '../../Images/test.png'

const mainStyle = {
  cursor:'pointer',
  width:'100%',
  height:'100%',
  textAlign:'center',
  position:'relative',
  overflow: 'hidden',
  zIndex:'1'
}
const centering = {
  display:'inline-block',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position:'absolute',
  width:'100%'
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: '100vw',
      imageHeight: '50vh',
      width: window.innerWidth,
      height: window.innerHeight,
      inView: false,
      hold:false,
     // fancyString1 : "",
     // fancyString2 : "",
     beforeString : "",
     afterString: "A place to demonstrate my experiences, talents, and hobbies",
     pageStyle:{width:'100%'},
     about: 'false',
     aboutWidth:'0%'
    };
    this.projectsRef = React.createRef()
}

  componentDidMount() {
     this.interval = setInterval(() => this.changeString(), 1000/20);
     window.addEventListener("scroll", this.handleScroll.bind(this));
     window.addEventListener('resize', this.updateWindowDimensions.bind(this));
   }

  componentWillUnmount() {
     clearInterval(this.interval);
     window.removeEventListener("scroll", this.handleScroll.bind(this));
     window.removeEventListener('resize', this.updateWindowDimensions);
   }

  updateWindowDimensions(e) {
     this.setState({ width: window.innerWidth, height: window.innerHeight });
   }

  handleScroll = (e) => {
    this.processPage()
   };

  changeString =  () => {

    let home = document.querySelector(".HomeSection");
    let top = home.getBoundingClientRect().top
    let bound = this.state.height*0.5
    if((top<bound && top > -bound)&&!this.state.inView){
      this.setState({ inView: true})
    }
    else if((top>bound || top < -bound)&&this.state.inView){
      this.setState({ inView: false})
    }
    if(this.state.inView){
      if(this.state.afterString.length > 0){
        this.setState({
          beforeString:this.state.beforeString+this.state.afterString.substring(0,1),
          afterString:this.state.afterString.substring(1, this.state.afterString.length)
        })
      }
      else{
        clearInterval(this.timerId)
      }
    }

  }

  directionIn = (id,e) => {
      if(id===1){
        let btn = document.querySelector(".btn1");
        let inner = document.querySelector(".inner1");
        // inner.style.color='rgba(40,44,52,1)'
        inner.style.color=colorScheme.first

        let ripple = document.createElement("span3");
        ripple.classList.add("ripple");

        let x = e.screenX - btn.getBoundingClientRect().left;
        let y = e.screenY - btn.getBoundingClientRect().top;

        ripple.style.background = colorScheme.third

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        while (btn.firstChild) {
              btn.removeChild(btn.firstChild);
          }
        btn.appendChild(ripple);
        btn.appendChild(inner);
      }
      else if(id===2){
        let btn = document.querySelector(".btn2");
        let inner = document.querySelector(".inner2");
        // inner.style.color='rgba(40,44,52,1)'
        inner.style.color=colorScheme.first

        let ripple = document.createElement("span3");
        ripple.classList.add("ripple");

        let x = e.screenX - btn.getBoundingClientRect().left;
        let y = e.screenY - btn.getBoundingClientRect().top;

        ripple.style.background = colorScheme.third

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        while (btn.firstChild) {
              btn.removeChild(btn.firstChild);
          }
        btn.appendChild(ripple);
        btn.appendChild(inner);
      }
  }

  directionOut = (id,e) => {
    if(id===1){
      let btn = document.querySelector(".btn1");
      let inner = document.querySelector(".inner1");
      inner.style.color=colorScheme.first

      let ripple = document.createElement("span4");
      ripple.classList.add("ripple");
      let x = e.screenX - btn.getBoundingClientRect().left;
      let y = e.screenY - btn.getBoundingClientRect().top;
      ripple.style.background = colorScheme.second
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      btn.appendChild(ripple);
      btn.appendChild(inner);
    }
    else if(id===2){
      let btn = document.querySelector(".btn2");
      let inner = document.querySelector(".inner2");
      inner.style.color=colorScheme.third

      let ripple = document.createElement("span4");
      ripple.classList.add("ripple");
      let x = e.screenX - btn.getBoundingClientRect().left;
      let y = e.screenY - btn.getBoundingClientRect().top;
      ripple.style.background = colorScheme.first
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      btn.appendChild(ripple);
      btn.appendChild(inner);
    }

  }

  activatePanel = () => {
    // if(this.props.page === "HomePage"){
      this.props.toggle()
      let myPage = document.querySelector(".HomeHeader")
      let myAbout = document.querySelector(".AboutSection")
      let profile = document.querySelector(".Profile")
      let button1 = document.querySelector(".GetStarted")
      let button2 = document.querySelector(".AboutMe")
      if(myPage.clientWidth > this.state.width * 0.75 || this.props.page !== "HomePage"){
        myPage.style.animation = "shrinkHome 0.5s"
        myPage.style.animationFillMode = "forwards"
        myAbout.style.animation = "growAbout 0.5s"
        myAbout.style.animationFillMode = "forwards"
        profile.style.animation = "growProfile 0.5s"
        profile.style.animationFillMode = "forwards"

        button1.style.animation = "widdenLeft 0.5s"
        button2.style.animation = "widdenRight 0.5s"
        button1.style.animationFillMode = "forwards"
        button2.style.animationFillMode = "forwards"
        button1.style.position = "sticky"
        button2.style.position = "sticky"
        button1.style.bottom = "5vh"
        button2.style.bottom = "5vh"
      }
      else{
        myPage.style.animation = "growHome 0.5s"
        myPage.style.animationFillMode = "forwards";
        myAbout.style.animation = "shrinkAbout 0.5s"
        myAbout.style.animationFillMode = "forwards";
        profile.style.animation = "shrinkProfile 0.5s"
        profile.style.animationFillMode = "forwards"

        button1.style.animation = "narrowRight 0.5s"
        button2.style.animation = "narrowLeft 0.5s"
        button1.style.animationFillMode = "forwards"
        button2.style.animationFillMode = "forwards"
      }
    // }
  }

  moveProjects = () => {
    this.props.getStarted()
  }

  processPage = () => {
    let myPage = document.querySelector(".HomeHeader")
    let myPageFull = document.querySelector(".HomeSection")
    let myAbout = document.querySelector(".AboutSection")
    let profile = document.querySelector(".Profile")

    if((myPage.clientWidth < this.state.width * 0.75) && this.props.page === 'Background-Base'){
      myPage.style.animation = "growHome 0.5s"
      myAbout.style.animation = "shrinkAbout 0.5s"
      profile.style.animation = "shrinkProfile 0.5s"
    }
    else if(this.props.page === 'HomePage' && this.props.about && (myPageFull.clientWidth > this.state.width * 0.90)){
      myPage.style.animation = "shrinkHome 0.5s"
      myAbout.style.animation = "growAbout 0.5s"
      profile.style.animation = "growProfile 0.5s"
    }
    else if((myPageFull.clientWidth > this.state.width * 0.90) && this.props.page === "ProjectsPage"){
      myPageFull.style.animation = "slideRight 0.5s"
      myPageFull.style.animationFillMode = "forwards";

      let button1 = document.querySelector(".GetStarted")
      let button2 = document.querySelector(".AboutMe")
      if(myPage.clientWidth < this.state.width * 0.75){
        button1.style.animation = "narrowRight 0.5s"
        button2.style.animation = "narrowLeft 0.5s"
        button1.style.animationFillMode = "forwards"
        button2.style.animationFillMode = "forwards"
      }
    }
    else if((myPageFull.clientWidth < this.state.width * 0.85) && this.props.page === "HomePage"){
      myPageFull.style.animation = "slideLeft 0.5s"
      myPageFull.style.animationFillMode = "forwards";

      let button1 = document.querySelector(".GetStarted")
      let button2 = document.querySelector(".AboutMe")
      if(myPage.clientWidth < this.state.width * 0.75){
        button1.style.animation = "widdenLeft 0.5s"
        button2.style.animation = "widdenRight 0.5s"
        button1.style.animationFillMode = "forwards"
        button2.style.animationFillMode = "forwards"
      }
    }
    myPage.style.animationFillMode = "forwards";
    myAbout.style.animationFillMode = "forwards";
    profile.style.animationFillMode = "forwards"

  }

about2 = () => {
  let about1 = document.querySelector(".about1")
  let about2 = document.querySelector(".about2")
  if(about2.clientWidth < window.innerWidth * 0.25){
    about1.style.animation = "shrinkAbout2 0.5s"
    about2.style.animation = "growAbout2 0.5s"
    about2.style.animationFillMode = "forwards";
    about1.style.animationFillMode = "forwards"
  }
else{
  about2.style.animation = "shrinkAbout2 0.5s"
  about1.style.animation = "growAbout2 0.5s"
  about2.style.animationFillMode = "forwards";
  about1.style.animationFillMode = "forwards"
}
}
  render() {
    let margin = this.state.width / 10
    let imgSize = (this.state.width / 5).toString()
      return (
        <div className="HomeSection" style={{width:'100%',height:'90vh',position:'relative',color:colorScheme.second, overflow:'hidden'}} >
        <img className="Profile" src={Profile} alt='placeholder' width={imgSize} height={imgSize} style={{ position:'absolute',left:'50%',top:'50%', transform: 'translate(-50%, -50%)'}}/>
          <div style={{height:'90vh',overflow:'hidden'}}>
              <div className="HomeHeader"style={{ animationFillMode:'forwards',display:'inline-block',float:'left'}}>
                <div style={{display:'flex',height:'90vh'}}>
                <div style={this.state.pageStyle} className="Intro">
                <div style={{marginTop:'10vw', fontSize: '3em',textAlign:'left',marginLeft:'10%',marginRight:'20%',color:colorScheme.fourth, fontWeight: 'bold'}}>
                Welcome to my virtual portfolio
                </div>
                {this.state.width > 760 ?
                <div className="subHeader" style={{marginTop:'5vh',fontSize: '1.2em',textAlign:'left',marginLeft:'10%',marginRight:'20%',color:colorScheme.third}}>
                {
                  this.state.beforeString
                }

                </div> : null }
                </div>
                </div>
              </div>

              <div className = 'AboutSection' style={{width:'0%',display:'inline-block',zIndex:'3',color:colorScheme.first,overflow:'hidden',position:'relative'}} onClick={()=>this.about2()}>

                <div className="about1" style={{marginLeft:'10vw',float:'left',display:'inline-block',height:'50vh',marginTop:'10vw', textAlign:'left',position: "relative",left:'0',width:'30vw',overflow:'hidden'}}>
                  <div style={{ fontSize:'2.2em'}}>
                    My name is Brendan. <br/> I'm a software developer.
                  </div>
                  <div style={{marginTop:'7vh',fontSize: '1.2em'}}>
                    I'm a Magna Cum Laude graduate from Virginia Tech with a degree in computer engineering
                  </div>
                </div>
{/*
                <div style={{ top: "50%",transform: "translateY(-50%)",padding:'5%',display:'inline-block',float:'left',backgroundColor:colorScheme.fourth,position: "relative",cursor:'pointer', textAlign:'center'}} onClick={()=>this.about2()}>
                  Button
                </div>
                <div className="about2" style={{display:'inline-block',marginTop:'10vw', textAlign:'left',position: "relative",left:'0',width:'0%',overflow:'hidden'}}>
                <div style={{ fontSize:'2.2em'}}>
                  My name is Brendan. <br/> I'm a software developer.
                </div>
                <div style={{marginTop:'7vh',fontSize: '1.2em'}}>
                  I'm a Magna Cum Laude graduate from Virginia Tech with a degree in computer engineering
                </div>
                </div>
*/}

              </div>

          </div>
          <div style={{textAlign:'center',marginTop:'-15vh',zIndex:'4',position:'relative'}}>

                {/*Get Started*/}
                <div className="GetStarted" style={{width:'200px',height:'50px',borderRadius:'5px',display:'inline-block',marginRight:'4vw'}} onClick={()=>this.moveProjects()} >
                  <div className='btn1'
                    style={{...mainStyle, color: colorScheme.first,borderRadius:'10px',border:colorScheme.third+' 2px solid',background:colorScheme.second,fontSize:'1.2em'}}
                    onMouseEnter={this.directionIn.bind(this, 1)} onMouseLeave={this.directionOut.bind(this, 1)}>
                    <div className='inner1' style={{ ...centering}}>
                      Get Started
                    </div>
                  </div>
                </div>

                {/*About Me*/}
                <div className="AboutMe" style={{width:'200px',height:'50px',borderRadius:'5px',display:'inline-block',marginLeft:'4vw'}} onClick={() => this.activatePanel()} >
                  <div className='btn2'
                    style={{...mainStyle, color: colorScheme.third,borderRadius:'10px',border:colorScheme.third+' 2px solid',background:colorScheme.first,fontSize:'1.2em'}}
                      onMouseEnter={this.directionIn.bind(this, 2)} onMouseLeave={this.directionOut.bind(this, 2)}>
                    <div className='inner2' style={{ ...centering}}>
                      About Me
                    </div>
                  </div>
                </div>
          </div>


        </div>
      );
    }
}
