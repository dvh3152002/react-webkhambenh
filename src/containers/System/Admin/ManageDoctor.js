import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save markdown
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save doctor-infor
            dataPrice: [],
            dataPayment: [],
            dataProvince: [],
            selectPrice: '',
            selectPayment: '',
            selectProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    buildDataSelect = (data, type) => {
        let result = [];
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = type === 'user' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'user' ? `${item.firstName} ${item.lastName}` : item.valueEn;

                object.value = item.id;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;

                result.push(object);
            })
        }
        return result;
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchRequiredDoctorInfor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let data = this.buildDataSelect(this.props.allDoctor, 'user')
            this.setState({
                listDoctors: data
            })
        }

        if (prevProps.language !== this.props.language) {
            let { allDoctor, dataPrice, dataPayment, dataProvince } = this.props.dataDoctorInfor;
            let data = this.buildDataSelect(allDoctor);
            let prices = this.buildDataSelect(dataPrice);
            let payments = this.buildDataSelect(dataPayment);
            let provinces = this.buildDataSelect(dataProvince);
            this.setState({
                listDoctors: data,
                dataPrice: prices,
                dataPayment: payments,
                dataProvince: provinces
            })
        }

        if (prevProps.dataDoctorInfor !== this.props.dataDoctorInfor) {
            let { dataPrice, dataPayment, dataProvince } = this.props.dataDoctorInfor;
            let prices = this.buildDataSelect(dataPrice);
            let payments = this.buildDataSelect(dataPayment);
            let provinces = this.buildDataSelect(dataProvince);

            console.log("prices: ", prices, " payments: ", payments, " provinces: ", provinces)

            this.setState({
                dataPrice: prices,
                dataPayment: payments,
                dataProvince: provinces
            })
        }
    }


    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {
        this.props.saveDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: this.state.hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
        })
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            hasOldData: false
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, selectedDoctor)
        );
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData, dataPrice, dataPayment, dataProvince } = this.state;
        let { language } = this.props;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id='admin.manage-doctor.title' /></div>
                <div className='more-infor'>
                    <div className='content-left'>
                        <label><FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={language === LANGUAGES.VI ? "Chọn bác sĩ" : "Select doctor"}
                        />
                    </div>

                    <div className='content-right'>
                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectPrice}
                            // onChange={this.handleChangeSelect}
                            options={dataPrice}
                            placeholder={language === LANGUAGES.VI ? "Chọn giá" : "Select price"}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectPayment}
                            // onChange={this.handleChangeSelect}
                            options={dataPayment}
                            placeholder={language === LANGUAGES.VI ? "Chọn phương thức thanh toán" : "Select payment"}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectProvince}
                            // onChange={this.handleChangeSelect}
                            options={dataProvince}
                            placeholder={language === LANGUAGES.VI ? "Chọn tỉnh thành" : "Select province"}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control' />
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button className={hasOldData === true ? 'save-content-markdown' : 'create-content-markdown'}
                    onClick={() => { this.handleSaveContentMarkdown() }}
                >{hasOldData === true ? <FormattedMessage id='admin.manage-doctor.save' />
                    :
                    <FormattedMessage id='admin.manage-doctor.add' />}</button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctor,
        dataDoctorInfor: state.admin.dataDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchRequiredDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInfor()),
        saveDoctor: (data) => dispatch(actions.saveDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
