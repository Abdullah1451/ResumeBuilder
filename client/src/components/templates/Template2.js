import React, { forwardRef, useContext } from 'react'
import { ResumeContext } from '../../contexts/ResumeContext';

import myTempStyle from './template2.module.css'
import myFontStyle from './allTemplateCommon.module.css'



const Template2 = forwardRef(function (props, ref) {

    const { resumeInformation, sections } = useContext(ResumeContext);

    return (
        <div ref={ref} >
            <div className={myTempStyle['main-container']}>
                {
                    resumeInformation &&
                    <>
                        {<div className={`${myTempStyle.resumeContainer} ${myFontStyle.general_font_size}`} id='resumeContainer' >
                            {
                                // User Personal/Basic Details
                                resumeInformation[sections.basicInfo] &&
                                <div className={myTempStyle.resumeHeader}>
                                    <div className={myTempStyle.personalInfo} >
                                        {resumeInformation[sections.basicInfo].detail.name && <div className={myTempStyle.user_name} id="name">
                                            <h1 className={`${myTempStyle.user_name_h1} ${myFontStyle.name_font_size}`}>{resumeInformation[sections.basicInfo].detail.name}</h1>
                                            <p className={`${myFontStyle.title_font_size}`}> {resumeInformation[sections.basicInfo].detail.title} </p>
                                        </div>}

                                        <div className={myTempStyle.user_contact}>
                                            {resumeInformation[sections.basicInfo].detail.phone && <div className={myTempStyle.user_phone} >
                                                <p className={myFontStyle.general_font_size} > <i className={`${myTempStyle.topIcon} fas fa-phone-alt fa-xs`}></i> +91{resumeInformation[sections.basicInfo].detail.phone} </p>
                                            </div>}
                                            {resumeInformation[sections.basicInfo].detail.email && <div className={myTempStyle.user_email} >
                                                <p className={myFontStyle.general_font_size} > <i className={`${myTempStyle.topIcon} fas fa-envelope fa-xs`}></i> {resumeInformation[sections.basicInfo].detail.email} </p>
                                            </div>}
                                            {resumeInformation[sections.basicInfo].detail.linkedin && <div className={myTempStyle.user_phone} >
                                                <p className={myFontStyle.general_font_size} > <i className={`${myTempStyle.topIcon} fab fa-linkedin`}></i> {resumeInformation[sections.basicInfo].detail.linkedin} </p>
                                            </div>}
                                            {resumeInformation[sections.basicInfo].detail.github && <div className={myTempStyle.user_phone} >
                                                <p className={myFontStyle.general_font_size} > <i className={`${myTempStyle.topIcon} fab fa-github`}></i> {resumeInformation[sections.basicInfo].detail.github} </p>
                                            </div>}
                                        </div>
                                    </div>

                                    {resumeInformation[sections.basicInfo].detail.name && <hr style={{
                                        border: '2px solid black',
                                        marginLeft: "0px",
                                        width: '98%',
                                    }} />}

                                    {resumeInformation[sections.basicInfo].detail.careerObjective && <div className={`${myTempStyle.career_objective} ${myTempStyle.marginBottom}`} >
                                        <h2 className={`${myFontStyle.heading_font_size} ${myTempStyle.subHeading}`} >Career Objective</h2>
                                        <p className={myFontStyle.general_font_size} >{resumeInformation[sections.basicInfo].detail.careerObjective}</p>
                                    </div>}
                                </div>
                            }

                            {resumeInformation[sections.basicInfo].detail.careerObjective && <hr style={{
                                marginLeft: '0px',
                                width: '100%',
                            }} />}

                            {/*User education/workexp Details */}
                            <div className={myTempStyle.user_data_container}>
                                <div className={myTempStyle.leftResume} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    borderRight: '0'
                                }}>

                                    {
                                        resumeInformation[sections.education].details.length > 0 && <div className={myTempStyle.education}>
                                            <h2 className={`${myFontStyle.heading_font_size} ${myTempStyle.subHeading}`}> {resumeInformation[sections.education].sectionTitle} </h2>
                                            {
                                                resumeInformation[sections.education].details.map((item, index) => {
                                                    return (
                                                        <div className={myTempStyle.educationDetail}>
                                                            <p className={myFontStyle.general_font_size}> <b> {item.title} ({item.startDate}) - ({item.endDate}) </b></p>
                                                            <p className={myFontStyle.general_font_size} key={index}> {item.college} </p>

                                                        </div>
                                                    )
                                                })

                                            }
                                        </div>
                                    }

                                    {/* <div className={myTempStyle.skills}>
                                        <h2 className={myTempStyle.subHeading}> Skills </h2>
                                        <div className={myTempStyle.skillList}>
                                            {
                                                resume.skills.map((item, index) => {
                                                    return (
                                                        <div className={myTempStyle.user_skill} key={index} >
                                                            <p className={myTempStyle.skill}> {item} : </p>
                                                            <p className={myTempStyle.skillLevel}> {item.level} </p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div> */}


                                    {
                                        (resumeInformation[sections.workExp].details.length > 0) &&
                                        <div className="myTempStyle.experience">
                                            <h2 className={`${myFontStyle.heading_font_size} ${myTempStyle.subHeading}`} > {resumeInformation[sections.workExp].sectionTitle} </h2>
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
                                                            }}> {item.title} </h3>

                                                            {item.companyName && <p className={myFontStyle.general_font_size} style={{
                                                                margin: '0',
                                                            }}>{item.companyName}</p>}

                                                            {item.startDate && <p className={myFontStyle.general_font_size} style={{
                                                                margin: '0',
                                                            }}>{item.startDate} - {item.endDate}</p>}

                                                            <div style={{
                                                                margin: 0,
                                                                marginTop: '5px',
                                                            }}>
                                                                <p className={myFontStyle.general_font_size} style={{
                                                                    margin: 0,
                                                                    whiteSpace: 'pre-line'
                                                                }}>{item.description}</p>

                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                            <hr />

                                        </div>
                                    }


                                    {
                                        resumeInformation[sections.project].details.length > 0 && <div className={myTempStyle.projects}>
                                            <h2 className={`${myFontStyle.heading_font_size} ${myTempStyle.subHeading}`}> {resumeInformation[sections.project].sectionTitle} </h2>
                                            <ul className={myTempStyle.projects_list}>
                                                {
                                                    resumeInformation[sections.project].details.map((item, index) => {
                                                        return (
                                                            <li className={myFontStyle.general_font_size} key={index} style={{
                                                                paddingRight: '10px'
                                                            }}>
                                                                <h3 className={`${myFontStyle.general_font_size} ${myTempStyle.project_name}`}> {item.title} </h3>
                                                                <p className={`${myFontStyle.general_font_size} ${myTempStyle.project_description}`}> {item.overview} </p>
                                                                <p className={`${myFontStyle.general_font_size} ${myTempStyle.project_link}`}> <b> {item.github} </b> </p>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>

                                            <hr />

                                        </div>
                                    }



                                    {resumeInformation[sections.achievement].points.length > 0 && <div className={myTempStyle.achievements}>
                                        <h2 className={`${myFontStyle.heading_font_size} ${myTempStyle.subHeading}`} > {resumeInformation[sections.achievement].sectionTitle} </h2>

                                        <ul style={{
                                            lineHeight: "1.5"
                                        }}>
                                            {
                                                resumeInformation[sections.achievement].points.map((item, index) => {
                                                    return (
                                                        <li className={myFontStyle.general_font_size} key={index} style={{
                                                            marginBottom: '5px',
                                                        }}>{item}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <hr />
                                    </div>
                                    }

                                </div>
                            </div>
                            <hr className={myTempStyle.end_line} />
                        </div>}
                    </>
                }
            </div>
        </div>
    )
})

export default Template2;