import { useEffect, useRef, useState } from "react";
import styled from 'styled-components'
const StyledTextArea=styled.textarea`
    background:white;
    z-index:999999;
    width:inherit
    min-width:100px;
`;
const Div=styled('span')`
    min-width:${props => (props?.width)|| "30px"} ;
    min-height:${props => (props?.height||"30px")};
    border:${props => (props.border)||'none'};
    background:inherit;
    &:hover{
        cursor:pointer;
        border:1px solid green;
    }
`;
const EditableElement = ({tag='span',onChangeFn, type,initial,userStyle,id}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text,setText]=useState("");
    const cellValueRef = useRef(null);
    const inputRef = useRef(null);
    const handleDoubleClick = () => {
      setIsEditing(true);
    };
    useEffect(()=>{
        const selection = window.getSelection();
        if (isEditing && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const leftPosition = rect.left + window.scrollX;
            inputRef.current.style.position = 'absolute';
            inputRef.current.style.left = leftPosition-22 + 'px';
            inputRef.current.focus();
          }
    },[isEditing])
    const handleBlur = () => {
      setIsEditing(false);
      onChangeFn(type,text)
    };
  
    return (
        <>
      {
        !isEditing? <Div width={userStyle?.minWidth} height={userStyle?.minHeight} border={userStyle?.border} id={id} ref={cellValueRef} onDoubleClick={handleDoubleClick}>{initial}</Div>:
        <StyledTextArea 
            ref={inputRef} onBlur={handleBlur} 
            onChange={(e)=>setText(e.target.value)} 
            style={{width:`${userStyle?.minWidth}`, height:`${userStyle?.minHeight}`}}/>
      }
      </>
    );
  };
  
  export default EditableElement;