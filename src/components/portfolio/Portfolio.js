import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PortfolioItem from './PortfolioItem';
import Loader from '../others/Loader';

const Portfolio = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        getPortfolioItems();
    }, []);

    const getPortfolioItems = (filter = null) => {
        setIsLoading(true);

        axios
            .get('https://a12989x.devcamp.space/portfolio/portfolio_items')
            .then((response) => {
                filter
                    ? setData(
                          response.data.portfolio_items.filter(
                              (item) => item.category === filter
                          )
                      )
                    : setData(response.data.portfolio_items);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('getPortfolioItems', error);
                setIsLoading(false);
            });
    };

    const portfolioItems = () => {
        return data.map((item) => {
            return <PortfolioItem key={item.id} item={item} />;
        });
    };

    const handleFilter = (filter) => {
        if (filter === 'CLEAR_FILTER') {
            getPortfolioItems();
        } else {
            getPortfolioItems(filter);
        }
    };

    return (
        <div className="portfolio">
            <div className="portfolio__text">
                <h2>My Portfolio</h2>
            </div>
            <div className="portfolio__categories">
                <button
                    onClick={() => handleFilter('CLEAR_FILTER')}
                    className="portfolio__categories-scheduling"
                >
                    All
                </button>
                <button
                    onClick={() => handleFilter('scheduling')}
                    className="portfolio__categories-scheduling"
                >
                    Scheduling
                </button>
                <button
                    onClick={() => handleFilter('enterprise')}
                    className="portfolio__categories-enterprise"
                >
                    Enterprise
                </button>
                <button
                    onClick={() => handleFilter('eCommerce')}
                    className="portfolio__categories-ecommerce"
                >
                    eCommerce
                </button>
            </div>
            {isLoading ? <Loader /> : portfolioItems()}
        </div>
    );
};

export default Portfolio;
