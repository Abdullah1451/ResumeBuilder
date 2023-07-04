import React, { useContext, useRef } from 'react';
import Button from "@material-ui/core/Button";
import Editor from '../../components/editor/Editor'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ResumeContext } from "../../contexts/ResumeContext";
import ReactToPrint from 'react-to-print';
import Paper from '../../components/Paper/Paper';

import style from './userDetails.module.css'


function UserDetails() {
    const { control, addFakeData, removeFakeData, clearAllDetails } = useContext(ResumeContext);

    const componentRef = useRef();


    function useFakeData(e) {
        e.preventDefault();
        addFakeData();
    }

    function clearFakeData(e) {
        e.preventDefault();
        removeFakeData();
    }

    function clearDetails(e) {
        e.preventDefault();
        clearAllDetails();
    }


    return (
        <div className={style.resume_editing_container}>
            <div className={style.container}>
                <div className={style.allButton}>
                    <div className={style.buttons}>
                        {control ? (
                            <Button
                                variant="contained"
                                onClick={clearFakeData}
                                className={`${style.button} ${style.example}`}
                            >
                                Remove Example
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={useFakeData}
                                className={`${style.button} ${style.example}`}
                            >
                                Example
                            </Button>
                        )}
                    </div>
                    <div className={style.buttons}>
                        <Button className={`${style.button} ${style.clearAll}`}
                            variant="contained"
                            onClick={clearDetails}
                        >
                            Clear All
                        </Button>
                    </div>
                    <div className={style.buttons}>
                        <ReactToPrint
                            trigger={() => {
                                return (
                                    <Button className={`${style.button} ${style.download}`}
                                        variant="contained"
                                        endIcon={<ArrowDownwardIcon />}
                                    >
                                        Download
                                    </Button>
                                )
                            }
                            }
                            content={() => componentRef.current}
                        />
                    </div>
                </div>
                <hr />
                <div>
                    <Editor />
                </div>
            </div>
            <Paper ref={componentRef} />
        </div>
    )
}

export default UserDetails