import React from 'react';
import "../../styles/button.css";

const STYLES =['btnMP--primary','btnMP-outline']
const SIZES = ['btnMP--medium','btnMP--large']



export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize}) =>{
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle:STYLES[0]
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize:SIZES[0]

    return(
        <button className={`btnMP ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>{children}</button>
    )
}