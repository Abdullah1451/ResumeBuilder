import React, { useContext, useEffect, useState } from "react";
import { X } from "react-feather";
import InputControl from "../inputControl/InputControl";
import TextArea from "../textArea/TextArea";


//MY CONTEXT
import { ResumeContext } from '../../contexts/ResumeContext';
import styles from "./editor.module.css";

function Editor() {
    //MY CONTEXT
    const { sections, resumeInformation, setResumeInformation, saveOnSessionStorage } = useContext(ResumeContext);

    //Window size detection
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        console.log(resumeInformation)
        saveOnSessionStorage();
    }, [resumeInformation, saveOnSessionStorage])


    const [activeSectionKey, setActiveSectionKey] = useState(
        Object.keys(sections)[0]
    );
    const [activeInformation, setActiveInformation] = useState(
        resumeInformation[sections[Object.keys(sections)[0]]]
    );
    const [activeDetailIndex, setActiveDetailIndex] = useState(0);
    const [sectionTitle, setSectionTitle] = useState(
        sections[Object.keys(sections)[0]]
    );
    const [values, setValues] = useState({
        name: activeInformation?.detail?.name || "",
        title: activeInformation?.detail?.title || "",
        linkedin: activeInformation?.detail?.linkedin || "",
        github: activeInformation?.detail?.github || "",
        phone: activeInformation?.detail?.phone || "",
        email: activeInformation?.detail?.email || "",
        careerObjective: activeInformation?.detail?.careerObjective || "",
    });

    const handlePointUpdate = (value, index) => {
        const tempValues = { ...values };
        if (!Array.isArray(tempValues.points)) tempValues.points = [];
        tempValues.points[index] = value;
        setValues(tempValues);
    };

    const workExpBody = (
        <div className={styles.detail}>
            <div className={windowSize <= 600 ? styles.column : styles.row}>
                <InputControl
                    label="Title"
                    placeholder="Enter title eg. Frontend developer"
                    value={values?.title}
                    onChange={(event) => {
                        setValues({ ...values, title: event.target.value })
                    }
                    }
                />
                <InputControl
                    label="Company Name"
                    placeholder="Enter company name eg. amazon"
                    value={values?.companyName}
                    onChange={(event) => {
                        setValues({ ...values, companyName: event.target.value })
                    }
                    }
                />
            </div>
            <div className={windowSize <= 600 ? styles.column : styles.row}>
                <InputControl
                    label="Start Date"
                    type="date"
                    placeholder="Enter start date of work"
                    value={values.startDate}
                    onChange={(event) =>
                        setValues({ ...values, startDate: event.target.value })
                    }
                />
                <InputControl
                    label="End Date"
                    type="date"
                    placeholder="Enter end date of work"
                    value={values.endDate}
                    onChange={(event) =>
                        setValues({ ...values, endDate: event.target.value })
                    }
                />
            </div>

            <div className={styles.column}>
                <label>Enter work description</label>
                <TextArea
                    placeholder="description"
                    value={values.description}
                    onChange={(event) => setValues({ ...values, description: event.target.value })}
                />
            </div>
        </div>
    );
    const projectBody = (
        <div className={styles.detail}>
            <div className={windowSize <= 600 ? styles.column : styles.row}>
                <InputControl
                    label="Title"
                    value={values.title}
                    placeholder="Enter title eg. Chat app"
                    onChange={(event) =>
                        setValues({ ...values, title: event.target.value })
                    }
                />
            </div>
            <InputControl
                label="Overview"
                value={values.overview}
                placeholder="Enter basic overview of project"
                onChange={(event) =>
                    setValues({ ...values, overview: event.target.value })
                }
            />
            <div className={windowSize <= 600 ? styles.column : styles.row}>
                <InputControl
                    label="Deployed Link"
                    value={values.link}
                    placeholder="Enter deployed link of project"
                    onChange={(event) =>
                        setValues({ ...values, link: event.target.value })
                    }
                />
                <InputControl
                    label="Github Link"
                    value={values.github}
                    placeholder="Enter github link of project"
                    onChange={(event) =>
                        setValues({ ...values, github: event.target.value })
                    }
                />
            </div>
            <div className={styles.column}>
                <label>Enter project description</label>
                <InputControl
                    placeholder="Line 1"
                    value={values.points ? values.points[0] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 0)}
                />
                <InputControl
                    placeholder="Line 2"
                    value={values.points ? values.points[1] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 1)}
                />
                <InputControl
                    placeholder="Line 3"
                    value={values.points ? values.points[2] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 2)}
                />
            </div>
        </div>
    );
    const educationBody = (
        <div className={styles.detail}>
            <div className={windowSize <= 600 ? styles.column : styles.row}>
                <InputControl
                    label="Title"
                    value={values.title}
                    placeholder="Enter title eg. B-tech"
                    onChange={(event) =>
                        setValues({ ...values, title: event.target.value })
                    }
                />
            </div>
            <InputControl
                label="College/School Name"
                value={values.college}
                placeholder="Enter name of your college/school"
                onChange={(event) =>
                    setValues({ ...values, college: event.target.value })
                }
            />
            <div className={windowSize <= 600 ? styles.column : styles.row}>
                <InputControl
                    label="Start Date"
                    type="date"
                    placeholder="Enter start date of this education"
                    value={values.startDate}
                    onChange={(event) =>
                        setValues({ ...values, startDate: event.target.value })
                    }
                />
                <InputControl
                    label="End Date"
                    type="date"
                    placeholder="Enter end date of this education"
                    value={values.endDate}
                    onChange={(event) =>
                        setValues({ ...values, endDate: event.target.value })
                    }
                />
            </div>
        </div>
    );
    const basicInfoBody = (
        <div className={styles.detail}>
            <div className={styles.column}>
                <InputControl
                    label="Name"
                    placeholder="Enter your full name eg. Aashu"
                    value={values.name}
                    onChange={(event) =>
                        setValues({ ...values, name: event.target.value })
                    }
                />
                <InputControl
                    label="Title"
                    value={values.title}
                    placeholder="Enter your title eg. Frontend developer"
                    onChange={(event) =>
                        setValues({ ...values, title: event.target.value })
                    }
                />

                <InputControl
                    label="Email"
                    value={values.email}
                    placeholder="Enter your email"
                    onChange={(event) =>
                        setValues({ ...values, email: event.target.value })
                    }
                />
                <InputControl
                    label="Enter phone"
                    value={values.phone}
                    placeholder="Enter your phone number"
                    onChange={(event) =>
                        setValues({ ...values, phone: event.target.value })
                    }
                />

                <InputControl
                    label="Career Objective"
                    value={values.careerObjective}
                    placeholder="Career Objective"
                    onChange={(event) =>
                        setValues({ ...values, careerObjective: event.target.value })
                    }
                />
            </div>
            <div className={windowSize <= 600 ? styles.column : styles.row}>
                <InputControl
                    label="Linkedin Link"
                    value={values.linkedin}
                    placeholder="Enter your linkedin profile link"
                    onChange={(event) =>
                        setValues({ ...values, linkedin: event.target.value })
                    }
                />
                <InputControl
                    label="Github Link"
                    value={values.github}
                    placeholder="Enter your github profile link"
                    onChange={(event) =>
                        setValues({ ...values, github: event.target.value })
                    }
                />
            </div>
        </div>
    );
    const achievementsBody = (
        <div className={styles.detail}>
            <div className={styles.column}>
                <label>List your achievements</label>
                <InputControl
                    placeholder="Line 1"
                    value={values.points ? values.points[0] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 0)}
                />
                <InputControl
                    placeholder="Line 2"
                    value={values.points ? values.points[1] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 1)}
                />
                <InputControl
                    placeholder="Line 3"
                    value={values.points ? values.points[2] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 2)}
                />
                <InputControl
                    placeholder="Line 4"
                    value={values.points ? values.points[3] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 3)}
                />
                <InputControl
                    placeholder="Line 5"
                    value={values.points ? values.points[4] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 4)}
                />
                <InputControl
                    placeholder="Line 6"
                    value={values.points ? values.points[5] : ""}
                    onChange={(event) => handlePointUpdate(event.target.value, 5)}
                />
            </div>
        </div>
    );

    const skillsBody = (
        <div className={styles.detail}>
            <div className={styles.column}>
                <InputControl
                    label="Skill"
                    placeholder="Enter skill eg. MERN, Java"
                    value={values.skill}
                    onChange={(event) => setValues({ ...values, skill: event.target.value })}
                />

                <InputControl
                    label="Skill Level"
                    placeholder="skill level"
                    value={values.skillLevel}
                    onChange={(event) => setValues({ ...values, skillLevel: event.target.value })}
                />
            </div>
        </div>
    );

    const summaryBody = (
        <div className={styles.detail}>
            <InputControl
                label="Summary"
                value={values.summary}
                placeholder="Enter your objective/summary"
                onChange={(event) =>
                    setValues({ ...values, summary: event.target.value })
                }
            />
        </div>
    );
    const otherBody = (
        <div className={styles.detail}>
            <InputControl
                label="Other"
                value={values.other}
                placeholder="Enter something"
                onChange={(event) =>
                    setValues({ ...values, other: event.target.value })
                }
            />
        </div>
    );

    const generateBody = () => {
        switch (sections[activeSectionKey]) {
            case sections.basicInfo:
                return basicInfoBody;
            case sections.workExp:
                return workExpBody;
            case sections.project:
                return projectBody;
            case sections.education:
                return educationBody;
            case sections.achievement:
                return achievementsBody;
            case sections.skills:
                return skillsBody;
            case sections.summary:
                return summaryBody;
            case sections.other:
                return otherBody;
            default:
                return null;
        }
    };

    const handleSubmission = () => {
        switch (sections[activeSectionKey]) {
            case sections.basicInfo: {
                const tempDetail = {
                    name: values.name,
                    title: values.title,
                    linkedin: values.linkedin,
                    github: values.github,
                    email: values.email,
                    phone: values.phone,
                    careerObjective: values.careerObjective
                };

                setResumeInformation((prev) => ({
                    ...prev,
                    [sections.basicInfo]: {
                        ...prev[sections.basicInfo],
                        detail: tempDetail,
                        sectionTitle,
                    },
                }));

                break;
            }

            case sections.workExp: {
                const tempDetail = {
                    certificationLink: values.certificationLink,
                    title: values.title,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    companyName: values.companyName,
                    location: values.location,
                    description: values.description,
                };
                const tempDetails = [...resumeInformation[sections.workExp]?.details];
                tempDetails[activeDetailIndex] = tempDetail;

                setResumeInformation((prev) => ({
                    ...prev,
                    [sections.workExp]: {
                        ...prev[sections.workExp],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.project: {
                const tempDetail = {
                    link: values.link,
                    title: values.title,
                    overview: values.overview,
                    github: values.github,
                    points: values.points,
                };
                const tempDetails = [...resumeInformation[sections.project]?.details];
                tempDetails[activeDetailIndex] = tempDetail;

                setResumeInformation((prev) => ({
                    ...prev,
                    [sections.project]: {
                        ...prev[sections.project],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.education: {
                const tempDetail = {
                    title: values.title,
                    college: values.college,
                    startDate: values.startDate,
                    endDate: values.endDate,
                };
                const tempDetails = [...resumeInformation[sections.education]?.details];
                tempDetails[activeDetailIndex] = tempDetail;

                setResumeInformation((prev) => ({
                    ...prev,
                    [sections.education]: {
                        ...prev[sections.education],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.achievement: {
                const tempPoints = values.points;

                setResumeInformation((prev) => ({
                    ...prev,
                    [sections.achievement]: {
                        ...prev[sections.achievement],
                        points: tempPoints,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.skills: {
                const tempDetail = {
                    skill: values.skill,
                    skillLevel: values.skillLevel,
                };
                const tempDetails = [...resumeInformation[sections.skills]?.details];
                tempDetails[activeDetailIndex] = tempDetail;

                setResumeInformation((prev) => ({
                    ...prev,
                    [sections.skills]: {
                        ...prev[sections.skills],
                        details: tempDetails,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.summary: {
                const tempDetail = values.summary;

                setResumeInformation((prev) => ({
                    ...prev,
                    [sections.summary]: {
                        ...prev[sections.summary],
                        detail: tempDetail,
                        sectionTitle,
                    },
                }));
                break;
            }
            case sections.other: {
                const tempDetail = values.other;

                setResumeInformation((prev) => ({
                    ...prev,
                    [sections.other]: {
                        ...prev[sections.other],
                        detail: tempDetail,
                        sectionTitle,
                    },
                }));
                break;
            }
        }
    };

    const handleAddNew = () => {
        const details = activeInformation?.details;
        if (details.length <= 0) return;

        const lastDetail = details.slice(-1)[0];
        if (!Object.keys(lastDetail).length) return;

        details.push({});
        setResumeInformation((prev) => ({
            ...prev,
            [sections[activeSectionKey]]: {
                ...resumeInformation[sections[activeSectionKey]],
                details: details,
            },
        }));
        setActiveDetailIndex(details?.length - 1);
    };

    const handleDeleteDetail = (index) => {
        const details = activeInformation?.details
            ? [...activeInformation?.details]
            : "";
        if (!details) return;
        details.splice(index, 1);
        setResumeInformation((prev) => ({
            ...prev,
            [sections[activeSectionKey]]: {
                ...resumeInformation[sections[activeSectionKey]],
                details: details,
            },
        }));

        setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
    };

    useEffect(() => {
        const activeInfo = resumeInformation[sections[activeSectionKey]];
        setActiveInformation(activeInfo);
        setSectionTitle(sections[activeSectionKey]);
        setActiveDetailIndex(activeInfo?.details?.length === 0 ? 0 : activeInfo?.details?.length - 1);
        setValues({
            name: activeInfo?.detail?.name || "",
            overview: activeInfo?.details
                ? activeInfo.details[activeDetailIndex]?.overview || ""
                : "",
            link: activeInfo?.details ? activeInfo.details[activeDetailIndex]?.link || "" : "",
            companyName: activeInfo?.details
                ? activeInfo.details[activeDetailIndex]?.companyName || ""
                : "",
            college: activeInfo?.details
                ? activeInfo.details[activeDetailIndex]?.college || ""
                : "",
            startDate: activeInfo?.details
                ? activeInfo.details[activeDetailIndex]?.startDate || ""
                : "",
            endDate: activeInfo?.details ? activeInfo.details[activeDetailIndex]?.endDate || "" : "",
            points: activeInfo?.details
                ? activeInfo.details[activeDetailIndex]?.points
                    ? [...activeInfo.details[activeDetailIndex]?.points]
                    : ""
                : activeInfo?.points
                    ? [...activeInfo.points]
                    : "",
            title: activeInfo?.details
                ? activeInfo.details[activeDetailIndex]?.title || ""
                : activeInfo?.detail?.title || "",
            linkedin: activeInfo?.detail?.linkedin || "",
            github: activeInfo?.details
                ? activeInfo.details[activeDetailIndex]?.github || ""
                : activeInfo?.detail?.github || "",
            phone: activeInfo?.detail?.phone || "",
            email: activeInfo?.detail?.email || "",
            careerObjective: activeInfo?.detail?.careerObjective || "",
            skill: activeInfo?.details
                ? activeInfo.details[activeDetailIndex]?.skill || ""
                : "",
            skillLevel: activeInfo?.details
                ? activeInfo.details[activeDetailIndex]?.skillLevel || ""
                : "",
            description: activeInfo?.details
                ? activeInfo.details[activeDetailIndex]?.description || ""
                : "",
            summary: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
            other: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
        });
    }, [activeSectionKey, resumeInformation]);

    useEffect(() => {
        setActiveInformation(resumeInformation[sections[activeSectionKey]]);
    }, [resumeInformation]);

    useEffect(() => {
        const details = activeInformation?.details;
        if (!details) return;

        const activeInfo = resumeInformation[sections[activeSectionKey]];
        setValues({
            overview: activeInfo.details[activeDetailIndex]?.overview || "",
            link: activeInfo.details[activeDetailIndex]?.link || "",
            companyName: activeInfo.details[activeDetailIndex]?.companyName || "",
            startDate: activeInfo.details[activeDetailIndex]?.startDate || "",
            endDate: activeInfo.details[activeDetailIndex]?.endDate || "",
            points: activeInfo.details[activeDetailIndex]?.points || "",
            title: activeInfo.details[activeDetailIndex]?.title || "",
            linkedin: activeInfo.details[activeDetailIndex]?.linkedin || "",
            github: activeInfo.details[activeDetailIndex]?.github || "",
            college: activeInfo.details[activeDetailIndex]?.college || "",
            description: activeInfo.details[activeDetailIndex]?.description || "",
            skill: activeInfo.details[activeDetailIndex]?.skill || "",
            skillLevel: activeInfo.details[activeDetailIndex]?.skillLevel || "",
        });
    }, [activeDetailIndex]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {Object.keys(sections)?.map((key) => (
                    <div
                        className={`${styles.section} ${activeSectionKey === key ? styles.active : ""
                            }`}
                        key={key}
                        onClick={() => setActiveSectionKey(key)}
                    >
                        {sections[key]}
                    </div>
                ))}
            </div>

            <div className={styles.body}>
                <InputControl
                    label="Title"
                    placeholder="Enter section title"
                    value={sectionTitle}
                    onChange={(event) => setSectionTitle(event.target.value)}
                />

                <div className={styles.chips}>
                    {
                        activeInformation?.details ?
                            (activeInformation?.details.length <= 1 &&
                                <div
                                    className={`${styles.chip} ${styles.active}`}
                                >
                                    <p>
                                        {sections[activeSectionKey]} {1}
                                    </p>
                                </div>
                            ) : ""

                    }
                    {
                        activeInformation?.details &&

                        (activeInformation?.details.length > 1 &&
                            activeInformation?.details?.map((item, index) => (
                                <div
                                    className={`${styles.chip} ${activeDetailIndex === index ? styles.active : ""
                                        }`}
                                    key={item.title + index}
                                    onClick={() => setActiveDetailIndex(index)}
                                >
                                    <p>
                                        {sections[activeSectionKey]} {index + 1}
                                    </p>
                                    <X
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleDeleteDetail(index);
                                        }}
                                    />
                                </div>
                            ))
                        )
                    }

                    {
                        activeInformation?.details &&
                        <div div className={styles.new} onClick={handleAddNew}>
                            +Add New
                        </div>
                    }
                </div>

                {generateBody()}

                <button className={styles.save_button} onClick={handleSubmission}>Save</button>
            </div>
        </div >
    );
}

export default Editor;
