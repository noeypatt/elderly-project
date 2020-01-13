import React from 'react'
import Chart from "react-apexcharts";
import Sheetapi from '../../config/api'

class LineHelp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {},
      datalist: [],
      series: [],
      dataMan: [],
      dataWoman: [],

    }
  }

  async componentDidMount() {
    let userOauth = JSON.parse(localStorage.getItem("myOauth"))
    this.access_token = userOauth.data.access_token
    await this.listName('ข้อมูลการวิเคราะห์ทางสถิติ!B159:B167')
    await this.listData()
  }

  listName = async (value) => {
    try {
      this.list = await Sheetapi.getSheet(this.access_token, value)
      for (let i = 0; i < this.list.length; i++) {

        this.setState(prevState => ({
          datalist: [...prevState.datalist, this.list[i][0]],
        }))
      }

      this.setState({
        options: {
          chart: {
            shadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 1
            },
            toolbar: {
              show: false
            }
          },
          responsive: [{
            breakpoint: 900,
            options: {
              dataLabels: { enabled: false },
              legend: {
                position: 'top',
                horizontalAlign: 'center',
                offsetY: -10,
                offsetX: -5

              },
            }
          }],
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'ความต้องการให้หน่วยงานของรัฐช่วยเหลือ',
            align: 'left'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {

            size: 6
          },
          xaxis: {
            categories: this.state.datalist,
          },
          yaxis: {
            min: 0,
            max: 60
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + " คน"
              }
            }
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          },

          colors: ['#0693e3', '#00d084']
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  listData = async () => {
    try {

      this.man = await Sheetapi.getSheet(this.access_token, 'ข้อมูลการวิเคราะห์ทางสถิติ!C179:C187')
      this.woman = await Sheetapi.getSheet(this.access_token, 'ข้อมูลการวิเคราะห์ทางสถิติ!E179:E187')

      for (let i = 0; i < this.man.length; i++) {

        this.setState(prevState => ({
          dataMan: [...prevState.dataMan, parseInt(this.man[i][0])],
        }))
      }

      for (let i = 0; i < this.woman.length; i++) {

        this.setState(prevState => ({
          dataWoman: [...prevState.dataWoman, this.woman[i][0]],
        }))
      }

      this.setState({
        series: [{ name: "เพศชาย", data: this.state.dataMan }, { name: "เพศหญิง", data: this.state.dataWoman }]
      })

    } catch (err) {
      console.log(err);
    }
  }

  render() {

    return (
      <React.Fragment>
        <div className="warp-chart-small">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height="400"
            width="300"
          />
        </div>

        <div className="warp-chart-mobile">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height="400"
            width="500"
          />
        </div>

        <div className="warp-chart-tablets">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height="400"
            width="700"
          />
        </div>

        <div className="warp-chart-desktops">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height="400"
            width="700"
          />
        </div>

        <div className="warp-chart-large">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height="325"
            width="625"
          />
        </div>
      </React.Fragment>

    )
  }
}

export default LineHelp;