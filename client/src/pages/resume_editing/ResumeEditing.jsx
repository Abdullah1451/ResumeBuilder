import React, { useRef, useState } from 'react';
// import Templates from '../../components/templates/Templates';
import Right from '../../components/Right/Right';
import { useTemplates } from '../../contexts/TemplateContext';
// import Basic from "../../components/Left/Basic";

// import Editor from '../../components/editor/Editor'
import UserDetails from '../../components/userDetails/UserDetails'

import "./resumeEditing.css"

function ResumeEditing() {


    const { isTemplates, templateNumber } = useTemplates();
    return (
        <div className="resume_editing_container">
            {/* {isTemplates ? (
                <Templates />
            ) : ( */}

                {/* // <Basic />     */}
                <UserDetails />

            {/* // )} */}

            <Right />
        </div>
    )
}

export default ResumeEditing;