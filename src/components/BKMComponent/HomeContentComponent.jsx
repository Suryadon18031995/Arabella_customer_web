import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const homeContentComponent = (props) => {

      let element; let responsive;

      if (props.children == null || props.children.length === 0) {
            element = (<div>
                        <div className=".hp-widget-row-name">
                              <div className="hp-widget-line">
                                    <div className="hp-widget-title">
                                          <h3>
                                                <span>{props.rowTitle}</span>
                                          </h3>
                                    </div>
                              </div>
                        </div>
                        <div className="panel panel-warning">
                              <div className="message-panel">
                                    <span>No Products Found Under This Category.</span>
                              </div>
                        </div>
                  </div>
            );
      } else {
            element = (<div>
                        <div className=".hp-widget-row-name">
                              <div className="hp-widget-line">
                                    <div className="hp-widget-title">
                                          <h3>
                                                <span>{props.rowTitle}</span>
                                          </h3>
                                    </div>
                              </div>
                        </div>
                        <div className="hp-carousel">
                              <AliceCarousel
                                    items = {props.children}
                                    responsive = {props.responsive}
                                    dotsDisabled
                                    infinite = {false}
                              />
                        </div>
                  </div>
            );
      }
      return element;
};

export default homeContentComponent;
