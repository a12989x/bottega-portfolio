import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfiniteScroll from 'react-infinite-scroll-component';

import BlogItem from '../blog/BlogItem';
import BlogModal from '../modals/BlogModal';
import Loader from '../others/Loader';

const Blog = (props) => {
    const [blogItems, setBlogItems] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState(1);

    useEffect(() => {
        getBlogItems();
    }, []);

    const handleNewBlogClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSuccessfulNewBlogSubmission = (blog) => {
        setShowModal(false);
        setBlogItems([blog].concat(blogItems));
    };

    const handleDeleteClick = (id) => {
        axios
            .delete(
                `https://api.devcamp.space/portfolio/portfolio_blogs/${id}`,
                { withCredentials: true }
            )
            .then((response) => {
                setBlogItems(
                    blogItems.filter((blogItem) => id !== blogItem.id)
                );
            })
            .catch((error) => {
                console.log('handleDeleteClick', error);
            });
    };

    const getBlogItems = () => {
        setPageNum(pageNum + 1);

        axios
            .get(
                `https://a12989x.devcamp.space/portfolio/portfolio_blogs?page=${pageNum}`,
                { withCredentials: true }
            )
            .then((response) => {
                setBlogItems(blogItems.concat(response.data.portfolio_blogs));
                setTotalCount(response.data.meta.total_records);
            })
            .catch((error) => {
                console.log('getBlogItems', error);
            });
    };

    const fetchMoreBlogItems = () => {
        getBlogItems();
        if (blogItems.length === totalCount && blogItems.length !== 0) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
    };

    const blogRecords = () => {
        return blogItems.map((item) => {
            return (
                <BlogItem
                    key={item.id}
                    item={item}
                    loggedInStatus={props.loggedInStatus}
                    handleDeleteClick={handleDeleteClick}
                />
            );
        });
    };

    return (
        <div className="blog">
            <BlogModal
                handleSuccessfulNewBlogSubmission={
                    handleSuccessfulNewBlogSubmission
                }
                handleModalClose={handleModalClose}
                modalIsOpen={showModal}
            />

            {props.loggedInStatus === 'LOGGED_IN' ? (
                <button onClick={handleNewBlogClick} className="blog__button">
                    <FontAwesomeIcon icon="plus-circle" />
                </button>
            ) : null}

            <InfiniteScroll
                dataLength={blogItems.length}
                next={fetchMoreBlogItems}
                hasMore={hasMore}
                loader={<Loader />}
                endMessage={<p></p>}
                style={{ overflow: 'unset' }}
            >
                {blogRecords()}
            </InfiniteScroll>
        </div>
    );
};

export default Blog;
