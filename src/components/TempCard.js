import React from 'react';


class TempCard extends React.Component {
  render(){
    return (
      <div className="row" style={{marginTop:'4%',display: 'flex',justifyContent: 'center'}}>
          <div className="col-sm-2">
              <div className="card" style={{backgroundColor:'#82ca9d'}}>
                <h3 className="card-title" style={{display: 'flex',justifyContent: 'center'}}>{this.props.day} </h3>
                <p className="text-muted" style={{display: 'flex',justifyContent: 'center'}}>{this.props.time}</p>
                <div style={{display: 'flex',justifyContent: 'center'}}>
                <img src={this.props.icon} alt={this.props.condition} style={{height:'100px',width:'100px'}}/>
                </div>
                <h2 style={{display: 'flex',justifyContent: 'center'}}>{this.props.temp}</h2>
                <div className="card-body">
                  <p className="card-text" style={{display: 'flex',justifyContent: 'center'}}>{this.props.condition}</p>
                </div>
              </div>
            </div>
      </div>
    );
  }
}

export default TempCard;
