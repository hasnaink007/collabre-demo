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
        this.state = {
            sections:[
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
                        },
                        {
                            label: 'something',
                            url: 'someURL',
                            image: 'someImage'
                        }
                    ]
                }
            ]
        }
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
        //==============

        return (
            <div key={section_index}>
                <h3>Section</h3>
                
                <FieldTextInput
                 type="text"
                 name={`s_title_${section_index}`}
                 id={`section_${section_index}`}
                 label="Section Title"
                 placeholder="Section Title" />


                 <FieldTextInput
                 type="text"
                 name={`s_desc_${section_index}`}
                 id={`section_${section_index}`}
                 label="Section Description"
                 placeholder="Section Description" />

                {/*<input type="text" name={section.desc} placeholder="Section Description"/>*/}

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
            imageUploadState,
            onRemoveExtraImage} = this.props
        // console.log(item,index,section)
        // console.log('=========================================')
        return(
            <div key={item_index} className={css.setContainer}>
                
                <div className={css.item_cols}>
                    <div className={css.item_col1}>

                        <FieldTextInput
                        type="text"
                        name={`label_${section_index}_${item_index}`}
                        id={`label_${section_index}_${item_index}`}
                        label="Item Label"
                        placeholder={item.label} />

                        <FieldTextInput
                        type="url"
                        name={`url_${section_index}_${item_index}`}
                        id={`url_${section_index}_${item_index}`}
                        label="Item URL"
                        placeholder={item.url} />

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

                    <button className={css.removeBtn} onClick={event => this.removeItem(item_index, section_index)}>Delete Item</button>
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


    render() {
        // FinalForm
        const {onSubmitSettings} = this.props
        return (
            <FinalForm {...this.props} 
            
            render={(renderProps) => {
                const {sections, handleSubmit} = renderProps;
                
                return (
                    <Form 
                        onSubmit={handleSubmit}
                    >
                        <div className="">
                            <h3>Manage Sections</h3>
                            {this.state.sections.map(this.sectionSet)}
                        
                            <button type="button" onClick={this.addSection}>Add Section</button>
                            <PrimaryButton  type="submit">
                                Save
                            </ PrimaryButton>
                        </div>    
                    </Form>
                    
                );
            }} 
            onSubmit={onSubmitSettings}
            />
    
        )
        


    }
}

ManageSettingsForm.propTypes = propTypes

ManageSettingsForm.defaultProps = defaultProps

export default ManageSettingsForm

