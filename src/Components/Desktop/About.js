import React, { Component } from 'react';
// import "bulma/css/bulma.css";
import Phone from '../../Images/phone.png'
import Email from '../../Images/email.png'
import {colorScheme} from "../../ColorScheme.js"

class Resume extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  componentDidMount() {
     window.addEventListener('resize', this.updateWindowDimensions.bind(this));
   }

  componentWillUnmount() {
     clearInterval(this.interval);
     window.removeEventListener('resize', this.updateWindowDimensions);
   }

  updateWindowDimensions(e) {
     this.setState({ width: window.innerWidth, height: window.innerHeight });
   }

  render() {
    let floatVal = "left"
    if(this.state.width < 1000){
      floatVal = "none"
    }
    return (

    <div style={{color:colorScheme.third,backgroundColor:colorScheme.first,paddingTop:"20vh"}}>
      <div style={{marginLeft:'18%',marginRight:'18%',backgroundColor:"transparent",marginTop:"0%"}}>

        <div style={{backgroundColor:"transparent",paddingTop:"5%",paddingBottom:"5%"}}>

                  <div style={{textAlign:"center",fontSize:'2.6em', fontWeight:'bold',color:colorScheme.fourth}}>
                      Connect with me!
                  </div>

                  <hr style={{border:"1px solid "+colorScheme.third}}/>

                  <div style={{textAlign:"left"}}>
                    <div style={{float:floatVal, width:'50%',whiteSpace:'nowrap'}}>
                      <span style={{float:"left"}}>
                        <img src={Phone} alt="Phone" width="45" height="45"/>
                      </span>
                      <div style={{display:'flex', flexDirection:'row', position:'relative',marginTop:'1vh'}}>
                        <div style={{float:"left",  marginLeft:"1%", fontSize:'2em',flex:'3',position:'absolute',top:'50%',transform:'translateY(-50%)'}}>
                          Phone:
                        </div>
                        <div style={{fontSize:'1.5em', fontWeight:'3px',flex:'5',paddingLeft:'35%',}}>
                          978-270-4538
                        </div>
                      </div>
                    </div>

                    <div style={{float:'left', width:'50%',whiteSpace:'nowrap'}}>
                      <span style={{float:"left"}}>
                        <img src={Email} alt="Phone" width="45" height="45"/>
                      </span>
                      <div style={{display:'flex', flexDirection:'row', position:'relative',marginTop:'1vh'}}>
                        <div style={{float:floatVal,  marginLeft:"1%", fontSize:'2em',flex:'3',position:'absolute',top:'50%',transform:'translateY(-50%)'}}>
                          Email:
                        </div>
                        <a href='mailto:bmuldown@gmail.com' style={{paddingLeft:'30%',color:colorScheme.third,flex:'1',textDecoration:'none',fontSize:'1.5em', fontWeight:'3px'}}>
                          bmuldow@gmail.com
                        </a>
                      </div>
                    </div>

                </div>

        </div>

      </div>
    </div>

    )
  }
}

export default Resume
