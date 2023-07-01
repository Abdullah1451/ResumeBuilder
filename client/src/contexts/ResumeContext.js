import React, { createContext, useState, useEffect, useRef } from "react";
import fakeData from "../utils/fake_data";
import fakeData2 from "../utils/fake_data2";


export const ResumeContext = createContext();

const ResumeContextProvider = (props) => {
  //If there is no data stored in localStorage, then use the default object.
  const [resumeInformationCopy, setResumeInformationCopy] = useState(null)
  const [content, setContent] = useState(
    {
      personalInfo: {},
      professional: { desc1: ["", "", ""], desc2: ["", "", ""] },
      education: {},
      skills: [],
      projects: [],
      Achievements: [],
    }
  );

  const [contentFake, setContentFake] = useState();

  //Used to "Right" components know when to use the original state or the fake one (for the "example")
  const [control, setControl] = useState(false);

  function updateHeaderData(data) {
    setContent({ ...content, header: data });
  }

  function updateProfessionalData(data) {
    setContent({ ...content, professional: data });
  }

  function updateEducationData(data) {
    setContent({ ...content, education: data });
  }

  function updateAdditionalData(data) {
    setContent({ ...content, additional: Object.values(data) }); //Converting the object to an Array in order to iterate in AdditionalSkillsP.js
  }

  useEffect(() => {
    localStorage.setItem("dataLocal", JSON.stringify(content));
  }, [content]);


  //FAKE DATA MAINTAIN
  function addFakeData() {
    setControl(true);
    setResumeInformationCopy(resumeInformation)
    setResumeInformation(fakeData);
  }

  function removeFakeData() {
    setControl(false);
    setResumeInformation(resumeInformationCopy);

  }


  //MY RESUME CONTEXT
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    skills: "Skills",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };
  const resumeRef = useRef();

  // const [activeColor, setActiveColor] = useState(colors[0]);
  let temp = sessionStorage.userInfo
  if(temp === undefined){
    temp = null
  }
  else{
    temp = JSON.parse(temp)
  }
  
  const [resumeInformation, setResumeInformation] = useState(temp || {
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.skills]: {
      id: sections.skills,
      sectionTitle: sections.skills,
      points: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  function saveOnSessionStorage() {
    if (!control)
      sessionStorage.setItem('userInfo', JSON.stringify(resumeInformation));
  }



  return (
    <ResumeContext.Provider
      value={{
        content,
        control,
        contentFake,
        setContent,
        updateHeaderData,
        updateProfessionalData,
        updateEducationData,
        updateAdditionalData,
        addFakeData,
        removeFakeData,
        //MY CONTEXT
        sections,
        resumeInformation,
        setResumeInformation,
        resumeInformationCopy,
        saveOnSessionStorage
      }}
    >
      {/* This refers to the children that this provider/components wraps. */}
      {props.children}
    </ResumeContext.Provider>
  );
};

export default ResumeContextProvider;
