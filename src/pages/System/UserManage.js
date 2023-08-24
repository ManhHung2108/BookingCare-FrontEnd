import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { getAllUsers } from "../../services/userService";
import "./UserManage.scss";

class UserManage extends Component {
    constructor(props) {
        super(props);
        //state để dùng lưu biến trong component
        this.state = {
            arrUsers: [],
        };
    }

    async componentDidMount() {
        let response = await getAllUsers("ALL");
        // console.log(response);
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
    }

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
                <div className="title text-center">Manage user</div>
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
