import React from 'react';
import moment from 'moment';

class DayCard extends React.Component {
  constructor(props){
    super(props);
    this.state={
        weatherData:[],
        images:[]
    }
  }

  componentDidMount = () => {
    const dailyData = this.props.dailyData;
    let newDate = new Date();
    let weatherData = dailyData.map((reading,index)=>{
      let icon = reading.weather[0].icon;
        let day =  moment(newDate.setTime(reading.dt * 1000)).format('dddd');
        let time = moment(newDate.setTime(reading.dt * 1000)).format('MMMM Do, h:mm a');
        // let img = reading.weather[0].icon;
        let temp = Math.round(reading.main.temp);
        let condition= reading.weather[0].description;
        let weatherData =  ({
          'day':day,
          'time':time,
          'icon':icon,
          'temp':temp,
          'condition':condition
        });
        return weatherData;
  });
    this.setState({weatherData:weatherData});
    this.getImages();
}

getImages(){
    Promise.all(this.props.dailyData.map(data=>
    fetch(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
  ))
  .then(res=>{
    let urls = res.map(url=>url.url);
    return urls;
  })
  .then(urls=>{
    this.setState({images:urls})
  })
}


  render(){
    let weatherData = this.state.weatherData;
    let images = this.state.images;
    let dailyData = [];
    for(let i=0; i<weatherData.length; i++){
      dailyData.push({
        'day':weatherData[i].day,
        'time':weatherData[i].time,
        'icon':images[i],
        'temp':weatherData[i].temp,
        'condition':weatherData[i].condition
      })
    }
    // let newDate = new Date();
    return (
      <div className="row" style={{marginTop:'4%',display: 'flex',justifyContent: 'center'}}>
      {
        dailyData.length>=5 ? (
        dailyData.map((reading,index)=>{
          return (
            <div className="col-sm-2" key={index} style={{marginTop:'4%'}}>
              <div className="card">
                <h3 className="card-title" style={{fontSize:'20px'}}>{reading.day} </h3>
                <p className="text-muted" style={{fontSize:'13px'}}>{reading.time}</p>
                <img src={reading.icon} alt={reading.condition}/>
                <h2>{reading.temp} °F</h2>
                <div className="card-body">
                  <p className="card-text">{reading.condition}</p>
                </div>
              </div>
            </div>
          )
        })
      ) : 'Loading . . .'
      }
      </div>
    );
  }
}

export default DayCard;
