import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PortfolioDetail = (props) => {
    const [id, setId] = useState(props.match.params.slug);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getPortfolioItem();
    }, []);

    const { name, description, banner_image_url, category, url } = data;

    const getPortfolioItem = () => {
        setIsLoading(true);

        axios
            .get(
                `https://a12989x.devcamp.space/portfolio/portfolio_items/${id}`
            )
            .then((response) => {
                setData(response.data.portfolio_item);
                console.log(response.data.portfolio_item);

                setIsLoading(false);
            })
            .catch((error) => {
                console.log('getPortfolioItem', error);
                setIsLoading(false);
            });
    };

    return (
        <div className="portfolio__detail">
            {banner_image_url === null ? (
                <div className="portfolio__detail-img"></div>
            ) : (
                <img
                    className="portfolio__detail-img"
                    alt={id}
                    src={banner_image_url}
                />
            )}
            <h1 className="portfolio__detail-name">{name}</h1>
            <p className="portfolio__detail-description">{description}</p>
            <span className="portfolio__detail-category">{category}</span>
            <Link className="portfolio__detail-back" to="/">
                Back
            </Link>
            <button className="portfolio__detail-link">
                <a href={url} target="_blank">
                    Visit
                </a>
            </button>
        </div>
    );
};

export default PortfolioDetail;
