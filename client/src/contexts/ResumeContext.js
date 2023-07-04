import React, { createContext, useState } from "react";
import fakeData from "../utils/fake_data";

export const ResumeContext = createContext();

const ResumeContextProvider = (props) => {

  const [resumeInformationCopy, setResumeInformationCopy] = useState(null)

  //Used to "Right" components know when to use the original state or the fake one (for the "example")
  const [control, setControl] = useState(false);


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

  function clearAllDetails() {
    if (!control) {
      setResumeInformation({
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
          details: [],
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

      saveOnSessionStorage();
    }
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


  let temp = sessionStorage.userInfo
  if (temp === undefined) {
    temp = null
  }
  else {
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
      details: [],
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
        control,
        addFakeData,
        removeFakeData,
        sections,
        resumeInformation,
        setResumeInformation,
        resumeInformationCopy,
        saveOnSessionStorage,
        clearAllDetails
      }}
    >
      {/* This refers to the children that this provider/components wraps. */}
      {props.children}
    </ResumeContext.Provider>
  );
};

export default ResumeContextProvider;
