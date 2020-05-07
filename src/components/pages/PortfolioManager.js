import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PortfolioItem from '../portfolio/PortfolioItem';
import PortfolioForm from '../portfolio/PortfolioForm';
import Loader from '../others/Loader';

const PortfolioManager = (props) => {
    const [data, setData] = useState([]);
    const [portfolioToEdit, setPortfolioToEdit] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getPortfolioItems();
    }, []);

    const getPortfolioItems = () => {
        setIsLoading(true);

        axios
            .get('https://a12989x.devcamp.space/portfolio/portfolio_items', {
                withCredentials: true,
            })
            .then((response) => {
                setData([...response.data.portfolio_items]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('getPortfolioItems', error);
            });
    };

    const handleDeleteClick = (portfolioItem) => {
        axios
            .delete(
                `https://a12989x.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
                { withCredentials: true }
            )
            .then((response) => {
                setData(data.filter((item) => item.id !== data.id));

                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleNewFormSubmission = (portfolioItem) => {
        setData([portfolioItem].concat(data));
    };

    const handleEditFormSubmission = () => {
        getPortfolioItems();
    };

    const handleFormSubmissionError = (error) => {
        console.log('handleSuccessfulFormSubmissionError', error);
    };

    const handleEditClick = (portfolioItem) => {
        setPortfolioToEdit({ portfolioItem });
    };

    const clearPortfolioToEdit = () => {
        setPortfolioToEdit({});
    };

    const portfolioItems = () => {
        return data.map((item) => {
            return (
                <PortfolioItem
                    key={item.id}
                    item={item}
                    loggedInStatus={props.loggedInStatus}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick}
                />
            );
        });
    };

    return (
        <div className="portfolio__manager">
            <PortfolioForm
                handleNewFormSubmission={handleNewFormSubmission}
                handleEditFormSubmission={handleEditFormSubmission}
                handleFormSubmissionError={handleFormSubmissionError}
                clearPortfolioToEdit={clearPortfolioToEdit}
                portfolioToEdit={portfolioToEdit}
            />

            <div className="portfolio__manager-items">
                {isLoading ? <Loader /> : portfolioItems()}
            </div>
        </div>
    );
};

export default PortfolioManager;
