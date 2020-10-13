import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types'
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
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

    render() {
        
        const scrollingDisabled = false;
        const errorTitle = "Manage Settings";

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
                        
                        
                        />
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
    return state;
}


const mapDispatchToProps = (dispatch) => {
    return {


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
