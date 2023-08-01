//Data used when the user hits "Example" btn
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

const resume = {
  [sections.basicInfo]: {
    id: sections.basicInfo,
    sectionTitle: sections.basicInfo,
    detail: {
      name: "James Clark",
      address: "746 N Candy St, #25",
      city: "Phoenix",
      state: "AZ",
      zip: "84920",
      linkedin: "linkedin.com",
      github: "github.com",
      phone: "6105453672",
      email: "jamesck@email.com",
      title: "6x Salesforce Certified Developer and Einstein Consultant",
      careerObjective:
        "work to the best of my potentials in an organization offering opportunities for learning and growth. To work in an atmosphere promoting teamwork and collective goal achievement to lead overall prosperity and growth.",
    },
  },
  [sections.workExp]: {
    id: sections.workExp,
    sectionTitle: sections.workExp,
    details: [
      {
        companyName: "Bilzabas Steel",
        title: "UI/UX Designer",
        startDate: "Jan/2015",
        endDate: "Apr/2020",
        description: "Responsible for all the material handled by blablabla. \nHelp others on their daily tasks.\nProfessional photographer hired by others companies."
        
      },
      {
        companyName: "GumGum Productions",
        title: "Intern",
        startDate: "Jul/2012",
        endDate: "Dec/2014",
        description: "Print and fax documents for the entire company.\nAssist CEO on daily tasks.\nProvide assistance to all employees.",
      },
    ],
  },
  [sections.education]: {
    id: sections.education,
    sectionTitle: sections.education,
    details: [
      {
        college: "New Candles University",
        city: "New Candles, TX, USA",
        title: "Bachelors in Finance",
        startDate: "1987",
        endDate: "2034",
        cgpa: "magna cum laude (GPA 3.95)"
      },
      {
        college: "Candles University",
        city: "New YORK, TX, USA",
        title: "Bachelors in computer",
        startDate: "1234",
        endDate: "2344",
        cgpa: "magna cum laude (GPA 3.95)"
      },
    ],

  },

  [sections.skills]: {
    id: sections.skills,
    sectionTitle: sections.skills,
    details: [
      {
        skill: "Java",
        skillLevel: "8"
      },
      {
        skill: "MERN",
        skillLevel: "7"
      },
      {
        skill: "Blockchain",
        skillLevel: "3"
      },
    ],
  },

  [sections.project]: {
    id: sections.project,
    sectionTitle: sections.project,
    details: [
      {
        title: "Tic Tac Toe",
        overview: "Tic Tac Toe Is G.\nwhere voter can vote using there credential, and voter can see\nhis/her vote."
      },
      {
        title: "Voting System Using Blockchaoin",
        overview: "Transparent voting system using Blockchain.\nwhere voter can vote using there credential, and voter can see\nhis/her vote.\nVoters vote is immutable. Voter can vote only once.",
        github: "https://github.com/Abdullah1451/Voting_Dapp_frontend\nhttps://github.com/Abdullah1451/Voting_Dapp_backend"
      },
      {
        title: "STEGANOGRAPHY USING LSB ALGORITHM (JAVA)",
        overview: "In this application we can hide a image, text or mp3 file in a\nimage. In LSB (least Significant Bit) algorithm we take value\nof a pixel convert it into binary string then change its least\nbits to bits of message. In this we can set password also so no\none accept the receiver can see the message.",
        github: "https://github.com/Abdullah1451/Steganography-Project"
      },
    ],
  },
  [sections.achievement]: {
    id: sections.achievement,
    sectionTitle: sections.achievement,
    points: [
      "Re-organized something to make it work better.",
      "Identified a problem and solved it."
    ],
  },
  [sections.summary]: {
    id: sections.summary,
    sectionTitle: sections.summary,
    detail: ""
  },
  [sections.other]: {
    id: sections.other,
    sectionTitle: sections.other,
    detail: ""
  }
};

export default resume;

