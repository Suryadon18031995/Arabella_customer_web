import React from 'react';
import _get from 'lodash/get';

export default function TdForQtyComponenet(props) {
    return (
        <td key={props.index} style={{ display: 'table-cell' }} onClick={() => props.ProductSwatch(props.availId)}>
         {props.thisData}
        </td>
    );
}

