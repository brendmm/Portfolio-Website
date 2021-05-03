import React from 'react';
import {colorScheme} from "../../ColorScheme.js"

export default class TrackBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressWidth : 0
    };
  }

  componentDidMount() {
     window.addEventListener("scroll", this.handleScroll.bind(this));
   }

  componentWillUnmount() {
     window.removeEventListener("scroll", this.handleScroll.bind(this));
   }

  handleScroll = (e) => {
    if(this.state.progressWidth !== ((window.pageYOffset / (this.props.height- window.innerHeight)) * 100)){
      this.setState({ progressWidth :  ((window.pageYOffset / (this.props.height- window.innerHeight)) * 100)})
    }
   };

  render() {
              return (
                <div  className = "trackbar"style={{width:'100%',height:'1vh',zIndex:'5',position:'sticky',top:'10%',backgroundColor:colorScheme.third}}>
                  <div style={{width:this.state.progressWidth.toString()+'%',height:'100%',zIndex:'5',backgroundColor:colorScheme.fourth}}>
                  </div>
                </div>
              );
    }
}
