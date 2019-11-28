// eslint-disable-next-line no-unused-vars
import React from 'react';
import Link from 'react-router-dom/Link';
import Carousel from 'react-bootstrap/lib/Carousel';

export default function HomeComponent() {
    return (
        <React.Fragment>
        <div className="hp-banner">
            <Carousel style={{ height: '60%' }} indicators={false} touch slide pauseOnHover={false}>
                {/* <Carousel.Item>
                    <Link
                        to={{
                            pathname: '/wholesale-flowers/all-flowers.html',
                            state: { catId: 409 },
                        }}
                    >
                        <img
                            className="d-block w-100"
                            src="https://d2ob14u1yb5v44.cloudfront.net/media/em_minislideshow/1557755779_0_Generic_webBanner.jpg"
                            alt="Home Banner"
                        />
                    </Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link
                        to={{
                            pathname: '/annual-flower-subscription.html',
                            state: { fromHomeBanner: 'yes' },
                        }}
                    >
                        <img
                            className="d-block w-100"
                            src="https://d2ob14u1yb5v44.cloudfront.net/media/annual-subscription/subcription-pages-hero-banner-desktop-v1.jpg"
                            alt="Subscription Banner"
                        />
                    </Link>
                </Carousel.Item> */}
                <Carousel.Item>
                    <Link
                        to={{
                            pathname: '/premium-membership.html',
                            // state: { fromHomeBanner: 'yes' },
                        }}
                    >
                        <img
                            className="d-block w-100"
                            src="https://d2ob14u1yb5v44.cloudfront.net/media/premium/premium-homee-Desktop.jpg"
                            alt="Premium Banner"
                        />
                    </Link>
                </Carousel.Item>
                {/* <Carousel.Item>
                    <Link
                        to={{
                            pathname: '/prebook-flower-subscription.html',
                            state: { fromHomeBanner: 'yes' },
                        }}
                    >
                        <img
                            className="d-block w-100"
                            src="https://d2ob14u1yb5v44.cloudfront.net/media/prebook-page/holiday-home-carousal-desk.jpg"
                            alt="Holiday Prebook Banner"
                        />
                    </Link>
                </Carousel.Item> */}
            </Carousel>
        </div>
        <div className="hp-banner-mobile">
        <Carousel style={{ height: '150px' }} indicators={false} touch slide pauseOnHover={false}>
            {/* <Carousel.Item>
                <Link
                    to={{
                        pathname: '/wholesale-flowers/all-flowers.html',
                        state: { catId: 409 },
                    }}
                >
                    <img height='150px'
                        className="d-block w-100"
                        src="https://d2ob14u1yb5v44.cloudfront.net/media/em_minislideshow/1557755779_0_Generic_webBanner.jpg"
                        alt="Home Banner"
                    />
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <Link
                    to='/annual-flower-subscription.html'
                >
                    <img height='150px'
                        className="d-block w-100"
                        src="https://d2ob14u1yb5v44.cloudfront.net/media/annual-subscription/subcription-page-mobile-versions-v1.jpg"
                        alt="Subscription Banner"
                    />
                </Link>
            </Carousel.Item> */}
            <Carousel.Item>
                <Link
                    to='/premium-membership.html'
                >
                    <img height='150px'
                        className="d-block w-100"
                        src="https://d2ob14u1yb5v44.cloudfront.net/media/premium/Mobile-premium-banner.jpg"
                        alt="Premium Banner"
                    />
                </Link>
            </Carousel.Item>
            {/* <Carousel.Item>
                <Link
                    to='/prebook-flower-subscription.html'
                >
                    <img height='150px'
                        className="d-block w-100"
                        src="https://d2ob14u1yb5v44.cloudfront.net/media/prebook-page/holiday-home-carousal-mobile.jpg"
                        alt="Holiday Prebook Banner"
                    />
                </Link>
            </Carousel.Item> */}
        </Carousel>
    </div>
    </React.Fragment>
    );
}
