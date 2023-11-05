import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Table, Space, Input } from "antd";
import { LANGUAGE } from "../../../utils";
import moment from "moment";

export default class TableManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameFilter: "",
            filteredData: [],
        };
    }

    handleConfirm = (user) => {
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
            data.map((item) => {
                return {
                    key: item.id,
                    email: item.patientData.email,
                    fullName: item.patientData.lastName,
                    address: item.patientData.address,
                    phoneNumber: item.patientData.phoneNumber,
                    birthday: moment
                        .unix(+item.patientData.birthday / 1000)
                        .format("DD/MM/YYYY"),
                    genderValueVi: item.patientData.genderData.valueVi,
                    genderValueEn: item.patientData.genderData.valueEn,
                    timeTypeValueVi: item.timeTypeDataPatient.valueVi,
                    timeTypeValueEn: item.timeTypeDataPatient.valueEn,
                    reason: item.reason,
                };
            });

        //Tạo columns
        const columns = [
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                defaultSortOrder: "descend",
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: language === LANGUAGE.EN ? "FullName" : "Họ và tên",
                dataIndex: "fullName",
                key: "fullName",
                filterDropdown: () => (
                    <div style={{ padding: 8 }}>
                        <Input
                            placeholder="Search name"
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
                title: language === LANGUAGE.EN ? "BirthDay" : "Ngày sinh",
                dataIndex: "birthday",
                key: "birthday",
            },
            {
                title: language === LANGUAGE.EN ? "Gender" : "Giới tính",
                dataIndex:
                    language === LANGUAGE.EN
                        ? "genderValueEn"
                        : "genderValueVi",
                key: "gender",
            },
            {
                title:
                    language === LANGUAGE.EN
                        ? "Appointment time"
                        : "Thời gian lịch hẹn khám",
                dataIndex:
                    language === LANGUAGE.EN
                        ? "timeTypeValueEn"
                        : "timeTypeValueVi",
                key: "gender",
            },
            {
                title:
                    language === LANGUAGE.EN
                        ? "Reason for examination"
                        : "Lý do",
                dataIndex: "reason",
                key: "reason",
            },
            {
                title: "Action",
                key: "action",
                render: (_, record) => (
                    <Space size="middle">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                this.handleConfirm(record);
                            }}
                        >
                            {/* <FormattedMessage id={"actions.edit"} /> */}
                            Xác nhận
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                // this.props.deleteUser(record.id);
                            }}
                        >
                            {/* <FormattedMessage id={"actions.delete"} /> */}
                            Gửi kết quả
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
                    return record.lastName
                        .toLowerCase()
                        .includes(nameFilter.toLowerCase());
                });
            }

            this.setState({ filteredData }, () => {
                console.log(this.state.filteredData);
            });
        };

        return (
            <div className="mt-5">
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
                            {/* <FormattedMessage id={"manage-user.listUser"} /> */}
                            Danh sách lịch hẹn
                        </h3>
                    )}
                />
            </div>
        );
    }
}
