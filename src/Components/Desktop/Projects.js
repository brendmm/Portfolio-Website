import React from 'react';
import {colorScheme} from "../../ColorScheme.js"
import "./Projects.css"

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

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      lock: true,
      selection: null
    };
    this.locX = null
    this.locY = null

    this.alfredRef = React.createRef()
    this.tttRef = React.createRef()
    this.plotscriptRef = React.createRef()
    this.mnistRef = React.createRef()
  }

  componentDidMount() {
     window.addEventListener('resize', this.updateWindowDimensions.bind(this));
     window.addEventListener("scroll", this.handleScroll.bind(this));
     this.props.register(this.setLock)
     this.setState({selection:this.props.projectSelection})
   }

  componentWillUnmount() {
     clearInterval(this.interval);
     window.removeEventListener('resize', this.updateWindowDimensions);
     window.removeEventListener("scroll", this.handleScroll.bind(this));

   }
  handleScroll = (e) => {
    let X = e.currentTarget.scrollX
    let Y = e.currentTarget.scrollY
    if(this.locX === null || this.locY == null){
      // Initial setter
      this.locX = X
      this.locY = Y
    }
    if(this.state.lock){
      let projects = document.querySelector(".ProjectsMain")
      let top = projects.getBoundingClientRect().top
      let goal = this.state.height*0.1
      if(((top + 1) > goal) && ((top - 1) < goal)) {
        if(this.locY < Y){
          console.log('Down')
        }
        else{
          console.log('Up')
        }
      }
    }
  };
  updateWindowDimensions(e) {
     this.setState({ width: window.innerWidth, height: window.innerHeight });
   }

  componentDidUpdate(prevProps) {
    if(prevProps.page !== this.props.page || prevProps.about !== this.props.about){
      this.processPageState()
    }
    else{
      if(this.state.lock){
        this.handleProjectSelection()
      }
    }
  }

  handleProjectSelection = () => {
      if(this.state.selection !== null && this.state.selection !== this.props.projectSelection){

      let projects = document.querySelector(".ProjectsMain")
      let width = this.state.width * 0.2

      let projectsLeft = this.alfredRef.current.getBoundingClientRect().left-width
      this.props.projectTop()

      if(this.props.projectSelection===0){
        console.log(0);
        projects.scrollTo({
          top: 0,
          left: this.alfredRef.current.getBoundingClientRect().left - width - projectsLeft,
          behavior: 'smooth'
        })
      } 
      else if(this.props.projectSelection===1){
        console.log(1);
        projects.scrollTo({
          top: 0,
          left: this.tttRef.current.getBoundingClientRect().left - width - projectsLeft,
          behavior: 'smooth'
        })
      } 
      else if(this.props.projectSelection===2){
        console.log(2);
        projects.scrollTo({
          top: 0,
          left: this.plotscriptRef.current.getBoundingClientRect().left - width - projectsLeft,
          behavior: 'smooth'
        })
      } 
      else if(this.props.projectSelection===3){
        console.log(3);
        projects.scrollTo({
          top: 0,
          left: this.mnistRef.current.getBoundingClientRect().left - width - projectsLeft,
          behavior: 'smooth'
        })
      } 
      this.setState({selection:this.props.projectSelection})

    }
  }
  directionIn = (id,e) => {
    if(id===1){
      let btn = document.querySelector(".githubButton");
      let inner = document.querySelector(".inner3");
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
    let btn = document.querySelector(".githubButton");
    let inner = document.querySelector(".inner3");
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
    else if(this.props.page === 'HomePage' || this.props.page === 'GalleryPage'){
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
  AlfredTheBotler = () => {

    return(
      <div className="AlfredTheBotler" ref={this.alfredRef} style={{float:'left',marginTop:'5vh', width:'80vw', display:'block'}}>
      Alfred the Botler
      <div style={{textAlign:'center'}}>
      <div className='projectContent1' >
        <div >
          My senior design project was creating an autonomous system. My team's product was Alfred, the robot butler, or Botler.
          <br/>
          <br/>
          This project utilised embedded systems, multi-threading, and network communications
        </div>
      </div>
      </div>
      <div style={{marginTop:'4vh'}}>
      <div  style={{textAlign:'center'}}>
      <div style={{height:'45vh',width:'45vw',backgroundColor:colorScheme.fourth,borderRadius:'50px',display:'inline-block'}}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/FZ6dC4iSaqo`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Alfred the Botler"
          style={{padding:'2vh',borderRadius:'50px'}}
        />
      </div>
      </div>
      </div>
      </div>
    )
  }
  TicTacToe = () => {
    return(
      <div ref={this.tttRef} style={{float:'left',width:'80vw',height:'90vh',backgroundColor:'blue', display:'block'}}>
      <div style={{paddingTop:'5vh'}}>
      Tic Tac Toe AI
        </div>
      </div>
    )
  }
  Plotscript = () => {
    return(
      <div ref={this.plotscriptRef} style={{float:'left',width:'80vw',height:'90vh',backgroundColor:'red', display:'block'}}>
      <div style={{paddingTop:'5vh'}}>
      Plotscript
        </div>
      </div>
    )
  }
  MnistNeuralNetwork = () => {
    return(
      <div ref={this.mnistRef} style={{float:'left',width:'80vw',height:'90vh',backgroundColor:'green', display:'block'}}>
        <div style={{paddingTop:'5vh'}}>
          MNIST Neural Network
        </div>
      </div>
    )
  }
  projectSelection = () => {
    if(this.props.projectSelection === 0){
      return(
        <div>
          {this.AlfredTheBotler()}
        </div>
        )
    }
    else if(this.props.projectSelection === 1){
      return(
        <div>
          {this.TicTacToe()}
        </div>
      )
    }
    else if(this.props.projectSelection === 2){
      return(
        <div>
          {this.Plotscript()}
        </div>
      )
    }
    else if(this.props.projectSelection === 3){
      return(
        <div>
          {this.MnistNeuralNetwork()}
        </div>
      )
    }
    else{
      return(
        null
      )
    }

  }
  setLock = (lock) => {
    this.setState({lock:lock})
  }
  render() {
    if(this.state.lock){
      return (
        <div style={{position:'sticky',bottom:'0'}}>
        <div className="ProjectsMain" style={{color:colorScheme.third,height:'90vh',width:'80vw',overflowX:'auto',overflow:'hidden'}} >
          <div style={{display:"block",textAlign:'center', fontSize:'2em',width:'320vw'}}>
          {this.AlfredTheBotler()}
          {this.TicTacToe()}
          {this.Plotscript()}
          {this.MnistNeuralNetwork()}
          </div>
        </div>
        </div>
      );
    }
    else{
      return (
        <div className="ProjectsMain" style={{color:colorScheme.third,height:'90vh',position:'relative', overflow:'hidden'}} >
          <div style={{display:"inline-block",textAlign:'center', fontSize:'2em'}}>
          {this.projectSelection()}
          </div>
          <div style={{width:'200px',height:'50px',borderRadius:'5px',display:'inline-block',marginRight:'4vw', bottom:'10vh',right:'5vw',position:'absolute'}}>
            <a  href={this.props.gitLink} target="_blank" rel="noopener noreferrer" >
              <div className='githubButton'
                style={{...mainStyle, color: colorScheme.first,borderRadius:'10px',border:colorScheme.third+' 2px solid',background:colorScheme.second,fontSize:'1.2em'}}
                onMouseEnter={this.directionIn.bind(this, 1)} onMouseLeave={this.directionOut.bind(this, 1)}>
                <div className='inner3' style={{ ...centering}}>
                  View Github
                </div>
              </div>
            </a>
            </div>
        </div>
      );
    }

    }
}
