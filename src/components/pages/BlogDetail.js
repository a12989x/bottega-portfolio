import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BlogForm from '../blog/BlogForm';
import Loader from '../others/Loader';

const BlogDetail = (props) => {
    const [currentId, setCurrentId] = useState(props.match.params.slug);
    const [blogItem, setBlogItems] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const { title, content, featured_image_url, blog_status } = blogItem;

    useEffect(() => {
        getBlogItems();
    }, []);

    const getBlogItems = () => {
        setIsLoading(true);

        axios
            .get(
                `https://a12989x.devcamp.space/portfolio/portfolio_blogs/${currentId}`
            )
            .then((response) => {
                setBlogItems(response.data.portfolio_blog);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('error', error);
                setIsLoading(false);
            });
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleUpdateFormSubmission = (blogItem) => {
        setBlogItems(blogItem);
        setEditMode(false);
    };

    const contentManager = () => {
        if (editMode && props.loggedInStatus === 'LOGGED_IN') {
            return (
                <BlogForm
                    editMode={editMode}
                    blogItem={blogItem}
                    handleFeaturedImageDelete={handleFeaturedImageDelete}
                    handleUpdateFormSubmission={handleUpdateFormSubmission}
                />
            );
        } else {
            return (
                <>
                    {featured_image_url === null ? (
                        <div className="blog__detail-img"></div>
                    ) : (
                        <img
                            className="blog__detail-img"
                            alt={currentId}
                            src={featured_image_url}
                        />
                    )}
                    <h1 className="blog__detail-title">{title}</h1>
                    <p className="blog__detail-content">
                        {ReactHtmlParser(content)}
                    </p>
                    <span className="blog__detail-blog-status">
                        {blog_status}
                    </span>
                    <Link className="blog__detail-back" to="/blog">
                        Back
                    </Link>
                    {props.loggedInStatus === 'LOGGED_IN' ? (
                        <button
                            className="blog__detail-edit"
                            onClick={handleEditClick}
                        >
                            <FontAwesomeIcon icon="edit" />
                        </button>
                    ) : null}
                </>
            );
        }
    };

    const handleFeaturedImageDelete = () => {
        setBlogItems({ featured_image_url: '' });
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className="blog__detail">{contentManager()}</div>
    );
};

export default BlogDetail;
