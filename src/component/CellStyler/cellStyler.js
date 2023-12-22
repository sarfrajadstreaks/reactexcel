import  {TextFill,BorderFull,BorderTop,BorderRight,BorderBottom,BorderLeft,BorderNone} from '@carbon/icons-react'
export const CellStyler=()=>{
    return(
    <>
        <div style={{display:"flex", border:'1px solid #d8e3f2',gap:"5px",padding:"5px"}}>
        <TextFill className='cellDecorationIcons'/>
        <BorderLeft className='cellDecorationIcons' />
        <BorderRight className='cellDecorationIcons'/>
        <BorderTop className='cellDecorationIcons'/>
        <BorderBottom className='cellDecorationIcons'/>
        <BorderNone className='cellDecorationIcons'/>
        <BorderFull className='cellDecorationIcons'/>
        </div>
    </>
    )
}