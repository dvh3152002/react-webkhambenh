
import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './DoctorExtraInfor.scss';
import { getExtraDoctorInfor } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if (this.props.doctorId) {
            let res = await getExtraDoctorInfor(this.props.doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.doctorId !== prevProps.doctorId) {
            let res = await getExtraDoctorInfor(this.props.doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        let { isShow, extraInfor } = this.state;
        return (
            <>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'><FormattedMessage id='patient.extra-doctor-infor.text-address' /></div>
                        <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                        <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                    </div>
                    <div className='content-down'>
                        {isShow === false ?
                            <div className='short-infor'><FormattedMessage id='patient.extra-doctor-infor.price' />
                                {extraInfor && extraInfor.priceData && LANGUAGES.VI === this.props.language
                                    &&
                                    <NumberFormat
                                        className='currency'
                                        value={extraInfor.priceData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                }
                                {extraInfor && extraInfor.priceData && LANGUAGES.EN === this.props.language
                                    &&
                                    <NumberFormat
                                        className='currency'
                                        value={extraInfor.priceData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                }
                                <span className='show' onClick={() => this.showHideDetailInfor()}><FormattedMessage id='patient.extra-doctor-infor.show' /></span>
                            </div>
                            :
                            <>
                                <div className='title-price'><FormattedMessage id='patient.extra-doctor-infor.price' /> </div>
                                <div className='detail-infor'>
                                    <div className='price'>
                                        <span className='left'><FormattedMessage id='patient.extra-doctor-infor.price' /></span>
                                        {extraInfor && extraInfor.priceData && LANGUAGES.VI === this.props.language
                                            &&
                                            <NumberFormat
                                                className='right'
                                                value={extraInfor.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {extraInfor && extraInfor.priceData && LANGUAGES.EN === this.props.language
                                            &&
                                            <NumberFormat
                                                className='right'
                                                value={extraInfor.priceData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </div>
                                    <div className='note'>{extraInfor && extraInfor.note ? extraInfor.note : ''}</div>
                                </div>
                                <div className='payment'><FormattedMessage id='patient.extra-doctor-infor.payment' />
                                    {extraInfor && extraInfor.paymentData && LANGUAGES.EN === this.props.language
                                        && extraInfor.paymentData.valueEn
                                    }
                                    {extraInfor && extraInfor.paymentData && LANGUAGES.VI === this.props.language
                                        && extraInfor.paymentData.valueVi
                                    }
                                </div>
                                <div className='hide'>
                                    <span className='show' onClick={() => this.showHideDetailInfor()}>Ẩn bảng giá</span>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
