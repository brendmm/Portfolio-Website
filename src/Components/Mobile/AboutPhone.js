import React from 'react';
import {colorScheme} from "../../ColorScheme.js"
import './PhoneView.css';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
}

  componentDidMount() {
     window.addEventListener('resize', this.updateWindowDimensions.bind(this));
   }

  componentWillUnmount() {
     window.removeEventListener('resize', this.updateWindowDimensions);
   }

  updateWindowDimensions(e) {
     this.setState({ width: window.innerWidth, height: window.innerHeight });
   }


  render() {
      return (
        <div className="AboutSection" style={{width:'80%',height:'100%',color:colorScheme.first,display:'inline-block', paddingTop:'5vh'}} >
                  <div style={{ fontSize:'2.2em'}}>
                    Hi I'm Brendan. <br/> I'm a software developer.
                  </div>
                  <div style={{marginTop:'7vh',fontSize: '0.8em'}}>
                    I'm a Magna Cum Laude graduate from Virginia Tech with a degree in computer engineering.
                    <br/><br/>
                    Through my studies and within the classroom and outside of it, I've taken an interest in software engineering. 
                    <br/><br/>
                    Engineering, to me, is a balance of objective problems and subjective approaches.  
                    With software, I am able to watch my ideas take flight in front of me as I build systems from the ground up.
                    <br/><br/>
                    My main interests are in robotics and application design. These fields allow me to have a unique style while providing challenging problems to further my knowledge
                  </div>
        </div>
      );
    }
}
