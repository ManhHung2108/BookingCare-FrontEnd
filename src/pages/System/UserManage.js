import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { getAllUsers, createNewUserService } from "../../services/userService";
import "./UserManage.scss";
import ModalUser from "../../components/System/ModalUser";

class UserManage extends Component {
    constructor(props) {
        super(props);
        //state để dùng lưu biến trong component
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    //Get all user
    getAllUserFromReact = async () => {
        let response = await getAllUsers("ALL");

        if (response && response.errCode === 0) {
            this.setState(
                {
                    arrUsers: response.users,
                },
                () => {
                    //kiểm tra state sau khi setState lại bởi this.setState chạy bất đồng bộ
                    // console.log(this.state.arrUsers);
                }
            );
        }
    };

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    //Add a User
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);

            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
            }

            console.log("response create user: ", response);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        // console.log("render: ", this.state.arrUsers); //chạy 2 lần do một lần mount và một lần setState
        let { arrUsers } = this.state;

        let renderListUser = () => {
            //Lặp qua từng phần tử để render ra giao diện
            return arrUsers.map((user, index) => {
                return (
                    <tr key={index}>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.address}</td>
                        <td>
                            <button className="btn-Edit">
                                <i className="fas fa-pencil-alt" />
                            </button>
                            <button className="text-danger btn-Delete">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                );
            });
        };

        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggle={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className="title text-center">Manage user</div>
                <div>
                    <button
                        className="btn btn-primary px-3 mx-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i> Add New User
                    </button>
                </div>
                <div className="user-table mt-4 mx-3">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {arrUsers && <tbody>{renderListUser()}</tbody>}
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
