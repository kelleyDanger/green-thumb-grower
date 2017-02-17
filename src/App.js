import React, { Component } from 'react';
import plantImages from './PlantImages';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentImage: plantImages.plant1,
      plantSize: 1
    }
    this.updatePlantImage = this.updatePlantImage.bind(this)
  }

  updatePlantImage(){
    var newPlantSize = this.state.plantSize + 1;
    var newPlantImage = plantImages['plant'+newPlantSize]

    console.log("new plant size: " + newPlantSize);
    console.log("new plant image: " + newPlantImage);
    this.setState({
      currentImage: newPlantImage,
      plantSize: newPlantSize})

  }

  render() {
    console.log(plantImages);
    console.log(plantImages.plantImage1);
    return (
      <div>
        <h1>{this.props.title}</h1>
        <button onClick={this.updatePlantImage}>
          UPDATE IMAGE
        </button>
        <Plant img={this.state.currentImage} />
      </div>
    );
  }
}

const Plant = (props) =>
  <img role="presentation" src={props.img} />


export default App;
