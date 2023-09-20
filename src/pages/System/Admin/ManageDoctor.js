import React, { Component } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import "./ManageDoctor.scss";

const mdParser = new MarkdownIt(/* Markdown-it options */); //convert HTML sang Text

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            data: [
                {
                    id: "1",
                    name: "Đỗ Mạnh Hùng",
                },
                {
                    id: "2",
                    name: "Mạnh Quân",
                },
            ],
            selectedDoctor: "",
        };
    }

    componentDidUpdate(prevProps, prevState) {}

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

    handleSaveContentMarkdown = () => {
        console.log("check state: ", this.state);
    };

    handleChange = (value) => {
        this.setState({
            selectedDoctor: value,
        });
    };

    render() {
        const { Option } = Select;
        const { selectedDoctor, data } = this.state;
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
                            onChange={this.handleChange}
                            value={selectedDoctor}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {/* Render các Option từ dữ liệu API */}
                            {data.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
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
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => {
                        this.handleSaveContentMarkdown();
                    }}
                >
                    Lưu thông tin
                </button>
            </div>
        );
    }
}
export default connect()(ManageDoctor);
