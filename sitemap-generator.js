require('babel-register');

import { paramsApplier as applyParams, sitemapBuilder as buildSitemap } from 'react-router-sitemap';

const axios = require('axios');
const sm = require('sitemap');
const fs = require('fs');

// remaining routes to be added
{ /* <Route path="/blog/category/:id"/>
<Route path="/blog/archive/:id"/>
<Route path="/blog/author/:id"/>
<Route path="/blog/tags/:id"/>
<Route path="/blog/:id"/>
<Route path="/ErrorsPage"/>
<Route path="/customer/account/tags/detail/:tagId"/>
<Route path="/print/order/:id"/>
<Route path="/product/reviews/:id"/> */ }

const paths = ['/', '/freshDeals', '/seasonalSubscription', '/wholesale-flowers/:id', '/customer/account', '/customer/account/edit', '/customer/account/address', '/customer/account/orders', '/customer/account/recuring_profile', '/customer/account/reviews', '/customer/account/tags', '/customer/account/wishlist', '/customer/account/pending', '/customer/account/vendor_reviews', '/customer/account/favourites', '/salesRep', '/wholesale-flowers.html', '/new-arrivals.html', '/wholesale-flowers/floral-supplies.html', '/wholesale-flowers/local-delivery.html', '/catalogsearch/result/', '/preMadeBouquets', '/nextday-delivery.html', '/best-seller.html', '/FallCollectionContainer', '/wedding-flowers.html', '/register', '/about-us', '/blog', '/blog/search', '/sustainable_floral_fund', '/forgotPassword', '/view-cart', '/contacts', '/privacy-policy', '/term-and-conditions', '/returns-and-refunds-policy', '/faq-vendor', '/faq-customer', '/track-order/', '/login', '/logoutSuccess', '/RegisterSuccess', '/profileDetail', '/customer/account/address/new', '/customer/account/address/edit', '/customer/pastPurchase', '/checkout/onepage', '/customer/account/viewOrder', '/checkout/onepage/success', '/firstData', '/customer/account/re-order', '/paypal', '/prebook', '/vendors', '/umicrosite/vendor/register/', '/about-us#features', '/about-us#howitwork', '/about-us#pricing', '/bkm/vendor', '/:id'];
const urlData = [];
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.post('https://bloomkonnect.com:2001/admin-bff/product/categories/list')
  .then((response) => {
    response.data.data.map((thisData) => {
      urlData.push(thisData.url_key);
    });
    return axios.post('https://bloomkonnect.com:8443/api/product/Producturl');
  })
  .then((response) => {
    const config = {
      '/:id': [{ id: response.data }],
      '/wholesale-flowers/:id': [{ id: urlData }],
    };
    const urls = [];
    let sitemap;
    const configPaths = applyParams(paths, config);
    const lastMod = new Date();
    // const abc = lastMod.toISOString();
    configPaths.map((thisPath) => {
      if ((thisPath === '/') || (thisPath === '/wholesale-flowers')) {
        urls.push({
          url: thisPath,
          changefreq: 'daily',
          priority: 1.0,
          lastmod: lastMod,
        });
      } else {
        urls.push({
          url: thisPath,
          changefreq: 'daily',
          priority: 0.8,
          lastmod: lastMod,
        });
      }
    });
    // const hostname = 'https://bloomkonnect.com';
      sitemap = sm.createSitemap({
        hostname: 'https://bloomkonnect.com',
        urls,
      });
    // const sitemap = buildSitemap(hostname, configPaths);

    fs.writeFileSync('./dist/sitemap.xml', sitemap.toString());
  })
  .catch((error) => {
    console.log(error);
  });
