import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicByIdService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicByIdService(id);
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        return (
            <div className='detail-clinic-container'>
                <HomeHeader />
                <div className='image-clinic'
                    style={{ backgroundImage: `url(${dataDetailClinic.image})` }}
                >
                </div>
                <div className='description-clinic'>
                    {dataDetailClinic && dataDetailClinic.Markdown && dataDetailClinic.Markdown.contentHTML &&
                        <>
                            <h3 className='name-clinic'>{dataDetailClinic.name}</h3>
                            <div className='address-clinic'>{dataDetailClinic.address}</div>
                            <div className='background-description'
                            >
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.Markdown.contentHTML }}
                                    className='description-html'
                                >

                                </div>
                            </div>
                        </>
                    }
                </div>

                <div className='detail-clinic-body'>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor'
                                    key={index}
                                >
                                    <div className='dt-content-left'>
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescription={true}
                                            isShowPrice={false}
                                            isShowMoreInfor={true}
                                        />
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorId={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorId={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
