import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './ManageSettings.css'
import { Form as FinalForm } from 'react-final-form';
import { Form, Avatar, Button, PrimaryButton, ImageFromFile, IconSpinner, FieldTextInput, SignupImageField } from '../../components';



const propTypes = {}

const defaultProps = {}

class ManageSettingsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {sections: []}
    }


    // sections: [
    //     {
    //         title:'',
    //         description:'',
    //         items: [
    //             {
    //                 label:'',
    //                 url:'',
    //                 image:'',
    //             }
    //         ]
    //     }
    // ]

    sectionSet = (section, section_index) => {
        // console.log(section);
        let items_heading = section.items.filter(item => { return item != undefined })
        if( items_heading.length > 0 ){
            items_heading = <h4>Items</h4>
        }

//======================

        return (
            <div key={section_index} className={css.singl_section}>
                <div className={css.section_header} >
                    <h3>Section</h3>
                    <button className={css.removeBtn} onClick={e => {this.removeSection(section_index)}}>X</button>
                </div>


                <div className={css.section_fields}>
                    <FieldTextInput
                     type="text"
                     name={`s_title_${section_index}`}
                     id={`section_${section_index}`}
                     label="Section Title"
                     placeholder="Section Title"
                     defaultValue={section.title} />


                     <FieldTextInput
                     type="text"
                     name={`s_desc_${section_index}`}
                     id={`section_${section_index}`}
                     label="Section Description"
                     placeholder={"Section Description"}
                     defaultValue={section.description} />
                </div>

                {items_heading}
                {section.items.map((item,index) => { return this.item(item, index, section_index) })}
                <button type="button" onClick={event => this.addItem(event,section_index)} className={css.addItemBtn}> Add Item </button>
            
            </div>
        )

    }


//`=================

    addItem = (event, index) => {
        // console.log(event)
        
        const oldStateSections = this.state.sections
        
        oldStateSections[index].items.push({
            label:'Label', image:'Image', url:'URL' 
        })

        this.setState({...this.state, sections: oldStateSections})
    }

//=================

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
                        defaultValue={item.label} />

                        <FieldTextInput
                        type="url"
                        name={`url_${section_index}_${item_index}`}
                        id={`url_${section_index}_${item_index}`}
                        label="Item URL"
                        placeholder="Item URL"
                        defaultValue={item.url} />

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

// `=================

    removeSection = section_index => {
        const newSections = this.state.sections
        delete newSections[section_index]
        this.setState({
            ...this.state, sections : newSections
        })
    }

    removeItem = (item_index, section_index) =>{
        // console.log(item_index)
        // console.log(section_index)
        let newSections = this.state.sections
        delete newSections[section_index].items[item_index]

        this.setState({
            ...this.state, sections: newSections
        })

    }

//=================

    submitForm = (values) => {
        console.log('Form Submitted');
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
/*
    componentDidMount =  () => {
        // console.clear()
        console.log('================================')
        console.log(this.props)
        const {sections} = this.props
        console.log('================================')
        
    }*/

    static getDerivedStateFromProps(props, state) {
    // console.log('======================')
    // console.log(props)
    // console.log(state)
    // console.log('======================')
    let sections = {...state, ...props}

    return sections
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
                        <div className="">
                            <h3>Manage Sections</h3>
                            {this.state.sections.map(this.sectionSet)}
                        
                            <button type="button" onClick={this.addSection}>Add Section</button>
                            <PrimaryButton type="submit">
                                Save
                            </ PrimaryButton>
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

