import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Table, Space, Input } from "antd";
import { LANGUAGE } from "../../../utils";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
}

export default class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameFilter: "",
            filteredData: [],
        };
    }

    handleEditUser = (user) => {
        //Gửi data sang parent để lưu data vào form
        this.props.handleEditUserFromParent(user);
    };
    render() {
        let { data, language } = this.props;
        let { nameFilter, filteredData } = this.state;

        //Tạo key props khi render
        const dataSource =
            data &&
            data.length > 0 &&
            data.map((item) => ({ ...item, key: item.id }));

        //Tạo columns
        const columns = [
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                defaultSortOrder: "descend",
                sorter: (a, b) => a.id - b.id,
                filterDropdown: () => (
                    <div style={{ padding: 8 }}>
                        <Input
                            placeholder="Search email"
                            value={nameFilter}
                            onChange={(e) =>
                                this.setState({
                                    nameFilter: e.target.value,
                                })
                            }
                            onPressEnter={handleFilter}
                        />
                    </div>
                ),
            },
            {
                title: language === LANGUAGE.EN ? "First Name" : "Họ",
                dataIndex: "firstName",
                key: "firstName",
            },
            {
                title: language === LANGUAGE.EN ? "Last Name" : "Tên",
                dataIndex: "lastName",
                key: "lastName",
            },
            {
                title:
                    language === LANGUAGE.EN ? "Phone Number" : "Số điện thoại",
                dataIndex: "phoneNumber",
                key: "phoneNumber",
            },
            {
                title: language === LANGUAGE.EN ? "Address" : "Địa chỉ",
                dataIndex: "address",
                key: "address",
            },
            {
                title: "Action",
                key: "action",
                render: (_, record) => (
                    <Space size="middle">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                this.handleEditUser(record);
                            }}
                        >
                            <FormattedMessage id={"actions.edit"} />
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                // console.log(record.id);
                                this.props.deleteUser(record.id);
                            }}
                        >
                            <FormattedMessage id={"actions.delete"} />
                        </button>
                    </Space>
                ),
            },
        ];

        // Hàm xử lý bộ lọc
        const handleFilter = () => {
            let filteredData = dataSource;
            if (nameFilter) {
                filteredData = filteredData.filter((record) => {
                    return record.email
                        .toLowerCase()
                        .includes(nameFilter.toLowerCase());
                });
            }
            this.setState({ filteredData });
        };

        return (
            <div className="container mt-5">
                <Table
                    dataSource={
                        filteredData &&
                        filteredData.length > 0 &&
                        nameFilter !== ""
                            ? filteredData
                            : dataSource
                    }
                    columns={columns}
                    bordered
                    title={() => (
                        <h3>
                            <FormattedMessage id={"manage-user.listUser"} />
                        </h3>
                    )}
                />
                <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </div>
        );
    }
}
