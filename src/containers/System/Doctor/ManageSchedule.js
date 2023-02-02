import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';

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
            this.setState({
                rangeTime: this.props.time
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
                                    <button className='btn btn-schedule' key={index}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'><FormattedMessage id='manage-schedule.save' /></button>
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
