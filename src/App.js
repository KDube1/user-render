import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'


export default function App() {
  const [data, setData] = useState([]);
//const [q, setQ] = useState("");

  const [teamName, setTeamName] = useState("Team name");


    // Similar to componentDidMount and componentDidUpdate:
    useEffect( () => {
    
      fetch("https://www.balldontlie.io/api/v1/teams")
      .then(response => response.json())
      .then(json => alterJSON(json));
  
   
  function alterJSON(json){
      /*FOR AN ARRAY IN AN OBJECT*/
      const item = [];
      for (let i in json.data) {
        item.push(json.data[i]);
      }
      setData(item);
    }
  
  
      //https://devmentor.live/api/examples/contacts.json?api_key=98477c0d
      /*WHEN THE ENDPOINT IS JUST AN ARRAY*/
      /*setData(data);
      */
    }, []);


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


  const columns = [{
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
    sort: true,
    filter: textFilter()

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

      for (let i in playerData) {
        if (playerData[i].team.full_name === row.full_name){
        setTeamName(JSON.stringify(playerData[i]));
      }
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
  /*function search(rows) {
    return rows.filter(row => row.name.toLowerCase().indexOf(q) > -1 ||
      row.name.indexOf(q) > -1 || row.full_name.toLowerCase().indexOf(q) > -1);
  }
  */

  //move this directly under div to use
  //    <input class="form-control" type="text" value={q} onChange={(e) => setQ(e.target.value)} placeHolder="Search first name here" />

  return (
    <div>
  
      <BootstrapTable
        striped
        hover
        keyField='id'
        data={data}
        columns={columns}
        pagination={paginationFactory(options)}
        filter = {filterFactory()}
        rowEvents={rowEvents} />


      <h1>{teamName}</h1>
    </div>
  );
};