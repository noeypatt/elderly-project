import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive';

const NavBar = props => {

    const tab = props.tab
    const name = props.name
    const [navbar,setNavbar] = useState("")
    const [status, setStatus] = useState(false)
    const isBigScreen = useMediaQuery({ minDeviceWidth: 769 })
    const isSmallScreen = useMediaQuery({ maxDeviceWidth: 768.99 })

    const collapsible = async () => {

        if (!status) {
            setStatus(true)
            props.confirm(true)
        }
        else {
            setStatus(false)
            props.confirm(false)
        }
    }

    useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY <= 10) 
            setNavbar(null)
            else 
            setNavbar("scroll")
        };
    }, [])

    return (
        <React.Fragment>
            {
                typeof document === 'undefined' ?
                    null :
                    isBigScreen && name == "index" ?
                        <nav className={navbar}>
                            <ul>
                                <Link href="/">
                                    <li>
                                        <h2>Eldery DB</h2>
                                    </li>
                                </Link>
                                <li>
                                    {
                                        tab.map((item, index) => {
                                            return (
                                                <a href={item.href} key={index} >
                                                    {
                                                        item.name == "ติดต่อ" ?
                                                            <p className="li-buttom-line">{item.name}</p>
                                                            :
                                                            item.name == "เข้าสู่หน้าหลัก" ?
                                                                <p className="li-buttom-line-active">{item.name}</p>
                                                                :
                                                                <React.Fragment>
                                                                    <button className="btn">
                                                                        <p>{item.name}</p>
                                                                    </button>
                                                                </React.Fragment>
                                                    }
                                                </a>
                                            )
                                        })
                                    }
                                </li>
                            </ul>
                        </nav>
                        :
                        isBigScreen && name == "main" ?
                            <nav>
                                <ul >
                                    <Link href="/">
                                        <li>
                                            <p>ย้อนกลับ</p>
                                        </li>
                                    </Link>
                                    <li>
                                        {
                                            tab.map((item, index) => {
                                                return (
                                                    <a href={item.href} key={index}>
                                                        {
                                                            item.name == "ติดต่อ" ?
                                                                <p className="li-buttom-line">{item.name}</p>
                                                                :
                                                                item.name == "เข้าสู่หน้าหลัก" ?
                                                                    <p className="li-buttom-line-active">{item.name}</p>
                                                                    :
                                                                    <React.Fragment>
                                                                        <button className="btn">
                                                                            <p>{item.name}</p>
                                                                        </button>
                                                                    </React.Fragment>
                                                        }
                                                    </a>
                                                )
                                            })
                                        }
                                    </li>

                                </ul>
                            </nav>
                            :
                            isBigScreen && name == "other" ?
                                <nav>
                                    <ul>
                                        <Link href="/">
                                            <li>
                                                <h2>Eldery DB</h2>
                                            </li>
                                        </Link>
                                        <li>
                                            {
                                                tab.map((item, index) => {
                                                    return (
                                                        <Link key={index} href={item.href}>
                                                            {
                                                                <React.Fragment>
                                                                    <button className="btn">
                                                                        <p>{item.name}</p>
                                                                    </button>
                                                                </React.Fragment>
                                                            }
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </li>
                                    </ul>
                                </nav>
                                :
                                isSmallScreen ?
                                    <div className="collapsible-menu">
                                        <div className="warp-nav-sidebar">
                                            <Link href="/">
                                                <h2>Eldery DB</h2>
                                            </Link>
                                            <div className="box-hamberger">
                                                <a className={`hamberger btn${status ? " active" : " not-active"}`} onClick={collapsible} >
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className={`menu-content${status ? " show" : ""}`}>
                                            <ul>
                                                <li >
                                                    {
                                                        tab.map((item, indexs) => {
                                                            return (
                                                                <Link key={indexs} href={item.href}>
                                                                    <p >{item.name}</p>
                                                                </Link>
                                                            )
                                                        })
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    :
                                    null
            }
        </React.Fragment>

    )
}
export default NavBar;