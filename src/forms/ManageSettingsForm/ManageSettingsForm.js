import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './ManageSettings.css'
import {Form as FinalForm} from 'react-final-form';
import {FieldTextInput} from '../../components';

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
                    name:'section_2',
                    desc: 'descriptipn_1',
                    items: [
                        {
                            label: 'something',
                            url: 'someURL',
                            image: 'someImage'
                        }
                    ]
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
        let items_heading = ''
        if( section.items.length ){
            items_heading = <h4>Items</h4>
        }
        // ==============

        return (
            <div>
                <h3>Section</h3>
                <input type="text" name={section.name} placeholder="Section Title" />
                <input type="text" name={section.desc} placeholder="Section Description"/>
                {items_heading}
                {section.items.map((item,index) => { return this.item(item, index, section_index) })}
                <button type="button" onClick={event => this.addItem(event,section_index)} className={css.addItemBtn}> Add Item </button>

            
            </div>
        )

    }


//=================

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
        // console.log(item,index,section)
        // console.log('=========================================')
        return(
            <div className={css.itemsContainer}>
                <span className={css.closeBtn} onClick={event => this.removeItem(item_index, section_index)}>x</span>
                <div className={css.items}>
                    <input type="text" name={'label_'+ item_index} placeholder={item.label} />
                    <input type="text" name={'url_'+ item_index} placeholder={item.url} />
                    <input type="text" name={'image_' + item_index} placeholder={item.image} />
                </div>
            </div>
        )
    }

//=================

    removeItem = (item_index, section_index) =>{
        // console.log(item_index)
        // console.log(section_index)
        let newSections = this.state.sections
        delete newSections[section_index].items[item_index]

        // let oldStateSections = this.state.sections

        // let sectionIndex = oldStateSections.findIndex(csection => { return csection == section } )

        // console.log(sectionIndex)
        // console.log('========================')
        // delete oldStateSections[sectionIndex][item_index]

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
            sections:newArray
        })
    }


    render() {
        // FinalForm
        return (
            <FinalForm {...this.props} 
            
            render={(renderProps) => {
                const {sections} = renderProps;


                return (
                <div className="">
                    <h3>Manage Sections</h3>
                    {this.state.sections.map(this.sectionSet)}
                
                
                    <button type="button" onClick={this.addSection}>Add Section</button>
                </div>    
                
                    
                )
    
    
            }} 
            
            onSubmit={this.submitForm}
            />
    
        )
        


    }
}

ManageSettingsForm.propTypes = propTypes

ManageSettingsForm.defaultProps = defaultProps

export default ManageSettingsForm

