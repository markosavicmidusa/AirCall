import React from 'react'
import { MdOutlineCallReceived, MdOutlineCallMissed, MdOutlineCallMade, MdOutlineCallMissedOutgoing, MdVideoCall } from 'react-icons/md'
import { AiOutlineCheckCircle, AiFillCheckCircle, AiOutlineMessage, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsVoicemail, BsThreeDotsVertical } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { IoMdCall } from 'react-icons/io'
import { toast } from 'react-toastify';

export default function Calllog({ callLog }) {

    const [date, setDate] = useState(callLog.created_at);
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


    
    return (
        <div>
            <div className="activity-detail" >
                <div className="date-call" id="date-call">
                    {moment(date).format("MMMM Do YYYY")}{" "}
                </div>
                <div className="call-log">
                    <div className="call-log-status">

        
                        {callLog.direction === 'inbound' ? 
                        [callLog.call_type === 'answered' ? <MdOutlineCallReceived className="callMade"/> : callLog.call_type === 'missed' ? <MdOutlineCallMissed className="missedCall"/> : <BsVoicemail className="voiceMail"/> ] 
                        : [callLog.call_type === 'answered' ? <MdOutlineCallMade className="callMade"/> : callLog.call_type === 'missed' ? <MdOutlineCallMissedOutgoing className="missedCall"/> : <BsVoicemail className="voiceMail"/> ]}
                    
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
                                style={{ height: '85%', width: '85%' }}
                                cursor="pointer"
                            /> :
                            <AiOutlineCheckCircle
                                className="marked-unmarked"
                                style={{ height: '85%', width: '85%' }}
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
