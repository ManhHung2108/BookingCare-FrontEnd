import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import HomeHeader from "../HomeHeader";
import "./ListDoctor.scss";
import { getAllDoctorService } from "../../../services";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { LANGUAGE } from "../../../utils";

class ListDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            ListDoctor: [],
        };
    }

    async componentDidMount() {
        let res = await getAllDoctorService();
        if (res && res.errCode === 0) {
            this.setState({
                ListDoctor: res.data ? res.data : [],
            });
        }
    }
    render() {
        const { language } = this.props;
        const { searchInput, ListDoctor } = this.state;
        return (
            <>
                <HomeHeader bgColor={true} />
                <div className="list-doctor_container">
                    <div className="list-doctor-header">
                        <Link to="/home">
                            <i className="fas fa-home"></i>
                            <span>/</span>
                        </Link>
                        <div>
                            {/* <FormattedMessage
                                id={"patient.list-speciality.text-title"}
                            /> */}
                            Danh sách bác sĩ dành cho bạn
                        </div>
                    </div>
                    <div className="list-doctor_search">
                        <h3 className="text-title">
                            {/* <FormattedMessage
                                id={"patient.list-speciality.text-examination"}
                            /> */}
                            Danh sách bác sĩ dành cho bạn
                        </h3>
                        <div className="filter_search">
                            <input
                                className="form-control"
                                name="searchInput"
                                value={searchInput}
                                placeholder="Search"
                                onChange={(e) => {
                                    this.handleOnChangeInput(e);
                                }}
                                onKeyPress={(e) => {
                                    this.handleEnterKeyPress(e);
                                }}
                            />
                            {/* <i className="fas fa-search"></i> */}
                            <button>
                                <FormattedMessage
                                    id={"patient.list-speciality.text-search"}
                                />
                            </button>
                        </div>
                    </div>

                    <ul>
                        {ListDoctor &&
                            ListDoctor.length > 0 &&
                            ListDoctor.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={`/detail-doctor/${item.id}`}>
                                            <img
                                                src={item.image}
                                                width={100}
                                                height={67}
                                                alt={
                                                    language === LANGUAGE.VI
                                                        ? item.lastName
                                                        : item.lastName
                                                }
                                            />
                                            <h3>
                                                {language === LANGUAGE.VI
                                                    ? `${item.firstName} ${item.lastName}`
                                                    : `${item.lastName} ${item.firstName}`}
                                            </h3>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctor);
