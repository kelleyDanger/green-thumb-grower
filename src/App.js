import React, { Component } from 'react';
import plantImages from './PlantImages';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentImage: plantImages.plant1,
      plantSize: 1,
      askWeather: false,
      rainCount: 0
    }
  }

  //////////////////////
  //  LIFECYCLE HANDLERS
  //////////////////////

  componentDidMount(){
    setInterval(this.updatePlantImage,500)
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h3>Day {this.state.plantSize}</h3>
        {this.renderAskWeather()}
        <Plant img={this.state.currentImage} />
        {this.renderResetPlantButton()}
      </div>
    );
  }

  ///////////////
  //  FUNCTIONS
  ///////////////
  //

  setAskWeather = (rainy) => {
    const rainCount = rainy ? this.state.rainCount + 1 : this.state.rainCount;

    this.setState({
      askWeather: false,
      rainCount: rainCount,
      plantSize: this.state.plantSize + 1
    })
  }

  renderAskWeather = () => {
    if(!this.state.askWeather){
      return false;
    }

    return (
      <div>
        Choose the weather.
        <img className="weatherImg" src={plantImages.sun} onClick={() => this.setAskWeather(false)} />
        <img className="weatherImg" src={plantImages.rain} onClick={() => this.setAskWeather(true)} />
      </div>
    )
  }

  renderResetPlantButton = () => {
    if(this.state.plantSize < 9) {
      return false;
    }
    var messageTxt = this.state.rainCount < 1 ? "Oops! Your plant didn't get any rain and died. T_T" : "Congratulations! Your lil plant looks happy. :)";

    return (
      <div>
        <h2>{messageTxt}</h2>
        <button onClick={this.resetPlant}>
          Let's Grow Again!
        </button>
      </div>
    );
  }

  resetPlant = () => {
    this.setState({
      currentImage: plantImages.plant1,
      plantSize: 1,
      askWeather: false,
      rainCount: 0
    })
  }

  updatePlantImage = () => {
    // plant is full grown
    if(this.state.plantSize > 8){
      return false;
    }

    // if day 3, 6
    if(this.state.plantSize % 3 == 0) {
      this.setState({askWeather: true});
      return;
    }

    var newPlantSize = this.state.plantSize + 1;
    var newPlantImage = plantImages['plant'+newPlantSize]
    // full grown, dead plant
    if(this.state.plantSize == 8 &&
       this.state.rainCount == 0) {
      newPlantImage = plantImages['deadPlant'];
    }

    this.setState({
      currentImage: newPlantImage,
      plantSize: newPlantSize})
  }

}

const Plant = (props) =>
  <img role="presentation" src={props.img} />


export default App;
