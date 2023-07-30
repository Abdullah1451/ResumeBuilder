import React, { createContext, useState } from "react";
import fakeData from "../utils/fake_data";
import axios from "axios";

export const ResumeContext = createContext();

const ResumeContextProvider = (props) => {

  const [resumeInformationCopy, setResumeInformationCopy] = useState(null)
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
    saveResumeData();
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


  const saveResumeData = async () => {
    if (!control && resumeInformation[sections.basicInfo].detail.email) {
      await axios.post("/api/userlogin/isRegistered", {email: resumeInformation[sections.basicInfo].detail.email})
      .then(async(response) => {
        const values = {
          email: resumeInformation[sections.basicInfo].detail.email,
          name: resumeInformation[sections.basicInfo].detail.name,
          mobileNumber: resumeInformation[sections.basicInfo].detail.phone,
          registeredUser: response.data,
          portfolio: resumeInformation[sections.basicInfo].detail?.portfolio,
          userCurrentTitle: resumeInformation[sections.basicInfo].detail.title,
          carrierObjective: resumeInformation[sections.basicInfo].detail.carrierObjective,
          github: resumeInformation[sections.basicInfo].detail.github,
          linkedin: resumeInformation[sections.basicInfo].detail.linkedin,
          achievements: resumeInformation[sections.achievement].details,
          education: resumeInformation[sections.education].details,
          projects: resumeInformation[sections.project].details,
          skills: resumeInformation[sections.skills].details,
          workExperience: resumeInformation[sections.workExp].details,
          summary: resumeInformation[sections.summary].detail,
          other: resumeInformation[sections.other].detail
        }
        await axios.post('/api/userDetails/saveResumeData', values)
          .then((response) => {
            console.log(response.data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
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
        clearAllDetails,
        saveResumeData
      }}
    >
      {props.children}
    </ResumeContext.Provider>
  );
};

export default ResumeContextProvider;
