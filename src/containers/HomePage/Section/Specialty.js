import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    componentDidMount() {
        this.props.getAllSpecialty();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataSpecialty !== prevProps.dataSpecialty) {
            this.setState({
                dataSpecialty: this.props.dataSpecialty
            })
        }
    }

    handleViewDetailSpecialty = (id) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${id}`)
        }
    }

    render() {
        let { dataSpecialty } = this.state;

        return (
            <div className='share-section specialty-section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='home-page.specialty-popular' /></span>
                        <button className='btn-section'><FormattedMessage id='home-page.more-infor' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div
                                            className='section-customize'
                                            key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item.id)}
                                        >
                                            <div className='bg-image specialty-section' style={{ background: `url(${item.image})` }}></div>
                                            <div>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        dataSpecialty: state.admin.dataSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialty: () => dispatch(actions.getAllSpecialty()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));

