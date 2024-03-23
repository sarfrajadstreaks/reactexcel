import { useContext, useState } from "react"
import styled from "styled-components";
import { DataContext } from "../../context";

const StyledMenuLi=styled.li`
    padding:5px;
    border-top:1px solid;
    &:last-child{
        border-bottom:1px solid;
    }
    cursor:pointer;
    &:hover{
        background:antiquewhite;
    }

`;

export const useContextMenu=(config)=>{
    const {setActiveRow,setActiveColumn}=useContext(DataContext)
    const [clickIndex,setClickIndex]=useState()
    const [showContextOptions,setShowContextOptions]=useState(false);
    const [clickPosition,setClickPosition]=useState({x:0,y:0});
    function toogle(event){
        event.preventDefault();
        const popups = document.querySelectorAll('.pop-menu');
        const validTarget=event.target.id?event.target.id:event.target.parentNode.id
        const index=Number(validTarget.match(/\d+/)[0])
        const rowOrCol=validTarget.split("_")[0]
        if(popups.length!==0){
            popups.forEach(popup => {
                popup.style.display = 'none';
              });
              
        }
        setClickPosition({x:event.clientX,y:event.clientY})
              if(event.target.id){
                  setClickIndex(index)
              }else{
                  setClickIndex(index)
              }
              setClickIndex(index)
              rowOrCol==="row"?setActiveRow(index):setActiveColumn(index)
              setShowContextOptions(!showContextOptions)
    }
    return (config && {toggleContextMenu:toogle,currentState:showContextOptions,
    contextUI:<>
        <div 
        className="pop-menu"
        style={
        {
        backgroundColor: 'white',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
        padding: '10px',
        minWidth:'150px',
        borderRadius:'5px',
        position:'fixed',
        border:'1px solid rgba(0, 0, 0, 0.3)',
        top:clickPosition.y-(50*config.length),
        left:clickPosition.x,
        zIndex:99999
        }}>
            <ul style={{listStyle:'none',padding:0}}>
        {
            config.map((menu,index)=>(
                
                    <StyledMenuLi key={"context_row"+index} onClick={()=>{menu.action(clickIndex,menu.param);setShowContextOptions(false)}}>{menu.label}</StyledMenuLi>
               
            ))
        }
         </ul>
      </div>
    </>})
}

// contextUI:<>

// </>