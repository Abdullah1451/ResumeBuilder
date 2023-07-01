import React, { useContext, useState } from "react"
// import { useParams } from "react-router-dom"


const Context = React.createContext()

export function useTemplates() {
    return useContext(Context)
}

export function TemplateProvider({ children }) {
    const [templateNumber, setTemplateNumber] = useState(0);
    const [isTemplates, setIsTemplates] = useState(true);
    const [isOverflow, setIsOverflow] = useState(false);
    const [isExample, setIsExample] = useState(false);


    return (
        <Context.Provider value={{
            setTemplateNumber,
            templateNumber,
            setIsTemplates,
            isTemplates,
            setIsOverflow,
            isOverflow,
            setIsExample,
            isExample
        }}>
            {children}
        </Context.Provider>
    )
}