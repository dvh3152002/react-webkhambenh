
import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import moment, { lang } from 'moment';
import localization from 'moment/locale/vi';
import * as actions from '../../../store/actions';
import { getDateScheduleDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }

    componentDidMount() {
        let { language } = this.props;
        let allDays = this.getAllDays(language);
        this.setState({
            allDays: allDays
        })
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getAllDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            let ddMM = moment(new Date()).add(i, 'days').format('DD/MM');
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }

        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getAllDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let { allDays } = this.state;
            let res = await getDateScheduleDoctor(this.props.doctorId, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeDate = async (event) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let res = await getDateScheduleDoctor(this.props.doctorId, event.target.value);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }

    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select
                            onChange={(event) => this.handleOnChangeDate(event)}
                        >
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span>
                                    <FormattedMessage id='patient.schedule' />
                                </span>
                            </i>

                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0
                                ?
                                <>
                                    <div className='time-content-button'>
                                        {
                                            allAvailableTime.map((item, index) => {
                                                let timeType = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (
                                                    <button key={index}>{timeType}</button>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id='patient.choose' />
                                            <i className='far fa-hand-point-up'></i>
                                            <FormattedMessage id='patient.book-free' />
                                        </span>
                                    </div>
                                </>
                                :
                                <div className='no-schedule'><FormattedMessage id='patient.no-schedule' /></div>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
