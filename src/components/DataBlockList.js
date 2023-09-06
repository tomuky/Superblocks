import classes from '../style/Main.module.css';

const DataBlockList = ({title,value,onClickBlockHandler,selectedBlock}) => {

    let blockList = [value];
    for(let i=1;i<16;i++){
        blockList.push(value-i);
    }

    return (
        <div className={classes.data_list}>
            <div className={classes.data_list_title}>{title}</div>
            <div className={classes.data_list_values_area}>
                {
                    blockList.map((d,i)=><div 
                        className={`${classes.data_list_value} ${(d===selectedBlock&&classes.data_list_value_selected)}`} 
                        key={`key_${i}`} 
                        onClick={()=>onClickBlockHandler(d)
                    }>
                        {d}
                    </div>)
                }
            </div>
        </div>
    )
}

export default DataBlockList;