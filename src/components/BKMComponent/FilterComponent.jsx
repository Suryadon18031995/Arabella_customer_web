// eslint-disable-next-line no-unused-vars
import React from 'react';
import Datetime from 'react-datetime';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Button from 'react-bootstrap/lib/Button';

const yesterday = Datetime.moment().subtract(1, 'day');
const valid = current => current.isAfter(yesterday);
const renderDay = (inputProps, currentDate) => {
    // eslint-disable-next-line no-param-reassign
    inputProps.className = `${inputProps.className} hasDatePrice`;
    return <td {...inputProps}>{currentDate.date()}</td>;
};

function FilterLabelList(props) {
    // eslint-disable-next-line prefer-destructuring
    const val = props.val;
    return (
        <React.Fragment>
            {val && val.label &&
                <li key={props.id} className='filter-li-items'>
                    <input type="checkbox" name={props.name} value={val.key}
                        checked={props.checkValues && props.checkValues.includes(val.key)}
                        onChange={props.handleFilterCheckBoxChange} />
                    <span className='checkbox-names-filter'>{val && val.label} ({val.count})</span>
                </li>
            }
        </React.Fragment>
    );
}

function FilterLabelListWithSearch(props) {
    return (
        <ol className='category-sidebar list-unstyled'>
            {/* <div>
                <span className='glyphicon glyphicon-search search-icon-filter' />
                <input className='cat-search' name={props.filterName} type='text' placeholder='Search' onChange={props.handleCategorySearch} />
            </div> */}
            {props.filteredData && props.filteredData.map(eachValue => (
                <FilterLabelList key={eachValue.key} id={eachValue.key} val={eachValue} name={props.filterName} checkValues={props.checkValues}
                    handleFilterCheckBoxChange={event => props.handleFilterCheckBoxChange(event, props.filterName)} />
            ))
            }
        </ol>
    );
}

export default function FilterComponent(props) {
    return (
        <div className='filter-sidebar'>

            <h3>TYPE</h3>
            <FilterLabelListWithSearch
                filterName='category'
                filteredData={props.categoryData}
                checkValues={props.category}
                handleCategorySearch={props.handleCategorySearch}
                handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
            />

            <h3>SCULPTURE</h3>
            <FilterLabelListWithSearch
                filterName='color'
                filteredData={props.colorsData}
                checkValues={props.color}
                handleCategorySearch={props.handleCategorySearch}
                handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
            />

            <h3>MATERIALS USED</h3>
            <FilterLabelListWithSearch
                filterName='farm'
                filteredData={props.farmsData}
                checkValues={props.farm}
                handleCategorySearch={props.handleCategorySearch}
                handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
            />

            <h3>TYPE OF PAINT</h3>
            <FilterLabelListWithSearch
                filterName='location'
                filteredData={props.stateCityData}
                checkValues={props.location}
                handleCategorySearch={props.handleCategorySearch}
                handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
            />


            <h3>SIZES</h3>
            <input type='text' />

            <h3>SHADES</h3>

        </div>
    );
}
