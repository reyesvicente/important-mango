/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react");
const safePrefix = require("./src/utils/safePrefix").default;

exports.onRenderBody = function({ setHeadComponents, setPostBodyComponents }) {

    setHeadComponents([
        
    ]);

    setPostBodyComponents([
        <React.Fragment>
            <script src={safePrefix('assets/js/plugins.js')}/>
            <script src={safePrefix('assets/js/init.js')}/>
            <script src={safePrefix('assets/js/main.js')}/>
            <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/0de49a585777f174476066417/7779af4fd225209e4263992ad.js");</script>
        </React.Fragment>
    ]);

};
