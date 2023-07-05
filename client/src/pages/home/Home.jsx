import React from "react";

import resumeSvg from "../../assets/resume.svg";

import style from "./home.module.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className={style.container}>
            <div className={style.upper}>
                <div className={`${style.upper_text} ${style.row}`}>
                    <p className={style.heading}>
                        A <span>Resume</span> that stands out!
                    </p>
                    <p className={style.heading}>
                        Make your own resume. <span>It's free</span>
                    </p>
                </div>
                <div className={`${style.upper_img} ${style.row}`}>
                    <img src={resumeSvg} alt="Resume" />
                </div>
            </div>
            <div>
                <Link className={style.nav_link} to="/templates" >
                    <button className={style.button} >
                        Get Started for Free
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
