import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types'
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import {getSectionsData, updateSectionsData, uploadImageToServer} from './ManagePage.duck';

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


    handleSubmit = (values, structure) => {
        // console.log(values)
        // console.log(structure)
        let formData = []

        structure.forEach( (section, s_index) =>{
            // console.log(section)
            
            let section_structure = {
                    title: '',
                    description: '',
                    items: []
                }
                
            section_structure.title = values[`s_title_${s_index}`] || ''
            section_structure.description = values[`s_desc_${s_index}`] || ''

            section.items.forEach( (item, item_index) =>{
                let item_structure = {
                    label: '',
                    url: '',
                    image: ''
                }

                item_structure.label = values[`label_${s_index}_${item_index}`] || ''
                item_structure.url = values[`url_${s_index}_${item_index}`] || ''
                item_structure.image = item.image;
                section_structure.items.push(item_structure)
            })

            formData.push(section_structure)
        })

        // console.log(formData)
        const {saveSectionsData} = this.props
        console.log(formData);
        saveSectionsData(formData)
        // updateSectionsData(formData)
    }



    /*sections = [
                {
                    name:'section_1',
                    desc: 'descriptipn_1',
                    items: []
                },
                {
                    name:'section_3',
                    desc: 'descriptipn_1',
                    items: [
                        {
                            label: 'something',
                            url: 'someURL',
                            image: 'someImage'
                        }
                    ]
                }
            ]*/


    


    render() {
        
        const scrollingDisabled = false;
        const errorTitle = "Manage Settings";
         
        const {
            testUpdate,
            handleSubmit
        } = this;

        const {
            sections,
            uploadImageOnServer,
            uploadedImages

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
                            onFormSubmit={this.handleSubmit}
                            sections={sections}
                            uploadImage={uploadImageOnServer}
                            uploadedImages={uploadedImages} 
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
    const {managePageReducer} = state;

    return {

        ...managePageReducer
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        loadInitialData: () => {dispatch(getSectionsData())},
        saveSectionsData: (data) => {dispatch(updateSectionsData(data))},
        uploadImageOnServer: (data) => {dispatch(uploadImageToServer(data))}

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
