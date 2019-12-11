import React from 'react';

const locationDetails = props => {

    console.log('data', props.details);

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
        props.details.forEach(row => {

            if(props.editMode && row.loc_logistics_id === props.logistics.loc_logistics_id) {
                row = props.logistics;
               
                body.push(
                    <tr key={row.loc_logistics_id}>
                        <td>
                            <input type="text" className="form-control" value={ row.origin_country_id } onChange={ (event) => props.manageValueChangeHandler(event, 'origin_country_id')} disabled/>
                        </td>
                        <td>
                            <input type="text" className="form-control" value={ row.freight_forwarder_id } onChange={ (event) => props.manageValueChangeHandler(event, 'freight_forwarder_id')}
                            />
                        </td>
                        <td>
                            <input type="text" className="form-control" value={ row.cost_channel_id } onChange={ (event) => props.manageValueChangeHandler(event, 'cost_channel_id')}/>
                        </td>
                        <td>
                            <input type="text" className="form-control" value={ row.leadtime } onChange={ (event) => props.manageValueChangeHandler(event, 'leadtime')}/>
                        </td>
                        <td>
                            <input type="text" className="form-control" value={ row.buffer_days } onChange={ (event) => props.manageValueChangeHandler(event, 'buffer_days')}/>
                        </td>
                        <td>
                            <input type="text" className="form-control" value={ row.booking_days_adj } onChange={ (event) => props.manageValueChangeHandler(event, 'booking_days_adj')}/>
                        </td>
                        <td>
                            <select className="form-control" value={ row.subscription_set } onChange={ (event) => props.manageValueChangeHandler(event, 'subscription_set')}>
                                <option value="Y">Yes</option>
                                <option vlaue="N">No</option>
                            </select>
                        </td>
                        <td>
                            <select 
                                name="allow_add_chg" 
                                className="form-control" 
                                value={ `${row.allow_add_chg}` }
                                onChange={ (event) => props.manageValueChangeHandler(event, 'allow_add_chg') }
                            >
                                <option value='Y'>Yes</option>
                                <option vlaue='N'>No</option>
                            </select>
                        </td>
                        <td>
                            <select className="form-control" value={ row.hide_from_guest } onChange={ (event) => props.manageValueChangeHandler(event, 'hide_from_guest')}>
                                <option value="Y">Yes</option>
                                <option vlaue="N">No</option>
                            </select>
                        </td>
                        <td>
                            <select className="form-control" value={ row.customer_truck_req } onChange={ (event) => props.manageValueChangeHandler(event, 'customer_truck_req')}>
                                <option value="Y">Yes</option>
                                <option vlaue="N">No</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" className="form-control" value={ row.lead_time_to_box_handler } onChange={ (event) => props.manageValueChangeHandler(event, 'lead_time_to_box_handler')}/>
                        </td>
                        <td>
                            <select className="form-control" value={ row.usefilabels } onChange={ (event) => props.manageValueChangeHandler(event, 'usefilabels')}>
                                <option value="Y">Yes</option>
                                <option vlaue="N">No</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" className="form-control" value={ row.shipping_account_number } onChange={ (event) => props.manageValueChangeHandler(event, 'shipping_account_number')}/>
                        </td>
                        <td>
                            <input type="text" className="form-control" value={ row.shipping_user } onChange={ (event) => props.manageValueChangeHandler(event, 'shipping_user')}/>
                        </td>
                        <td>
                            <input type="text" className="form-control" value={ row.shipping_password } onChange={ (event) => props.manageValueChangeHandler(event, 'shipping_password')}/>
                        </td>
                        <td>
                            <input type="text" className="form-control" value={ row.shipping_access_license } onChange={ (event) => props.manageValueChangeHandler(event, 'shipping_access_license')}/>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.sun === 'N' ? 'checked' : false)} />
                            <input type="text" className="form-control" value={ row.sunday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'sunday_timing')}/>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.mon === 'N' ? 'checked' : false)} />
                            <input type="text" className="form-control" value={ row.monday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'monday_timing')}/>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.tue === 'N' ? 'checked' : false)} />
                            <input type="text" className="form-control" value={ row.tuesday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'tuesday_timing')}/>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.wed === 'N' ? 'checked' : false)} />
                            <input type="text" className="form-control" value={ row.wednesday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'wednesday_timing')}/>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.thu === 'N' ? 'checked' : false)} />
                            <input type="text" className="form-control" value={ row.thursday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'thursday_timing')}/>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.fri === 'N' ? 'checked' : false)} />
                            <input type="text" className="form-control" value={ row.friday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'friday_timing')}/>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.sat === 'N' ? 'checked' : false)} />
                            <input type="text" className="form-control" value={ row.saturday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'saturday_timing')}/>
                        </td>
                        <td>
                            <select className="form-control" value={ row.is_active } onChange={ (event) => props.manageValueChangeHandler(event, 'is_active')}>
                                <option value="Y">Yes</option>
                                <option vlaue="N">No</option>
                            </select>
                        </td>
                        <td><button className="btn btn-danger" onClick={ props.save }>Save</button></td>
                    </tr>
                )
            }
            else {
                body.push(
                    <tr key={row.loc_logistics_id}>
                        <td>{ row.origin_country_id }</td>
                        <td>{ row.freight_forwarder_id }</td>
                        <td>{ row.cost_channel_id }</td>
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
                            <input type="checkbox" className="artist-checkbox" checked={ (row.sun === 'N' ? 'checked' : false)} disabled />
                            <p>{ `${row.sunday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.mon === 'N' ? 'checked' : false)} disabled />
                            <p>{ `${row.monday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.tue === 'N' ? 'checked' : false)} disabled />
                            <p>{ `${row.tuesday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.wed === 'N' ? 'checked' : false)} disabled />
                            <p>{ `${row.wednesday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.thu === 'N' ? 'checked' : false)} disabled />
                            <p>{ `${row.thursday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.fri === 'N' ? 'checked' : false)} disabled />
                            <p>{ `${row.friday_timing}` }</p>
                        </td>
                        <td className="artist-align-center">
                            <input type="checkbox" className="artist-checkbox" checked={ (row.sat === 'N' ? 'checked' : false)} disabled />
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