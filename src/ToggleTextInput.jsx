import React, { useState, useContext, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { ColorContext } from "./Context.js";

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default function ToggleTextInput({ text, handleSubmit, editable=true }) {
    //Функция handleSubmit принимает два аргумента - старое и новое значение text
    const [editMode, setEditMode] = useState(false);
    const {appColors} = useContext(ColorContext);
    const [inputText, setInputText] = useState("");
    // const [showLocationSelect, setShowLocationSelect]
    const InputRef = useRef(null);

    useEffect(() => {
        setInputText(text);
    },[text]);

    function handleKeyDown(event) {
		if (event.which === ESCAPE_KEY) {
			setEditMode(false);
            // console.log("pressed ", event.which);
		} else if (event.which === ENTER_KEY) {
			handleSave();
            // console.log("pressed ", event.which);
		}		
	}

    function handleInputChange(e) {
        setInputText(e.target.value);
    }

    function handleSave() {
        let newText = inputText;
        handleSubmit(text, newText.trim());
        setInputText(newText.trim());
        setEditMode(false);
    }
    function handleInputMode() {
        if (!editable) return;
        setEditMode(true);
    }
    
    // useEffect(() => {
    //     if (!editMode) return;
    //     InputRef.current.focus();
    //     setInputText(text);
    // }, [editMode]);

    if (!editMode) return (
        <span className="toggleTextInput" onClick={handleInputMode}><p>{text}</p><span className='icon'></span></span>
    )
    return(
        <div>
            <div className="toggleTextInput edit">
                <input autoFocus type={text} placeholder={text} value={inputText} ref={InputRef} onChange={handleInputChange} onBlur={handleSave} onKeyDown={(e) => handleKeyDown(e)}/>
                {/* <span className='icon'>
                    <FontAwesomeIcon icon={faSave} onClick={handleSave} style={{color: appColors.mainColor}}/> 
                </span>
                <span className='icon'>
                    <FontAwesomeIcon icon={faWindowClose} onClick={() => {setEditMode(false)}} style={{color: appColors.mainColor}}/> 
                </span> */}
            </div>
        </div>
        
    )
}