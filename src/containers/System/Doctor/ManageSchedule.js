import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify';
import _ from 'lodash';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllCodeScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let data = this.buildDataSelect(this.props.allDoctor)
            this.setState({
                listDoctors: data
            })
        }
        if (prevProps.time !== this.props.time) {
            let data = this.props.time;
            if (data && data.length > 0) {
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })

                data = data.map(item => ({ ...item, isSelected: false }));
            }
            this.setState({
                rangeTime: data
            })
        }
        //  if (prevProps.language !== this.props.language) {
        //     let data = this.buildDataSelect(this.props.allDoctor)
        //     this.setState({
        //         listDoctors: data
        //     })
        // }
    }

    buildDataSelect = (data) => {
        let result = [];
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.value = item.id;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;

                result.push(object);
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleOnClickButton = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })

            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSave = () => {
        let { selectedDoctor, rangeTime, currentDate } = this.state;
        let result = [];
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid doctor");
            return;
        }

        if (!currentDate) {
            toast.error("Invalid date");
            return;
        }

        let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);

            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {};
                    object.date = formattedDate;
                    object.doctorId = selectedDoctor.value;
                    object.time = item.keyMap;
                    result.push(object);
                })

            } else {
                toast.error("Invalid selected time");
                return
            }
        }
    }

    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate={new Date()}
                                className='form-control' />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length && rangeTime.map((item, index) => {
                                return (
                                    <button className={item.isSelected === false ? 'btn btn-schedule' : 'btn btn-schedule active'}
                                        onClick={() => this.handleOnClickButton(item)}
                                        key={index}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSave()}
                            >
                                <FormattedMessage id='manage-schedule.save' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        time: state.admin.time
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllCodeScheduleTime: () => dispatch(actions.fetchAllCodeScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
