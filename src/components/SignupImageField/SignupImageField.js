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
        this.removeSelectedImage = this.removeSelectedImage.bind(this);
        
    }


    fieldLabelHtml = () => (
        <div className={css.LabelWrapper}>
            <span>Choose an Image</span>
            <span className={css.smallLabel}>.JPG, .GIF or .PNG. Max 20 MB</span>
        </div>
    );

    handleImageUpload = function(file) {

        
        const data = {
            id:`${file.name}_${Date.now()}`, 
            file, 
            index: this.props.index
        };

        this.props.onImageUpload(data);

    }

    removeSelectedImage = function(e) {

        const {onRemoveExtraImage} = this.props;

        onRemoveExtraImage(e);
    }

    getThisComponentimage = () => {
                
            if(this.props.imageUploadState) {
                    
                
               return this.props.imageUploadState.find((value) => {

                    if(value.index == this.props.index) {
                        return true;
                    }

                }); 

            //     if(imageSelected) {
                    
            //         return {
                    
            //             file: imageSelected[this.props.index],
            //             id: this.props.index,
            //             index:this.props.index,
            //             imageId:this.props.index
            //         }


                
            //     } else {
            //         return null;
            //     }
               

            }  else {
                
             return false; 
            
            }
    }


    generateSavedImagesObj = () => {

        return {
            file:this.props.selectedImage ? this.props.selectedImage[this.props.index] : null,
            id:this.props.index,
            index:this.props.index,
            imageId:this.props.index
        }

    }

    wrapAddImageComponent = (component) => {    
        const profile = this.props.currentUser ? this.props.currentUser.attributes.profile : null;

        // const hasImageUploaded = this.props.selectedImage ? this.props.selectedImage[this.props.index] : null;

        return (this.getThisComponentimage()) ? (

            <AddImages 
            className={css.fieldWrapper}
            images={this.getThisComponentimage() ? [this.getThisComponentimage()] : null}
            onRemoveImage={this.removeSelectedImage} 
            loadFromUrl={true}  
        >
            
               
          

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

        const {
            index,
            imageUploadState
        } = this.props;


        

        const fieldName = 'signupExtraImage_' + index.toString();

        return (
            <div>
                { this.wrapAddImageComponent(
                    <Field
                        type="file"
                        name={fieldName}
                        id={fieldName}
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
