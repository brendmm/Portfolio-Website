import React from 'react';
import "./Gallery.css"
import {colorScheme} from "../../ColorScheme.js"

const words = ['C++','React','Embedded','Robotics','Python','Machine Learning']//["Pee","Pee","Poo","Poo"]
const delay = ms => new Promise(res => setTimeout(res, ms));
export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: '100vw',
      imageHeight: '50vh',
      width: window.innerWidth,
      height: window.innerHeight,
      inView: false,
      hold:false
    };
}

componentDidMount() {
  window.addEventListener("scroll", this.handleScroll.bind(this));
  // window.addEventListener("scroll", this.handleScroll2.bind(this));

  window.addEventListener('resize', this.updateWindowDimensions.bind(this));
}
componentWillUnmount() {
  window.removeEventListener("scroll", this.handleScroll.bind(this));
  // window.removeEventListener("scroll", this.handleScroll2.bind(this));

  window.removeEventListener('resize', this.updateWindowDimensions);
}
updateWindowDimensions(e) {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}

handleScroll = async (e) => {
  // let home = document.querySelector(".Home");
  // let top = home.getBoundingClientRect().top
  // let bound = this.state.height*0.5
  // if((top<bound && top > -bound)&&!this.state.inView){
  //   this.setState({ inView: true})
  // }
  // else if((top>bound || top < -bound)&&this.state.inView){
  //   this.setState({ inView: false})
  // }
let i=0
let xList = []
let yList = []
  // while(this.state.inView&&!this.state.hold)
  // if(this.state.inView&&!this.state.hold){
  while(!this.state.hold)
  if(!this.state.hold){
    // this.popout(e,words[i])
    let k=0


    let word = words[i]
    let home = document.querySelector(".Home");
    xList.push(Math.random() * (home.getBoundingClientRect().width) * 0.8 + 0.1*(home.getBoundingClientRect().width));
    yList.push(Math.random() * (home.getBoundingClientRect().height) * 0.2 )//+ 0.1*(home.getBoundingClientRect().height);
    let phase10 = document.createElement("span1"+k.toString());
    phase10.innerHTML = word;
    phase10.style.left = `${xList[k]}px`;
    phase10.style.top = `${yList[k]}px`;
    this.setState({hold:true})
    home.appendChild(phase10);

await delay(1000/2);
    i=i+1
    if(i>=words.length){
      i=0
    }

k=k+1
    let word1 = words[i]
    home = document.querySelector(".Home");
    xList.push(Math.random() * (home.getBoundingClientRect().width) * 0.8 + 0.1*(home.getBoundingClientRect().width));
    yList.push(Math.random() * (home.getBoundingClientRect().height) * 0.2 )//+ 0.1*(home.getBoundingClientRect().height);
    let phase11 = document.createElement("span1"+k.toString());
    phase11.innerHTML = word1;
    phase11.style.left = `${xList[k]}px`;
    phase11.style.top = `${yList[k]}px`;
    this.setState({hold:true})
    home.appendChild(phase11);

await delay(1000/2);
    i=i+1
    if(i>=words.length){
      i=0
    }

    k=k+1

    let word2 = words[i]
    home = document.querySelector(".Home");
    xList.push(Math.random() * (home.getBoundingClientRect().width) * 0.8 + 0.1*(home.getBoundingClientRect().width));
    yList.push(Math.random() * (home.getBoundingClientRect().height) * 0.2 )//+ 0.1*(home.getBoundingClientRect().height);
    let phase12 = document.createElement("span1"+k.toString());
    phase12.innerHTML = word2;
    phase12.style.left = `${xList[k]}px`;
    phase12.style.top = `${yList[k]}px`;
    this.setState({hold:true})
    home.appendChild(phase12);

await delay(1000/2);
    i=i+1
    if(i>=words.length){
      i=0
    }
k=0
    let temp = document.querySelector('span1'+k.toString())
    home.removeChild(temp)

    let phase20 = document.createElement("span21");
    phase20.innerHTML = word;
    phase20.style.left = `${xList[0]}px`;
    phase20.style.top = `${yList[0]}px`;
    xList.shift()
    yList.shift()
    home.appendChild(phase20);
    k=k+1
        await delay(1000/2);
    phase20.parentNode.removeChild(phase20)


    temp = document.querySelector('span1'+k.toString())
    home.removeChild(temp)

    let phase21 = document.createElement("span21");
    phase21.innerHTML = word1;
    phase21.style.left = `${xList[0]}px`;
    phase21.style.top = `${yList[0]}px`;
    home.appendChild(phase21);
    xList.shift()
    yList.shift()
    await delay(1000/2);
    phase21.parentNode.removeChild(phase21)

    k=k+1
    temp = document.querySelector('span1'+k.toString())
    home.removeChild(temp)

    let phase22 = document.createElement("span21");
    phase22.innerHTML = word2;
    phase22.style.left = `${xList[0]}px`;
    phase22.style.top = `${yList[0]}px`;
    home.appendChild(phase22);
    xList.shift()
    yList.shift()
    await delay(1000/2);

    this.setState({hold:false})
    phase22.parentNode.removeChild(phase22)

  }
};
//init loop to create elements
//loop to check time id , call back to delete, wait, recreate


  render() {
      return (
        // <div style={{position:'absolue',top:'0',left:'0',bottom:'0',right:'0',color:colorScheme.second}}>
        <div className="Home" style={{width:'100vw',height:'100%',position:'relrative',color:colorScheme.second}} >

        </div>
        // </div>
      );
    }


}
