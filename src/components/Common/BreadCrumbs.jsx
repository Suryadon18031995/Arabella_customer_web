import React from 'react';

export default function BreadCrumbs(props) {
    return (
        <div className="col-sm-12 breadCrumbWrapper">
        <ul className="breadcrumb breadCrumb">
        {
            props && props.list && props.list.map((val, i) =>
            <li key={i}>{val.link ? <a href={val.link}>{val.name}</a> : val.name}</li>)
        }
        </ul>
      </div>);
}

