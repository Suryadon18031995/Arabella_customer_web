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
        <ol className='category-sidebar'>
            <div>
                <span className='glyphicon glyphicon-search search-icon-filter' />
                <input className='cat-search' name={props.filterName} type='text' placeholder='Search' onChange={props.handleCategorySearch} />
            </div>
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
            <Panel>
                <Panel.Heading className='filter-heading'>Shop By</Panel.Heading>
                <Panel.Body className='filter-sidebar-body'>
                    <div>
                        <dt>CHOOSE DESIRED DELIVERY DATES</dt>
                        <br />
                        <div>
                            <span className='cal-input-filter'>
                                <Datetime timeFormat={false}
                                    isValidDate={valid}
                                    inputProps={{ placeholder: 'From' }}
                                    renderDay={renderDay}
                                    closeOnSelect={true}
                                    value={props.searchStartDate}
                                    onChange={date => props.handleDateChange(date, 'searchStartDate')} />
                            </span>
                            <span className='cal-input-filter'>
                                <Datetime timeFormat={false}
                                    isValidDate={valid}
                                    inputProps={{ placeholder: 'To' }}
                                    renderDay={renderDay}
                                    closeOnSelect={true}
                                    value={props.searchEndDate}
                                    onChange={date => props.handleDateChange(date, 'searchEndDate')} />
                            </span>
                            <span className='search-filter-btn-span'>
                                <Button className='search-filter-btn'
                                    onClick={props.handleSearchClick}>
                                    Search
                                </Button>
                            </span>
                        </div>
                        <br />
                        <br />
                    </div>
                    <br />
                    <div>
                        <dt>Choose Shipping Method</dt>
                        <br />
                        <select name="method" onChange={props.handleMethodChange} value={props.method} className='filter-select'>
                            {
                                props.shippingMethodsArrData && props.shippingMethodsArrData.map(value1 =>
                                    <option key={value1.key} value={value1.key} > {value1.label}</option>)
                            }
                        </select>
                        {props.enableClearAll ? <span className='clear-all' onClick={props.handleClearAll}>Clear All</span> : ''}
                    </div>
                    <br />
                    <PanelGroup accordion
                        id="accordion-controlled-example">
                        <Panel eventKey="1" >
                            <Panel.Title toggle>
                                <div className='filter-title'>
                                    <div className='label-filter'>CATEGORY</div>
                                    <div className='icon-expand' />
                                </div>
                            </Panel.Title>
                            <Panel.Body collapsible>
                                <FilterLabelListWithSearch
                                    filterName='category'
                                    filteredData={props.categoryData}
                                    checkValues={props.category}
                                    handleCategorySearch={props.handleCategorySearch}
                                    handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
                                />
                            </Panel.Body>
                        </Panel>
                        {props.apiToken && <Panel eventKey="2" >
                            <Panel.Title toggle >
                                <div className='filter-title'>
                                    <div className='label-filter'>COLOR</div>
                                    <div className='icon-expand' />
                                </div>
                            </Panel.Title>
                            <Panel.Body collapsible>
                            <FilterLabelListWithSearch
                                    filterName='color'
                                    filteredData={props.colorsData}
                                    checkValues={props.color}
                                    handleCategorySearch={props.handleCategorySearch}
                                    handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
                                />
                                {/* <ol className='category-sidebar'>
                                    {props.colorsData && Object.entries(props.colorsData).map(([key, val]) => {
                                        return (
                                            <FilterLabelList key={key} id={key} val={val} name='color' checkValues={props.color}
                                                handleFilterCheckBoxChange={event => props.handleFilterCheckBoxChange(event, 'colors')} />
                                        );
                                    })}
                                </ol> */}
                            </Panel.Body>
                        </Panel>}
                        <Panel eventKey="3" >
                            <Panel.Title toggle >
                                <div className='filter-title'>
                                    <div className='label-filter'>FARMS</div>
                                    <div className='icon-expand' />
                                </div>
                            </Panel.Title>
                            <Panel.Body collapsible>
                            <FilterLabelListWithSearch
                                    filterName='farm'
                                    filteredData={props.farmsData}
                                    checkValues={props.farm}
                                    handleCategorySearch={props.handleCategorySearch}
                                    handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
                                />
                                {/* <ol className='category-sidebar'>
                                    {props.farmsData && Object.entries(props.farmsData).map(([key, val]) => {
                                        return (
                                            <FilterLabelList key={key} id={key} val={val} name='farm' checkValues={props.farm}
                                                handleFilterCheckBoxChange={event => props.handleFilterCheckBoxChange(event, 'farm')} />
                                        );
                                    })}
                                </ol> */}
                            </Panel.Body>
                        </Panel>
                        {/* style={{ borderColor: 'white' }}  style={{ borderBottom: 'none' }} */}
                        <Panel eventKey="4">
                            <Panel.Title toggle >
                                <div className='filter-title'>
                                    <div className='label-filter'>STATE, CITY</div>
                                    <div className='icon-expand' />
                                </div>
                            </Panel.Title>
                            <Panel.Body collapsible>
                            <FilterLabelListWithSearch
                                    filterName='location'
                                    filteredData={props.stateCityData}
                                    checkValues={props.location}
                                    handleCategorySearch={props.handleCategorySearch}
                                    handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
                                />
                                {/* <ol className='category-sidebar'>
                                    {props.stateCityData && Object.entries(props.stateCityData).map(([key, val]) => {
                                        return (
                                            <FilterLabelList key={key} id={key} val={val} name='location' checkValues={props.location}
                                                handleFilterCheckBoxChange={event => props.handleFilterCheckBoxChange(event, 'location')} />
                                        );
                                    })}
                                </ol> */}
                            </Panel.Body>
                        </Panel>
                        {props.apiToken && <Panel eventKey="5" >
                            <Panel.Title toggle >
                                <div className='filter-title'>
                                    <div className='label-filter'>BOX TYPE</div>
                                    <div className='icon-expand' />
                                </div>
                            </Panel.Title>
                            <Panel.Body collapsible>
                            <FilterLabelListWithSearch
                                    filterName='boxType'
                                    filteredData={props.boxTypeData}
                                    checkValues={props.boxType}
                                    handleCategorySearch={props.handleCategorySearch}
                                    handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
                                />
                                {/* <ol className='category-sidebar'>
                                    {props.boxTypeData && Object.entries(props.boxTypeData).map(([key, val]) => {
                                        return (
                                            <FilterLabelList key={key} id={key} val={val} name='boxType' checkValues={props.boxType}
                                                handleFilterCheckBoxChange={event => props.handleFilterCheckBoxChange(event, 'boxType')} />
                                        );
                                    })}
                                </ol> */}
                            </Panel.Body>
                        </Panel>}
                        {props.apiToken && <Panel eventKey="9" >
                            <Panel.Title toggle >
                                <div className='filter-title'>
                                    <div className='label-filter'>VARIETY</div>
                                    <div className='icon-expand' />
                                </div>
                            </Panel.Title>
                            <Panel.Body collapsible>
                            <FilterLabelListWithSearch
                                    filterName='variety'
                                    filteredData={props.varietyData}
                                    checkValues={props.variety}
                                    handleCategorySearch={props.handleCategorySearch}
                                    handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
                                />
                                {/* <ol className='category-sidebar'>
                                    {props.varietyData && Object.entries(props.varietyData).map(([key, val]) => {
                                        return (
                                            <FilterLabelList key={key} id={key} val={val} name='variety' checkValues={props.variety}
                                                handleFilterCheckBoxChange={event => props.handleFilterCheckBoxChange(event, 'variety')} />
                                        );
                                    })}
                                </ol> */}
                            </Panel.Body>
                        </Panel>}
                        {props.apiToken && <Panel eventKey="6">
                            <Panel.Title toggle >
                                <div className='filter-title'>
                                    <div className='label-filter'>UNIT OF MEASURE</div>
                                    <div className='icon-expand' />
                                </div>
                            </Panel.Title>
                            <Panel.Body collapsible>
                            <FilterLabelListWithSearch
                                    filterName='uom'
                                    filteredData={props.unitsData}
                                    checkValues={props.uom}
                                    handleCategorySearch={props.handleCategorySearch}
                                    handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
                                />
                                {/* <ol className='category-sidebar'>
                                    {props.unitsData && Object.entries(props.unitsData).map(([key, val]) => {
                                        return (
                                            <FilterLabelList key={key} id={key} val={val} name='uom' checkValues={props.uom}
                                                handleFilterCheckBoxChange={event => props.handleFilterCheckBoxChange(event, 'uom')} />
                                        );
                                    })}
                                </ol> */}
                            </Panel.Body>
                        </Panel>}
                        {props.apiToken && <Panel eventKey="7" >
                            {/* style={{ borderColor: 'white' }}  style={{ borderBottom: 'none' }} */}
                            <Panel.Title toggle>
                                <div className='filter-title'>
                                    <div className='label-filter'>LENGTH</div>
                                    <div className='icon-expand' />
                                </div>
                            </Panel.Title>
                            <Panel.Body collapsible>
                            <FilterLabelListWithSearch
                                    filterName='length'
                                    filteredData={props.lengthData}
                                    checkValues={props.length}
                                    handleCategorySearch={props.handleCategorySearch}
                                    handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
                                />
                                {/* <ol className='category-sidebar'>
                                    {props.lengthData && Object.entries(props.lengthData).map(([key, val]) => {
                                        return (
                                            <FilterLabelList key={key} id={key} val={val} name='length' checkValues={props.length}
                                                handleFilterCheckBoxChange={event => props.handleFilterCheckBoxChange(event, 'length')} />
                                        );
                                    })}
                                </ol> */}
                            </Panel.Body>
                        </Panel>}
                        {props.apiToken && <Panel eventKey="8" >
                            <Panel.Title toggle >
                                <div className='filter-title'>
                                    <div className='label-filter'>GRADE</div>
                                    <div className='icon-expand' />
                                </div>
                            </Panel.Title>
                            <Panel.Body collapsible>
                            <FilterLabelListWithSearch
                                    filterName='grade'
                                    filteredData={props.gradeData}
                                    checkValues={props.grade}
                                    handleCategorySearch={props.handleCategorySearch}
                                    handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
                                />
                                {/* <ol className='category-sidebar'>
                                    {props.gradeData && Object.entries(props.gradeData).map(([key, val]) => {
                                        return (
                                            <FilterLabelList key={key} id={key} val={val} name='grade' checkValues={props.grade}
                                                handleFilterCheckBoxChange={event => props.handleFilterCheckBoxChange(event, 'grade')} />
                                        );
                                    })}
                                </ol> */}
                            </Panel.Body>
                        </Panel>}
                    </PanelGroup>
                </Panel.Body>
            </Panel>
        </div>
    );
}
