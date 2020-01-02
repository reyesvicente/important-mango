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
            <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/6915103.js"></script>
        </React.Fragment>
    ]);

};
