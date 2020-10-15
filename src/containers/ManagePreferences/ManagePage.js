import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types'
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import {getSectionsData, updateSectionsData} from './ManagePage.duck';

import {
    Page,
    LayoutSingleColumn,
    LayoutWrapperTopbar,
    LayoutWrapperMain,
    LayoutWrapperFooter,
    Footer,
  } from '../../components';

import {
    ManageSettingsForm
} from '../../forms';

  import {TopbarContainer} from '../';

import css from './ManagePage.css'

const propTypes = {}

const defaultProps = {}

class ManagePageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }  

    componentDidMount() {
        const {loadInitialData} = this.props;
        loadInitialData();
    }


    testUpdate = () => {
        const {saveSectionsData} = this.props;
        var newsections = new Array();
        
        // concatinating the old sections data to preserve 
        newsections = newsections.concat(
            this.props.sections,
            [
                {
                    "title":"Section 2",
                    "description":"Description2",
                    "items": [
                        {
                            "label":"Label 2",
                            "url":"New URL 2",
                            "image":"Images 2"
                        }
                    ]
                }
            ]
        );


        saveSectionsData(newsections)


    }

    handleSubmit = (test) => {
        console.log(test);
    }



    render() {
        
        const scrollingDisabled = false;
        const errorTitle = "Manage Settings";
         
        const {
            testUpdate,
            handleSubmit
        } = this;

        const {
            sections
        } = this.props;
        

        return (
        <Page title={errorTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>
                <TopbarContainer />
            </LayoutWrapperTopbar>
            <LayoutWrapperMain>
                <div className={css.managePageWrap}>
                    <div className="headings">
                        <h1>Manage Settings</h1>
                    </div>

                    <div className={css.formWrapper}>

                        <ManageSettingsForm 
                            onSubmitSettings={handleSubmit}
                            sections={sections}
                        />

                        <button onClick={(event) => { testUpdate()}} > 
                            Test Data Update
                        </button>

                    </div>


                </div>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter>
          </LayoutSingleColumn>
        </Page>
        )
    }
}

ManagePageComponent.propTypes = propTypes

ManagePageComponent.defaultProps = defaultProps

const mapStateToProps = (state) => {
    const {managePageReducer} = state;

    return {

        ...managePageReducer
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        loadInitialData: () => {dispatch(getSectionsData())},
        saveSectionsData: (data) => {dispatch(updateSectionsData(data))}

    }
}

const ManagePage = compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl
)(ManagePageComponent);

export default ManagePage;
