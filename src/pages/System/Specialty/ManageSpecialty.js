import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Lightbox from "react-image-lightbox";

import "./ManageSpecialty.scss";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */); //convert HTML sang Text
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgUrl: "",

            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }

    componentDidMount() {}

    handleOnchangeInput = (event, key) => {
        let copyState = { ...this.state };
        copyState[key] = event.target.value;

        this.setState({
            ...copyState,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            //encode sang dạng base64
            let base64 = await CommonUtils.getBase64(file);
            // console.log("image base64: ", base64);

            //Tạo đường link ảo của HTML để xem được biến obj
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                imageBase64: base64,
            });

            // console.log("check file: ", objectUrl); //copy đường link này lên url để xem
        }
    };

    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return;
        //Chưa có ảnh click sẽ ko cho setState để mở preview full màn hình

        this.setState({
            isOpen: true,
        });
    };

    handleSaveNewSpecialty = async () => {
        let data = {
            name: this.state.name,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
        };

        let res = await createNewSpecialty(data);
        if (res && res.errCode === 0) {
            toast.success("Thêm chyên khoa thành công!");
            this.setState({
                name: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
            });
        } else {
            toast.error(res.errMessage);
        }

        // console.log("check result from handleSaveNewSpecialty: ", res);
    };

    render() {
        return (
            <div className="manage-specialty_container">
                <div className="ms-title">Quản lý chuyên khoa</div>
                <div className="add-new-specialty row mt-3">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={(e) => {
                                this.handleOnchangeInput(e, "name");
                            }}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <div className="preview-img-container">
                            <input
                                id="preview-img"
                                type="file"
                                hidden
                                onChange={(event) => {
                                    this.handleOnchangeImage(event);
                                }}
                            />
                            <label
                                htmlFor="preview-img"
                                className="lable-upload"
                            >
                                Tải ảnh
                                <i className="fas fa-upload"></i>
                            </label>
                            <div
                                className="preview-image_specialty"
                                style={{
                                    backgroundImage: `url(${this.state.previewImgUrl})`,
                                }}
                                onClick={() => {
                                    this.openPreviewImg();
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="manage-doctor-editor mt-3 col-12">
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            value={this.state.descriptionMarkdown}
                            onChange={this.handleEditorChange}
                        />
                    </div>

                    <div className="col-12">
                        <button
                            className="btn-save_specialty"
                            onClick={() => {
                                this.handleSaveNewSpecialty();
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/**Xử lý mở to người dùng click preview Image sẽ được phóng to */}
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.appReducer.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
