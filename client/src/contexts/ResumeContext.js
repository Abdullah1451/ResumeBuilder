import React, { createContext, useContext, useState } from "react";
import fakeData from "../utils/fake_data";
import axios from "axios";

export const ResumeContext = createContext();

export function useResumeContext() {
  return useContext(ResumeContext)
}

export const ResumeContextProvider = ({ children }) => {

  const [resumeInformationCopy, setResumeInformationCopy] = useState(null)
  const [control, setControl] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "";


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
      await axios.post(backendUrl + "/api/userlogin/isRegistered", { email: resumeInformation[sections.basicInfo].detail.email })
        .then(async (response) => {
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
            achievements: resumeInformation[sections.achievement].points,
            education: resumeInformation[sections.education].details,
            projects: resumeInformation[sections.project].details,
            skills: resumeInformation[sections.skills].details,
            workExperience: resumeInformation[sections.workExp].details,
            summary: resumeInformation[sections.summary].detail,
            other: resumeInformation[sections.other].detail,
            basicInfoTitle: resumeInformation[sections.basicInfo].sectionTitle,
            achievementsTitle: resumeInformation[sections.achievement].sectionTitle,
            educationTitle: resumeInformation[sections.education].sectionTitle,
            projectsTitle: resumeInformation[sections.project].sectionTitle,
            skillsTitle: resumeInformation[sections.skills].sectionTitle,
            workExperienceTitle: resumeInformation[sections.workExp].sectionTitle,
            summaryTitle: resumeInformation[sections.summary].sectionTitle,
            otherTitle: resumeInformation[sections.other].sectionTitle,
          }
          await axios.post(backendUrl + '/api/userDetails/saveResumeData', values)
            .then((response) => {
              console.log(response.data)
            })
            .catch((err) => {
              console.log(err)
            })
        })
    }
  }


  function saveOnSessionStorage() {
    if (!control)
      sessionStorage.setItem('userInfo', JSON.stringify(resumeInformation));
  }


  const getUserResumeData = async (loggedUserEmail) => {
    try {
      await axios.get(backendUrl + "/api/userDetails/getResumeData?email=" + loggedUserEmail)
        .then((response) => {
          if (response.data) {
            setResumeInformation((prev) => ({
              ...prev,
              [sections.basicInfo]: {
                ...prev[sections.basicInfo],
                detail: {
                  email: response.data.email,
                  name: response.data.name,
                  phone: response.data.mobileNumber,
                  title: response.data.userCurrentTitle,
                  carrierObjective: response.data.carrierObjective,
                  github: response.data.github,
                  linkedin: response.data.linkedin,
                },
                sectionTitle: response.data.basicInfoTitle,
              },
              [sections.achievement]: {
                ...prev[sections.achievement],
                points: response.data.achievements,
                sectionTitle: response.data.achievementsTitle,
              },
              [sections.education]: {
                ...prev[sections.education],
                details: response.data.education,
                sectionTitle: response.data.educationTitle,
              },
              [sections.project]: {
                ...prev[sections.project],
                details: response.data.projects,
                sectionTitle: response.data.projectsTitle,
              },
              [sections.skills]: {
                ...prev[sections.skills],
                details: response.data.skills,
                sectionTitle: response.data.skillsTitle,
              },
              [sections.workExp]: {
                ...prev[sections.workExp],
                details: response.data.workExperience,
                sectionTitle: response.data.workExperienceTitle,
              },
              [sections.summary]: {
                ...prev[sections.summary],
                detail: response.data.summary,
                sectionTitle: response.data.summaryTitle,
              },
              [sections.other]: {
                ...prev[sections.other],
                detail: response.data.other,
                sectionTitle: response.data.otherTitle,
              },
            }))
            console.log("LOGGED USER RESUME DATA ")
            console.log(response.data)
          }
        })
    }
    catch (error) {
      console.log(error)
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
        saveResumeData,
        getUserResumeData
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

// export ResumeContextProvider;
