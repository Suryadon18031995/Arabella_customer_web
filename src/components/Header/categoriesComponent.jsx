import React from 'react';
// import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import Link from 'react-router-dom/Link';

export default function CategoriesComponenet(props) {
    return (
        <div className="categoriesCls">
            <ul className="menu-container">
                {props && props.cateGoriesList && Object.keys(props.cateGoriesList).map((categry, index) =>
                    <li key={index} className="menu-item-text"><span className="item-name-span">{categry}</span>
                        <ul>
                            {!_isEmpty(props.cateGoriesList[categry]) && props.cateGoriesList[categry].map(((obj, i) =>
                                <li key={i} className="menu-item-link">
                                    <Link
                                    // params={123}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                    }}
                                    to={{
                                        // pathname: `/wholesale-flowers/all-flowers/${obj.name}`,
                                        pathname: `/${obj.url_key}.html`,
                                        state: { catId: obj.cat_id, productCatName: obj.name },
                                      }}
                                    >
                                        <span className='link-cursors' onClick={props.mblMenu}>{obj.name}</span>
                                    </Link>
                                </li>))}
                        </ul>
                    </li>)
                }
            </ul>
        </div>
    );
}

