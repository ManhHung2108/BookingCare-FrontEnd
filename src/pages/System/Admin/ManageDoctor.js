import React, { Component } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import "./ManageDoctor.scss";
import {
    getAllDoctorAction,
    saveDetailDoctorAction,
} from "../../../redux/actions/adminAction";
import { CRUD_ACTIONS, LANGUAGE } from "../../../utils/constants";
import { getDetailDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */); //convert HTML sang Text

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            listDoctor: [],
            selectedDoctor: "",
            hasOldData: false,
            action: "",
        };
    }

    componentDidMount() {
        this.handleGetAllDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctorRedux !== this.props.listDoctorRedux) {
            this.setState({
                listDoctor: this.props.listDoctorRedux,
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
        const { selectedDoctor, listDoctor, hasOldData } = this.state;
        const { language } = this.props;
        // console.log(language);
        return (
            <div className="manage-doctor-container container">
                <div className="manage-doctor-title">
                    Tạo thêm thông tin Bác sĩ
                </div>
                <div className="more-infor row">
                    <div className="content-left col-5">
                        <label>Chọn bác sĩ</label>
                        <br />
                        <Select
                            showSearch
                            placeholder="Chọn một mục"
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
                            Thông tin giới thiệu:
                        </label>
                        <textarea
                            id="description"
                            className="form-control"
                            rows={4}
                            onChange={(e) => {
                                this.handleChangeDesc(e);
                            }}
                            value={this.state.description}
                        ></textarea>
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
                    {hasOldData ? "Lưu thông tin" : "Tạo thông tin"}
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.appReducer.language,
        listDoctorRedux: state.adminReducer.listDoctor,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => {
            return dispatch(getAllDoctorAction());
        },
        saveDetailDoctor: (data) => {
            return dispatch(saveDetailDoctorAction(data));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
