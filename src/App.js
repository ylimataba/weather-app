import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Temperature(props) {
  if (props.temperature) {
    var style = {color:"black"};
    if(props.temperature < 0){
      style = {color:"blue"};
    }
    else if (props.temperature > 25) {
      style = {color:"red"};
    }
    return(
      <div className="col-sm-6 temperature">
        <h4>Current temperature in {props.city}</h4>
        <h1 style={style}>
          {props.temperature} &#8451;
        </h1>
      </div>
    );
  }
  else {
    return(
      <div className="col-sm-6 temperature">
      <h4>City not found.</h4>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      city: "Helsinki",
      temperature: null,
    };
  }

  componentDidMount(){
    this.getWeatherData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.city !== this.state.city){
      this.getWeatherData();
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({city: this.state.value});
    event.preventDefault();
  }

  getWeatherData() {
    const url = "http://api.openweathermap.org/data/2.5/weather";
    const params = {
      q: this.state.city,
      APPID: "d1258223470a2c50fd7aa38b85e227ab",
      units: "metric"
    };
    axios.get(url, {params})
      .then(res => {
        var temperature = res.data.main.temp;
        temperature = Math.round(temperature * 2) / 2.0;
        this.setState(
          {
            temperature: temperature
          });
      })
      .catch(error => {
        this.setState(
          {
            temperature: ""
          });
      });
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="row fluid">
          <Temperature className="temperature" temperature={this.state.temperature} city={this.state.city} />
          <div className="col-sm-6">
            <form className="city-form" onSubmit={e => this.handleSubmit(e)}>
              <div className="form-group row">
                <label htmlFor="city-input" className="col-sm-4 col-form-label">City</label>
                <div className="col-sm-8">
                  <input className="form-control" id="city-input" placeholder="Insert city" type="text" value={this.state.value} onChange={e => this.handleChange(e)} />
                </div>
              </div>
              <div className="form-group">
                <input className="btn btn-outline-secondary" type="submit" value="Send" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
