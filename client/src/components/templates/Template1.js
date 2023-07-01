import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { ResumeContext } from '../../contexts/ResumeContext';
import myTempStyle from './template1.module.css'

const Template1 = forwardRef(function (props, ref) {

    const { resumeInformation, sections } = useContext(ResumeContext);


    return (
        <div ref={ref} className={myTempStyle['main-container']}>

            {
                resumeInformation &&
                <>
                    <div className={myTempStyle.resumeContainer} id='resumeContainer'>
                        {
                            resumeInformation[sections.basicInfo] &&
                            <div className={myTempStyle.resumeHeader}>
                                <div className={myTempStyle.personalInfo} >
                                    {resumeInformation[sections.basicInfo] && <div className={myTempStyle.user_name} id="name">
                                        <h1 className={myTempStyle.user_name_h1}>{resumeInformation[sections.basicInfo].detail.name}</h1>
                                        <p className={myTempStyle.user_role}> {resumeInformation[sections.basicInfo].detail.title} </p>
                                    </div>}

                                    <div className={myTempStyle.user_contact}>
                                        {resumeInformation[sections.basicInfo].detail.phone && <div className={myTempStyle.user_phone} >
                                            <p> <i className={`${myTempStyle.topIcon} fas fa-phone-alt fa-xs`}></i> +91{resumeInformation[sections.basicInfo].detail.phone} </p>
                                        </div>}
                                        {resumeInformation[sections.basicInfo].detail.email && <div className={myTempStyle.user_email} >
                                            <p> <i className={`${myTempStyle.topIcon} fas fa-envelope fa-xs`}></i> {resumeInformation[sections.basicInfo].detail.email} </p>
                                        </div>}
                                        {resumeInformation[sections.basicInfo].detail.linkedin && <div className={myTempStyle.user_phone} >
                                            <p> <i className={`${myTempStyle.topIcon} fab fa-linkedin`}></i> {resumeInformation[sections.basicInfo].detail.linkedin} </p>
                                        </div>}
                                        {resumeInformation[sections.basicInfo].detail.github && <div className={myTempStyle.user_phone} >
                                            <p> <i className={`${myTempStyle.topIcon} fab fa-github`}></i> {resumeInformation[sections.basicInfo].detail.github} </p>
                                        </div>}
                                    </div>
                                </div>

                                {resumeInformation[sections.basicInfo].detail.name && <hr style={{
                                    border: '2px solid black',
                                    marginLeft: "0px",
                                    width: '98%',
                                }} />}

                                {resumeInformation[sections.basicInfo].detail.careerObjective &&
                                    <>
                                        <div className={myTempStyle.career_objective} >
                                            <h2 className={myTempStyle.subHeading} >Career Objective</h2>
                                            <p>{resumeInformation[sections.basicInfo].detail.careerObjective}</p>
                                        </div>
                                        <hr style={{
                                            width: '98%',
                                            marginLeft: "0px"
                                        }} />
                                    </>
                                }
                            </div>
                        }



                        <div className={myTempStyle.user_data_container} >
                            <div className={myTempStyle.leftResume} >
                                {
                                    resumeInformation[sections.education].details.length > 0 && <div className={myTempStyle.education}>
                                        <h2 className={myTempStyle.subHeading}> {resumeInformation[sections.education].sectionTitle} </h2>
                                        {
                                            resumeInformation[sections.education].details.map((item, index) => {
                                                return (
                                                    <>
                                                        <p> <b> {item.title}</b></p>
                                                        <p key={index}> {item.college} </p>
                                                        {item.startDate &&
                                                            <>
                                                                <p> <b> ({item.startDate}) - ({item.endDate}) </b> </p>

                                                                <hr style={{
                                                                    marginLeft: '0px',
                                                                    width: '100%',
                                                                }} />
                                                            </>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                }





                                {resumeInformation[sections.skills].points.length > 0 && <div className={myTempStyle.skills}>
                                    <h2 className={myTempStyle.subHeading}> {resumeInformation[sections.skills].sectionTitle} </h2>
                                    {
                                        resumeInformation[sections.skills].points.map((item, index) => {
                                            return (
                                                <div className={myTempStyle.user_skill} key={index}>
                                                    <p className={myTempStyle.skill}> {item}  </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>}

                            </div>

                            <div className={myTempStyle.rightResume}>

                                {
                                    (resumeInformation[sections.workExp].details.length > 0) &&
                                    <div className="myTempStyle.experience">
                                        <h2 style={{
                                            // fontSize: '2.5vmax'
                                        }}> {resumeInformation[sections.workExp].sectionTitle} </h2>
                                        {
                                            resumeInformation[sections.workExp].details.map((item, key) => {
                                                return (
                                                    <div key={key} style={{
                                                        paddingRight: '10px',
                                                        marginBottom: '15px',
                                                        lineHeight: '1.5'
                                                    }}>
                                                        <h3 className="myTempStyle.experience-name" style={{
                                                            fontWeight: '500',
                                                            margin: '0',
                                                            // fontSize: '1.6vmax'
                                                        }}> {item.title} </h3>

                                                        {item.companyName && <p style={{
                                                            margin: '0',
                                                            // fontSize: '1.6vmax'
                                                        }}>{item.companyName}</p>}

                                                        {item.startDate && <p style={{
                                                            margin: '0',
                                                            // fontSize: '1.6vmax'
                                                        }}>{item.startDate} - {item.endDate}</p>}

                                                        <div style={{
                                                            margin: 0,
                                                            marginTop: '5px',
                                                            // fontSize: '1.6vmax'
                                                        }}>
                                                            {
                                                                item.points && item.points.map((point) => {
                                                                    return (
                                                                        <p style={{
                                                                            margin: 0,
                                                                            // marginBottom: '3px',
                                                                            // fontSize: '1.6vmax'
                                                                        }}>{point}</p>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                        <hr />

                                    </div>
                                }

                                {resumeInformation[sections.project].details.length > 0 && <div className={myTempStyle.projects}>
                                    <h2 className={myTempStyle.subHeading}> {resumeInformation[sections.project].sectionTitle} </h2>
                                    <ul className={myTempStyle.projects_list}>
                                        {
                                            resumeInformation[sections.project].details.map((item, index) => {
                                                return (
                                                    <li key={index} style={{
                                                        paddingRight: '10px'
                                                    }}>
                                                        <h3 className={myTempStyle.project_name}> {item.title} </h3>
                                                        <p className={myTempStyle.project_description}> {item.overview} </p>
                                                        <p className={myTempStyle.project_link}> <b> {item.github} </b> </p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>

                                    <hr />

                                </div>}

                                {
                                    resumeInformation[sections.achievement].points.length > 0 && <div className={myTempStyle.achievements}>
                                        <h2 className={myTempStyle.subHeading}> {resumeInformation[sections.achievement].sectionTitle} </h2>
                                        <ul style={{
                                            lineHeight: "1.5"
                                        }}>
                                            {
                                                resumeInformation[sections.achievement].points.map((item, index) => {
                                                    return (
                                                        <li key={index} style={{
                                                            marginBottom: '5px',
                                                        }}> {item} </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                }
                                <hr />
                            </div>
                        </div>

                        <hr className={myTempStyle.end_line} />

                    </div>
                </>
            }
        </div>
    )
})

export default Template1