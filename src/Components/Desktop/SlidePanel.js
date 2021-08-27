import React from 'react';
import { colorScheme } from '../../ColorScheme';
import './SlidePanel.css';

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

const projectTitle = ['Alfred the Botler','Tic Tac Toe AI','Plotscript', 'MNIST Neural Network']
const gitLinks = ['https://github.com/abbym1/ECE4534_T8','','','']
const centering = {
  display:'inline-block',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position:'relative',
  width:'100%'
}

export default class SlidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null
    };
}
processState = async () => {
  let myPage = document.querySelector(".sidePanel")
  if(this.props.page === "Background-Base" && this.props.aboutActivated){
    myPage.style.animation = "slideAboutClosed 0.5s"
    myPage.style.animationFillMode = "forwards";
  }

  if(this.props.page === "HomePage"){
    if(this.props.aboutActivated){

      if(this.props.prevPage === "ProjectsPage" && myPage.clientWidth > 0){
        //Left To Right
        myPage.style.animation = "LeftToRight 0.5s"
        myPage.style.animationFillMode = "forwards";
        await timeout(250);
        myPage.style.right="0"
        myPage.style.left=null
      }
      else{
        myPage.style.right="0"
        myPage.style.left=null
        myPage.style.animation = "slideAbout 0.5s"
        myPage.style.animationFillMode = "forwards"
      }
    }
    else if(myPage.clientWidth > 0){
      if(myPage.clientWidth > window.innerWidth*0.3){
        myPage.style.animation = "slideAboutClosed 0.5s"
        myPage.style.animationFillMode = "forwards";
      }
      else{
        myPage.style.animation = "slideProjectsClosed 0.5s"
        myPage.style.animationFillMode = "forwards";
      }
    }
  }

  if(this.props.page === "ProjectsPage"){
    if(this.props.prevPage === "HomePage" && this.props.aboutActivated){
        //Right To Left
        myPage.style.animation = "RightToLeft 0.5s"
        myPage.style.animationFillMode = "forwards";
        await timeout(250);
        myPage.style.left="0"
        myPage.style.right=null
    }
    else{
      myPage.style.left="0"
      myPage.style.right=null
      myPage.style.animation = "slideProjects 0.5s"
      myPage.style.animationFillMode = "forwards";
    }
  }

  if(  this.props.page === "GalleryPage" || this.props.page === "AboutPage"){
    myPage.style.animation = "slideProjectsClosed 0.5s"
    myPage.style.animationFillMode = "forwards";
  }
}

setLock = (lock) => {
  console.log(lock);
  // this.props.setLock(lock)
}
determineContent = () => {
  if(this.props.page === 'HomePage'){
    return(
      null
    )
  }
  else if(this.props.page === 'ProjectsPage'){
    return(
      <div style={{textAlign:'left',marginTop:'7vh'}}>
        <div style={{fontSize:'1.5em',marginLeft:'2vw'}}>
          Project Menu
        </div>
        
        <div style={{marginTop:'7vh',padding:'0',borderTop:'1px solid'+colorScheme.third,borderBottom:'1px solid'+colorScheme.third}}>
        {projectTitle.map((project,index) => this.createListElement(project,index))}
        </div>
      </div>
    )
  }
}
selectProject = (index) => {
  if(this.state.selection !== index){
    this.props.selectProject(index,gitLinks[index])
    let listItem = document.querySelector("#is"+index);
    listItem.style.animation = "hoverProject 0.2s"
    listItem.style.animationFillMode ='forwards'
    if(this.state.selection !== null){
      listItem = document.querySelector("#is"+this.state.selection);
      listItem.style.animation = "hoverOffProject 0.2s"
      listItem.style.animationFillMode ='forwards'
    }
    this.setState({selection:index})
  }
}
createListElement = (project,index) =>{
  return(
    <div key={index}  className='btnSlide' style={{cursor:'pointer',animationFillMode:'forwards',fontSize:'1em', width:'100%', height:'8vh'}} onClick={()=>this.selectProject(index)}
    //onMouseEnter={this.shiftRight.bind(this,index)}
    //onMouseLeave={this.shiftLeft.bind(this,index)}
    >
      <div id={"is"+index} style={{...centering,paddingLeft:'8vw'}}>
    {project}
    </div>
    </div>
  )
}
shiftRight(id,e){
  if(this.state.selection !== id){
    let listItem = document.querySelector("#is"+id);
    listItem.style.animation = "hoverProject 0.2s"
    listItem.style.animationFillMode ='forwards'
  }
}
shiftLeft(id,e){
  if(this.state.selection !== id){
    let listItem = document.querySelector("#is"+id);
    listItem.style.animation = "hoverOffProject 0.2s"
    listItem.style.animationFillMode ='forwards'
  }
}
render() {
  this.processState()
            return (
              <div className = "panelContainer">
                  <div className="sidePanel">
                    {this.determineContent()}
                  </div>
              </div>
            );
  }
}
