import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from "@mui/material";
import { Snackbar, useStepContext } from "@mui/material"
import AddCar from "./AddCar";
export default function Carlist() {

    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

const columns = [
    {field: 'brand'},
    {field: 'model'},
    {field: 'color'},
    {field: 'fuel'},
    {field: 'year'},
    {field: 'price'},
{
    cellRenderer: params =>
     <Button size="small" color="error" onClick ={ () => deleteCar(params)}>
        Delete
     </Button>,
     width:120

}
// //{
//     cellRenderer: params => <EditCar params={params} updateCar={updateCar}/>,
// width:120
//}


]


useEffect(() => getCars(), [])

const REST_URL = "http://carrestapi.herokuapp.com/cars";

const getCars= () => {
fetch(REST_URL)
.then(response => response.json())
.then(responseData => {
    setCars(responseData._embedded.cars) })
.catch(error => console.error(error));

}

const deleteCar = (params) => {
    console.log("params: " + params.data._links.car.href);
    fetch(params.data._links.car.href, {method: 'DELETE'})
    .then(response => {
      if (response.ok) {
        setMsg('Car is deleted');
        setOpen(true);
        getCars();
      } else {
        alert('Sumthing went wong')
      }
    })
    .catch(error => console.error(error));
}

const addCar = (car) => {
//alert('lisään auton kohta rest-rajapinnalla juu');
fetch(REST_URL, {
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify(car)

})
.then(response => {
if (response.ok) {
getCars();
} else {
alert('something wong')
}
})

.catch(err => console.error(err));
}


return (
    <>
    <AddCar addCar={addCar}/>
    <div className="ag-theme-material"
    style={{height: "700px", width: "100%", margin: "auto"}}>
        
        
        <AgGridReact
rowData={cars}
columnDefs={columns}
pagination={true}
paginationPageSize={10}
>    
    </AgGridReact>
    <Snackbar
open = {open}
autoHideDuration={3000}
onClose={() => setOpen(false) }
    />
    </div>
    </>
);
}