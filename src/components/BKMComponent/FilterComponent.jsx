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
    console.log(props);
    // eslint-disable-next-line prefer-destructuring
    const val = props.val;
    return (
        <React.Fragment>
            {val && val.label &&
                <li key={props.id} className='filter-li-items' style={{paddingLeft:'10px'}}>
                    <div className="row" >
                        <div className="col-sm-2">
                    <input type="checkbox" name={props.name} value={val.key}
                        checked={props.checkValues && props.checkValues.includes(val.key)}
                        onChange={props.handleFilterCheckBoxChange} />
                        </div> 
                        <div className="col-sm-7">
                    <span className='checkbox-names-filter'>{val && val.label}</span>
                    </div>
                    <div className="col-sm-3">

                    <span style={{textAlign:'right'}}>{val.count}</span>
                    </div>
                    </div>
                </li>
            }
        </React.Fragment>
    );
}

function FilterLabelListWithSearch(props) {
    return (
        <ol className='category-sidebar list-unstyled panel-collapse collapse' id="collapse1">
            <br/>
            <div>
                <center>
                <input style={{backgroundColor:'#f8f8f8',borderBottomStyle:'none',padding:'4px'}} className='cat-search' name={props.filterName} type='text' placeholder='Search' onChange={props.handleCategorySearch} />
                <span style={{backgroundColor:'#2fafcc',padding:'6px'}} className='glyphicon glyphicon-search search-icon-filter' />
                </center>
            </div>
            <br/>
            {props.filteredData && props.filteredData.map(eachValue => (
                <FilterLabelList key={eachValue.key} id={eachValue.key} val={eachValue} name={props.filterName} checkValues={props.checkValues}
                    handleFilterCheckBoxChange={event => props.handleFilterCheckBoxChange(event, props.filterName)} />
            ))
            }
        </ol>
    );
}

function FilterLabelListWithSearch1(props) {
    return (
        <ol className='category-sidebar list-unstyled'>
            <br/>
            <div>
                <center>
                <input style={{backgroundColor:'#f8f8f8',borderBottomStyle:'none',padding:'4px'}} className='cat-search' name={props.filterName} type='text' placeholder='Search' onChange={props.handleCategorySearch} />
                <span style={{backgroundColor:'#2fafcc',padding:'6px'}} className='glyphicon glyphicon-search search-icon-filter' />
                </center>
            </div>
            <br/>
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



          
<div style={{border:'1px Solid rgb(47, 175, 204)'}}>
           <div style={{fontSize: '14px',fontWeight: '700',color:'white',backgroundColor: 'rgb(47, 175, 204)',textTransform: 'uppercase',width:'100%',padding:'10px'}}>
                            Categories
                              </div>
            <FilterLabelListWithSearch1
                filterName='category'
                filteredData={props.categoryData}
                checkValues={props.category}
                handleCategorySearch={props.handleCategorySearch}
                handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
            />
 </div>
           <div style={{border:'1px Solid rgb(47, 175, 204)'}}>
           <div data-toggle="collapse" href="#collapse1" style={{fontSize: '14px',fontWeight: '700',color:'white',backgroundColor: 'rgb(47, 175, 204)',textTransform: 'uppercase',width:'100%',padding:'10px'}}>
                            Color
                              </div>
            <FilterLabelListWithSearch
                filterName='color'
                filteredData={props.colorsData}
                checkValues={props.color}
                handleCategorySearch={props.handleCategorySearch}
                handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
            />
            </div>

            <div style={{border:'1px Solid rgb(47, 175, 204)'}}>
           <div data-toggle="collapse" href="#collapse1" style={{fontSize: '14px',fontWeight: '700',color:'white',backgroundColor: 'rgb(47, 175, 204)',textTransform: 'uppercase',width:'100%',padding:'10px'}}>
                            Farm
                              </div>
            <FilterLabelListWithSearch
                filterName='farm'
                filteredData={props.farmsData}
                checkValues={props.farm}
                handleCategorySearch={props.handleCategorySearch}
                handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
            />
            </div>
        <div style={{border:'1px Solid rgb(47, 175, 204)'}}>
           <div data-toggle="collapse" href="#collapse1" style={{fontSize: '14px',fontWeight: '700',color:'white',backgroundColor: 'rgb(47, 175, 204)',textTransform: 'uppercase',width:'100%',padding:'10px'}}>
           Location
                              </div>
           
            <FilterLabelListWithSearch
                filterName='location'
                filteredData={props.stateCityData}
                checkValues={props.location}
                handleCategorySearch={props.handleCategorySearch}
                handleFilterCheckBoxChange={props.handleFilterCheckBoxChange}
            />
            </div>
        </div>
    );
}
