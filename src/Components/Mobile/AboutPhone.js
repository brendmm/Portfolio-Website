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
    let background = '../../Images/PhoneAbout.png'
      return (
        <div className="AboutSection" style={{width:'100%',height:'100%',color:colorScheme.first,backgroundImage:`url(${require(background)})`}} >

        </div>
      );
    }
}
