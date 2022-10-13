import React from 'react';
import './card.css';
import PropTypes from 'prop-types';

const Card = (props) => {
  const { item } = props;
  return (
    <div className='card-item' data-testid='card-item'>
      <a
        data-testid='card-link'
        aria-label='Link to library item'
        href={item.url}
      >
        <img
          src={item.image}
          loading='lazy'
          alt='Library image'
          width='300'
          height='168'
        />
        <div className='card-text'>
          <span className='card-time'>
            {item.type}•{item.duration}
          </span>
          <h3>{item.title}</h3>
          <p>{item.intro}</p>
        </div>
      </a>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
    type: PropTypes.string,
    duration: PropTypes.string,
    image: PropTypes.string,
    has_summative_assessment: PropTypes.bool,
    intro: PropTypes.string,
    title: PropTypes.string,
    internal_title: PropTypes.string,
  }).isRequired,
};

export default Card;
