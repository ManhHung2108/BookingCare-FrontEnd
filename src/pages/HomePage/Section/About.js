import React, { Component } from "react";

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-container">
                    <div>
                        <div className="section-about-header">
                            <h2>Truyền thông về HealthBookings</h2>
                        </div>
                        <div className="section-about-content">
                            <div className="content-left">
                                <iframe
                                    width="100%"
                                    height="400"
                                    src="https://www.youtube.com/embed/ftaNcNS0IJI"
                                    title="Giới thiệu về Trường Đại học Mở Hà Nội"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="content-right">
                                <ul>
                                    <li>
                                        <a
                                            target="_blank"
                                            title="Báo sức khỏe đời sống"
                                            href="http://www.fithou.edu.vn/"
                                            rel="noreferrer"
                                        >
                                            <div className="truyenthong-img suckhoedoisong-img"></div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            target="_blank"
                                            title="VnExpress"
                                            href="https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html"
                                            rel="noreferrer"
                                        >
                                            <div className="truyenthong-img vnexpress-img"></div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default About;
