import PropTypes from 'prop-types';
import React from 'react';
import { DEFAULT_COLOR } from 'Src/appConstants';

class DomainLogo extends React.Component {
  static propTypes = {
    componentClass: PropTypes.string,
    name: PropTypes.string,
    domain: PropTypes.object,
    color: PropTypes.any,
    rounded: PropTypes.bool,
    preferredColor: PropTypes.string
  };

  /**
   * Generate icon from workspace initial
   *
   * @return {Object}
   */
  generateIconFromInitial() {
    const { domain, name } = this.props;
    const { attributes } = domain || {};
    const domainName = (attributes && attributes.name) || name || '';
    const domainIconContent = domainName.substr(0, 2);

    return { domainName, domainIconContent };
  }

  render() {
    const {
      componentClass,
      domain,
      color,
      rounded,
      preferredColor
    } = this.props;
    const { domainName, domainIconContent } = this.generateIconFromInitial();
    const backgroundColor =
      preferredColor ||
      (domain && domain.attributes.color) ||
      color ||
      DEFAULT_COLOR;
    let borderRadius = rounded && (borderRadius = '50%');

    return (
      <div
        style={{
          backgroundColor,
          borderRadius,
          color: 'rgba(255, 255, 255, 0.8)'
        }}
        className={componentClass || 'left-menu__domain-icon'}
        alt={domainName}
      >
        {domainIconContent}
      </div>
    );
  }
}

export default DomainLogo;
