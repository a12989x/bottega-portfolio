import React from 'react';
import { Link } from 'react-router-dom';
import striptags from 'striptags';
import Truncate from 'react-truncate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlogItem = (props) => {
    const { title, id, content } = props.item;

    return (
        <div className="blog__item">
            <h3 className="blog__item-title">{title}</h3>
            <Truncate lines={5} ellipsis={<span> . . .</span>}>
                {striptags(content)}
            </Truncate>
            <button className="blog__item-link">
                <Link to={`/blog/${id}`}>Read Article</Link>
            </button>
            {props.loggedInStatus === 'LOGGED_IN' ? (
                <button
                    onClick={() => props.handleDeleteClick(id)}
                    className="blog__item-delete"
                >
                    <FontAwesomeIcon icon="trash" />
                </button>
            ) : null}
        </div>
    );
};

export default BlogItem;
