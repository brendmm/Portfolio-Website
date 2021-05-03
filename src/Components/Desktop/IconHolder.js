import React from 'react';
import LinkedIn from '../../Images/LinkedInWhite.ico'
import Github from '../../Images/GithubWhite.png'



export default class ImageHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
}


  render() {
      return (
          <div>
          <div className="Image-Frame">
          <img src={LinkedIn} alt='placeholder' width="40" height="40"/>
          </div>
          <div className="Image-Frame">
          <img src={Github} alt='placeholder' width="40" height="40"/>
          </div>
          </div>
      );
    }
}
// rgba(40,44,52,0.6)
