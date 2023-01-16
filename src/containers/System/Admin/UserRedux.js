import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllcodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }

    state = {

    }

    async componentDidMount() {
        //không dùng redux
        // let res = await getAllcodeService('gender');
        // if (res && res.errCode === 0) {
        //     this.setState({
        //         genderArr: res.data
        //     })
        // }

        //dùng redux
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            let genderArr = this.props.genders
            this.setState({
                genderArr: genderArr,
                gender: genderArr && genderArr.length > 0 ? genderArr[0].key : ''
            })
        }

        if (prevProps.position !== this.props.position) {
            let positionArr = this.props.position
            this.setState({
                positionArr: positionArr,
                position: positionArr && positionArr.length > 0 ? positionArr[0].key : ''
            })
        }

        if (prevProps.roles !== this.props.roles) {
            let roleArr = this.props.roles
            this.setState({
                roleArr: roleArr,
                role: roleArr && roleArr.length > 0 ? roleArr[0].key : ''
            })
        }

        if (prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    handleOnChangeImg = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let urlImg = URL.createObjectURL(file);
            this.setState({
                previewImgURL: urlImg,
                avatar: file
            })
        }
    }

    onClickPreviewImg = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        //fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        })
    }

    checkValidateInput = () => {
        let arr = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(arr[i] + "is exist ");
                return false;
            }
        }

    }

    render() {
        let { genderArr, positionArr, roleArr, isOpen, email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;
        let { language } = this.props;
        return (
            <div className='user-redux-container'>
                <div className='title'>User Redux</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input type='email' className='form-control'
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input type='password' className='form-control'
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input type='text' className='form-control'
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input type='text' className='form-control'
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input type='text' className='form-control'
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                />
                            </div>

                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input type='text' className='form-control'
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'gender')}
                                >
                                    {genderArr && genderArr.length > 0 &&
                                        genderArr.map((item, index) => {
                                            return (
                                                <option value={item.key} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'position')}
                                >
                                    {positionArr && positionArr.length > 0 &&
                                        positionArr.map((item, index) => {
                                            return (
                                                <option value={item.key} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'role')}
                                >
                                    {roleArr && roleArr.length > 0 && roleArr.map((item, index) => {
                                        return (
                                            <option value={item.key} key={index}>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input type='file' id='previewImg' hidden onChange={(event) => this.handleOnChangeImg(event)} />
                                    <label htmlFor='previewImg' className='label-upload'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image' style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.onClickPreviewImg()}
                                    ></div>
                                </div>
                            </div>

                            <div className='col-12 my-2'>
                                <button className='btn btn-primary'
                                    onClick={() => this.handleSaveUser()}
                                ><FormattedMessage id="manage-user.save" /></button>
                            </div>

                            <div className='col-12 mb-5'>
                                <TableManageUser />
                            </div>
                        </div>

                        {isOpen &&
                            <Lightbox
                                mainSrc={this.state.previewImgURL}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        position: state.admin.position,
        roles: state.admin.roles,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
