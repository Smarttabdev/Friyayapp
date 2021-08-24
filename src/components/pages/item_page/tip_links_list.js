import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dotdotdot from 'react-dotdotdot';

export default class TipLinksList extends PureComponent {
  static propTypes = {
    tipLinks: PropTypes.array,
    showDescription: PropTypes.bool,
    isGrid: PropTypes.bool
  };

  static defaultProps = {
    tipLinks: [],
    showDescription: false,
    isGrid: false
  };

  getGoogleDocIcon = kind => {
    const iconClass =
      { document: 'docs', spreadsheets: 'sheets', presentation: 'slides' }[
        kind
      ] || 'docs';
    return (
      <img
        alt=""
        aria-hidden="true"
        src={`https://www.gstatic.com/images/branding/product/1x/${iconClass}_48dp.png`}
        srcSet={`https://www.gstatic.com/images/branding/product/1x/${iconClass}_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/${iconClass}_48dp.png 2x `}
        width="40px"
        height="40px"
      />
    );
  };

  formatTitle = url => {
    if (url.startsWith(window.location.origin)) {
      const [, id, title] = url.match(/^.*\/(\d+)-(.*)$/) || [];
      let formattedTitle = title.split('-').join(' ');
      formattedTitle =
        formattedTitle[0].toUpperCase() + formattedTitle.slice(1);
      return formattedTitle;
    }
    return null;
  };

  render() {
    const {
      props: { tipLinks, showDescription, isGrid }
    } = this;

    return (
      <ul className="list-group tip-links-list-group">
        {tipLinks.map((link, index) => {
          const { url, title, description, avatar_url } = link;
          const formattedTitle = this.formatTitle(url);

          return (
            <li
              key={`tip-link-item-${index}`}
              className={classNames({
                'list-group-item group-item-tip-link': true,
                'item-grid-link': isGrid
              })}
            >
              <div className="media">
                <div
                  className={classNames('active-link-preview', 'media-left', {
                    'active-avatar-url': avatar_url
                  })}
                >
                  {url.includes('docs.google.com') ? (
                    this.getGoogleDocIcon(url.split('/')[3])
                  ) : (
                    <Fragment>
                      <div className="tip-link-icon">
                        <span className="material-icons">link</span>
                      </div>
                      <a
                        href={url}
                        className="avatar-url"
                        style={{ backgroundImage: `url(${avatar_url})` }}
                      />
                    </Fragment>
                  )}
                </div>
                <div
                  className={classNames({
                    'media-body': true,
                    'active-link-preview': !!title || !!description
                  })}
                >
                  <a
                    href={url}
                    className="tip-link"
                    // target="_blank"
                    // rel="noopener noreferrer"
                  >
                    {formattedTitle || title || url}
                  </a>
                  <div className="link-preview-details">
                    <a
                      href={url}
                      // target="_blank" rel="noopener noreferrer"
                    >
                      {formattedTitle || title}
                    </a>
                    {showDescription && description && (
                      <Dotdotdot clamp={3}>
                        <p className="text-muted">{description}</p>
                      </Dotdotdot>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
