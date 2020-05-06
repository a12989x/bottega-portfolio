import React from 'react';
import ReactModal from 'react-modal';

import BlogForm from '../blog/BlogForm';

ReactModal.setAppElement('#root');

const BlogModal = (props) => {
    const handleSuccessfulFormSubmission = (blog) => {
        props.handleSuccessfulNewBlogSubmission(blog);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '70vw',
            height: '80vh',
            borderRadius: '50px',
            border: '1px solid transparent',
            backgroundColor: '#e0e5ec',
        },
    };

    return (
        <ReactModal
            style={customStyles}
            onRequestClose={() => props.handleModalClose()}
            isOpen={props.modalIsOpen}
        >
            <BlogForm
                handleSuccessfulFormSubmission={handleSuccessfulFormSubmission}
            />
        </ReactModal>
    );
};

export default BlogModal;
