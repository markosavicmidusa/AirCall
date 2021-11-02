import React from 'react'
import { MdOutlineCallReceived, MdOutlineCallMissed, MdOutlineCallMade, MdOutlineCallMissedOutgoing, MdVideoCall } from 'react-icons/md'
import { AiOutlineCheckCircle, AiFillCheckCircle, AiOutlineMessage, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsVoicemail, BsThreeDotsVertical } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { IoMdCall } from 'react-icons/io'


export default function Calllog({ callLog }) {

    const [date, setDate] = useState(callLog.created_at);
    const [isShown, setIsShown] = useState(0);
    const id = callLog.id;
    const idString = id.toString();

    const archive = async () => {

        await axios.post('https://aircall-job.herokuapp.com/activities/' + idString, {
            is_archived: true,
        });
        window.location.reload();


    }

    const unarchive = async () => {

        await axios.post('https://aircall-job.herokuapp.com/activities/' + idString, {
            is_archived: false,
        });
        window.location.reload();


    }

    const callDetail = () => {

        if (document.getElementById(idString).style.display == 'flex') {
            document.getElementById(idString).style.display = 'none';
        } else {
            document.getElementById(idString).style.display = 'flex';
        }

    }

    useEffect(() => {

        var box1Id="store"+idString;
        var box2Id="discard"+idString;

        if(isShown ==0){
            document.getElementById(box1Id).style.display = "none";
            document.getElementById(box2Id).style.display = "none";
        }else if(isShown == 1){
            document.getElementById(box1Id).style.display = "flex";
            document.getElementById(box2Id).style.display = "none";

        }else if(isShown == 2){
            document.getElementById(box1Id).style.display = "none";
            document.getElementById(box2Id).style.display = "flex";

        }   

    }, [isShown])




    return (
        <div>
            <div className="activity-detail" >
                <div className="date-call" id="date-call">
                    <div className="date-call-moment">{moment(date).format("MMMM Do YYYY")}{" "}</div>
                    <div className="date-call-archive-unarchive" id={"store"+idString}> Store</div>
                    <div className="date-call-archive-unarchive" id={"discard"+idString}> Discard</div>
                </div>
                <div className="call-log">
                    <div className="call-log-status">
                        
                        {callLog.direction === 'inbound' ?
                            [callLog.call_type === 'answered' ? <MdOutlineCallReceived className="callMade" /> : callLog.call_type === 'missed' ? <MdOutlineCallMissed className="missedCall" /> : <BsVoicemail className="voiceMail" />]
                            : [callLog.call_type === 'answered' ? <MdOutlineCallMade className="callMade" /> : callLog.call_type === 'missed' ? <MdOutlineCallMissedOutgoing className="missedCall" /> : <BsVoicemail className="voiceMail" />]}

                    </div>
                    <div className="call-log-info">
                        <div className="number">{callLog.from}</div>
                        <div className="call-from">from {callLog.to}</div>
                    </div>
                    <div className="time">
                        {moment(date).format("LT")}
                    </div>
                    <div className="mark">

                        {callLog.is_archived == true ?

                            <AiFillCheckCircle
                                className="marked-unmarked"
                                onClick={unarchive}
                                onMouseOver={() => setIsShown(2)}
                                onMouseOut={() => setIsShown(0)}
                                style={{ height: '85%', width: '85%' }}
                                cursor="pointer"
                            /> :
                            <AiOutlineCheckCircle
                                className="marked-unmarked"
                                style={{ height: '85%', width: '85%' }}
                                onMouseOver={() => setIsShown(1)}
                                onMouseOut={() => setIsShown(0)}
                                onClick={archive}
                                cursor="pointer"
                            />
                        }

                    </div>
                    <div className="callDetail">
                        <BsThreeDotsVertical
                            className="callDetailIcon"
                            style={{ height: '100%', width: '100%' }}
                            onClick={callDetail}
                            cursor="pointer"
                        />
                    </div>
                </div>
                <div className="callDetailInfo" style={{ display: 'none' }} id={idString}>
                    <div className="callDetailInfoRest">via: {callLog.via}<br /> direction: {callLog.direction}<br />duration: {callLog.duration} sec.</div>
                    <div className="callMethods">

                        <IoMdCall className="callMethodsIcon" style={{ color: "#2ac420" }} />
                        <MdVideoCall className="callMethodsIcon" style={{ color: "blue" }} />
                        <AiOutlineMessage className="callMethodsIcon" style={{ color: "#335eff" }} />
                        <AiOutlineInfoCircle className="callMethodsIcon" style={{ color: "grey" }} />

                    </div>

                </div>
            </div>



        </div>
    )
}
