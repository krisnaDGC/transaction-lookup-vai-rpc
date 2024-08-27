// components/PaginatedTable.js
import { useState } from 'react';

const rowsPerPage = 10;

const PaginatedTable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handlePrevClick = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    let rowClass = 'px-4 py-2 border-b text-sm'
    let headerClass = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
    const ConvertBigNumber = (n) => {
        return (n / 1e18).toLocaleString('fullwide', { useGrouping: true, maximumSignificantDigits: 21 });
    }
    console.log("PaginatedTable, data",data);
    

    return (
        <div className="container mx-auto p-4 bg-white shadow rounded">
            <table className="min-w-full bg-white border border-gray-300">
                <thead> <tr>
                    <th className={headerClass}>Block</th>
                    <th className={headerClass}>Hash</th>
                    <th className={headerClass}>From</th>
                    <th className={headerClass}>To</th>
                    <th className={headerClass}>Input</th>
                    <th className={headerClass}>Txn Fee</th>
                </tr>
                </thead>
                <tbody>
                    {paginatedData.map(item => (
                        <tr key={item.id}>
                            <td class={rowClass}> {item.blockNumber.toString()} </td>


                            <td class={rowClass}>
                                <div className="has-tooltip">
                                    {item.hash?.toString().slice(0, 24)}
                                    <span class='tooltip rounded shadow-lg p-1 bg-gray-200 text-red-500 -mt-8'>{item.hash?.toString()}</span>
                                </div>
                            </td>
                            <td class={rowClass}>
                                <div className="has-tooltip">
                                    {item.from?.toString().slice(0, 24)}
                                    <span class='tooltip rounded shadow-lg p-1 bg-gray-200 text-red-500 -mt-8'>{item.from?.toString()}</span>
                                </div>
                            </td>

                           
                                <td class={rowClass}>
                                <div className="has-tooltip">
                                    {item.to?.toString().slice(0, 24)}
                                    <span class='tooltip rounded shadow-lg p-1 bg-gray-200 text-red-500 -mt-8'>{item.to?.toString()}</span>
                                    </div>
                                     </td>
                        
                         
                                <td class={rowClass}>
                                <div className="has-tooltip">
                                    {item.input?.toString().slice(0, 24)}
                                    <span class='tooltip rounded shadow-lg p-1 bg-gray-200 text-red-500 -mt-8'>{item.input?.toString()}</span>
                                    </div>
                                     </td>
                        
                           
                                <td class={rowClass}>
                                <div className="has-tooltip">
                                    {ConvertBigNumber(item.gas?.toString())}
                                    <span class='tooltip rounded shadow-lg p-1 bg-gray-200 text-red-500 -mt-8'>{ConvertBigNumber(item.gas?.toString())}</span> 
                                    </div>

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
    );
};

export default PaginatedTable;
