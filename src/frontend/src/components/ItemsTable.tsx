import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import "./ItemsTable.css";

const columns = [
    {
        field: 'name',
    },
    {
        field: 'quantity'
    },
    {
        headerName: "Minimum",
        field: 'minimum'
    },
    {
        field: 'threshold'
    },
    {
        field: "belowMinimum",
        headerName: "Below Minimum",
        valueFormatter: (cell) => (cell.data.belowMinimum ? "YES" : "NO")
    },
    {
        field: "category.label",
        headerName: "Category",
        valueFormatter: (cell) => cell.data.category.label
    }
];

const defaultColDef ={
    sortable: true,
    resizable: true,
    flex: 1
};

const rowClassRules = {
    'below-minimum': (row) => !!row.data.belowMinimum,
    'within-threshold': (row) => {
        const threshold = row.data.minimum + row.data.threshold;
        return row.data.quantity < threshold;
    }
};

export default function ItemsTable({data}){
    const gridRef = useRef(null);
    const navigate = useNavigate();

    const [columnDefs] = useState(columns);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
            (document.getElementById('filter-text-box') as HTMLInputElement).value
        );
      }, []);

    const gridStyle = useMemo(() => ({ height: 400, width: '100%' }), []);
    //const defaultColDef = useMemo(() => defaultColDef, []);

    function rowSelected(selected){
        //console.log(selected);
        const {data} = selected;
        navigate(`/inventory/${data.stockID}`);
    }
    
    return (
        <div>
            <div className="flex flex-row-reverse">
                <input
                    className="p-2 text-black rounded-t-lg"
                    type="search"
                    id="filter-text-box"
                    placeholder="Filter..."
                    onInput={onFilterTextBoxChanged} />
            </div>
    
            <div className="ag-theme-alpine-dark" style={gridStyle}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    cacheQuickFilter={true}
                    onRowClicked={rowSelected}
                    rowClassRules={rowClassRules} >
                </AgGridReact>
            </div>
        </div>
    );
}