import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imagebase64: '',
            contentMarkdown: '',
            contentHTML: '',
            address: ''
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeText = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imagebase64: base64
            })
        }
    }

    handleSaveClinic = async () => {
        let res = await createNewClinic({
            name: this.state.name,
            imagebase64: this.state.imagebase64,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            address: this.state.address
        })
        if (res && res.errCode === 0) {
            toast.success("Create new clinic success")
        } else {
            toast.error("Create new clinic error")
        }
    }

    render() {
        return (
            <div className='manage-clinic-container'>
                <div className='m-c-title'>Quản lí phòng khám</div>
                <div className='manage-clinic-body row'>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input type='text' className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'name')} />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input type='text' className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'address')} />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input type='file' className='form-control-file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                    <div className='col-12 form-group'>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save'
                            onClick={() => this.handleSaveClinic()}
                        >Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
