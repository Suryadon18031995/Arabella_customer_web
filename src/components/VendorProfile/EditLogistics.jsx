import React from 'react';

const editLogistics = props => {

    const ffOptions = [];
    for(const ffId in props.ff) {
        ffOptions.push(<option key={ffId} value={ffId}>{props.ff[ffId]}</option>);
    }

    const ccOptions = [];
    for(const ccId in props.cc) {
        ccOptions.push(<option key={ccId} value={ccId}>{props.cc[ccId]}</option>);
    }

    console.log('row.allow_add_chg', props.row.allow_add_chg);

    const row = props.row;
    return (
        <tr key={row.loc_logistics_id}>
            <td>
                <input type="text" className="form-control" value={ row.origin_country_id } onChange={ (event) => props.manageValueChangeHandler(event, 'origin_country_id')} disabled/>
            </td>
            <td>
                <select 
                    name="freight_forwarder_id" 
                    className="form-control" 
                    value={ `${row.freight_forwarder_id}` }
                    onChange={ (event) => props.manageValueChangeHandler(event, 'freight_forwarder_id') }
                >
                    { ffOptions }
                </select>
            </td>
            <td>
                <select 
                    name="cost_channel_id" 
                    className="form-control" 
                    value={ `${row.cost_channel_id}` }
                    onChange={ (event) => props.manageValueChangeHandler(event, 'cost_channel_id') }
                >
                    { ccOptions }
                </select>
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
                    <option value="N">No</option>
                </select>
            </td>
            <td>
                <select 
                    name="allow_add_chg" 
                    className="form-control" 
                    value={ row.allow_add_chg }
                    onChange={ (event) => props.manageValueChangeHandler(event, 'allow_add_chg') }
                >
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                </select>
            </td>
            <td>
                <select className="form-control" value={ row.hide_from_guest } onChange={ (event) => props.manageValueChangeHandler(event, 'hide_from_guest')}>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                </select>
            </td>
            <td>
                <select className="form-control" value={ row.customer_truck_req } onChange={ (event) => props.manageValueChangeHandler(event, 'customer_truck_req')}>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                </select>
            </td>
            <td>
                <input type="text" className="form-control" value={ row.lead_time_to_box_handler } onChange={ (event) => props.manageValueChangeHandler(event, 'lead_time_to_box_handler')}/>
            </td>
            <td>
                <select className="form-control" value={ row.usefilabels } onChange={ (event) => props.manageValueChangeHandler(event, 'usefilabels')}>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
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
                <input type="checkbox" className="artist-checkbox" checked={ (row.sun === 'Y' ? 'checked' : false)} onChange={ (event) => props.manageValueChangeHandler(event, 'sun', true)} />
                <input type="text" className="form-control" value={ row.sunday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'sunday_timing')}/>
            </td>
            <td className="artist-align-center">
                <input type="checkbox" className="artist-checkbox" checked={ (row.mon === 'Y' ? 'checked' : false)} onChange={ (event) => props.manageValueChangeHandler(event, 'mon', true)} />
                <input type="text" className="form-control" value={ row.monday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'monday_timing')}/>
            </td>
            <td className="artist-align-center">
                <input type="checkbox" className="artist-checkbox" checked={ (row.tue === 'Y' ? 'checked' : false)} onChange={ (event) => props.manageValueChangeHandler(event, 'tue', true)} />
                <input type="text" className="form-control" value={ row.tuesday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'tuesday_timing')}/>
            </td>
            <td className="artist-align-center">
                <input type="checkbox" className="artist-checkbox" checked={ (row.wed === 'Y' ? 'checked' : false)} onChange={ (event) => props.manageValueChangeHandler(event, 'wed', true)} />
                <input type="text" className="form-control" value={ row.wednesday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'wednesday_timing')}/>
            </td>
            <td className="artist-align-center">
                <input type="checkbox" className="artist-checkbox" checked={ (row.thu === 'Y' ? 'checked' : false)} onChange={ (event) => props.manageValueChangeHandler(event, 'thu', true)} />
                <input type="text" className="form-control" value={ row.thursday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'thursday_timing')}/>
            </td>
            <td className="artist-align-center">
                <input type="checkbox" className="artist-checkbox" checked={ (row.fri === 'Y' ? 'checked' : false)} onChange={ (event) => props.manageValueChangeHandler(event, 'fri', true)} />
                <input type="text" className="form-control" value={ row.friday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'friday_timing')}/>
            </td>
            <td className="artist-align-center">
                <input type="checkbox" className="artist-checkbox" checked={ (row.sat === 'Y' ? 'checked' : false)} onChange={ (event) => props.manageValueChangeHandler(event, 'sat', true)} />
                <input type="text" className="form-control" value={ row.saturday_timing } onChange={ (event) => props.manageValueChangeHandler(event, 'saturday_timing')}/>
            </td>
            <td>
                <select className="form-control" value={ row.is_active } onChange={ (event) => props.manageValueChangeHandler(event, 'is_active')}>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                </select>
            </td>
            <td><button className="btn btn-danger" onClick={ props.save }>Save</button></td>
        </tr>
    );
}

export default editLogistics;