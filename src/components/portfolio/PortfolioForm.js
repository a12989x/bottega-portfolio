import React, { Component, createRef } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import '../../css/filepicker.css';
import '../../css/dropzone.min.css';

class PortfolioForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            position: '',
            category: 'eCommerce',
            description: '',
            thumb_image: '',
            banner_image: '',
            logo: '',
            editMode: false,
            apiUrl: 'https://a12989x.devcamp.space/portfolio/portfolio_items',
            apiAction: 'post',
        };

        this.thumbRef = createRef();
        this.bannerRef = createRef();
        this.logoRef = createRef();
    }

    componentConfig = () => {
        return {
            iconFiletypes: ['.jpg', '.png'],
            showFiletypeIcon: true,
            postUrl: 'https://httpbin.org/post',
        };
    };

    djsConfig = () => {
        return {
            addRemoveLinks: true,
            maxFiles: 1,
        };
    };

    buildForm = () => {
        let formData = new FormData();

        formData.append('portfolio_item[name]', this.state.name);
        formData.append('portfolio_item[url]', this.state.url);
        formData.append('portfolio_item[position]', this.state.position);
        formData.append('portfolio_item[category]', this.state.category);
        formData.append('portfolio_item[description]', this.state.description);

        if (this.state.thumb_image) {
            formData.append(
                'portfolio_item[thumb_image]',
                this.state.thumb_image
            );
        }

        if (this.state.banner_image) {
            formData.append(
                'portfolio_item[banner_image]',
                this.state.banner_image
            );
        }

        if (this.state.logo) {
            formData.append('portfolio_item[logo]', this.state.logo);
        }

        return formData;
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true,
        })
            .then((response) => {
                if (this.state.editMode) {
                    this.props.handleEditFormSubmission();
                } else {
                    this.props.handleNewFormSubmission(
                        response.data.portfolio_item
                    );
                }

                this.setState({
                    name: '',
                    url: '',
                    position: '',
                    category: 'eCommerce',
                    description: '',
                    thumb_image: '',
                    banner_image: '',
                    logo: '',
                    editMode: false,
                    apiUrl:
                        'https://a12989x.devcamp.space/portfolio/portfolio_items',
                    apiAction: 'post',
                });

                [this.thumbRef, this.bannerRef, this.logoRef].forEach((ref) => {
                    ref.current.dropzone.removeAllFiles();
                });
            })
            .catch((error) => {
                console.log('error', error);
            });

        this.buildForm();
        e.preventDefault();
    };

    handleThumbDrop = () => {
        return {
            addedfile: (file) => this.setState({ thumb_image: file }),
        };
    };

    handleBannerDrop = () => {
        return {
            addedfile: (file) => this.setState({ banner_image: file }),
        };
    };

    handleLogoDrop = () => {
        return {
            addedfile: (file) => this.setState({ logo: file }),
        };
    };

    deleteImage = (imageType) => {
        axios
            .delete(
                `https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
                { withCredentials: true }
            )
            .then((response) => {
                this.setState({
                    [`${imageType}_url`]: '',
                });
            })
            .catch((error) => {
                console.log('deleteImage', error);
            });
    };

    componentDidUpdate = () => {
        if (Object.keys(this.props.portfolioToEdit).length > 0) {
            const {
                id,
                name,
                url,
                position,
                category,
                description,
                thumb_image_url,
                banner_image_url,
                logo_url,
            } = this.props.portfolioToEdit.portfolioItem;

            this.props.clearPortfolioToEdit();

            this.setState({
                id,
                name,
                url,
                position,
                category,
                description,
                thumb_image_url: thumb_image_url || '',
                banner_image_url: banner_image_url || '',
                logo_url: logo_url || '',
                editMode: true,
                apiUrl: `https://a12989x.devcamp.space/portfolio/portfolio_items/${id}`,
                apiAction: 'patch',
            });
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <h1 className="title">Form</h1>
                <label>
                    Portfolio Name
                    <input
                        className="name"
                        type="text"
                        name="name"
                        autoComplete="off"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </label>

                <label>
                    URL
                    <input
                        className="url"
                        type="url"
                        name="url"
                        autoComplete="off"
                        value={this.state.url}
                        onChange={this.handleChange}
                    />
                </label>

                <label>
                    Position
                    <input
                        className="position"
                        type="number"
                        min="1"
                        max="1000"
                        name="position"
                        autoComplete="off"
                        value={this.state.position}
                        onChange={this.handleChange}
                    />
                </label>

                <label>
                    Category
                    <select
                        className="category"
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                    >
                        <option value="eCommerce">eCommerce</option>
                        <option value="scheduling">Scheduling</option>
                        <option value="enterprise">Enterprise</option>
                    </select>
                </label>

                <label className="description">
                    Description
                    <textarea
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                </label>

                <div className="dropzone-container">
                    {this.state.thumb_image_url && this.state.editMode ? (
                        <DropzoneComponent>
                            <div className="dz-preview dz-processing dz-image-preview dz-success dz-complete">
                                <div className="dz-image">
                                    <img
                                        alt={this.state.id}
                                        className="data-dz-thumbnail"
                                        src={this.state.thumb_image_url}
                                    />
                                </div>
                                <button
                                    className="remove"
                                    onClick={(e) => {
                                        this.deleteImage('thumb_image');
                                        e.preventDefault();
                                    }}
                                >
                                    Remove File
                                </button>
                            </div>
                        </DropzoneComponent>
                    ) : (
                        <DropzoneComponent
                            ref={this.thumbRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleThumbDrop()}
                        >
                            <div className="dz-message">Thmbnail</div>
                        </DropzoneComponent>
                    )}

                    {this.state.banner_image_url && this.state.editMode ? (
                        <DropzoneComponent>
                            <div className="dz-preview dz-processing dz-image-preview dz-success dz-complete">
                                <div className="dz-image">
                                    <img
                                        alt={this.state.id}
                                        className="data-dz-thumbnail"
                                        src={this.state.banner_image_url}
                                    />
                                </div>
                                <button
                                    className="remove"
                                    onClick={(e) => {
                                        this.deleteImage('banner_image');
                                        e.preventDefault();
                                    }}
                                >
                                    Remove File
                                </button>
                            </div>
                        </DropzoneComponent>
                    ) : (
                        <DropzoneComponent
                            ref={this.bannerRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleBannerDrop()}
                        >
                            <div className="dz-message">Banner</div>
                        </DropzoneComponent>
                    )}

                    {this.state.logo_url && this.state.editMode ? (
                        <DropzoneComponent>
                            <div className="dz-preview dz-processing dz-image-preview dz-success dz-complete">
                                <div className="dz-image">
                                    <img
                                        alt={this.state.id}
                                        className="data-dz-thumbnail"
                                        src={this.state.logo_url}
                                    />
                                </div>
                                <button
                                    className="remove"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.deleteImage('logo');
                                    }}
                                >
                                    Remove File
                                </button>
                            </div>
                        </DropzoneComponent>
                    ) : (
                        <DropzoneComponent
                            ref={this.logoRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleLogoDrop()}
                        >
                            <div className="dz-message">Logo</div>
                        </DropzoneComponent>
                    )}
                </div>

                <button className="primary-btn" type="submit">
                    Save
                </button>
            </form>
        );
    }
}

export default PortfolioForm;
