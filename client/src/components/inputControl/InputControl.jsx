import React from "react";

import styles from "./inputControl.module.css";

function InputControl({ label, ...props }) {
    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <input type="text" {...props} />
        </div>
    );
}

export default InputControl;
