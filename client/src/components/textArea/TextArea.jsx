import React from "react";

import styles from "./textArea.module.css";

function InputControl({ label, ...props }) {
    return (
        <div className={styles.container}>
            {label && <label>{label}</label>}
            <textarea {...props} rows={6} cols={40} />
        </div>
    );
}

export default InputControl;
