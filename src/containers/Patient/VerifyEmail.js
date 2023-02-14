import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import "./VerifyEmail.scss";

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVetify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let url = new URLSearchParams(this.props.location.search);
            let token = url.get('token');
            let doctorId = url.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVetify: true
                })
            } else {
                this.setState({
                    statusVetify: true,
                    errCode: -1
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { statusVetify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVetify === false ?
                        <div>Loading data ...</div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='infor'>
                                    Xác nhận lịch hẹn thành công
                                </div>
                                :
                                <div className='infor'>
                                    Lịch hẹn đã tồn tại hoặc đã được xác nhận
                                </div>
                            }
                        </div>
                    }
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
