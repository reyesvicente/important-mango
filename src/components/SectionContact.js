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
                    <label className="form-label">What is the name of your business?(required)</label>
                    <input type="text" name="text" className="form-input" required/>
                  </p>
                  <p className="form-row">
                    <label className="form-label">Where is your business located?(required)</label>
                    <input type="text" name="text" className="form-input" required/>
                  </p>
                  <p className="form-row">
                    <label className="form-label">What does your business sell or do?(required)</label>
                    <textarea name="message" className="form-textarea" rows="7" required/>
                  </p>
                  <p className="form-row">
                      <label className="form-label" for="people">How many people work in your company?(required)</label>
                      <select class="form-control" id="people">
                      <option>Just Me</option>
                      <option>2 - 5</option>
                      <option>6 - 15</option>
                      <option>16 - 39</option>
                      <option>40+</option>
                      </select>
                  </p>
                  <p className="form-row">
                      <label className="form-label" for="typeOfProject">What type of project is it?(required)</label>
                      <select class="form-control" id="typeOfProject">
                      <option>Shopify Development</option>
                      <option>Custom Web Development</option>
                      <option>WordPress Development</option>
                      <option>Something Else</option>
                      </select>
                  </p>
                  <p className="form-row">
                    <label className="form-label">Who is the person responsible for the project?(required)</label>
                    <input type="text" name="email" className="form-input" required/>
                  </p>
                  <p className="form-row">
                      <label className="form-label" for="budgetOfProject">What is the budget allocated for the project?(required)</label>
                      <select class="form-control" id="budgetOfProject">
                      <option>$1500 USD - $3000 USD</option>
                      <option>$3001 USD - $6000 USD</option>
                      <option>$6001 USD - $10000 USD</option>
                      </select>
                  </p>
                  <p className="form-row">
                    <label className="form-label">Deadline for the project?(required)</label>
                    <input className="form-input" type="date" name="date" placeholder="dd / mm / yyyy" required>
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
