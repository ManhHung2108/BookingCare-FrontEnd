import React, { Component } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import "./ManageDoctor.scss";
import {
    getAllDoctorAction,
    getRequiredDoctorInfor,
    saveDetailDoctorAction,
} from "../../../redux/actions/adminAction";
import { CRUD_ACTIONS, LANGUAGE } from "../../../utils/constants";
import { getDetailDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */); //convert HTML sang Text

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            selectedDoctor: "",
            action: "",
            listDoctor: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            selectedPrice: "",
            listPayment: [],
            selectedPayment: "",
            listProvince: [],
            selectedProvice: "",
            nameClinic: "",
            addressClinic: "",
            note: "",
        };
    }

    componentDidMount() {
        this.handleGetAllDoctor();
        this.props.getAllDoctorInfor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctorRedux !== this.props.listDoctorRedux) {
            this.setState({
                listDoctor: this.props.listDoctorRedux,
            });
        }
        if (prevProps.listPriceRedux !== this.props.listPriceRedux) {
            this.setState({
                listPrice: this.props.listPriceRedux,
            });
        }
        if (prevProps.listPaymentRedux !== this.props.listPaymentRedux) {
            this.setState({
                listPayment: this.props.listPaymentRedux,
            });
        }
        if (prevProps.listProvinceRedux !== this.props.listProvinceRedux) {
            this.setState({
                listProvince: this.props.listProvinceRedux,
            });
        }
    }

    handleGetAllDoctor = () => {
        this.props.getAllDoctor();

        this.setState({
            listDoctor: this.props.listDoctorRedux,
        });
    };

    //Chú ý đặt arrow func để có thể truy cập this.setState
    handleEditorChange = ({ html, text }) => {
        // console.log("handleEditorChange: ", html, text);
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleChangeDesc = (e) => {
        this.setState({ description: e.target.value });
    };

    handleSaveContentMarkdown = async () => {
        // console.log("check state: ", this.state);
        let { hasOldData } = this.state;
        let data = {
            doctorId: this.state.selectedDoctor,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        };
        //Gửi cục data lên server để check cần sửa hay tạo mới
        await this.props.saveDetailDoctor(data);

        this.setState({
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            selectedDoctor: "",
            hasOldData: false,
        });
    };

    handleSelectDoctor = async (value) => {
        this.setState({
            selectedDoctor: value,
        });

        let response = await getDetailDoctor(value);
        //check xem đã có thông tin chưa
        if (
            response &&
            response.errCode === 0 &&
            response.data &&
            response.data.Markdown
        ) {
            let markdown = response.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true, //có set là true
            });
        } else {
            this.setState({
                contentMarkdown: "",
                contentHTML: "",
                description: "",
                hasOldData: false, //chưa có
            });
        }
    };

    render() {
        const { Option } = Select;
        const {
            selectedDoctor,
            listDoctor,
            hasOldData,
            listPrice,
            listPayment,
            listProvince,
        } = this.state;
        const { language } = this.props;
        // console.log(language);
        return (
            <div className="manage-doctor-container container">
                <div className="manage-doctor-title">
                    <FormattedMessage id={"admin.manage-doctor.title"} />
                </div>
                <div className="more-infor row">
                    <div className="content-left col-5">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.select-doctor"}
                            />
                        </label>
                        <br />
                        <Select
                            showSearch
                            placeholder="Chọn bác sĩ"
                            style={{ width: "100%" }}
                            onChange={this.handleSelectDoctor}
                            value={selectedDoctor}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {/* Render các Option từ dữ liệu API */}
                            {listDoctor.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {language === LANGUAGE.VI
                                        ? `${item.firstName} ${item.lastName}`
                                        : `${item.lastName} ${item.firstName}`}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="content-right col-7">
                        <label htmlFor="description">
                            <FormattedMessage
                                id={"admin.manage-doctor.intro"}
                            />
                        </label>
                        <textarea
                            id="description"
                            className="form-control"
                            // rows={4}
                            onChange={(e) => {
                                this.handleChangeDesc(e);
                            }}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-infor-extra row mt-3">
                    <div className="col-4 form-group">
                        <label>Chọn giá</label>
                        <br />
                        <Select
                            showSearch
                            placeholder="Chọn giá"
                            style={{ width: "100%" }}
                            // onChange={this.handleSelectDoctor}
                            // value={selectedDoctor}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {/* Render các Option từ dữ liệu API */}
                            {listPrice.map((item) => (
                                <Option key={item.id} value={item.keyMap}>
                                    {language === LANGUAGE.VI
                                        ? item.valueVi
                                        : item.valueEn}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn phương thức thanh toán</label>
                        <br />
                        <Select
                            showSearch
                            placeholder="Chọn phương thức thanh toán"
                            style={{ width: "100%" }}
                            // onChange={this.handleSelectDoctor}
                            // value={selectedDoctor}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {/* Render các Option từ dữ liệu API */}
                            {listPayment.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {language === LANGUAGE.VI
                                        ? item.valueVi
                                        : item.valueEn}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn phương tỉnh thành</label>
                        <br />
                        <Select
                            showSearch
                            placeholder="Chọn tỉnh thành"
                            style={{ width: "100%" }}
                            // onChange={this.handleSelectDoctor}
                            // value={selectedDoctor}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {/* Render các Option từ dữ liệu API */}
                            {listProvince.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {language === LANGUAGE.VI
                                        ? item.valueVi
                                        : item.valueEn}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="col-4 form-group">
                        <label>Tên phòng khám</label>
                        <br />
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <br />
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Note</label>
                        <br />
                        <input className="form-control" />
                    </div>
                </div>
                <div className="manage-doctor-editor mt-3">
                    <MdEditor
                        value={this.state.contentMarkdown}
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    className={
                        hasOldData === true
                            ? "btn btn-warning mt-3"
                            : "btn btn-primary mt-3"
                    }
                    onClick={() => {
                        this.handleSaveContentMarkdown();
                    }}
                >
                    {hasOldData ? (
                        <FormattedMessage id={"admin.manage-doctor.save"} />
                    ) : (
                        <FormattedMessage id={"admin.manage-doctor.add"} />
                    )}
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.appReducer.language,
        listDoctorRedux: state.adminReducer.listDoctor,
        listPriceRedux: state.adminReducer.prices,
        listPaymentRedux: state.adminReducer.payments,
        listProvinceRedux: state.adminReducer.provinces,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => {
            return dispatch(getAllDoctorAction());
        },
        getAllDoctorInfor: () => {
            return dispatch(getRequiredDoctorInfor());
        },
        saveDetailDoctor: (data) => {
            return dispatch(saveDetailDoctorAction(data));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
