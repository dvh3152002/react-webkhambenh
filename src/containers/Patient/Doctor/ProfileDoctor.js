import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getDataProfile(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getDataProfile = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctor(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getDataProfile(this.props.doctorId);
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderDataTime(dataTime) {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = this.props.language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = this.props.language === LANGUAGES.VI ? moment(new Date(dataTime.date)).format('dddd - DD/MM/YYYY')
                :
                moment(new Date(dataTime.date)).locale('en').format('dddd - MM/DD/YYYY')
                ;
            return (
                <>
                    <div>{time} - {this.capitalizeFirstLetter(date)}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state;
        let nameEn = '';
        let nameVi = '';
        let { language, isShowDescription, dataScheduleTimeModal } = this.props;
        console.log(dataScheduleTimeModal)
        if (dataProfile && dataProfile.positionData) {
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    ></div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescription === true ?
                                <>
                                    {dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span>
                                            {dataProfile && dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderDataTime(dataScheduleTimeModal)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='price'>
                    Giá khám:
                    {dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceData && LANGUAGES.VI === this.props.language
                        &&
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    }
                    {dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceData && LANGUAGES.EN === this.props.language
                        &&
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
