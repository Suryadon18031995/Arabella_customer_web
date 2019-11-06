import React from 'react';
import _get from 'lodash/get';

function LiComponent(props) {
  // console.log('li props', props);
  return (
    <li className='list-unstyled'>
      <span onClick={() => { props.availableSeasonIds && props.li && props.availableSeasonIds.includes(props.li.s_id) ? props.onEventClick(props.li.s_id) : ''; }}>
        <div id='timepart_Fall' className='del_box'>
          <div className='reg-band selected no_prod'>
            <label className='color_palate cp70 a-center'>
              <div className='zoom-main'>
                <img
                  className={`col-lg-24 col-xs-24  ${
                    props.availableSeasonIds && props.li && props.availableSeasonIds.includes(props.li.s_id)
                      ? 'zoom1'
                      : 'zoom'
                    }`}
                  src={props.li.image}
                  // src='https://uat.bloomkonnect.com:8443/media/catalog/product/cache/1/image/265x/c6d01c267e0c4da007fcfbf49d58c2ed/placeholder/default/BK_Image-coming-soon.jpg'
                  height='275'
                />
              </div>
              {/* <span className='cat-checked' aria-hidden='true' /> */}
              <h2>
                <b>{props.li.name}</b>
              </h2>
              <i
                className={`${props.checkSelection && props.availableSeasonIds.includes(props.li.s_id) && (props.li.s_id === props.selectSeason.s_id) ? 'fa fa-check-circle sub-checked' : ''}`}
                aria-hidden='true'
              />
              {/*
                //  <FontAwesomeIcon
                //   icon="check-circle"
                //   className="sub-checked"
                //   style={{}}
                // />
             */}
              <div />
              <span className='sh_1'> </span>
            </label>
            <br />
          </div>
        </div>
      </span>
    </li>
  );
}

export default LiComponent;
