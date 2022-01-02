import React, { useState, useContext, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { ColorContext } from "./Context.js";

export default function ToggleTextInput({ text, handleSubmit, editable=true }) {
    //Функция handleSubmit принимает два аргумента - старое и новое значение text
    const [editMode, setEditMode] = useState(false);
    const {appColors} = useContext(ColorContext);
    const [inputText, setInputText] = useState(text);
    // const [showLocationSelect, setShowLocationSelect]
    const InputRef = useRef(null);

    function handleInputChange(e) {
        setInputText(e.target.value);
    }

    function handleSave() {
        handleSubmit(text, inputText);
        setEditMode(false);
    }
    function handleInputMode() {
        if (!editable) return;
        setEditMode(true);
    }
    
    useEffect(() => {
        if (!editMode) return;
        InputRef.current.focus();
        setInputText(text);
    }, [editMode]);

    if (!editMode) return (
        <span className="toggleTextInput" onClick={handleInputMode}><p>{text}</p><span className='icon'></span></span>
    )
    return(
        <div>
            <div className="toggleTextInput edit">
                <input type={text} placeholder={text} value={inputText} ref={InputRef} onChange={handleInputChange}/>
                <span className='icon'>
                    <FontAwesomeIcon icon={faSave} onClick={handleSave} style={{color: appColors.mainColor}}/> 
                </span>
                <span className='icon'>
                    <FontAwesomeIcon icon={faWindowClose} onClick={() => {setEditMode(false)}} style={{color: appColors.mainColor}}/> 
                </span>
            </div>
        </div>
        
    )
}