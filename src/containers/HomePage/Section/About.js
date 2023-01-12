import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
            <div className='share-section about-section'>
                <div className='about-header-section'>
                    #51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu
                </div>
                <div className='about-content-section'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI" title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Tuần trước em có dịp tham quan biển Phan Thiết. Cảnh nơi đây rất đẹp. Những hàng dừa trải dài xanh ngắt nằm dọc bờ biển. Giữa biển có một bãi cát trắng dẫn thẳng vào các tòa nhà nghỉ của khách du lịch, sau tòa nhà là những dãy núi tim tím. Xa xa trên mặt biển, có những chiếc thuyền chở khách du lịch đi thăm quan. Cảnh vật ở biển Phan Thiết thật yên bình. Em yêu cảnh biển nơi đây, và cũng yêu đất nước Việt Nam của mình.</p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);

