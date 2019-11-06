import React from 'react';
import Button from "react-bootstrap/lib/Button";

export default function CustomButton(props = {
    title: '',
    disabled: false,
    buttonDisplayText: '',
    ButtonType: '',
    Class_Name: '',
    Span_Class_Name: '',
    handlerCustomButtonClick() { },
}) {
    return (
        <Button type={props.ButtonType}
            disabled={props.disabled}
            title={props.title}
            className={props.Class_Name}
            onClick={props.handlerCustomButtonClick}>
            <span className={props.Span_Class_Name} />
            &nbsp;{props.buttonDisplayText}
        </Button>);
}
