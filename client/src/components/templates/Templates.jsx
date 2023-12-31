import React from 'react';
// import style from "../../components/Left/Left.module.css";
import { Link } from 'react-router-dom';

import logo from "../../assets/default.png";
import thumbn from "../../assets/templateA.png";
import thumbn2 from "../../assets/template1.png";
import thumbn3 from "../../assets/template2.png";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import style from './templates.module.css';
import { useTemplates } from '../../contexts/TemplateContext';


function Templates() {
    const useStyles = makeStyles({
        headerLink: {
            color: "#FF8E53 ",
            minWidth: 100,
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '1.1rem'

        },
    });

    const classes = useStyles();
    const { setIsTemplates, setTemplateNumber } = useTemplates();

    return (
        <div className={style.left}>
            {/* <div className={style.headerLeft}>
                <Link to="/" style={{ textAlign: "left" }}>
                    <img src={logo} alt="logo" className={style.img2} />
                </Link>
            </div> */}
            {/* <hr className={style.hr2} /> */}
            <h1 className={style.templatesH1}>Templates</h1>
            <div className={style.cards}>
                <div className={style.templateCard}>
                    <div className={style.imgThumbOuter}>
                        <img src={thumbn} alt="thumbnail" className={style.imgThumb} />
                    </div>
                    <Button
                        className={classes.headerLink}
                        component={Link}
                        to="/template/1"
                        onClick={() => { setIsTemplates(false); setTemplateNumber(1); }}

                    >
                        The Basic
                    </Button>
                </div>

                <div className={style.templateCard}>
                    <div className={style.imgThumbOuter}>
                        <img src={thumbn2} alt="thumbnail" className={style.imgThumb} />
                    </div>
                    <Button
                        className={classes.headerLink}
                        component={Link}
                        to="/template/2"
                        onClick={() => { setIsTemplates(false); setTemplateNumber(2) }}

                    >
                        The Basic plus
                    </Button>
                </div>

                <div className={style.templateCard}>
                    <div className={style.imgThumbOuter}>
                        <img src={thumbn3} alt="thumbnail" className={style.imgThumb} />
                    </div>
                    <Button
                        className={classes.headerLink}
                        component={Link}
                        to="/template/3"
                        onClick={() => { setIsTemplates(false); setTemplateNumber(3) }}

                    >
                        The Basic max
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Templates;