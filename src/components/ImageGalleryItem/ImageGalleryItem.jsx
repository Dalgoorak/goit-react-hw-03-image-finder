import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({
  src,
  srcOriginal,
  id,
  alt,
  getLargeImageURL,
}) {
  const handleClick = event => getLargeImageURL(event.target.dataset.source);

  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        data-source={srcOriginal}
        data-id={id}
        className={css.ImageGalleryItem__image}
        onClick={handleClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  srcOriginal: PropTypes.string.isRequired,
  id: PropTypes.number,
  alt: PropTypes.string,
  getLargeImageURL: PropTypes.func.isRequired,
};
