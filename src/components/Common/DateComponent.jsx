import React from 'react';
import Datetime from 'react-datetime';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';
import moment from 'moment';

export default function DateInputFormatted(props = {
    defaultErrorCheck: false,
    errorCheck: false,
}) {
    return (
        <span>
            <Datetime name={props.inputName}
                onChange={props.onChange}
                defaultValue={props.defaultValue && moment(props.defaultValue).format('MM-DD-YYYY')}
                timeFormat={false}
                onBlur={props.onBlur}
                closeOnSelect={true}
            />
            <FormControl className="custom-input" style={{ width: '100%', fontSize: '14px' }}>
                {props.errorCheck && props.error && props.errorValue && (props.defaultErrorCheck || (props.touched && props.touchedValue)) && (
                    <div className={props.className}>
                        <FormHelperText >
                            {props.errorMessage}
                        </FormHelperText>
                    </div>
                )}
            </FormControl>
        </span>
    );
}
