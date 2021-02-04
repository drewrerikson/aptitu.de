import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'

class Dashboard extends Component {
  constructor(properties) {
      super(properties);
      this.state = {
        standHours: [],
        heartRate: []
      }
  }

  callAPI() {
      Promise.all([
            fetch("http://10.0.0.32:5000/table/apple_stand_hour"),
            fetch("http://10.0.0.32:5000/table/heart_rate")
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => this.setState({
            standHours: data1,
            heartRate: data2
      }));
   }

  componentDidMount() {
      this.callAPI();
  }

  render() {
    let dataStand = {
      labels: this.state.standHours.map(a => a.datum.date),
      series: [this.state.standHours.map(a => a.datum.qty)]
    }
    let dataHR = {
      labels: this.state.heartRate.map(a => a.datum.date).filter(function(value, index, Arr) {return index % 100 === 0;}),
      series: [this.state.heartRate.map(a => a.datum.Avg).filter(function(value, index, Arr) {return index % 100 === 0;})]
    }
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-4">
              <div className="card ">
                <div className="card-header ">
                  <h4 className="card-title">Stand Statistics</h4>
                  <p className="card-category">Hours in a day stood</p>
                </div>
                <div className="card-body ">
                  <ChartistGraph data={dataStand} options={{showArea: true}} type="Bar" />
                  <hr />
                  <div className="card-footer ">
                    <div className="stats">
                      <i className="fa fa-history"></i> Last data recieved 2 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header ">
                  <h4 className="card-title">Heart Rate</h4>
                  <p className="card-category">BPM hourly</p>
                </div>
                <div className="card-body ">
                  <ChartistGraph data={dataHR} type="Line" />
                </div>
                <div className="card-footer "> {/*
                  <div className="legend">
                    <i className="fa fa-circle text-info"></i> Open
                    <i className="fa fa-circle text-danger"></i> Click
                    <i className="fa fa-circle text-warning"></i> Click Second Time
                </div> */}
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history"></i> Last data recieved 2 hours ago
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
