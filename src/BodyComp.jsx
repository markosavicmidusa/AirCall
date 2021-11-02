import React from 'react'
import './css/body-comp.css'
import { RiMenuLine, RiMenuFoldFill } from 'react-icons/ri'
import { BsArchive, BsArchiveFill } from 'react-icons/bs'
import Calllog from './components/Calllog';
import { useState, useEffect } from 'react';
import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";
import { IoMdRefreshCircle } from 'react-icons/io'
import { relativeTimeRounding } from 'moment';

export default function BodyComp() {

    const [callList, setcallList] = useState([]);
    const [clickedOption, setClickedOption] = useState(0);
    //option 0-activity feed
    //option 1-archived calls

    useEffect(() => {

        const fetchCount = async () => {
            const res = await axios.get("https://aircall-job.herokuapp.com/activities");
            setcallList(res.data);

        };
        fetchCount();

    }, []);

    const onReset = async () => {
        await axios.get("https://aircall-job.herokuapp.com/reset");
        console.log('We made on reaset options');

        window.location.reload(true);
    }

    const tabsMenuOpenClose = () => {

        var x = document.getElementById("tabs-main");
        var icon1 = document.getElementById("riMenuLine");
        var icon2 = document.getElementById("riMenuUnfoldFill");
        var resetDiv = document.getElementById('reset-button');

        if (x.style.display === "none") {
            icon1.style.display = "none";
            x.style.display = "block";
            icon2.style.display = "block";
            resetDiv.style.display = "none";
        } else {
            x.style.display = "none";
            icon1.style.display = "block";
            icon2.style.display = "none";
            resetDiv.style.display = "block";
        }

    };
   
    const callLogOption = () => {
        setClickedOption(0);
    }
    const callLogOption1 = () => {
        setClickedOption(1);
    }

    return (
        <div>
            <div id="tabs-main" style={{ display: "none" }}>
                <div className="tabs " id="tabs"
                    onMouseOver={({ target }) => target.style.color = 'white'}
                    onMouseOut={({ target }) => target.style.color = 'black'}>
                    <div className="tab-options" onClick={callLogOption}>Activity Feed</div>
                    <div className="tab-options" onClick={callLogOption1}>Archive</div>
                </div>
            </div>
            <div className="container-view">
                <div className='main-body'>

                    <div className="header-main-body">
                        <div className="title">
                            {clickedOption == 0 ? <>Activity Feed</> : <>Archive</>}
                        </div>

                        <div className="icon">
                            <RiMenuLine
                                id="riMenuLine"
                                style={{ display: 'block', height: '85%', width: '85%' }}
                                onClick={tabsMenuOpenClose}
                                cursor="pointer"
                                onMouseOver={({ target }) => target.style.color = '#FF00EC'}
                                onMouseOut={({ target }) => target.style.color = 'black'}

                            />
                            <RiMenuFoldFill
                                id="riMenuUnfoldFill"
                                onClick={tabsMenuOpenClose}
                                style={{ display: 'none', height: '85%', width: '85%' }}
                                cursor="pointer"
                                onMouseOver={({ target }) => target.style.color = '#FF00EC'}
                                onMouseOut={({ target }) => target.style.color = 'black'}
                            />

                        </div>
                    </div>

                    {clickedOption == 0 ?
                        <div className="main-body-list" id="main-body-list">
                            {callList.filter((c) => {
                                if (c.is_archived == false) {
                                    return c;
                                }
                            }).map((c) => (
                                <Calllog key={c.id} callLog={c} />
                            ))}
                        </div> :
                        <div className="main-body-list" id="main-body-list1">
                            {callList.filter((c) => {
                                if (c.is_archived == true) {
                                    return c;
                                }
                            }).map((c) => (
                                <Calllog key={c.id} callLog={c} />
                            ))}
                        </div>
                    }

                </div>
            </div>
            <div className="reset-button" onClick={onReset} id="reset-button">
                <div className="reset-button-frame">
                    <IoMdRefreshCircle className="reset-button-main" />
                </div>
            </div>

        </div>
    )
}
