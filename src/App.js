import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import plantImages from './PlantImages';
import gardenImages from './GardenImages';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentImage: plantImages.plant1,
      plantName: '',
      plantType: '',
      plantSize: 1,
      askPlantType: true,
      askWeather: false,
      rainCount: 0,
      gardenPlants: [
        ['Sunny', 'sunflower'],
        ['Cassandra', 'daisy']
      ]
    }
  }

  //////////////////////
  //  LIFECYCLE HANDLERS
  //////////////////////

  componentDidMount(){
    setInterval(this.renderPlant(), 700)
  }

  render() {
    return (
      <Grid>
        <Row>
          <h1>{this.props.title}</h1>
          Grow youself a lil plant! Be careful, because your choices along the journey can make a difference.
        </Row>

        <Row>
          <Col id="plantCol" xs={6}>
            {this.renderAskPlantType()}
          </Col>
          <Col id="weatherCol" xs={6}>
            {this.renderAskWeather()}
          </Col>
        </Row>

        <Row id="grownRow">
          <Col xs={12}>
            {this.renderGrownPlantMessage()}
          </Col>
          <Col xs={6}>
            {this.renderResetPlantButton()}
          </Col>
          {this.renderSavePlantButton()}
        </Row>

        <Row id="gardenRow">
          <Col className="fenceCol" xs={12}></Col>
          <Col id="garden" className="gardenCol" xs={12}>
            {this.renderGardenPlants()}
          </Col>
        </Row>
      </Grid>
    );
  }

  ///////////////
  //  FUNCTIONS
  ///////////////
  //

  setPlantType = (type) => {
    this.setSet({askPlantType: false});

  }

  handleChange = (e) => {
    console.log('handling select list change: ' + e.target.value);
    this.setState({
      plantType: e.target.value,
      askPlantType: false
    });
  }


  renderAskPlantType = () => {
    if(!this.state.askPlantType) {
      return false
    }
    return (
        <label>
          Pick which type of plant you would like to grow:
          <select value={this.state.plantType} onChange={this.handleChange}>
            <option value="aloeVera">Aloe Vera</option>
            <option value="cactus">Cactus</option>
            <option value="daisy">Daisy</option>
            <option value="pansy">Pansy</option>
            <option value="sunflower">Sunflower</option>
            <option value="tulip">Tulip</option>
          </select>
        </label>
    );
  }

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
      <div id="weatherDiv">
        <h3>Choose the weather:</h3>
        <img className="weatherImg" src={gardenImages.sun} onClick={() => this.setAskWeather(false)} />
        <img className="weatherImg" src={gardenImages.rain} onClick={() => this.setAskWeather(true)} />
      </div>
    )
  }

  renderGrownPlantMessage = () => {
    if(this.state.plantSize < 9) {
      return false;
    }
    var messageTxt = this.state.rainCount < 1 ? "Oops! Your plant didn't get any rain and died. T_T" : "Congratulations! Your lil plant looks happy. :)";

    return (
      <Col xs={12}>
        <h2>{messageTxt}</h2>
      </Col>
    );
  }

  renderResetPlantButton = () => {
    if(this.state.plantSize < 8) {
      return false;
    }
    return (
    <button>grow again</button>
      //<PlantButton style={'warning'} text={'Let\'s Grow Again!'} click={this.resetPlant}/>
     );

  }

  renderSavePlantButton = () => {
    if(this.state.plantSize < 8) {
      return false;
    }
    return (
      <Col xs={6}>
        <button>save plant</button>
        //<Button bsStyle="success" onClick={this.savePlant}>
        //  Save Plant!
        //</Button>
      </Col>
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

  savePlant = () => {
    // add plant to garden
    var gardenPlants = this.state.gardenPlants.slice();
    gardenPlants.unshift( [this.state.plantName, this.state.plantType] );
    this.setState({gardenPlants: gardenPlants});
    // reset plant
    this.resetPlant();
  }

  renderGardenPlants = () => {
    // loop through plants
    const gardenPlants = this.state.gardenPlants;
    return (
      gardenPlants.map(function(plant, index){
        const name = plant[0];
        const type = plant[1];

        return (
          <div id="plantDiv">
            <img className="plantImg" role="presentation" src={plantImages[type]} />
            <h4 className="plantName">{name}</h4>
          </div>
        );
      })
    );
  }

  renderPlant = () => {
    // plant is full grown or plant type not selected
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
      newPlantImage = plantImages['plantDead'];
    }

    this.setState({
      currentImage: newPlantImage,
      plantSize: newPlantSize})

    return (
      <div>
       <h2>Day {this.state.plantSize}</h2>
       <Plant img={this.state.currentImage} />
      </div>
    );

  }

}

const Plant = (props) =>
  <img className="plantImg" role="presentation" src={props.img} />

//const PlantButton = (props) =>
//  <Button bsStyle={props.style} onClick={props.click}>
//    {props.text}
//  </Button>

export default App;
