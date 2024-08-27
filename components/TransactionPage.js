"use client"
import React from 'react';
import { useState, useEffect } from 'react';

import { Web3 } from "web3";

export default function TransactionPage() {

    const [transactions, setTransactions] = useState([]);
    const [address, setAddress] = useState('');
    const [startBlock, setStartBlock] = useState(null);
    const [rpc, setRPC] = useState(null);
    const [Enter, setEnter] = useState(null);
    const [loading, setLoading] = useState(false);

    const rpcUrl = 'https://rpc0.selendra.org'
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
    

    const contractAddress = '0xF2114C4d4Dd37c75A5D5fA6aF562ceeb8fFba244'
    
    // const startBlock = 4330530
    async function getTransactionsByAddress(contractAddress, startBlock) {
        let endBlock = await web3.eth.getBlockNumber();
        if (startBlock === null){
            startBlock = 4330530
        }
        const transactions = [];
        for (let i = startBlock; i <= endBlock; i++) {
            const block = await web3.eth.getBlock(i, true);
            if (block && block.transactions) {

                block.transactions.forEach(tx => {
    

                    if (tx.to?.toLowerCase() === contractAddress?.toLowerCase() || tx.from?.toLowerCase() === contractAddress?.toLowerCase()) {

                        transactions.push(tx);
                    }
                });
            }
        }
        return transactions;
    }
    let response = [
        {
            accessList: [],
            blockHash: '0xf8a18d9c82c90fe29aad98e4ef7c15c43b98d27d198cbe5cb24f227a7355ce6c',
            blockNumber: 4330544n,
            chainId: 1961n,
            from: '0xf27307ed47361679c1be9b42cc7fd47795cbdaa5',
            gas: 47886n,
            gasPrice: 1000000000n,
            hash: '0x97d8b902193420aa272182c1cba4a1815d68ca87a002cdaa78bc539d9b3ad708',
            input: '0x0f75e81ffc92ee426bd96c5fc981e08df4c8f991a73d1c79b6a39a21102b942571b36bda',
            maxFeePerGas: 1000000000n,
            maxPriorityFeePerGas: 1000000000n,
            nonce: 32n,
            r: '0x31a5083a179dbedf7c9a1dfd150c0c1822040e92aa7f0a40106b1436d75cbe1c',
            s: '0x2fc3afed36dff33c624de736856fcf81ce60bedec815865f415dde8f615b8858',
            to: '0xf2114c4d4dd37c75a5d5fa6af562ceeb8ffba244',
            transactionIndex: 0n,
            type: 2n,
            v: 0n,
            value: 0n
        },
        {
            accessList: [],
            blockHash: '0xf8a18d9c82c90fe29aad98e4ef7c15c43b98d27d198cbe5cb24f227a7355ce6c',
            blockNumber: 4330544n,
            chainId: 1961n,
            from: '0xf27307ed47361679c1be9b42cc7fd47795cbdaa5',
            gas: 47886n,
            gasPrice: 1000000000n,
            hash: '0x97d8b902193420aa272182c1cba4a1815d68ca87a002cdaa78bc539d9b3ad708',
            input: '0x0f75e81ffc92ee426bd96c5fc981e08df4c8f991a73d1c79b6a39a21102b942571b36bda',
            maxFeePerGas: 1000000000n,
            maxPriorityFeePerGas: 1000000000n,
            nonce: 32n,
            r: '0x31a5083a179dbedf7c9a1dfd150c0c1822040e92aa7f0a40106b1436d75cbe1c',
            s: '0x2fc3afed36dff33c624de736856fcf81ce60bedec815865f415dde8f615b8858',
            to: '0xf2114c4d4dd37c75a5d5fa6af562ceeb8ffba244',
            transactionIndex: 0n,
            type: 2n,
            v: 0n,
            value: 0n
        }, {
            accessList: [],
            blockHash: '0xf8a18d9c82c90fe29aad98e4ef7c15c43b98d27d198cbe5cb24f227a7355ce6c',
            blockNumber: 1245443,
            chainId: 1961n,
            from: '0xf27307ed47361679c1be9b42cc7fd47795cbdaa5',
            gas: 47886n,
            gasPrice: 1000000000n,
            hash: '0x97d8b902193420aa272182c1cba4a1815d68ca87a002cdaa78bc539d9b3ad708',
            input: '0x0f75e81ffc92ee426bd96c5fc981e08df4c8f991a73d1c79b6a39a21102b942571b36bda',
            maxFeePerGas: 1000000000n,
            maxPriorityFeePerGas: 1000000000n,
            nonce: 32n,
            r: '0x31a5083a179dbedf7c9a1dfd150c0c1822040e92aa7f0a40106b1436d75cbe1c',
            s: '0x2fc3afed36dff33c624de736856fcf81ce60bedec815865f415dde8f615b8858',
            to: '0x11111111111111',
            transactionIndex: 0n,
            type: 2n,
            v: 0n,
            value: 0n
        }
    ]

let dynamoTrasaction  = [];
 
    useEffect(() => {
        const abortSignal = new AbortController();

        return () => abortSignal.abort();
    }, []);

    const onEnter = async (address, startBlock) => {
        setLoading(true); // Set loading to true when the fetch starts
        try {
            const dynamoTransaction = await getTransactionsByAddress(address, startBlock);
            setTransactions(dynamoTransaction);
            setEnter(1);
            console.log("onEnter dynamoTransaction", dynamoTransaction);
            console.log("startBlock", startBlock);
        } catch (error) {
            console.error("Error fetching transactions", error);
        } finally {
            setLoading(false); // Set loading to false when the fetch is complete
        }
    };


// paginat
const rowsPerPage = 2;
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(dynamoTrasaction.length / rowsPerPage);

const handlePrevClick = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
};

