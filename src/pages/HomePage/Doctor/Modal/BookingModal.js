import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";

import "./BookingModal.scss";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    render() {
        const { isOpenModal, handleCloseModalBooking, dataTime } = this.props;
        return (
            <div>
                <Modal
                    isOpen={isOpenModal}
                    toggle={this.props.handleCloseModalBooking}
                    className="booking-modal-container"
                    size="lg"
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="text-header">
                                Thông tin đặt lịch khám bệnh
                            </span>
                            <span className="right">
                                <i
                                    className="fas fa-times"
                                    onClick={handleCloseModalBooking}
                                ></i>
                            </span>
                        </div>
                        <div className="booking-modal-body container">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-infor"></div>
                            <div className="price">Giá Khám 500,000VND</div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ Tên</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoại</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ email</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ liên hệ</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Lý do khám</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Đặt cho ai</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Giới tính</label>
                                    <input className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className="btn btn-booking-confirm">
                                Xác nhận
                            </button>
                            <button
                                className="btn btn-booking-cancle"
                                onClick={handleCloseModalBooking}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
