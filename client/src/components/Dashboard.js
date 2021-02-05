import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'

const DAYS = ['S','M','T','W','T','F','S'];

class Dashboard extends Component {
  constructor(properties) {
      super(properties);
      this.state = {
        standHours: [],
        heartRate: [],
        vo2: [],
        sleep: [],
        lastUpdate: new Date()
      }
  }

  callAPI() {
      Promise.all([
            fetch("http://localhost:5000/table/apple_stand_hour"),
            fetch("http://localhost:5000/table/heart_rate"),
            fetch("http://localhost:5000/table/vo2_max"),
            fetch("http://localhost:5000/table/sleep_analysis"),
      ])
        .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
        .then(([data1, data2, data3, data4]) => this.setState({
            standHours: data1.slice(-7),
            heartRate: data2.filter(function(value, index, Arr) {return index % 24 === 0;}).slice(-30),
            vo2: data3.slice(-30),
            sleep: data4.slice(-30),
            lastUpdate: new Date()
      }));
   }

  componentDidMount() {
      this.callAPI();
  }

  buildData() {
    let dataStand = {
      labels: this.state.standHours.map(a => DAYS[(new Date(a.ts)).getDay()]),
      series: [this.state.standHours.map(a => a.datum.qty)]
    }
    let dataHR = {
      labels: this.state.heartRate.map(a => ((new Date(a.ts).getHours() + 11) % 12) + 1),
      series: [this.state.heartRate.map(a => a.datum.Avg)]
    }
    let dataVO2 = {
      labels: this.state.vo2.map(a => new Date(a.ts).getMonth() + 1 + '-' + new Date(a.ts).getDate()),
      series: [this.state.vo2.map(a => a.datum.qty)]
    }
    let dataSleep = {
      labels: this.state.sleep.map(a => new Date(a.ts).getMonth() + 1 + '-' + new Date(a.ts).getDate()),
      series: [this.state.sleep.map(a => a.datum.inBed), this.state.sleep.map(a => a.datum.asleep)]
    }
    return [dataStand, dataHR, dataVO2, dataSleep];
  }

  render() {
    let [dataStand, dataHR, dataVO2, dataSleep] = this.buildData();
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
                  <ChartistGraph data={dataStand} type="Bar" />
                  <hr />
                  <div className="card-footer ">
                    <div className="stats">
                      <i className="fa fa-history"></i> Last data recieved at { this.state.lastUpdate.toLocaleString() }.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header ">
                  <h4 className="card-title">Heart Rate</h4>
                  <p className="card-category">BPM measurements when collected, by hour. Workouts cause higher record volume (will fix).</p>
                </div>
                <div className="card-body ">
                  <ChartistGraph data={dataHR} options={{showArea: true}} type="Line" />
                </div>
                <div className="card-footer "> {/*
                  <div className="legend">
                    <i className="fa fa-circle text-info"></i> Open
                    <i className="fa fa-circle text-danger"></i> Click
                    <i className="fa fa-circle text-warning"></i> Click Second Time
                </div> */}
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history"></i> Last data recieved at { this.state.lastUpdate.toLocaleString() }.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header ">
                  <h4 className="card-title">VO2 Max</h4>
                  <p className="card-category">Volume Oxygen Max by measurement - taken during cardiac-intensive periods.</p>
                </div>
                <div className="card-body ">
                  <ChartistGraph data={dataVO2} options={{showArea: true}} type="Line" />
                </div>
                <div className="card-footer ">
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history"></i> Last data recieved at { this.state.lastUpdate.toLocaleString() }.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header ">
                  <h4 className="card-title">Sleep Analysis</h4>
                  <p className="card-category">Compare time in-bed versus time-asleep on a nightly basis.</p>
                </div>
                <div className="card-body ">
                  <ChartistGraph data={dataSleep} type="Bar" />
                </div>
                <div className="card-footer ">
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history"></i> Last data recieved at { this.state.lastUpdate.toLocaleString() }.
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
