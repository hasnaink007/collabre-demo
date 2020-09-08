import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './style.css'
import {Field} from 'react-final-form';

import {
AddImages
} from '../../components/';



const arrayOfImgIds = imgs =>
            imgs.map(i => (typeof i.id === 'string' ? i.imageId : i.id));
// const imageIdsFromProps = arrayOfImgIds(images);

const propTypes = {}

const defaultProps = {}

class SignupImageField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageUploadRequested: false,
            file:null
        }

        this.handleImageUpload = this.handleImageUpload.bind(this);
    }


    imageUploadRequested= function() {
        return false;

    }



    fieldLabelHtml = () => (
        <div className={css.LabelWrapper}>
            <span>Choose an Image</span>
            <span className={css.smallLabel}>.JPG, .GIF or .PNG. Max 20 MB</span>
        </div>
    );

    handleImageUpload = function(file) {
        const data = {
            file: {id:`${file.name}_${Date.now()}`, file }
        };

        this.props.onImageUpload(data);

    }

    getSelectedImage = () => {
        let selectedImage = this.state.file ? this.state.file : null;
        return selectedImage;
    }

    wrapAddImageComponent = (component) => {      
        return this.getSelectedImage() ? (
        <AddImages 
            className={css.fieldWrapper}
            images={[this.getSelectedImage()]}   
        >

            {component}

        </AddImages>
        )
        : 
        <AddImages 
            className={css.fieldWrapper}            
        >

        {component}

        </AddImages>

    }

    render() {
        return (
            <div>
                { this.wrapAddImageComponent(
                    <Field
                        type="file"
                        name="signup_image"
                        accept="images/*"
                        label={this.fieldLabelHtml()}
                    >

                        {
                            (fieldprops) => {

                                const {input, accept, label}  = fieldprops;
                                const {name, type} = input;

                                const onChange = (e) => {
                                    let file = e.target.files[0];
                                    this.handleImageUpload(file);
                                   console.log('Add Images Clicked', e.target);
                                }
                                
                                const inputProps = {accept, id:name,name, onChange, type};


                                return (

                                    <div className={css.addImageWrapper}>
                                    <div className={css.aspectRatioWrapper}>                                      
                                        <input {...inputProps} className={css.addImageInput} />
                                        <label htmlFor={name} className={css.addImage}>
                                            {label}
                                        </label>
                                    </div>
                                  </div>
                                )
                            }

                        }


                    </Field>

                ) }
            </div>
        )
    }
}

SignupImageField.propTypes = propTypes

SignupImageField.defaultProps = defaultProps

export default SignupImageField
