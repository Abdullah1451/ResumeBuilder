import React, { forwardRef, useEffect, useState } from "react";
import { useTemplates } from '../../contexts/TemplateContext';
import Template1 from '../templates/Template1'
import Template2 from '../templates/Template2'
import Template3 from '../templates/Template2'
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import './paper.css';


const Paper = forwardRef(function (props, ref) {

  const { templateNumber, setTemplateNumber } = useTemplates();
  const [Template, setTemplate] = useState()

  const location = useLocation()
  const tempNum = Number(location.pathname.split("/")[2])


  useEffect(() => {
    if (templateNumber === 0)
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
  }, [templateNumber])

  return (
    <div className="paperContainer">
      <div className="pageContainer">
        <div size="A4" className="page">

          {Template}

        </div>
      </div>
    </div>
  );
})

export default Paper;
