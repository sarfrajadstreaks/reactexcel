import {TextColor} from '@carbon/icons-react'
export const FontStyler=()=>{

    return(<>
    <div style={{display:"flex", border:'1px solid #d8e3f2',gap:"5px",padding:"5px"}}>
        <div style={{fontWeight:"bold"}} className='cellDecorationIcons'>B</div>
        <div style={{fontWeight:"bold",fontStyle:"italic"}} className='cellDecorationIcons'>I</div>
        <div style={{fontWeight:"bold",textDecoration:"line-through"}} className='cellDecorationIcons'>S</div>
        <TextColor className='cellDecorationIcons'/>
    </div>
    </>)
}