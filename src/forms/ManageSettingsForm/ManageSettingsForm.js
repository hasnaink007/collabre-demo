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

        let sections = {...state, ...props}

        return sections
    }






    sectionSet = (section, section_index) => {
        // console.log(section);
        let items_heading = section.items.filter(item => { return item != undefined })
        if( items_heading.length > 0 ){
            items_heading = <h4>Items</h4>
        }

        return (
            <div key={section_index} className={css.singl_section}>
                <div className={css.section_header} >
                    <h3 style={{marginTop:'0px', lineHeight:'0px'}}>Section</h3>
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
                     required={true}
                      />


                     <FieldTextInput
                     type="text"
                     name={`s_desc_${section_index}`}
                     id={`section_${section_index}`}
                     label="Section Description"
                     placeholder={"Section Description"}
                     defaultValue={section.description} />
                </div>

                {items_heading}
                <div className={css.itemsContainer} >
                    {section.items.map((item,index) => { return this.item(item, index, section_index) })}
                </div>

                <button type="button" onClick={event => this.addItem(event,section_index)} className={css.addItemBtn}> Add Item </button>
            
            </div>
        )

    }



    item = (item, item_index, section_index) => {
        const {
            onImageUpload,
            imageUploadState} = this.props

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
                            onImageUpload={onImageUpload}
                            index={1}
                            imageUploadState={imageUploadState}
                            savedImageAltText={(e)=>{console.log(e)}}
                            onRemoveImage={(e)=>{console.log(e)}}
                        />
                        
                    </div>

                </div>

            </div>
        )
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

    render() {

        // FinalForm
        const {onFormSubmit, sections} = this.props


        return (
            <FinalForm {...this.props} 
            
            render={(renderProps) => {
                const {sections,handleSubmit} = renderProps;

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
                                <Button type="button" onClick={this.addSection}>Add Section</Button>
                            </div>

                        </div>

                    </Form>
                    
                );
            }} 
            
            onSubmit={values => { onFormSubmit(values,this.state.sections); console.log('from on submit') } }

            />
    
        )
        

// 
    }
}

ManageSettingsForm.propTypes = propTypes

ManageSettingsForm.defaultProps = defaultProps

export default ManageSettingsForm

