// import React, { Component } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import RichEditorText from '../forms/RichTextEditor';

const BlogForm = (props) => {
    const [id, setId] = useState('');
    const [values, setValues] = useState({
        title: '',
        blog_status: 'draft',
    });
    const [content, setContent] = useState('');
    const [featured_image, setFeature_image] = useState('');
    const [apiUrl, setApiUrl] = useState(
        'https://a12989x.devcamp.space/portfolio/portfolio_blogs'
    );
    const [apiAction, setApiAction] = useState('post');

    const featuredImageRef = useRef();

    useEffect(() => {
        if (props.editMode) {
            const { id, title, blog_status, content } = props.blogItem;

            setId(id);
            setValues({
                title: title,
                blog_status: blog_status,
            });
            setContent(content);
            setApiUrl(
                `https://a12989x.devcamp.space/portfolio/portfolio_blogs/${id}`
            );
            setApiAction('patch');
        }
    }, []);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleRichTextEditorChange = (newContent) => {
        setContent(newContent);
    };

    const buildForm = () => {
        let formData = new FormData();

        formData.append('portfolio_blog[title]', values.title);
        formData.append('portfolio_blog[blog_status]', values.blog_status);
        formData.append('portfolio_blog[content]', content);

        if (featured_image) {
            formData.append('portfolio_blog[featured_image]', featured_image);
        }

        return formData;
    };

    const handleSubmit = (e) => {
        axios({
            method: apiAction,
            url: apiUrl,
            data: buildForm(),
            withCredentials: true,
        })
            .then((response) => {
                if (featured_image) {
                    featuredImageRef.current.dropzone.removeAllFiles();
                }

                setValues({
                    title: '0',
                    blog_status: 'draft',
                });
                setContent('');

                if (props.editMode) {
                    props.handleUpdateFormSubmission(
                        response.data.portfolio_blog
                    );
                } else {
                    props.handleSuccessfulFormSubmission(
                        response.data.portfolio_blog
                    );
                }
            })
            .catch((error) => {
                console.log('handleSubmit', error);
            });

        e.preventDefault();
    };

    const handleFeatureimageDrop = () => {
        return {
            addedfile: (file) => setFeature_image(file),
        };
    };

    const componentConfig = () => {
        return {
            iconFiletypes: ['.jpg', '.png'],
            showFiletypeIcon: true,
            postUrl: 'https://httpbin.org/post',
        };
    };

    const djsConfig = () => {
        return { addRemoveLinks: true, maxFiles: 1 };
    };

    const deleteImage = () => {
        axios
            .delete(
                `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${props.blogItem.id}?image_type=featured_image`,
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                props.handleFeaturedImageDelete();
            })
            .catch((error) => {
                console.log('deleteImage', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Blog Title
                <input
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                />
            </label>

            <label>
                Status
                <select
                    name="blog_status"
                    value={values.blog_status}
                    onChange={handleChange}
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </label>

            <RichEditorText
                handleRichTextEditorChange={handleRichTextEditorChange}
                editMode={props.editMode}
                contentToEdit={props.editMode && props.blogItem.content}
            />

            {props.editMode && props.blogItem.featured_image_url ? (
                <div className="filepicker dropzone dz-clickable">
                    <div className="dz-preview dz-processing dz-image-preview dz-success dz-complete">
                        <div className="dz-image">
                            <img
                                alt={props.blogItem.title}
                                className="data-dz-thumbnail"
                                src={props.blogItem.featured_image_url}
                            />
                        </div>
                        <button
                            className="remove"
                            onClick={(e) => {
                                deleteImage();
                                e.preventDefault();
                            }}
                        >
                            Remove File
                        </button>
                    </div>
                </div>
            ) : (
                <DropzoneComponent
                    ref={featuredImageRef}
                    config={componentConfig()}
                    djsConfig={djsConfig()}
                    eventHandlers={handleFeatureimageDrop()}
                >
                    <div className="dz-message">Featured Image</div>
                </DropzoneComponent>
            )}

            <button>Save</button>
        </form>
    );
};

export default BlogForm;
