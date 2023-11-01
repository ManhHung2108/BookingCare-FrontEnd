import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Lightbox from "react-image-lightbox";
import { FormattedMessage } from "react-intl";

import "./ManageClinic.scss";
import { CommonUtils, LANGUAGE } from "../../../utils";
import { createNewClinic, getAllCodeService } from "../../../services";
import { toast } from "react-toastify";
import { Select } from "antd";

const mdParser = new MarkdownIt(/* Markdown-it options */); //convert HTML sang Text
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgUrl: "",

            name: "",
            nameEn: "",
            address: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            selectedProvince: null,

            error: {
                name: false,
                nameEn: false,
                address: false,
                imageBase64: false,
                descriptionMarkdown: false,
                selectedProvince: false,
            },

            listProvince: [],
        };
    }

    async componentDidMount() {
        let resProvince = await getAllCodeService("PROVINCE");

        if (resProvince && resProvince.errCode === 0) {
            this.setState({
                listProvince: resProvince.data ? resProvince.data : [],
            });
        }
    }

    handleOnchangeInput = (event, key) => {
        let copyState = { ...this.state };
        copyState[key] = event.target.value;

        if (copyState[key] === "") {
            copyState.error[key] = true;
        } else {
            copyState.error[key] = false;
        }

        this.setState(
            {
                ...copyState,
            },
            () => {
                console.log(this.state);
            }
        );
    };

    handleEditorChange = ({ html, text }) => {
        let copyState = { ...this.state };
        copyState.descriptionMarkdown = text;
        copyState.descriptionHTML = html;

        if (copyState["descriptionMarkdown"] === "") {
            copyState.error.descriptionMarkdown = true;
        } else {
            copyState.error["descriptionMarkdown"] = false;
        }

        this.setState({
            ...copyState,
        });
    };

    handleOnchangeImage = async (event) => {
        let copyState = { ...this.state };
        let data = event.target.files;
        let file = data[0];
        if (file) {
            //encode sang dạng base64
            let base64 = await CommonUtils.getBase64(file);
            // console.log("image base64: ", base64);

            //Tạo đường link ảo của HTML để xem được biến obj
            let objectUrl = URL.createObjectURL(file);
            copyState.previewImgUrl = objectUrl;
            copyState.imageBase64 = base64;
            copyState.error.imageBase64 = false;
        } else {
            copyState.error.imageBase64 = true;
        }
        this.setState({ ...copyState });
    };

    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return;
        //Chưa có ảnh click sẽ ko cho setState để mở preview full màn hình

        this.setState({
            isOpen: true,
        });
    };

    isEmpty = () => {
        let copyState = { ...this.state };

        if (
            copyState.name === "" ||
            copyState.nameEn === "" ||
            copyState.imageBase64 === "" ||
            copyState.descriptionMarkdown === "" ||
            copyState.address === "" ||
            !copyState.selectedProvince
        ) {
            return true;
        }

        return false;
    };

    handleSaveNewClinic = async () => {
        if (this.isEmpty()) {
            toast.error("Yêu nhập đầy đủ thông tin!");
            return;
        } else {
            let data = {
                name: this.state.name,
                nameEn: this.state.nameEn,
                address: this.state.address,
                provinceId: this.state.selectedProvince,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            };

            let res = await createNewClinic(data);
            if (res && res.errCode === 0) {
                toast.success("Thêm chyên khoa thành công!");
                this.setState({
                    name: "",
                    nameEn: "",
                    imageBase64: "",
                    descriptionHTML: "",
                    descriptionMarkdown: "",
                    previewImgUrl: "",
                    address: "",
                    selectedProvince: null,

                    error: {
                        name: false,
                        nameEn: false,
                        imageBase64: false,
                        descriptionMarkdown: false,
                        address: false,
                        selectedProvince: false,
                    },
                });
            } else {
                toast.error(res.errMessage);
            }
        }
    };

    handleChangeSelect = (value, key) => {
        let copyState = { ...this.state };
        copyState[key] = value;

        if (copyState[key] === "") {
            copyState.error[key] = true;
        } else {
            copyState.error[key] = false;
        }

        this.setState({
            ...copyState,
        });

        this.setState(copyState);
    };

    render() {
        const { Option } = Select;
        const { listProvince, selectedProvince } = this.state;
        const { language } = this.props;
        return (
            <div className="manage-clinic_container">
                <div className="ms-title">
                    <FormattedMessage id={"admin.manage-clinic.title"} />
                </div>
                <div className="add-new-clinic row mt-3">
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-clinic.text-nameVi"}
                            />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={(e) => {
                                this.handleOnchangeInput(e, "name");
                            }}
                        />
                        <br />
                        {this.state.error.name && (
                            <span className="error">
                                <FormattedMessage
                                    id={"admin.manage-clinic.text-errnameVi"}
                                />
                            </span>
                        )}
                    </div>
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-clinic.text-nameEn"}
                            />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nameEn}
                            onChange={(e) => {
                                this.handleOnchangeInput(e, "nameEn");
                            }}
                        />
                        <br />
                        {this.state.error.nameEn && (
                            <span className="error">
                                <FormattedMessage
                                    id={"admin.manage-clinic.text-errnameEn"}
                                />
                            </span>
                        )}
                    </div>
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-clinic.text-address"}
                            />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.address}
                            onChange={(e) => {
                                this.handleOnchangeInput(e, "address");
                            }}
                        />
                        <br />
                        {this.state.error.address && (
                            <span className="error">
                                <FormattedMessage
                                    id={"admin.manage-clinic.text-erraddress"}
                                />
                            </span>
                        )}
                    </div>
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-clinic.text-province"}
                            />
                        </label>
                        <br />
                        <Select
                            showSearch
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.province"}
                                />
                            }
                            style={{ width: "100%" }}
                            onChange={(value) =>
                                this.handleChangeSelect(
                                    value,
                                    "selectedProvince"
                                )
                            }
                            value={selectedProvince}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {/* Render các Option từ dữ liệu API */}
                            {listProvince.map((item, index) => (
                                <Option key={index} value={item.keyMap}>
                                    {language === LANGUAGE.VI
                                        ? item.valueVi
                                        : item.valueEn}
                                </Option>
                            ))}
                        </Select>
                        {this.state.error.selectedProvince && (
                            <span className="error">
                                <FormattedMessage
                                    id={"admin.manage-clinic.text-errnameEn"}
                                />
                            </span>
                        )}
                    </div>
                    <div className="col-6 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-clinic.text-image"}
                            />
                        </label>
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
                                <FormattedMessage
                                    id={"admin.manage-clinic.text-upload"}
                                />
                                <i className="fas fa-upload"></i>
                            </label>
                            <div
                                className="preview-image_clinic"
                                style={{
                                    backgroundImage: `url(${this.state.previewImgUrl})`,
                                }}
                                onClick={() => {
                                    this.openPreviewImg();
                                }}
                            ></div>
                        </div>
                        <br />
                        {this.state.error.imageBase64 && (
                            <span className="error">
                                <FormattedMessage
                                    id={"admin.manage-clinic.text-errimage"}
                                />
                            </span>
                        )}
                    </div>

                    <div className="manage-doctor-editor mt-3 col-12">
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            value={this.state.descriptionMarkdown}
                            onChange={this.handleEditorChange}
                        />
                        <br />
                        {this.state.error.descriptionMarkdown && (
                            <span className="error">
                                <FormattedMessage
                                    id={"admin.manage-clinic.text-errdesc"}
                                />
                            </span>
                        )}
                    </div>

                    <div className="col-12">
                        <button
                            className="btn-save_specialty"
                            onClick={() => {
                                this.handleSaveNewClinic();
                            }}
                        >
                            <FormattedMessage id={"admin.manage-clinic.save"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
