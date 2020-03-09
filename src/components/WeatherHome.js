import React from 'react';
import DayCard from './DayCard';
import HourCard from './HourCard';
import TempCard from './TempCard';


class WeatherHome extends React.Component {
  constructor(props){
    super(props);
    this.state={
      city:'',
      state:'',
      zip:'',
      weatherType:'',
      image:'',
      temp:'',
      lat:'',
      lang:'',
      dailyData:[],
      hourlyData:[]
    }
  }

  componentDidMount(){
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(
         (position) => {
       this.setState({
         lat: position.coords.latitude,
         lang: position.coords.longitude,
         error: null,
       });
       let key = '0264db5477fe4b1c9ee9ae23b3ec59e5';
       let url = `https://api.opencagedata.com/geocode/v1/json?q=${this.state.lat}+${this.state.lang}&key=${key}`;

       fetch(url)
       .then(res=>res.json())
       .then(data=>{
         this.setState({
           city:data.results[0].components.city,
           state:data.results[0].components.state_code,
           zip:data.results[0].components.postcode
         })
         const key = '524589f12ff60e2a150e470595208862';
         let city = this.state.city;
         let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
         fetch(url)
         .then(res=>res.json())
         .then(data=>{
           let fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32);
           this.setState({
             city,
             state:this.state.state,
             weatherType:data.weather[0].main,
             temp:fahrenheit
           });
           return data.weather[0].icon;
         })
         .then(icon=>{
           fetch(`http://openweathermap.org/img/wn/${icon}@2x.png`)
             .then(data=>{
               this.setState({
                 image:data.url,
               })
             })
         });

         let daysurl= `http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zip}&units=imperial&APPID=${key}`
          fetch(daysurl)
         .then(res => res.json())
         .then(data => {
            let dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"));
            this.setState({dailyData})
         });

         let hourlyurl= `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&APPID=${key}`;
         fetch(hourlyurl)
         .then(res => res.json())
         .then(data=>{
           let hourlyData = data.list.map(x=>x.main.temp+"|"+x.dt_txt);
           this.setState({hourlyData})
         });
       });
     },
     (error) => this.setState(
       {error: error.message}
     )
       );
    }
    else{
      alert('geolocation is not supported');
    }
  }

  render(){
    const today = new Date();
    const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    let day = daylist[today.getDay()]
    let time = (today.getHours()>12 ? today.getHours()-12 : today.getHours())+":"+(today.getMinutes()<10 ?  '0'+today.getMinutes() : today.getMinutes())+" "+(today.getHours() >= 12? " PM ":" AM ");
    console.log("time - "+time,today.getHours(),today.getMinutes()<10 ?  '0'+today.getMinutes() : today.getMinutes())
    let icon = this.state.image;
    let temp = `${this.state.temp} °F`;
    let condition = this.state.weatherType;
    return (
      <div>
      <h1>{this.state.city},{this.state.state}</h1>
     <div className="container">
        {
          <TempCard
          day={day}
          time={time}
          icon={icon}
          temp={temp}
          condition={condition}/>
        }
    </div>
     <div className="container">
        {
          this.state.hourlyData.length>0 ? <HourCard hourlyData={this.state.hourlyData}/> : 'Loading Hourly Forecast. . .'
        }
    </div>
     <div className="container">
        {
          this.state.dailyData.length>0 ? <DayCard dailyData={this.state.dailyData}/> : 'Loading Daily Forecast. . .'
        }
    </div>
     </div>
);
  }
}

export default WeatherHome;
