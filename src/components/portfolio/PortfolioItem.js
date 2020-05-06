import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PortfolioItem = (props) => {
    const { name, id, description, category, thumb_image_url } = props.item;

    if (props.loggedInStatus === 'LOGGED_IN') {
        return (
            <div
                style={{ backgroundImage: `url(${thumb_image_url})` }}
                className="portfolio__manager__item"
            >
                <h4 className="portfolio__manager__item-name">{name}</h4>
                <p className="portfolio__manager__item-category">{category}</p>
                <p className="portfolio__manager__item-id">id: {id}</p>

                <button
                    className="portfolio__manager__item-delete"
                    onClick={() => props.handleDeleteClick(props.item)}
                >
                    <FontAwesomeIcon icon="trash" />
                </button>

                <button
                    className="portfolio__manager__item-edit"
                    onClick={() => props.handleEditClick(props.item)}
                >
                    <FontAwesomeIcon icon="edit" />
                </button>
            </div>
        );
    } else {
        return (
            <div className="portfolio__card">
                <img alt={name} className="card__img" src={thumb_image_url} />
                <div className="card__text">
                    <h4 className="card__title">{name}</h4>
                    <p className="card__category">{category}</p>
                    <p className="card__description">{description}</p>
                </div>
                <button>
                    <Link to={`/portfolio/${id}`}>Link</Link>
                </button>
            </div>
        );
    }

    // return (
    //     <div
    //         style={{ backgroundImage: `url(${thumb_image_url})` }}
    //         className="portfolio__item"
    //     >
    //         {/* <img alt={name} style={{ width: '200px' }} src={thumb_image_url} /> */}
    //         <h4 className="portfolio__item-title">{name}</h4>
    //         <p className="portfolio__item-url">{description}</p>
    //         <p className="portfolio__item-url">{category}</p>
    //         <Link to={`/portfolio/${id}`}>Link</Link>
    //     </>
    // );
};

export default PortfolioItem;
