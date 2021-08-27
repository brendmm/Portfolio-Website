import React from 'react';
import "./Gallery.css"

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        url:''
    };
  }
  galleryGrid = () => {
    let htmlObj = [];
    for(let i=0;i<this.state.photoList.length;i++){
      let imgDimension = ((this.state.width / this.state.rowCount)-2).toString() + 'px'
      let obj = <div key={i} onClick={() => this.toggelModal(i)}style={{textAlign:'center',color:'white',border:'solid red 1px',cursor:'pointer',float:'left', width:imgDimension,backgroundImage:'lurl',height:imgDimension, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                           {i}   
                </div>
      htmlObj.push(obj)
    }
    return (
      htmlObj.map(function(item, i){
        return(item)
      })
    )

  }
  componentDidMount(){
      this.setState({url:this.props.url})
      this.registerChild()
  }
  componentWillUnmount(){
  }
  registerChild = () => {
    this.props.registration(this.props.imgIndex,this.handleUpdate)
  }
  handleUpdate = async (newUrl, dir, row, col) => {
    let grid = document.querySelector(".grid"+this.props.imgIndex.toString())
    if(dir===1){
        if(row===1){
            grid.style.animation = "scroll-right 0.5s"
        }
        else{
            grid.style.animation = "scroll-left 0.5s"
        }
    }
    else{
        if(col===1){
            grid.style.animation = "scroll-up 0.5s"
        }
        else{
            grid.style.animation = "scroll-down 0.5s"
        }
    }
    await timeout(500);
    this.setState({url:newUrl})
  }
  render() {
    let imgDimension = this.props.imgDimension
    let className = "grid"+this.props.imgIndex.toString()
    return(
    <div className={className} onClick={()=>this.props.toggelModal(this.props.imgIndex)} style={{textAlign:'center',color:'white',cursor:'pointer',float:'left', width:imgDimension,backgroundImage:this.state.url,height:imgDimension, backgroundSize: 'cover', backgroundPosition: 'center'}}>
    </div>



      );
  }
}
