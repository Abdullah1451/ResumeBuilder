import React, { forwardRef, useEffect, useState } from "react";
// import HeaderP from "./HeaderP";
// import ProfessionalP from "./ProfessionalP";
// import EducationP from "./EducationP";
// import AdditionalSkillsP from "./AdditionalSkillsP";
import { useTemplates } from '../../../contexts/TemplateContext';

import Template1 from '../../templates/Template1'
import Template2 from '../../templates/Template2'
import Template3 from '../../templates/Template2'


import '../right.css';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Paper = forwardRef(function (props, ref) {

  const { templateNumber, setTemplateNumber } = useTemplates();
  const [Template, setTemplate] = useState()

  const location = useLocation()
  const tempNum = Number(location.pathname.split("/")[2])



  useEffect(() => {
    if (templateNumber == 0)
      setTemplateNumber(tempNum)

    if (templateNumber === 1) {
      setTemplate(<Template1 ref={ref} />)
    }
    else if (templateNumber === 2) {
      setTemplate(<Template2 ref={ref} />)
    }
    else if (templateNumber === 3) {
      setTemplate(<Template3 ref={ref} />)
    }
    // else if (templateNumber === '4') {
    //     setTemplate(<Template4 />)
    // }
    // else {
    //   setTemplate(<Template2 />)
    // }
  }, [templateNumber])

  return (
    <div className="pageContainer">
      <div size="A4" className="page">
        {/* <HeaderP />
        <ProfessionalP />
        <EducationP />
        <AdditionalSkillsP /> */}

        {Template}

      </div>
    </div>
  );
})

export default Paper;
