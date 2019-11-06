import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';
import TrackTableComponent from './TrackTableComponent.jsx';

export default function TrackOrderComponent(props) {
    return (
            <div className="order">
                <div className="trackOrder">
                    <div className="trackorder-options">
                        <input type="radio" name="order_id" onChange={props.getRadioCheckVal} checked={props.state.radioCheckVal === 'order_id'} />
                        <label>Order Number</label>
                        <input type="radio" name="track_id" onChange={props.getRadioCheckVal} checked={props.state.radioCheckVal === 'track_id'} />
                        <label>Track ID</label>
                    </div>
                    <div className="trackorder-input">
                        <input type="text" name="search2" id="search22" onChange={props.getRadioVal} value={props.state.radioVal} />
                        <span className="err">{props.state.errors.radioVal}</span>
                        <Button type="submit" className="search" onClick={props.trackOrder} title="Submit" id="submit">
                            <span><span>Search</span>
                            </span></Button></div>
                </div>
            </div>
    );
}

