import React from 'react';
// import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';
import Link from 'react-router-dom/Link';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
// import OneColumLeftRewards from '../../components/MyAccount/OneColumnLeftRewards.jsx';
import PointTransactions from '../../components/MyAccount/PointTransactions.jsx';

function OneColumLeftRewards(props) {
    return (
        <div className='rewards-menu'>
            <Panel>
                <Panel.Heading><h4><b>MY REWARD POINTS</b></h4></Panel.Heading>
                <Panel.Body>
                    <ListGroup>
                        <ListGroupItem>
                            <Link to={'/customer/account'}>
                                Account Dashboard
                        </Link>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Link to={'/customer/account/rewards'}>
                                My Rewards ${props.rewardsPointAmount}
                        </Link>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Link to={'/customer/account/rewards/points'}>Point Transactions</Link>
                        </ListGroupItem>
                        {/* <ListGroupItem>
                            <Link to={'/customer/account/rewards/settings'}>Settings</Link>
                        </ListGroupItem> */}
                    </ListGroup>
                </Panel.Body>
            </Panel>
        </div >
    );
}

export default function RewardsComponent(props) {
    return (
        <div className="container">
            <div className="col-md-3 col-sm-4 col-xs-12">
                <OneColumLeftRewards
                    salesRepUser={props.salesRepUser}
                    primeUser={props.primeUser}
                    rewardsPointAmount={props.rewardsPointAmount}
                />
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12">
                {props.mode === 'rewards' ? <div className="edit-account rewards-page">
                    <div className="edit-title">
                       <h1>My Rewards</h1>
                    </div>
                    <h2 className='normal-color'>Reward Information</h2>
                    <div>Your balance is <strong>{_get(props, ['rewardsData', 'total_rewardpoints'])} Points (${_get(props, ['rewardsData', 'total_rewardpoints_amount'])}) </strong></div>
                    <h2>{_get(props, ['rewardsData', 'earn_points_title'])}</h2>
                    <p>
                    {_get(props, ['rewardsData', 'earn_points_details'])}
                    </p>
                    <div style={{ marginLeft: '50px' }}>
                        <ul style={{ listStyle: 'circle' }}>
                            <li>
                            {_get(props, ['rewardsData', 'earn_points_rules'])}
                        </li>
                        </ul>
                    </div>
                    <h2>{_get(props, ['rewardsData', 'spend_points_title'])}</h2>
                    <p>
                    {_get(props, ['rewardsData', 'spend_points_details'])}
                    </p>
                    <div style={{ marginLeft: '50px' }}>
                        <ul style={{ listStyle: 'circle' }}>
                            <li>
                            {_get(props, ['rewardsData', 'spend_points_rules'])}
                            </li>
                        </ul>
                    </div>
                    <h2>{_get(props, ['rewardsData', 'managed_points_title'])}</h2>
                    <div style={{ marginLeft: '50px' }}>
                        <ul style={{ listStyle: 'circle' }}>
                            <li>
                            {_get(props, ['rewardsData', 'managed_points_max'])}
                        </li>
                            <li>
                            {_get(props, ['rewardsData', 'managed_points_com'])}
                        </li>
                        </ul>
                    </div>
                    <hr />
                    <h2 className='normal-color'>Recent Transactions</h2>
                    <PointTransactions rewardsData={props.rewardsData} />
                </div> : null}
                {props.mode === 'points' ? <div className="edit-account">
                    <div className="edit-title">
                        <h1>Point Transactions</h1>
                    </div>
                    <PointTransactions rewardsData={props.rewardsData} />
                </div> : null}
                {props.mode === 'settings' ? <div className="edit-account">
                    <div className="edit-title">
                        <div className="edit-title-head"><h1>Reward Points Settings</h1></div>
                    </div>
                    <div>Reward Points Subscriptions</div>
                    <div>Receive email about point balance update</div>
                    <div>Receive email notifying before points expire</div>
                </div> : null}
            </div>
        </div>
    );
}
