import React, { useState, useEffect } from "react";
import DataTable from "./datatable"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const useFetch = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();

    /*FOR AN ARRAY IN AN OBJECT*/
    const item= [] ;
    for (let i in data.data){
      item.push(data.data[i]);
    }
    setData(item);
    console.log(item);
    
    //https://devmentor.live/api/examples/contacts.json?api_key=98477c0d
    /*WHEN THE ENDPOINT IS JUST AN ARRAY*/
    /*setData(data);
    */

    setLoading(false);
  }, []);

  return { data, loading };
};


export default function App(){


  const [q, setQ] = useState("");
  const { data, loading } = useFetch("https://www.balldontlie.io/api/v1/teams");
  const [teamName, setTeamName] = useState("Team name");
  

  const options = {
    showTotal: true,
    sizePerPageList: [{
      text: '10', value: 10
    }, {
      text: '15', value: 15
    }, {
      text: 'All', value: data.length
    }] 
  };


  const columns= [{
    dataField: 'id',
    text: 'ID'
  },
  {
    dataField: 'abbreviation',
    text: 'Abbreviation'
  }, {
    dataField: 'city',
    text: 'City',
    searchable: true,
    sort: true
   
  },
  {
    dataField: 'conference',
    text: 'Conference'
  
  },
  {
    dataField: 'division',
    text: 'Division'

  },
  {
    dataField: 'full_name',
    text: 'Full name',
    sort: true
   
  },
  {
    dataField: 'name',
    text: 'Name',
    searchable: true,
    sort: true
  
  }
]

const rowEvents = {
  onClick: (e, row, rowIndex) => {
    if(row.name === "Raptors"){
   setTeamName("Your 2019 champs");
  }
}
};
  
//ONLY FOR THE ARRAY ENDPOINT
/*
function search(rows){
  return rows.filter(row => row.firstName.toLowerCase().indexOf(q) > -1 ||
  row.firstName.indexOf(q) > -1);
}
*/


//ONLY FOR THE array in object
function search(rows){
  return rows.filter(row => row.name.toLowerCase().indexOf(q) > -1 ||
  row.name.indexOf(q) > -1 || row.full_name.toLowerCase().indexOf(q) > -1);
}

  return (
    <div>
      <input class="form-control"type="text" value={q} onChange={(e) => setQ(e.target.value)} placeHolder="Search first name here" />
      {/*{loading ? <div>...loading</div> :  <DataTable data={search(data)}/>}*/}
      <BootstrapTable 
        striped
        hover
        keyField='id' 
        data={ search(data) } 
        columns={ columns } 
        pagination={ paginationFactory(options) }
        rowEvents={rowEvents}/>


  <h1>{teamName}</h1>
    </div>
  );
};