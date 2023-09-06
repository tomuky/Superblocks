import { useState } from 'react';
import classes from '../style/Main.module.css';

const DataList = ({title,values,onClickTxHandler,selectedTx}) => {

    const [showing,setShowing] = useState(10);

    let listHTML = [];
    for(let i=0;i<showing;i++){
        listHTML.push(
            <div 
                className={`${classes.data_list_value} ${(values[i]===selectedTx&&classes.data_list_value_selected)}`} 
                key={`key_${i}`} 
                onClick={()=>onClickTxHandler(values[i])}
            >
                {`${values[i].substring(0,16)}...${values[i].substring(values[i].length-16)}`}
            </div>
        )
    }

    const showMoreHandler = () => setShowing(showing+10);

    return (
        <div className={classes.data_list}>
            <div className={classes.data_list_title}>{title}</div>
            <div className={classes.data_list_values_area}>
                {listHTML}
                <div className={classes.data_list_more_button} onClick={showMoreHandler}>Show More</div>
            </div>
        </div>
    )
}

export default DataList;