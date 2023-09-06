import classes from '../style/Main.module.css';

const DataBlock = ({title,value,minWidth,size}) => {
    return (
        <div className={classes.data_block}>
            <div className={classes.data_block_title}>{title}</div>
            <div className={classes.data_block_value}>{value}</div>
        </div>
    )
}

export default DataBlock;