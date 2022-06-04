import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function List() {
  const [DATA, setDATA] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  let navigate = useNavigate();
  const [count, setcount] = useState(0);

  const EditHandler=(id)=>{
 navigate(`/update/${id}`);
  }

  const Delethdl = (index) => {
    const localdata= JSON.parse(localStorage.getItem("data")) || [];
    localdata.splice(index,1);
    localStorage.setItem("data", JSON.stringify(localdata));
    setcount(prev=>prev+1)
  };

  const fun1=(arr)=>{
let count=0;
arr.map(ele=>{
  if(ele!=='') count++;
})
    return count
  }
  useEffect(() => {
    setDATA(JSON.parse(localStorage.getItem("data"))||[])
  }, [count]);
  return (
    <div className="bg-light">
      <div className="container my-4">
        <main>
          <div className="py-5">
            <h2>
              Candidates List
              <button className="btn btn-primary float-end" onClick={()=>navigate("/")}>
                Add Candidate
              </button>
            </h2>
          </div>

          <div className="row">
            <div className="col-12 ms-auto me-auto">
              <div className="card">
                <div className="card-body">
                  <table className="table">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Number of Skills</th>
                      <th>Total Work Experience (in months)</th>
                      <th>Actions</th>
                    </tr>
                    {DATA.length>0&&DATA.map((ele, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{ele.firstname + " " + ele.lastname}</td>
                        <td>{ele.email}</td>
                        <td>{
                        fun1(ele.skill)

                      
                        }</td>
                        <td>{ele.Experience.length}</td>
                        
                        <td>
                          {
                            console.log(ele)
                          }
                          <samp className="d-flex" >
                          <p className="text-info ms-2  pointer" onClick={((e)=>EditHandler(index))}>Edit</p>
                          <p
                            className="text-danger ms-2 pointer "
                            onClick={(index) => Delethdl(index)}
                            >
                            Delete
                          </p>
                            </samp>
                        </td>
                      </tr>
                    ))}
                  
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default List;
