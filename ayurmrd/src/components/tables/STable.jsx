import React from 'react'
import { useState,useEffect } from 'react'
import { getCurrentPatientID,getCurrentPatientVisitID } from '../../hooks/currentPatientnVisit';
import { isBase64Image,toTitleCase,keepSpecificColor } from '../../utils/utils';
import axios from 'axios'

const STable = (props) => {
    const fetch_api_url = props.api_url
    const [tableData,setTableData] = useState({})
    const current_patient_id = getCurrentPatientID();
    const current_visit_id = getCurrentPatientVisitID();


      
    const fetchData = (fetch_api_url)=>{
        axios.get(fetch_api_url,{params: {user_id: current_patient_id, visit_id: current_visit_id},withCredentials: true}).then(response => {
            if (!response) {
              throw new Error('Network response was not ok');
            }
            return (response.data);
          }).then((data) => {
            if (data.status==='success') {
                if(data.records.length>0){
                const keys = Object.keys(data.records[0]);
                let data_array = [];
                data.records.forEach((record)=>{
                    const values = Object.values(record);
                    data_array.push(values);
                }
            )
                setTableData({
                    keys: keys,
                    data : data_array
                })
            }
            }
          })
        }

          useEffect(()=>{
            fetchData(fetch_api_url)
          },[fetch_api_url,props.update])


    
  return (
    <div className="table-container">
        <h2>{props.title}</h2>
        {!tableData.keys && <h3>No Records Found</h3>}
    <table>
        <thead>
            <tr>
            {tableData.keys && tableData.keys.map((key)=>{
                const header = toTitleCase(key)
                return(
                    <th>{header}</th>
                )
            })}
            </tr>
        </thead>
        <tbody>
        {tableData.data && tableData.data.map((datum)=>{
                return(
                    <tr>{datum.map((col)=>{
                        if(isBase64Image(col)){
                          const b64 = col
                        return( <td><img width={100} height={100} src={b64}/></td>)}
                        else{
                            return(<td>{col}</td>)
                        }
                    })}</tr>
                )
            })}
        </tbody>
    </table>
    </div>
  )
}

export default STable