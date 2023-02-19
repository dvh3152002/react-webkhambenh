import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./BookingModal.scss";
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postBookingAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment, { lang } from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',

            genders: []
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let { genders } = this.props;
            this.setState({
                genders: this.buildDataGender(genders),
            })
        }
        if (this.props.genders !== prevProps.genders) {
            let { genders } = this.props;
            this.setState({
                genders: this.buildDataGender(genders),
            })
        }

        if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
            let dataScheduleTimeModal = this.props.dataScheduleTimeModal;
            let doctorId, timeType = '';

            if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
                doctorId = dataScheduleTimeModal.doctorId
                timeType = dataScheduleTimeModal.timeType
            }
            this.setState({
                doctorId: doctorId,
                timeType: timeType
            })
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    handleOnChangeInput = (event, id) => {
        let value = event.target.value;
        let copyState = { ...this.state };
        copyState[id] = value;
        this.setState({
            ...copyState
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedGender) => {
        this.setState({ selectedGender: selectedGender })
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
            return `${time} - ${this.capitalizeFirstLetter(date)}`
        }
        return ``
    }

    renderDoctorName(dataTime) {
        if (dataTime && !_.isEmpty(dataTime)) {
            let nameEn = `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            let nameVi = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
            let name = this.props.language === LANGUAGES.VI ? nameVi : nameEn
            return name;
        }
        return ``
    }

    confirmBooking = async () => {
        // !data.email || !data.doctorId || !data.timeType || !data.date
        let birthday = new Date(this.state.birthday).getTime();
        let date = new Date(this.props.dataScheduleTimeModal.date).getTime();
        let timeString = this.renderDataTime(this.props.dataScheduleTimeModal);
        let doctorName = this.renderDoctorName(this.props.dataScheduleTimeModal);
        let res = await postBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            birthday: birthday,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            doctorName: doctorName,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString
        })
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment success");
            this.props.closeBookingModal();
        } else {
            toast.error("Booking a new appointment fail");
        }
    }

    render() {
        let { isOpenModalBooking, closeBookingModal, dataScheduleTimeModal } = this.props;
        let doctorId = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : '';
        return (
            <Modal isOpen={isOpenModalBooking}
                size='lg'
                centered
                className='booking-modal-container'
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                        <span className='right'
                            onClick={closeBookingModal}
                        ><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescription={false}
                                dataScheduleTimeModal={dataScheduleTimeModal}
                                isShowPrice={true}
                                isShowMoreInfor={false}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.fullName' /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'fullName') }}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.phoneNumber' /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'reason') }}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                <DatePicker onChange={this.handleOnChangeDatePicker}
                                    value={this.state.birthday}
                                    className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm' onClick={() => this.confirmBooking()}>
                            <FormattedMessage id='patient.booking-modal.btn-confirm' />
                        </button>
                        <button className='btn-booking-cancel' onClick={closeBookingModal}>
                            <FormattedMessage id='patient.booking-modal.btn-cancel' />
                        </button>
                    </div>
                </div>
            </Modal >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
