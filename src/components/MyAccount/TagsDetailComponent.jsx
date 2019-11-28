import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';


export default function TagsDetailComponent(props) {
    return (
        <div className="tagHeader">
            {props.tagName &&
                <p><span className="tagNmCls">{props.tagName}</span>
                    <a href="#" className="btn btn-info btn-sm pull-right" onClick={() => props.removeTag()}>
                        <span className="glyphicon glyphicon-remove"></span> Delete Tag
                </a>
                </p>
            // <p className="tagNmCls">
            //   <span className="glyphicon glyphicon-remove-sign" aria-hidden="true" onClick={() => props.removeTag()}></span>{props.tagName}
            // </p>
            }
        </div>

    );
}

