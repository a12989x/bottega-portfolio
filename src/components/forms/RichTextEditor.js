import React, { Component } from 'react';
// import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../css/react-draft-wysiwyg.css';

class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
    }

    componentDidMount() {
        this.getContent();
    }

    getContent = () => {
        console.log(this.props.editMode && this.props.contentToEdit);

        if (this.props.editMode && this.props.contentToEdit) {
            const blocksFromHtml = htmlToDraft(this.props.contentToEdit);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(
                contentBlocks,
                entityMap
            );
            const editorState = EditorState.createWithContent(contentState);

            this.setState({ editorState });
        }
    };

    onEditorStateChange = (editorState) => {
        this.setState(
            { editorState },
            this.props.handleRichTextEditorChange(
                draftToHtml(
                    convertToRaw(this.state.editorState.getCurrentContent())
                )
            )
        );
    };

    getBase64 = (file, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = (error) => {};
    };

    uploadFile = (file) => {
        return new Promise((resolve, reject) => {
            this.getBase64(file, (data) => resolve({ data: { link: data } }));
        });
    };

    render() {
        return (
            <Editor
                editorState={this.state.editorState}
                wrapperClassName="demo-wrapper"
                editorClassname="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: {
                        uploadCallback: this.uploadFile,
                        alt: { present: true, mandatory: false },
                        previewImage: true,
                        inputAccept:
                            'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                    },
                }}
            />
        );
    }
}

export default RichTextEditor;

// const RichEditorText = (props) => {
//     const [editorState, setEditorState] = useState(EditorState.createEmpty());

//     const onEditorStateChange = (editorState) => {
//         setEditorState({ editorState });
//     };

//     useEffect(() => {
//         props.handleRichTextEditorChange(
//             draftToHtml(convertToRaw(editorState.getCurrentContent()))
//         );
//     }, [editorState]);

//     return (
//         <Editor
//             editorState={editorState}
// wrapperClassName="demo-wrapper"
// editorClassname="demo-editor"
//             onEditorStateChange={onEditorStateChange}
//         />
//     );
// };

// export default RichEditorText;
