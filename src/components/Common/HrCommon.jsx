// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function HrLineCustom(props) {
    return (
        <table width="100%" className='mt-3 mb-3'>
              <tbody>
                <tr>
                  <td><hr className='hr-color'/></td>
                  <td className='hr-td-content'>{props.title}</td>
                  <td><hr className='hr-color'/></td>
                </tr>
                </tbody>
            </table>
    );
}
