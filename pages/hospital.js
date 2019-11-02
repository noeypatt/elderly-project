import React from 'react'
import Sheetapi from '../config/api'
import dynamic from 'next/dynamic'
import Nav from '../components/nav';
import Nav_logo from '../components/layout/nav_logo';
import Navbar_main from '../components/navbar_main';
import Sidebar from '../components/layout/sidebar';


const Barchart = dynamic(
    () => import('../components/chart/barchart'),
    { ssr: false }
)

class Hospital extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [{ name: "หน้าหลัก", link: "/" },
            { name: "ความคืบหน้า", link: "/main" },
            { name: "ข้อมูลทางสถิติ", link: "/mainchart" },
            { name: "สวัสดิการจากรัฐ", link: "/maindoc" },
            { name: "การบริการ", link: "/service" },
            { name: "ช่วยเหลือ", link: "/help" },
            ],
            status: true
        }
    }

    onConfirm = (order) => {
        this.setState({
            status: order,
        })
    }

    async componentDidMount() {
        await localStorage.setItem("myOauth", JSON.stringify(await Sheetapi.postSheetValues()))

    }

    render() {

        return (
            <div className="warp-main">
                <div className={`wrapper${this.state.status ? " menuDisplayed" : ""}`}>
                    <Navbar_main confirm={this.onConfirm} status={this.state.status} />
                    <Sidebar status={this.state.status} />

                    <div className="page-content-wrapper">
                        <div className="container-fluid">
                            <h1 className="text-center">โรงพยาบาลเเละการดูแลรักษา</h1>
                            <h2 className="small text-center"></h2>

                            <div className="warp-chart">
                                <div className="chart-contents">
                                    <Barchart />
                                </div>
                                {/* <div className="chart-contents">
                                  
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Hospital;