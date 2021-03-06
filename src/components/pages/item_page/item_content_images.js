import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import tiphive from 'Lib/tiphive';

export default class ItemContentImages extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    images: PropTypes.array,
    autoscroll: PropTypes.bool
  };

  static defaultProps = {
    images: []
  };

  uniqId = uniqueId();

  componentDidMount = () => {
    const {
      props: { item, autoscroll = true }
    } = this;
    $(`#carousel-${item.type}-${item.id}-${this.uniqId}`).carousel({
      interval: autoscroll ? 2000 : autoscroll
    });
  };

  render() {
    const {
      props: { item, images }
    } = this;
    const uid = `carousel-${item.type}-${item.id}-${this.uniqId}`;

    const imageItems = images.map((image, index) => {
      const imageClass = classNames('item text-center carousel-item', {
        active: index === 0
      });
      let imgElem = null;

      if (image.file_processing) {
        imgElem = (
          <img
            src={
              '//placehold.it/640x480?text=' +
              encodeURI('Image is being processed.')
            }
            alt={tiphive.baseName(image?.file_url)}
            width="100%"
          />
        );
      } else {
        imgElem = (
          <img
            src={tiphive.fileUrl(image?.file_url)}
            alt={tiphive.baseName(image?.file_url)}
            width="100%"
          />
        );
      }

      return (
        <div className={imageClass} key={`${item.type}-image-${image.id}`}>
          {imgElem}
        </div>
      );
    });

    let carouselControlLeft = null;
    let carouselControlRight = null;
    if (imageItems.length > 1) {
      carouselControlLeft = (
        <a
          className="left carousel-control"
          href={`#${uid}`}
          role="button"
          data-slide="prev"
        >
          <span
            className="glyphicon glyphicon-chevron-left"
            aria-hidden="true"
          />
          <span className="sr-only">Previous</span>
        </a>
      );
      carouselControlRight = (
        <a
          className="right carousel-control"
          href={`#${uid}`}
          role="button"
          data-slide="next"
        >
          <span
            className="glyphicon glyphicon-chevron-right"
            aria-hidden="true"
          />
          <span className="sr-only">Next</span>
        </a>
      );
    }

    return (
      <div
        id={uid}
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
        <div className="carousel-inner" role="listbox">
          {imageItems}
        </div>

        {carouselControlLeft}
        {carouselControlRight}
      </div>
    );
  }
}
