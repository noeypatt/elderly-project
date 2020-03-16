import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import Dashboard from '../../components/layout/dashboard';
import { useMediaQuery } from 'react-responsive';
import Empty from '../../components/Empty';

const BarHospital = dynamic(
    () => import('../../components/chart/barHospital3'),
    { ssr: false }
)

const BarHospital2 = dynamic(
    () => import('../../components/chart/barHospital4'),
    { ssr: false }
)

const BarHospital3 = dynamic(
    () => import('../../components/chart/barHospital2'),
    { ssr: false }
)

const PieHospital = dynamic(
    () => import('../../components/chart/piehospital'),
    { ssr: false }
)

const PieHospital2 = dynamic(
    () => import('../../components/chart/piehospital2'),
    { ssr: false }
)

const PieHospital3 = dynamic(
    () => import('../../components/chart/barHospital'),
    { ssr: false }
)

const Hospital = () => {

    const isLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const isTablet = useMediaQuery({ minWidth: 768 })
    const isMobile = useMediaQuery({ maxDeviceWidth: 768 })

    const [status, setStatus] = useState(false)
    const [tokenError, setTokenError] = useState(false)

    const statusMain = (order) => {
        setStatus(order)
    }

    const statusToken = (token) => {
        setTokenError(token)
    }

    return (
        <div className="warp-main">
            {

                !tokenError ?
                    <React.Fragment>
                        <Dashboard onStatusMain={statusMain} statusMain={status} />
                        <div className="page-content-main">
                            <div className="container-fluid-main">
                                <h1 className="text-center">ข้อมูลด้านสุขภาพ</h1>
                                <h2 className="small text-center">ของประชากรผู้สูงอายุ ภายในอำเภอกะทู้ จังหวัดภูเก็ต</h2>

                                <div className="info-main">
                                    <div className="warp-chart-main ">
                                        <div className="chart-row">
                                            <PieHospital onToken={statusToken} />
                                            <BarHospital />
                                        </div>

                                        <div className="chart-row">
                                            <PieHospital2 />
                                            <BarHospital2 />
                                        </div>

                                        <div className="chart-row">
                                            <PieHospital3 />
                                            <BarHospital3 />
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <Empty />
            }

        </div>
    )
}
export default Hospital;