const handleNextClick = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};

const startIndex = (currentPage - 1) * rowsPerPage;
const endIndex = startIndex + rowsPerPage;
const paginatedData = dynamoTrasaction.slice(startIndex, endIndex);

let headerClass = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
const ConvertBigNumber = (n) => {
    return (n / 1e18).toLocaleString('fullwide', { useGrouping: true, maximumSignificantDigits: 21 });
}
console.log("PaginatedTable, data",dynamoTrasaction);




    let rowClass = 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'
    return (
        <>
            <div className="header px-4">
                <h1 className="text-2xl font-bold mb-4">Transactions by address, with specific blockNumber, This is not GrapQL I will be slow performance</h1>
                <div className="w-72  p-4">

                    <div className="flex ">
                        <div className="flex-1 text-center px-4 py-2 m-2">
                            <div className="relative w-full min-w-[400px] h-10">
                                <input
                                  onChange={(e) => setAddress(e.target.value)}
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" " />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Input address
                                </label>
                            </div>
                        </div>

                    
                        <div className="flex-1 text-center px-4 py-2 m-2">
                            <div className="relative w-full min-w-[200px] h-10">
                                <input 
                                  onChange={(e) => setStartBlock(e.target.value)}
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" " />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Input Start Block
                                </label>
                            </div>
                        </div>
                        <div className="flex-1 text-center px-4 py-2 m-2">
                    {loading?
                <button type="button" class="bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled>
                Processing...
              </button>    :
                  <button      onClick={() => onEnter(address,startBlock)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                       Enter
                  </button>
                }           
                            </div>
                    </div>



                </div>
                <div className="container mx-auto p-4 bg-white shadow rounded">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                    <th className={headerClass}>Block</th>
                    <th className={headerClass}>Hash</th>
                    <th className={headerClass}>From</th>
                    <th className={headerClass}>To</th>
                    <th className={headerClass}>Input</th>
                    <th className={headerClass}>Txn Fee</th>
                </tr>
                </thead>
                <tbody>
                {console.log("dynamoTrasaction==>",dynamoTrasaction)}
                    {transactions.map(item => (
                        <tr key={item.id}>
                            <td className={rowClass}> {item.blockNumber.toString()} </td>


                            <td className={rowClass}>
                                <div className="has-tooltip">
                                    {item.hash?.toString().slice(0, 24)}
                                    <span className='tooltip rounded shadow-lg p-1 bg-gray-200 text-red-500 -mt-8'>{item.hash?.toString()}</span>
                                </div>
                            </td>
                            <td className={rowClass}>
                                <div className="has-tooltip">
                                    {item.from?.toString().slice(0, 24)}
                                    <span className='tooltip rounded shadow-lg p-1 bg-gray-200 text-red-500 -mt-8'>{item.from?.toString()}</span>
                                </div>
                            </td>

                           
                                <td className={rowClass}>
                                <div className="has-tooltip">
                                    {item.to?.toString().slice(0, 24)}
                                    <span className='tooltip rounded shadow-lg p-1 bg-gray-200 text-red-500 -mt-8'>{item.to?.toString()}</span>
                                    </div>
                                     </td>
                        
                         
                                <td className={rowClass}>
                                <div className="has-tooltip">
                                    {item.input?.toString().slice(0, 24)}
                                    <span className='tooltip rounded shadow-lg p-1 bg-gray-200 text-red-500 -mt-8'>{item.input?.toString()}</span>
                                    </div>
                                     </td>
                        
                           
                                <td className={rowClass}>
                             
                                    {ConvertBigNumber(item.gas?.toString())}
                                    </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrevClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
                {/* <PaginatedTable data={dynamoTrasaction} /> */}
            </div>
        </>
    );
}
