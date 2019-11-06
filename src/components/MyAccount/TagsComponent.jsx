import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import '../../assets/stylesheets/tags.css';

export default function TagsComponent(props) {
    return (
        <div>
            <p>Click on a tag to view your corresponding products.</p>
            <ul>
                {!_isEmpty(props.data) && props.data.map((obj, index) =>
                    <li className="tagsList" key={index} onClick={() => props.showTagsDetails(obj)}><span>{_get(obj, 'name')}</span></li>)}</ul>
        </div>
    );
}
