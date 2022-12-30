import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUserService, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            user: {}
        }
    }

    async componentDidMount() {
        await this.getAllUser();
    }

    getAllUser = async () => {
        let response = await getAllUserService("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    /*Life cycle
    Run component:
    1.Run construct->init state
    2.Did mount(set state)
    3.Render(re-render)
    */

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEdit: true,
            user: user
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    toggleUserModalEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUser();
                this.setState({
                    isOpenModal: false
                })
                // emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' }); truyen data
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    editUser = async (user) => {
        try {
            let res = await editUserService(user);
            console.log(res)
            if (res && res.errCode !== 0) {
                alert(res.errMessage)
            } else {
                await this.getAllUser();
                this.setState({
                    isOpenModalEdit: false
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUser();
            } else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let { arrUsers } = this.state;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggle={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEdit &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEdit}
                        user={this.state.user}
                        toggle={this.toggleUserModalEdit}
                        editUser={this.editUser}
                    />
                }
                <div className='title text-center'>Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}><i className='fas fa-plus'></i>Add new user</button>
                </div>
                <div className='users-table'>
                    <table id="customers" className='mt-3 mx-1'>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
