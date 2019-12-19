import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import {safePrefix} from '../utils';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'pageContext.frontmatter.title') && _.get(this.props, 'pageContext.frontmatter.title') + ' - '}{_.get(this.props, 'pageContext.site.siteMetadata.title')}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <meta name="google-site-verification" content="dXb4OOKiaT7_QLCjkrzaZcYH8Omxy8LnMfaG-Zn9trk" />
                    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,700i" rel="stylesheet"/>
                    <link rel="stylesheet" href={safePrefix('assets/css/main.css')}/>
                </Helmet>
                <div id="page" className={'site palette-' + _.get(this.props, 'pageContext.site.siteMetadata.palette')}>
                  <Header {...this.props} />
                      <!-- Load Facebook SDK for JavaScript -->
                            <div id="fb-root"></div>
                            <script>
                              window.fbAsyncInit = function() {
                                FB.init({
                                  xfbml            : true,
                                  version          : 'v5.0'
                                });
                              };

                              (function(d, s, id) {
                              var js, fjs = d.getElementsByTagName(s)[0];
                              if (d.getElementById(id)) return;
                              js = d.createElement(s); js.id = id;
                              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                              fjs.parentNode.insertBefore(js, fjs);
                            }(document, 'script', 'facebook-jssdk'));</script>

                            <!-- Your customer chat code -->
                            <div class="fb-customerchat"
                              attribution=setup_tool
                              page_id="110100630343946"
                        logged_in_greeting="Hi! How can we help you?"
                        logged_out_greeting="Hi! How can we help you?">
                            </div>
                      <!-- End of Facebook SDK for JavaScript-->
                  <main id="content" className="site-content">
                    {this.props.children}
                  </main>
                  <Footer {...this.props} />
                </div>
            </React.Fragment>
        );
    }
}
