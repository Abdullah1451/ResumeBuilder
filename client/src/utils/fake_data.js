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
        location: "Salt Lake City, UT, USA",
        title: "UI/UX Designer",
        certificationLink: "qwerty.com",
        startDate: "Jan/2015",
        endDate: "Apr/2020",
        points: [
          "Responsible for all the material handled by blablabla.",
          "Help others on their daily tasks.",
          "Professional photographer hired by others companies.",
        ]
      },
      {
        companyName: "GumGum Productions",
        location: "Albany, NY, USA",
        title: "Intern",
        certificationLink: "qwertyqwerty.com",
        startDate: "Jul/2012",
        endDate: "Dec/2014",
        points: [
          "Print and fax documents for the entire company.",
          "Assist CEO on daily tasks.",
          "Provide assistance to all employees.",
        ]
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
    points: [
      "Java",
      "MERN",
      "Blockchain",
    ],
  },
  // skills: [
  //   "Java",
  //   "MERN",
  //   "Blockchain",
  //   "Data Structures",
  // ],
  [sections.project]: {
    id: sections.project,
    sectionTitle: sections.project,
    details: [
      {
        title: "Tic Tac Toe",
        overview: "Tic Tac Toe Is G.\n\
          where voter can vote using there credential, and voter can see\n\
          his/her vote."
      },
      {
        title: "Voting System Using Blockchaoin",
        overview: "Transparent voting system using Blockchain.\n\
          where voter can vote using there credential, and voter can see\n\
          his/her vote.\n\
          Voters vote is immutable. Voter can vote only once.",
        github: "https://github.com/Abdullah1451/Voting_Dapp_frontend\n\
          https://github.com/Abdullah1451/Voting_Dapp_backend"
      },
      {
        title: "STEGANOGRAPHY USING LSB ALGORITHM (JAVA)",
        overview: "In this application we can hide a image, text or mp3 file in a\n\
          image. In LSB (least Significant Bit) algorithm we take value\n\
          of a pixel convert it into binary string then change its least\n\
          bits to bits of message. In this we can set password also so no\n\
          one accept the receiver can see the message.",
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






//Data used when the user hits "Example" btn
// const data = {
//   header: {
//     name: "James Clark",
//     address: "746 N Candy St, #25",
//     city: "Phoenix",
//     state: "AZ",
//     zip: "84920",
//     phone: "6105453672",
//     email: "jamesck@email.com",
//     summary:
//       "Noster necessitatibus ut nam, atqui epicurei lobortis nec at, est et sapientem iracundia referrentur. Nec consulatu sententiae in. Vis tamquam feugait molestiae ea. Sed an novum melius laoreet, ex eos persius quaeque. Sapientem iracundia.",
//   },
//   professional: {
//     company1: "Bilzabas Steel",
//     local1: "Salt Lake City, UT, USA",
//     position1: "Manager",
//     start1: "Jan/2015",
//     end1: "Apr/2020",
//     desc1: [
//       "Responsible for all the material handled by blablabla.",
//       "Help others on their daily tasks.",
//       "Professional photographer hired by others companies.",
//     ],
//     company2: "GumGum Productions",
//     local2: "Albany, NY, USA",
//     position2: "Intern",
//     start2: "Jul/2012",
//     end2: "Dec/2014",
//     desc2: [
//       "Print and fax documents for the entire company.",
//       "Assist CEO on daily tasks.",
//       "Provide assistance to all employees.",
//     ],
//   },
//   education: {
//     institution: "New Candles University",
//     city: "New Candles, TX, USA",
//     major: "Bachelors in Finance",
//     gradYear: "1987",
//     additional: "magna cum laude (GPA 3.95)",
//   },
//   additional: [
//     "5+ years of experience with Microsoft Office",
//     "English and Spanish speaker",
//     "Adaptability",
//     "Interpersonal Communication",
//     "Friend of all",
//   ],
// };

// export default data;
