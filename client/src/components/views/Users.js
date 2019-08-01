import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser
} from '../../redux/actions/userActions';

// reactstrap
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

// prop-types
import PropTypes from 'prop-types';

class Users extends Component {
  // *** STATE ***

  // set initital local state of component
  state = {
    addModal: false,
    updateModal: false,
    deleteModal: false,
    id: '',
    name: '',
    role: '',
    error: '',
    success: ''
  };

  // get app state by getUsers dispatch
  componentDidMount() {
    this.props.getUsers();
  }

  // set add modal state
  addToggle = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  };

  // set update modal state
  updateToggle = () => {
    this.setState({
      updateModal: !this.state.updateModal
    });
  };

  // set delete modal state
  deleteToggle = () => {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  };

  // set state when filling out form fields
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // *** ADD USERS ***

  // set form modals state
  onAddClick = () => {
    this.setState({
      addModal: true,
      updateModal: false,
      deleteModal: false,
      success: ''
    });
  };

  // render add form modal
  renderAddModal = () => {
    if (this.state.addModal) {
      return (
        <div>
          <Modal isOpen={this.state.addModal}>
            {/* <Modal isOpen='true'> */}
            <ModalHeader toggle={this.addToggle}>
              Add User
              {/* render validation error */}
              <p className='error'>{this.state.error}</p>{' '}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={this.onSubmitAddUser}>
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Add Name'
                    onChange={this.onChange}
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='role'>Role</label>
                  <input
                    type='text'
                    name='role'
                    id='role'
                    placeholder='Add Role'
                    onChange={this.onChange}
                    className='form-control'
                  />
                  <br />
                  <button className='btn btn-dark btn-block'>Add User</button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  };

  // submit add form and call addUser dispatch
  onSubmitAddUser = e => {
    const { name, role } = this.state;
    e.preventDefault();
    // form validation
    if (name === '' || role === '') {
      this.setState({
        error: 'Please fill in all fields'
      });
    } else {
      const newUser = {
        name: name,
        role: role
      };

      this.props.addUser(newUser);
      this.setState({
        addModal: false,
        error: '',
        success: 'User added successfully',
        name: '',
        role: ''
      });
    }
  };

  // *** UPDATE USER ***

  // set form modals state
  onUpdateClick = (id, name, role) => {
    console.log(id + ' clicked');
    console.log(name + ' clicked');
    this.setState({
      updateModal: true,
      addModal: false,
      deleteModal: false,
      id: id,
      name: name,
      role: role,
      success: ''
    });
  };

  // render update form modal
  renderUpdateModal = () => {
    if (this.state.updateModal) {
      return (
        <div>
          <Modal isOpen={this.state.updateModal}>
            {/* <Modal isOpen='true'> */}
            <ModalHeader toggle={this.updateToggle}>
              Update User - {this.state.id}
              {/* render validation error */}
              <p className='error'>{this.state.error}</p>{' '}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={this.onSubmitUpdateUser}>
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Update Name'
                    onChange={this.onChange}
                    defaultValue={this.state.name}
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='role'>Role</label>
                  <input
                    type='text'
                    name='role'
                    id='role'
                    placeholder='Update Role'
                    onChange={this.onChange}
                    defaultValue={this.state.role}
                    className='form-control'
                  />
                  <br />
                  <button className='btn btn-dark btn-block'>
                    Update User
                  </button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  };

  // submit update form and call updateUser dispatch
  onSubmitUpdateUser = e => {
    const { id, name, role } = this.state;
    e.preventDefault();
    // form validation
    if (name === '' || role === '') {
      this.setState({
        error: 'Please fill in all fields'
      });
    } else {
      const updatedUser = {
        name: name,
        role: role
      };

      this.props.updateUser(id, updatedUser);
      this.setState({
        updateModal: false,
        error: '',
        success: 'User updated successfully',
        name: '',
        role: ''
      });
    }
  };

  // *** DELETE USER ***

  // call deleteUser dispatch
  onDeleteClick = id => {
    this.setState({
      updateModal: false,
      addModal: false,
      deleteModal: true,
      id: id,
      // name: name,
      // role: role,
      success: ''
    });
  };

  // render update form modal
  renderDeleteModal = () => {
    if (this.state.deleteModal) {
      return (
        <div>
          <Modal isOpen={this.state.deleteModal}>
            {/* <Modal isOpen='true'> */}
            <ModalHeader toggle={this.deleteToggle}>
              Delet - {this.state.id}
            </ModalHeader>
            <ModalBody>
              <p className='error'>Are you sure?</p>{' '}
              <form onSubmit={this.onSubmitDeleteUser}>
                <button className='btn btn-dark btn-block'>Delete User</button>
              </form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  };

  // submit delete form and call deleteUser dispatch
  onSubmitDeleteUser = e => {
    const { id } = this.state;
    e.preventDefault();
    this.props.deleteUser(id);
    this.setState({
      deleteModal: false,
      error: '',
      success: 'User deleted successfully'
    });
  };

  // *** RENDER COMPONENT ***

  // render main view
  render() {
    const { users } = this.props.users;
    console.log(this.props.users);

    return (
      <div>
        {/* show modal based on state value */}
        {this.renderAddModal()}
        {this.renderUpdateModal()}
        {this.renderDeleteModal()}
        <p className='success'>{this.state.success}</p>{' '}
        <div className='container'>
          <button
            className='btn btn-primary'
            onClick={this.onAddClick}
            id='add-user-button'
          >
            Add User
          </button>
          <br />
          <br />
          <table className='table table-bordered table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className='btn btn-warning btn-sm'
                      onClick={() =>
                        this.onUpdateClick(user._id, user.name, user.role)
                      }
                    >
                      Update
                    </button>
                    &nbsp;
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => this.onDeleteClick(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// *** PROPS ***

// set prop types
Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

// dispatch actions to state in store
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(getUsers()); // no parameters required to get all users
    },
    addUser: newUser => {
      dispatch(addUser(newUser)); // need to include all relevant fields to Add a new object
    },
    deleteUser: id => {
      dispatch(deleteUser(id)); // need only the id (or array index) to Delete the object
    },
    updateUser: (id, updatedUser) => {
      dispatch(updateUser(id, updatedUser)); // need to include all relevant fields to Add a new object
    }
  };
};

// retrieve state from store and map to the component's props
const mapStateToProps = state => ({
  users: state.users
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
