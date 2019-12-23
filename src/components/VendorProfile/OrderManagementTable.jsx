import React from 'react';

const orderManagementTable = props => {

    const thead = Object.keys(props.tableHeaders).map(key => <td key={key}>{key}</td>);

    const tbody = Object.keys(props.data).map((current, index) => {

        const td = Object.values(props.tableHeaders).map((header, innerIndex) => {

            let value = null;
            switch(typeof(header)) {
                case 'string':
                    value = (header === 'object_key' ? current : props.data[current][header]);
                    break; 
                
                case 'object':
                    if(header.type === 'button')
                        value = <button 
                                    className={header.class}
                                    onClick={ () => header.click(header.text, [current]) }
                                >
                                    {header.text}
                                </button>;
                    else if(header.type === 'checkbox')
                        value = <input 
                                    type="checkbox" 
                                    className="artist-checkbox" 
                                    onChange={ (event) => header.change(event, props.tab, current)} 
                                    checked={ props.checked.indexOf(current) !== -1 }
                                />
                    break;
            }
            return <td key={`${ current }-${ index }-${ innerIndex }`} >{ value }</td>
        });

        return <tr key={current}>{td}</tr>
    });

    let buttons = null;
    buttons = Object.keys(props.buttons).map(currentBtn => (
        <button 
            key={props.buttons[currentBtn].key} 
            className={props.buttons[currentBtn].class}
            style={props.buttons[currentBtn].style}
            onClick={props.buttons[currentBtn].click.bind(null, props.checked)}
        >
            { currentBtn }
        </button>
    ));

    return (
        <div className="container-fluid container-spacing">

            {buttons}
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        {thead}
                    </tr>
                </thead>
                <tbody>
                    { tbody }
                </tbody>
            </table>
        </div>
    );
}

export default orderManagementTable;