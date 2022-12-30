import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash'

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let { user } = this.props
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'password',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggle()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleEditUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editUser(this.state)
        }
    }

    render() {
        let { email, password, firstName, lastName, address } = this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className='modal-user-container'
                size='lg'
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='email' onChange={(event) => this.handleOnChangeInput(event, 'email')} value={email} disabled />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => this.handleOnChangeInput(event, 'password')} value={password} disabled />
                        </div>
                        <div className='input-container'>
                            <label>Firstname</label>
                            <input type='text' onChange={(event) => this.handleOnChangeInput(event, 'firstName')} value={firstName} />
                        </div>
                        <div className='input-container'>
                            <label>Lastname</label>
                            <input type='text' onChange={(event) => this.handleOnChangeInput(event, 'lastName')} value={lastName} />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={(event) => this.handleOnChangeInput(event, 'address')} value={address} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.handleEditUser()}>
                        Add user
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
