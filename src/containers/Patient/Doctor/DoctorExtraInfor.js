
import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './DoctorExtraInfor.scss';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        }
    }

    componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    showHideDetailInfor = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        let { isShow } = this.state;
        return (
            <>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                        <div className='name-clinic'>Phòng khám Bệnh viện Đại học Y Dược 1</div>
                        <div className='detail-address'>20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</div>
                    </div>
                    <div className='content-down'>
                        {isShow === false ?
                            <div className='short-infor'>GIÁ KHÁM: 300.000đ.
                                <span onClick={() => this.showHideDetailInfor()}>Xem chi tiết</span>
                            </div>
                            :
                            <>
                                <div className='title-price'>GIÁ KHÁM: </div>
                                <div className='detail-infor'>
                                    <div className='price'>
                                        <span className='left'>Giá khám</span>
                                        <span className='right'>300.000đ</span>
                                    </div>
                                    <div className='note'>Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD</div>
                                </div>
                                <div className='payment'>Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
                                <div className='hide'>
                                    <span onClick={() => this.showHideDetailInfor()}>Ẩn bảng giá</span>
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
