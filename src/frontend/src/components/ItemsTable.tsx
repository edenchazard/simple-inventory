import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import "./ItemsTable.css"

import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
    {
        field: 'name'/*,
        getQuickFilterText: params => params.data.name*/
    },
    {
        field: 'quantity'
    },
    {
        headerName: "Minimum",
        field: 'min'
    },
    {
        field: "category"
    }
];

export default function ItemsTable({data}){
    const gridRef = useRef(null);
    const navigate = useNavigate();

    const [columnDefs] = useState(columns);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );
      }, []);

    const defaultColDef = useMemo(() => {
        return {
          sortable: true,
          resizable: true,
        };
      }, []);

    function rowSelected(selected){
        console.log(selected);
        const {data} = selected;
        navigate(`/inventory/${data.id}`);
    }
    
    return (
        <div>
            <div className="flex flex-row-reverse">
                <input
                    className="p-2 text-black rounded-t-lg"
                    type="text"
                    id="filter-text-box"
                    placeholder="Filter..."
                    onInput={onFilterTextBoxChanged}
                />
            </div>
    
            <div className="ag-theme-alpine-dark" style={{height: 400, width: "100%"}}>
                
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    cacheQuickFilter={true}
                    onRowClicked={rowSelected}>
                </AgGridReact>
            </div>
        </div>
    );
}