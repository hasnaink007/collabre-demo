import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './ManageSettings.css'
import { Form as FinalForm } from 'react-final-form';
import * as validators from '../../util/validators';
import { Form, Avatar, Button, PrimaryButton, ImageFromFile, IconSpinner, FieldTextInput, SignupImageField } from '../../components';



const propTypes = {}

const defaultProps = {}

class ManageSettingsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {sections: []}
    }


    static getDerivedStateFromProps(props, state) {
        
        if(props.hasOwnProperty('sections') && state.sections.length < 1) {
              let sections = {sections: [...props.sections, ...state.sections]}

                return sections
        }
        

        // // console.log(newElements);
      
    }

    setStatetoProps = (props) => {
        this.setState(props);

    }


    componentDidUpdate(prevProps,prevState,snapshot ) {
        if(prevProps.uploadedImages !== this.props.uploadedImages) {

            for( var item in this.props.uploadedImages) {
                var indexName = `${item}`.toString();
                var breakedName = indexName.split('_');
                // breakedName = breakedName.shift();
                var sectionNumber = breakedName[1];
                var itemNumber = breakedName[2];

                var newStateItem = prevState;
                newStateItem.sections[Number(sectionNumber)].items[Number(itemNumber)].image = this.props.uploadedImages[item];

                this.setState(newStateItem);
            }

        }
    }   



    sectionSet = (section, section_index) => {
        // console.log(section);
        let items_heading = section.items.filter(item => { return item != undefined })
        if( items_heading.length > 0 ){
            items_heading = <h2>Items</h2>
        }

        return (
            <div key={section_index} className={css.single_section}>
                <div className={css.section_header} >
                    <h2 style={{marginTop:'0px', lineHeight:'0px',display: 'contents'}}>Section</h2>
                    <button className={css.removeBtn} onClick={e => {this.removeSection(section_index)}}>X</button>
                </div>


                <div className={css.section_fields}>
                    <FieldTextInput
                        type="text"
                        name={`s_title_${section_index}`}
                        id={`section_${section_index}`}
                        label="Section Title"
                        placeholder="Section Title"
                        initialValue={section.title}
                        className={[css.sectionTitleInput, css.sectionInput]}
                        required={true}
                      />


                     <FieldTextInput
                        type="text"
                        name={`s_desc_${section_index}`}
                        id={`section_${section_index}`}
                        label="Section Description"
                        placeholder={"Section Description"}
                        defaultValue={section.description}
                        className={[css.sectionTitleInput, css.sectionInput]}
                    />
                </div>

                {items_heading}
                <div className={css.itemsContainer} >
                    {section.items.map((item,index) => { return this.itemRenderer(item, index, section_index) })}
                </div>

                <button type="button" onClick={event => this.addItem(event,section_index)} className={css.addItemBtn}> Add Item </button>
            
            </div>
        )

    }

    onItemImageUpload = (data) => {
        const {id, file, index} = data;
        const {uploadImage} = this.props;

        uploadImage(data);
    }


    itemRenderer = (item, item_index, section_index) => {
        const {imageUploadState, uploadedImages} = this.props
        
        var isUploadingImage = false;
        var imgSource = null;

        var uploadedImageState = []
        var field_id = `imgfield_${section_index}_${item_index}`;
        console.log('Current State',this.state);
        const expectedIndex = this.state.sections[section_index].items[item_index];
        // console.log(expectedIndex);
        if(expectedIndex) {
            if(expectedIndex == 'uploading') {
                // isUploadingImage = true;
                uploadedImageState =  this.createArrayFromObjects(expectedIndex,field_id,false);
            } else {
                uploadedImageState =  this.createArrayFromObjects(expectedIndex,field_id,true);
            }

            console.log(uploadedImageState);
            
        }

        // console.log('Image State',uploadedImageState);


        return(
            <div key={item_index} className={css.setContainer}>
                <button className={`${css.removeBtn} ${css.removeItem}`} onClick={event => this.removeItem(item_index, section_index)}>X</button>
                
                <div className={css.item_cols}>
                    <div className={css.item_col1}>

                        <FieldTextInput
                        type="text"
                        name={`label_${section_index}_${item_index}`}
                        id={`label_${section_index}_${item_index}`}
                        label="Item Label"
                        placeholder="item.label"
                        defaultValue={item.label}
                        required={true}
                        className={css.itemLabel}
                        />

                        <FieldTextInput
                        type="url"
                        name={`url_${section_index}_${item_index}`}
                        id={`url_${section_index}_${item_index}`}
                        label="Item URL"
                        placeholder="Item URL"
                        defaultValue={item.url}
                        required={true} />

                    </div>

                    <div className={css.item_col2} >

                        <SignupImageField 
                            onImageUpload={this.onItemImageUpload}
                            index={`imgfield_${section_index}_${item_index}`}
                            imageUploadState={uploadedImageState}
                            savedImageAltText={(e)=>{console.log(e)}}
                            onRemoveImage={(e)=>{console.log(e)}}
                        />
                        
                    </div>

                </div>

            </div>
        )
    }

