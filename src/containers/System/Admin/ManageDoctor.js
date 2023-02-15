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
            dataSpecialty: [],
            dataClinic: [],
            selectPrice: '',
            selectPayment: '',
            selectProvince: '',
            selectSpecialty: '',
            selectClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

        }
    }

    buildDataSelect = (data, type) => {
        let result = [];
        let { language } = this.props
        if (data && data.length > 0) {
            if (type === 'user') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;

                    object.value = item.id;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    result.push(object);
                })
            }

            if (type === 'price') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} đồng`;
                    let labelEn = `${item.valueEn} USD`;

                    object.value = item.keyMap;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    result.push(object);
                })
            }

            if (type === 'payment' || type === 'province') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = item.valueVi;
                    let labelEn = item.valueEn;

                    object.value = item.keyMap;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    result.push(object);
                })
            }

            if (type === 'specialty') {
                data.map((item, index) => {
                    let object = {};

                    object.value = item.id;
                    object.label = item.name;
                    result.push(object);
                })
            }
        }
        return result;
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchRequiredDoctorInfor();
        this.props.getAllSpecialty();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let data = this.buildDataSelect(this.props.allDoctor, 'user')
            this.setState({
                listDoctors: data
            })
        }

        if (prevProps.language !== this.props.language) {
            let { allDoctor, dataDoctorInfor } = this.props;
            let { dataPrice, dataPayment, dataProvince } = dataDoctorInfor;
            let data = this.buildDataSelect(allDoctor, 'user');
            let prices = this.buildDataSelect(dataPrice, 'price');
            let payments = this.buildDataSelect(dataPayment, 'payment');
            let provinces = this.buildDataSelect(dataProvince, 'province');
            this.setState({
                listDoctors: data,
                dataPrice: prices,
                dataPayment: payments,
                dataProvince: provinces
            })
        }

        if (prevProps.dataDoctorInfor !== this.props.dataDoctorInfor) {
            let { dataPrice, dataPayment, dataProvince } = this.props.dataDoctorInfor;
            let prices = this.buildDataSelect(dataPrice, 'price');
            let payments = this.buildDataSelect(dataPayment, 'payment');
            let provinces = this.buildDataSelect(dataProvince, 'province');

            this.setState({
                dataPrice: prices,
                dataPayment: payments,
                dataProvince: provinces
            })
        }

        if (prevProps.dataSpecialty !== this.props.dataSpecialty) {
            let specialty = this.buildDataSelect(this.props.dataSpecialty, 'specialty');
            this.setState({
                dataSpecialty: specialty
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
            action: this.state.hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
            selectPrice: this.state.selectPrice.value,
            selectPayment: this.state.selectPayment.value,
            selectProvince: this.state.selectProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectClinic ? this.state.selectClinic.value : '',
            specialtyId: this.state.selectSpecialty.value
        })

        this.setState({
            //save markdown
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            hasOldData: false,

            //save doctor-infor
            selectPrice: '',
            selectPayment: '',
            selectProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            selectClinic: '',
            selectSpecialty: ''
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, selectedDoctor)
        );
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let { dataPrice, dataPayment, dataProvince } = this.state;
            let selectPrice = '', selectPayment = '', selectProvince = '', addressClinic = '',
                nameClinic = '', note = '';


            if (res.data.Doctor_Infor) {
                let doctorInfor = res.data.Doctor_Infor;
                addressClinic = doctorInfor.addressClinic;
                nameClinic = doctorInfor.nameClinic;
                note = doctorInfor.note;

                selectPrice = dataPrice.find(item => {
                    return item && item.value === doctorInfor.priceId
                })
                selectPayment = dataPayment.find(item => {
                    return item && item.value === doctorInfor.paymentId
                })
                selectProvince = dataProvince.find(item => {
                    return item && item.value === doctorInfor.provinceId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                selectPrice: selectPrice,
                selectPayment: selectPayment,
                selectProvince: selectProvince,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: ''
            })
        }
    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let selectedName = name.name;
        let copyState = { ...this.state };
        copyState[selectedName] = selectedOption;
        this.setState({
            ...copyState
        })
    }

    handleOnChangeText = (event, name) => {
        let copyState = { ...this.state };
        copyState[name] = event.target.value
        this.setState({
            ...copyState
        })
    }

    render() {
        let { hasOldData, dataPrice, dataPayment, dataProvince, nameClinic, addressClinic, note } = this.state;
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
                            placeholder={<FormattedMessage id='admin.manage-doctor.select-doctor' />}
                        />
                    </div>

                    <div className='content-right'>
                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectPrice"
                            options={dataPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectPayment"
                            options={dataPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectProvince"
                            options={dataProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={note}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            value={this.state.selectSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name='selectSpecialty'
                            options={this.state.dataSpecialty}
                            placeholder={<FormattedMessage id='admin.manage-doctor.specialty' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.clinic" /></label>
                        <Select
                            value={this.state.selectClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name='selectClinic'
                            options={this.state.dataClinic}
                            placeholder={<FormattedMessage id='admin.manage-doctor.clinic' />}
                        />
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '300px' }}
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
        dataDoctorInfor: state.admin.dataDoctorInfor,
        dataSpecialty: state.admin.dataSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchRequiredDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInfor()),
        saveDoctor: (data) => dispatch(actions.saveDoctor(data)),
        getAllSpecialty: () => dispatch(actions.getAllSpecialty()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
