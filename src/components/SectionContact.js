import React from 'react';
import _ from 'lodash';

import {htmlToReact, markdownify} from '../utils';

export default class SectionContact extends React.Component {
    render() {
        let section = _.get(this.props, 'section');
        return (
            <section id={_.get(section, 'section_id')} className={'block contact-block bg-' + _.get(section, 'bg') + ' outer'}>
              <div className="block-header inner-small">
                {_.get(section, 'title') && 
                <h2 className="block-title">{_.get(section, 'title')}</h2>
                }
                {_.get(section, 'subtitle') && 
                <p className="block-subtitle">
                  {htmlToReact(_.get(section, 'subtitle'))}
                </p>
                }
              </div>
              <div className="block-content inner-medium">
                {markdownify(_.get(section, 'content'))}
                <form name="contactForm" method="POST" netlifyHoneypot="bot-field" data-netlify-recaptcha="true" data-netlify="true" id="contact-form"
                  className="contact-form">
                  <p className="screen-reader-text">
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                  </p>
                  <h2
                  <p className="form-row">
                    <label className="form-label">Your Name(required)</label>
                    <input type="text" name="text" className="form-input" required/>
                  </p>
                  <p className="form-row">
                    <label className="form-label">Your email address(required)</label>
                    <input type="email" name="email" className="form-input" aria-describedby="emailHelp" required/>
                  </p>
                  <p className="form-row">
                    <label className="form-label">Message?</label>
                    <textarea name="message" className="form-textarea" rows="7" required/>
                  </p>
                  <div data-netlify-recaptcha="true"></div>
                  <input type="hidden" name="form-name" value="contactForm" />
                  <p className="form-row form-submit">
                    <button type="submit" className="button">Send Message</button>
                  </p>
                </form>
              </div>
            </section>
        );
    }
}
