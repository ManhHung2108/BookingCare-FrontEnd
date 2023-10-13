import React, { Component } from "react";
import { connect } from "react-redux";

import "./DoctorExtraInfor.scss";

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    showHideDetailInfor = () => {
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor,
        });
    };

    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className="doctor-extraInfor_container">
                <div className="doctor-extraInfor_header">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">
                        Phòng khám chuyên khoa Da Liễu
                    </div>
                    <div className="address-clinic">
                        207 Phố Huế - Hai Bà Trưng - Hà Nội
                    </div>
                </div>
                <div className="doctor-extraInfor_footer">
                    {isShowDetailInfor === false && (
                        <div className="short-infor">
                            <h3>GIÁ KHÁM:</h3>
                            <span>
                                {" "}
                                250.000<sup>đ</sup>.
                            </span>
                            <span
                                className="show-detailInfor_price"
                                onClick={() => {
                                    this.showHideDetailInfor();
                                }}
                            >
                                Xem chi tiết
                            </span>
                        </div>
                    )}
                    {isShowDetailInfor && (
                        <>
                            <div className="title-price">GIÁ KHÁM: </div>
                            <div className="detail-infor">
                                <div className="infor-price">
                                    <span className="text">Giá khám</span>
                                    <span className="price">
                                        250.000<sup>đ</sup>
                                    </span>
                                </div>
                                <div className="note">
                                    Được ưu tiên khám trước khi đặt lịch qua
                                    HealthBookings. Giá khám cho người nước
                                    ngoài là 30 USD
                                </div>
                            </div>
                            <div className="infor-payment">
                                Người bệnh có thể thanh toán chi phí bằng hình
                                thức tiền mặt và quẹt thẻ
                            </div>
                            <div className="hide-detailInfor_price">
                                <span
                                    onClick={() => {
                                        this.showHideDetailInfor();
                                    }}
                                >
                                    Ẩn bảng giá
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doctorDetailRedux: state.user.doctorDetail,
        language: state.appReducer.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
