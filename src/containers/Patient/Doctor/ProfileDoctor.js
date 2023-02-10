import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';

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

    render() {
        let { dataProfile } = this.state;
        let nameEn = '';
        let nameVi = '';
        let { language } = this.props;
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
                            {dataProfile.Markdown && dataProfile.Markdown.description &&
                                <span>
                                    {dataProfile && dataProfile.Markdown.description}
                                </span>
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
