import React from 'react'
import './css/body-comp.css'
import { RiMenuLine, RiMenuUnfoldFill } from 'react-icons/ri'


export default function BodyComp() {

    function tabsMenuOpenClose() {

        var x = document.getElementById("tabs-main");
        var icon1 = document.getElementById("riMenuLine");
        var icon2 = document.getElementById("riMenuUnfoldFill");

        if (x.style.display === "none") {
            icon1.style.display = "none";
            x.style.display = "block";
            icon2.style.display = "block";
        } else {
            x.style.display = "none";
            icon1.style.display = "block";
            icon2.style.display = "none";
        }

    };



    return (
        <div>
            <div id="tabs-main" style={{display:"none"}}>
                <div className="tabs " id="tabs"
                    onMouseOver={({ target }) => target.style.color = '#0d8f1c'}
                    onMouseOut={({ target }) => target.style.color = 'black'}
                >

                    <div className="tab-options">Call log</div>
                    <div className="tab-options">Archived</div>
                    <div className="tab-options">Unarchived</div>
                </div>
            </div>
            <div className="container-view">
                <div className='main-body'>

                    <div className="header-main-body">
                    <div className="title">Call log</div>
                        <div className="icon">
                            <RiMenuLine
                                id="riMenuLine"
                                style={{ display: 'block', height: '95%', width: '95%' }}
                                onClick={tabsMenuOpenClose}
                                cursor="pointer"
                                onMouseOver={({ target }) => target.style.color = '#0d8f1c'}
                                onMouseOut={({ target }) => target.style.color = 'black'}

                            />
                            <RiMenuUnfoldFill
                                id="riMenuUnfoldFill"
                                onClick={tabsMenuOpenClose}
                                style={{ display: 'none', height: '95%', width: '95%' }}
                                cursor="pointer"
                                onMouseOver={({ target }) => target.style.color = '#0d8f1c'}
                                onMouseOut={({ target }) => target.style.color = 'black'}
                            />

                        </div>
                    </div>
                    <div className="main-body-list">
            
                        

                    </div>
q
                </div>
            </div>
        </div>

    )
}