// `=================

    removeItem = (item_index, section_index) =>{
        // console.log(item_index)
        // console.log(section_index)
        let newSections = this.state.sections
        delete newSections[section_index].items[item_index]

        this.setState({
            ...this.state, sections: newSections
        })

    }

    createArrayFromObjects = (incomingObject,fieldId,sendId) => {

        var finalArray = [];
        
        if('image' in incomingObject) {
            if(incomingObject.hasOwnProperty('image')) {

                if(incomingObject.image == '') {
                    return finalArray;
                } 
                
                if(sendId) {
                    finalArray.push({
                        id:fieldId,
                        file:incomingObject.image,
                        index:fieldId,
                        imageId:fieldId
                    })
                } else {
                    finalArray.push({
                        id:fieldId,
                        file:incomingObject.image,
                        index:fieldId,
                    })
                }
                
            }
        }

        return finalArray;
        
    }

    
    addSection = () => {
        let newArray = this.state.sections;
        newArray.push(
            {
                name: 'Section Title',
                desc: 'Section Description',
                items: []
            }
        );
        this.setState({
            ...this.state, sections:newArray
        })
    }

    removeSection = section_index => {
        const newSections = this.state.sections
        delete newSections[section_index]
        this.setState({
            ...this.state, sections : newSections
        })
    }


    addItem = (event, index) => {
        
        const oldStateSections = this.state.sections
        
        oldStateSections[index].items.push({
            label:'Label', image:'Image', url:'URL' 
        })

        this.setState({...this.state, sections: oldStateSections})
    }

    removeItem = (item_index, section_index) =>{

        let newSections = this.state.sections

        delete newSections[section_index].items[item_index]

        this.setState({
            ...this.state, sections: newSections
        })

    }


    formSubmitHandler = values => { 
        
        const {onFormSubmit} = this.props;

        onFormSubmit(values,this.state.sections); 
    }

    render() {

       
        
        // FinalForm
        const {onFormSubmit, sections, uploadedImages} = this.props


        return (
            <FinalForm {...this.props} 
            
            render={(renderProps) => {
                const {sections,handleSubmit, uploadedImages} = renderProps;

                return (
                    <Form 
                    onSubmit={handleSubmit}
                    >   
                        <div className={css.form_container}>
                            
                            <div className={css.left_sidebar}>
                                <PrimaryButton type="submit">
                                    Save
                                </ PrimaryButton>
                            </div>

                            <div className={css.sections}>
                                <h3>Manage Sections</h3>
                                {this.state.sections.map(this.sectionSet)}
                                {/* <Button type="button" onClick={this.addSection} style={{marginTop:'40px'}}>Add Section</Button> */}
                            </div>

                        </div>

                    </Form>
                    
                );
            }} 
            
            onSubmit={this.formSubmitHandler}

            />
    
        )
        

// 
    }
}

ManageSettingsForm.propTypes = propTypes

ManageSettingsForm.defaultProps = defaultProps

export default ManageSettingsForm

