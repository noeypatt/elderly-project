import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'
import Sheetapi from '../../config/api'
import { useMediaQuery } from 'react-responsive';

const PieService2 = () => {
    const isBigScreen = useMediaQuery({ minDeviceWidth: 1281 })
    const isMobile = useMediaQuery({ maxWidth: 1280 })
    const isSmallScreen = useMediaQuery({ maxWidth: 576 })

    const [options, setOptions] = useState({
        title: { text: "การเข้าร่วมกิจกรรมทางศาสนกิจ" },
        legend: {
            position: 'bottom'
        },
        dataLabels: { enabled: false },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " คน"
                }
            }
        },
        responsive: [{
            breakpoint: 992,
            options: {
                legend: {
                    offsetY: 20,
                    itemMargin: {
                        horizontal: 1,
                        vertical: 1
                    },
                },
            },
        }],
        colors: ['#8ed1fc', '#7bdcb5', '#d3b3e5'],
        labels: ["เข้าร่วมประจำ", "เข้าร่วมนานๆ ครั้ง", "ไม่เข้าร่วม"]
    })

    const [series, setSeries] = useState([20, 25, 50])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {

        let userOauth = await JSON.parse(localStorage.getItem("myOauth"))
        await namelist(userOauth.data.access_token, 'ข้อมูลการวิเคราะห์ทางสถิติ!F116:F118')
        await listData(userOauth.data.access_token, 'ข้อมูลการวิเคราะห์ทางสถิติ!G116:G118')
    }

    const namelist = async (token, value) => {
        try {
            var list = await Sheetapi.getSheet(token, value)

            setOptions({
                labels: _.flatten(list)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const listData = async (token, value) => {
        try {

            var result = await Sheetapi.getSheet(token, value)
            var data = _.flatten(result).map(Number)
            setSeries(data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            {
                isBigScreen ?
                    <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width="400"
                        height="200"
                    />
                    :
                    isMobile ?
                        <Chart
                            options={options}
                            series={series}
                            type="donut"
                            width="300"
                            height="200"
                        />
                        :
                        isSmallScreen ?
                            <Chart
                                options={options}
                                series={series}
                                type="donut"
                                width="200"
                                height="100"
                            />
                            :
                            null
            }
        </React.Fragment>
    )
}
export default PieService2;
