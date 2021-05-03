import React from 'react';
import {colorScheme} from "../../ColorScheme.js"
import '../Desktop//Home.css'
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
     window.addEventListener('resize', this.updateWindowDimensions.bind(this));
   }

  componentWillUnmount() {
     clearInterval(this.interval);
     window.removeEventListener('resize', this.updateWindowDimensions);
   }

  updateWindowDimensions(e) {
     this.setState({ width: window.innerWidth, height: window.innerHeight });
   }


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


  moveProjects = () => {
    this.props.getStarted()
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
        <div className="HomeSection" style={{width:'100%',height:'90vh',position: 'fixed', top: '15vh',color:colorScheme.second}} >
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

          </div>
        </div>
      );
    }
}
