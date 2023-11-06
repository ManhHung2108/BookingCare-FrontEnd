import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import HomeHeader from "../HomeHeader";
import "./ListSpecialty.scss";
import { getAllSpecialtyService } from "../../../services";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { LANGUAGE } from "../../../utils";

class ListSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            listSpecialty: [],
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService();
        if (res && res.errCode === 0) {
            this.setState({
                listSpecialty: res.data ? res.data : [],
            });
        }
    }
    render() {
        const { language } = this.props;
        const { searchInput, listSpecialty } = this.state;
        return (
            <>
                <HomeHeader bgColor={true} />
                <div className="list-specialty_container">
                    <div className="list-specialty-header">
                        <Link to="/home">
                            <i className="fas fa-home"></i>
                            <span>/</span>
                        </Link>
                        <div>
                            <FormattedMessage
                                id={"patient.list-speciality.text-title"}
                            />
                        </div>
                    </div>
                    <div className="list-specialty_search">
                        <h3 className="text-title">
                            <FormattedMessage
                                id={"patient.list-speciality.text-examination"}
                            />
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
                        {listSpecialty &&
                            listSpecialty.length > 0 &&
                            listSpecialty.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            to={`/detail-specialty/${item.id}`}
                                        >
                                            <img
                                                src={item.image}
                                                width={100}
                                                height={67}
                                                alt={
                                                    language === LANGUAGE.VI
                                                        ? item.nameVi
                                                        : item.nameEn
                                                }
                                            />
                                            <h3>
                                                {language === LANGUAGE.VI
                                                    ? item.nameVi
                                                    : item.nameEn}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);
