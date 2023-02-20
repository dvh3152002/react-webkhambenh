import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import moment, { lang } from 'moment';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imagebase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
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

    sendEmailPatient = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let { isOpen, closeRemedyModal, dataModal } = this.props;
        return (
            <Modal isOpen={isOpen}
                size='lg'
                centered
                className='remedy-modal-container'
            >
                <div className='remedy-modal-header'>
                    <span className='left'>Gửi hóa đơn khám bệnh</span>
                    <span className='right'
                        onClick={closeRemedyModal}
                    ><i className='fas fa-times'></i></span>
                </div>
                <ModalBody>
                    <div className='modal-user-body row'>
                        <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input type='email' value={this.state.email} className='form-control'
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn file hóa đơn</label>
                            <input type='file' className='form-control-file'
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                        onClick={() => this.sendEmailPatient()}
                    >
                        Send
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={closeRemedyModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
