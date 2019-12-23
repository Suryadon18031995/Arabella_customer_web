import React from 'react';

import EditLogistics from './EditLogistics.jsx';

const locationDetails = props => {

    const thead = (
        <thead>
            <tr>
                <th>Destination Country</th>
                <th>Freight Forwarder</th>
                <th>Cost Channel</th>
                <th>Lead Time</th>
                <th>Buffer Days</th>
                <th>Buffer Day Adjust</th>
                <th>Subscription Set</th>
                <th>Allow Add Chg</th>
                <th>Hide from Guest</th>
                <th>Customer Truck Request</th>
                <th>Lead Time Box Handler</th>
                <th>UseFILables</th>
                <th>Shipping No</th>
                <th>Shipping User</th>
                <th>Shipping Password</th>
                <th>Shipping Access License</th>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>PO to be Received</th>
                <th>Edit Logistics</th>
            </tr>
        </thead>
    );

    const body = [];
    if(props.details === undefined || props.details.length === 0) {
        body.push((
            <tr key="nld">
                <td align="center" colSpan={24}>No Logistic Details</td>
            </tr>
        ));
    }
    else {
        
        if(props.createMode) body.push(
            <EditLogistics 
                key='create-mode'
                row={ props.logistics }
                manageValueChangeHandler={ props.manageValueChangeHandler }
                save={ props.save }
                ff={ props.ff }
                cc={ props.cc }
            />
        );

        props.details.forEach(row => {

            if(props.editMode && row.loc_logistics_id === props.logistics.loc_logistics_id) {
                row = props.logistics;
               
                body.push(
                    <EditLogistics
                        key={row.loc_logistics_id} 
                        row={row}
                        manageValueChangeHandler={ props.manageValueChangeHandler }
                        save={ props.save }
                        ff={ props.ff }
                        cc={ props.cc }
                    />
                )
            }
            else {
                body.push(
                    <tr key={row.loc_logistics_id}>
                        <td>{ row.origin_country_id }</td>
                        <td>{ props.ff[row.freight_forwarder_id] }</td>
                        <td>{ props.cc[row.cost_channel_id] }</td>
                        <td>{ row.leadtime }</td>
                        <td>{ row.buffer_days }</td>
                        <td>{ row.booking_days_adj }</td>
                        <td>{ row.subscription_set }</td>
                        <td>{ row.allow_add_chg }</td>
                        <td>{ row.hide_from_guest }</td>
                        <td>{ row.customer_truck_req }</td>
                        <td>{ row.lead_time_to_box_handler }</td>
                        <td>{ row.usefilabels }</td>
                        <td>{ row.shipping_account_number }</td>
                        <td>{ row.shipping_user }</td>
                        <td>{ row.shipping_password }</td>
                        <td>{ row.shipping_access_license }</td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.sun === 'Y' ? 'checked' : false)} disabled />
                            <p>{ `${row.sunday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.mon === 'Y' ? 'checked' : false)} disabled />
                            <p>{ `${row.monday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.tue === 'Y' ? 'checked' : false)} disabled />
                            <p>{ `${row.tuesday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.wed === 'Y' ? 'checked' : false)} disabled />
                            <p>{ `${row.wednesday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.thu === 'Y' ? 'checked' : false)} disabled />
                            <p>{ `${row.thursday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.fri === 'Y' ? 'checked' : false)} disabled />
                            <p>{ `${row.friday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.sat === 'Y' ? 'checked' : false)} disabled />
                            <p>{ `${row.saturday_timing}` }</p>
                        </td>
                        <td>{ row.is_active }</td>
                        <td><button onClick={props.edit.bind(null, row) } className="btn btn-danger">Edit</button></td>
                    </tr>
                );
            }
        });
    }

    const tbody = (
        <thead>
            {body}
        </thead>
    );

    return (  
        <table className="table table-bordered">
            {thead}
            {tbody}
        </table>
    );
}

export default locationDetails;