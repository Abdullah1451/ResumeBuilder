import React, { useContext, useEffect, useState } from 'react';
import Button from "@material-ui/core/Button";
import Editor from '../../components/editor/Editor'

import { ResumeContext } from "../../contexts/ResumeContext";

import style from './userDetails.module.css'


function UserDetails() {
    const { control, addFakeData, removeFakeData } = useContext(ResumeContext);

    function useFakeData(e) {
        e.preventDefault();
        // setIsExample(true)
        addFakeData();
    }

    function clearFakeData(e) {
        e.preventDefault();
        // setIsExample(false)

        removeFakeData();
    }


    return (
        <div className={style.container}>
            <div>
                <div>
                    {control ? (
                        <Button
                            color="secondary"
                            onClick={clearFakeData}
                            className={style.rootRemove}
                        >
                            remove example
                        </Button>
                    ) : (
                        <Button
                            color="primary"
                            onClick={useFakeData}
                            className={style.rootAdd}
                        >
                            example
                        </Button>
                    )}
                </div>
            </div>
            <div>
                <Editor />
            </div>
        </div>
    )
}

export default UserDetails