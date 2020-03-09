import React from 'react';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class HourCard extends React.Component {
  constructor(props){
    super(props);
    this.state={
        hourlyData:[]
    }
  }
  componentDidMount(){
    let hourlyData = [];
    const size = 8;
    hourlyData = this.props.hourlyData.slice(0, size).map(data=>{
      let temp = Math.round(((parseFloat(data.split("|")[0])-273.15)*1.8)+32);
      let time = data.split("|")[1].split(" ")[1].split(":")[0]>12 ?
                 data.split("|")[1].split(" ")[1].split(":")[0]-12+" PM" :
                 (data.split("|")[1].split(" ")[1].split(":")[0] == 12 ?
                 data.split("|")[1].split(" ")[1].split(":")[0]+" PM" :
                 (data.split("|")[1].split(" ")[1].split(":")[0]>10 ?
                 data.split("|")[1].split(" ")[1].split(":")[0]+" AM" :
                 data.split("|")[1].split(" ")[1].split(":")[0].substr(1)+" AM"
               ));

      return({
        "temp":temp,
        "time":time
      })
    })
    // console.log("time temp - "+JSON.stringify(hourlyData));
    this.setState({hourlyData})
  }
  render(){
    console.log("time temp1 - "+this.state.hourlyData);
    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return <text x={x} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}  °F`}</text>;
};
    return (
      <div  className="col-sm-12" style={{marginTop:'4%'}}>
      <AreaChart width={800} height={100} data={this.state.hourlyData}>
      <defs>
    <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
    </defs>
        <XAxis dataKey="time" axisLine={false}/>
        <YAxis axisLine={false} tick={false}/>
        <Area type="monotone"  label={renderCustomBarLabel} dataKey="temp"  fillOpacity={1} fill="url(#temp)" />
      </AreaChart>
      </div>
    );
  }
}

export default HourCard;
