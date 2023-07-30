import React, { useContext, useState } from "react"


const Context = React.createContext()

export function useTemplates() {
    return useContext(Context)
}

export function TemplateProvider({ children }) {
    const [templateNumber, setTemplateNumber] = useState(0);
    const [isTemplates, setIsTemplates] = useState(true);
    const [isExample, setIsExample] = useState(false);


    return (
        <Context.Provider value={{
            setTemplateNumber,
            templateNumber,
            setIsTemplates,
            isTemplates,
            setIsExample,
            isExample
        }}>
            {children}
        </Context.Provider>
    )
}