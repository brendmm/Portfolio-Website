import React from 'react';
import './Burger.css';

const mainStyle = {
  cursor:'pointer',
  width:'100%',
  height:'100%',
  textAlign:'center',
  position:'relative',
  // overflow: 'hidden'
}
const centering = {
  marginTop:'10%',
  marginBottom:'10%',
  width:'100%',
  height:'25%',
  backgroundColor:'white',
  transformOrigin: 'center center',
  animationFillMode: 'forwards',
  borderRadius:'10px'
  // display:'inline-block'

}

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bar: true
    };
    // this.change = this.change.bind(this)}
}

  render() {

    return (
      <div className='btn3'
        style={{...mainStyle, ...this.props.style}}
        // onClick={this.change.bind(this)}
      >
        <div
          // className = 'bar1'
          className={
              this.props.open ? "bar1-open" : "bar1-close"
            }
          style={{ ...centering}}
        >
        </div>
        <div
          // className = 'bar2'
          className={
              this.props.open ? "bar2-open" : "bar2-close"
            }
          style={{ ...centering, ...{overflow:'visible'}}}
        >
        <div
          // className = 'bar4'
          className={
              this.props.open ? "bar4-open" : "bar4-close"
            }
          style={{ height:'100%',borderRadius:'10px',width:'100%',backgroundColor:'white',overflow:'visible'}}
        >
        </div>
        </div>
        <div
          // className = 'bar3'
          className={
              this.props.open ? "bar3-open" : "bar3-close"
            }
          style={{ ...centering}}
        >
        </div>
      </div>

    );
  }
}
