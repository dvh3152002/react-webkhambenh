import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.props.fetchAllUsersStart();
    }

    componentDidUpdate(prevState, prevProps, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                users: this.props.users
            })
        }
    }

    handleDeleteUser = (id) => {
        this.props.deleteUserStart(id);
    }

    render() {
        let { users } = this.state;
        return (
            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>

                    {users && users.length > 0
                        && users.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' ><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(item.id)}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
