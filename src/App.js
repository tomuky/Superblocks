import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';
import classes from './style/Main.module.css';
import DataBlock from './components/DataBlock';
import DataList from './components/DataList';
import DataBlockList from './components/DataBlockList';

const alchemy = new Alchemy({
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

function App() {
  const [selectedBlock,setSelectedBlock] = useState();
  const [latestBlockNumber,setLatestBlockNumber] = useState();
  const [blockData,setBlockData] = useState({});
  const [blockLoading,setBlockLoading] = useState(false);
  const [selectedTx,setSelectedTx] = useState();
  const [txData,setTxData] = useState({});
  const [txLoading,setTxLoading] = useState(false);

  useEffect(() => {
    async function getLatestBlock(){
      const data = await alchemy.core.getBlockNumber();
      setLatestBlockNumber(data);
      setSelectedBlock(data);
    }
    getLatestBlock();
  },[]);

  useEffect(()=>{
    async function getBlock(){
      setBlockLoading(true);
      const data = await alchemy.core.getBlock(selectedBlock);
      console.log('block data',data)

      data.timestamp_display =`${new Date(await data.timestamp*1000)}`.substring(0,24);
      setBlockData({...data});
      setBlockLoading(false);
    }
    getBlock();
  },[selectedBlock])

  useEffect(()=>{
    const getTx = async () => {
      setTxLoading(true)
      let txResponse = await alchemy.core.getTransactionReceipt(selectedTx);
      console.log('txResponse', txResponse)
      setTxData(txResponse);
      setTxLoading(false)
    }
    getTx();
  },[selectedTx])

  const onClickBlockHandler = (block) => {
    setSelectedBlock(block);
    setSelectedTx();
  }
  const onClickTxHandler = (tx) => setSelectedTx(tx);

  return (
    <div className={classes.main_area}>

      <div className={classes.section}>
        <div className={classes.section_title}>Recent Blocks</div>
        {latestBlockNumber && <DataBlockList title="Block Number" selectedBlock={selectedBlock} value={latestBlockNumber} onClickBlockHandler={onClickBlockHandler}/>}
      </div>

      <div className={classes.section}>
        <div className={classes.section_title}>Block Details</div>
        {
          !blockLoading && (
            <>
              <DataBlock title="Block Number" value={blockData.number}/>
              {blockData.hash && <DataBlock title="Block Hash" value={`${blockData.hash.substring(0,10)}...${blockData.hash.substring(blockData.hash.length-8)}`}/>}
              <DataBlock title="Timestamp" value={blockData.timestamp_display}/>
              {blockData.transactions && <DataList selectedTx={selectedTx} title={`Transactions (${blockData.transactions.length})`} values={blockData.transactions} onClickTxHandler={onClickTxHandler}/>}
            </>
          )
        }
        {
          blockLoading && <>Loading...</>
        }
      </div>

      <div className={classes.section}>
        {
          !txLoading && (
            <>
              <div className={classes.section_title}>Transaction Details</div>
              {txData.transactionHash && <DataBlock title="Hash" value={`${txData.transactionHash.substring(0,10)}...${txData.transactionHash.substring(txData.transactionHash.length-8)}`}/>}
              {txData.from && <DataBlock title="From" value={`${txData.from.substring(0,10)}...${txData.from.substring(txData.from.length-8)}`}/>}
              <DataBlock title="Confirmations" value={txData.confirmations}/>
              <DataBlock title="Type" value={txData.type}/>
            </>
          )
        }
        {
          ((txLoading && selectedTx) && (
            <>
              <div className={classes.section_title}>Transaction Details</div>
              Loading...
            </>
          ))
        }
      </div>

    </div>
  );
}

export default App;