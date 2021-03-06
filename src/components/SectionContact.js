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
                <form name="contactForm" method="POST" netlify-honeypot="bot-field" data-netlify="true" id="contact-form"
                  className="contact-form">
                  <p className="screen-reader-text">
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                  </p>
                  <p className="form-row">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-input" required/>
                  </p>
                  <p className="form-row">
                    <label className="form-label">Email address</label>
                    <input type="email" name="email" className="form-input" required/>
                  </p>
                  <p className="form-row">
                    <label className="form-label">Message</label>
                    <textarea name="message" className="form-textarea" rows="3" required/>
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
