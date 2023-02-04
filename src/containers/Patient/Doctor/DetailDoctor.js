import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let nameEn = '';
        let nameVi = '';
        let { language } = this.props;
        let { dataDetailDoctor } = this.state;
        if (dataDetailDoctor && dataDetailDoctor.positionData) {
            nameEn = `${dataDetailDoctor.positionData.valueEn}, ${dataDetailDoctor.firstName} ${dataDetailDoctor.lastName}`
            nameVi = `${dataDetailDoctor.positionData.valueVi}, ${dataDetailDoctor.lastName} ${dataDetailDoctor.firstName}`
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='detail-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${dataDetailDoctor && dataDetailDoctor.image ? dataDetailDoctor.image : ''})` }}
                        ></div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {dataDetailDoctor.Markdown && dataDetailDoctor.Markdown.description &&
                                    <span>
                                        {dataDetailDoctor && dataDetailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorId={dataDetailDoctor && dataDetailDoctor.id ? dataDetailDoctor.id : -1}
                            />
                        </div>
                        <div className='content-right'></div>
                    </div>

                    <div className='detail-infor-doctor'>
                        {dataDetailDoctor && dataDetailDoctor.Markdown && dataDetailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailDoctor.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>

                    <div className='comment-doctor'>

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
