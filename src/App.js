import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Clarifai from 'clarifai';
import FaceRecognition from './FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import SignInForm from './Components/SignInForm/SignInForm';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: '91ec176b33824469bc887e1bfac1ef66'
});
//This is to show the git push works
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},

    }
  }

  calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  // Width and height will adjust and calculate to any value instead of giving
  //definite value
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    //these calculated values will all go into the box state (displayFaceBox)
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict( Clarifai.FACE_DETECT_MODEL, this.state.input)
    //calculateFaceLocation returns an object. That object is needed in displayFaceBox function.
    .then((response) =>this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <ParticlesBg className= "pbg" type="Lines" bg={true} />
        <Navigation />
        <SignInForm/>
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange = {this.onInputChange} 
        onButtonSubmit = {this.onButtonSubmit} />
      {<FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl} />}
      </div>
    );
  }
}
export default App;
