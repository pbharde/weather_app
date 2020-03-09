import React from 'react';


class TempCard extends React.Component {
  render(){
    return (
      <div className="row justify-content-center">
          <div className="col-sm-2">
              <div className="card">
                <h3 className="card-title">{this.props.day} </h3>
                <p className="text-muted">{this.props.time}</p>
                <img src={this.props.icon} alt={this.props.condition} style={{height:'100px',width:'100px'}}/>
                <h2>{this.props.temp}</h2>
                <div className="card-body">
                  <p className="card-text">{this.props.condition}</p>
                </div>
              </div>
            </div>
      </div>
    );
  }
}

export default TempCard;
