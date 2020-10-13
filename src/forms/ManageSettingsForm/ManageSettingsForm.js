import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './ManageSettings.css'
import { Form as FinalForm } from 'react-final-form';


const propTypes = {}

const defaultProps = {}

class ManageSettingsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sections:[
                {
                    name:'section_1'
                },
                {
                    name:'section_2'
                },
                {
                    name:'section_3'
                }
            ]
        }
    }

    sectionSet = (section) => {
        console.log(section);
        return (
            <>
            <input type="text" name={section.name} placeHolder="Section Title"></input>
            
            </>
        )


    }



    submitForm = (values) => {
        console.log('Form Submitted');
    }

    addSection = () => {
        let newArray = this.state.sections;
        newArray.push(
            {
                name:`section_${this.state.sections.length + 1}`
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
        
                return (
                <div className="">
                    <h3>Manage Sections</h3>
                    {this.state.sections.map(this.sectionSet)}
                
                
                    <button onClick={this.addSection}>Add Section</button>
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

