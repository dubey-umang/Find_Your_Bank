import React, { useState, useEffect } from "react";
import axios from "axios";
import _, { min } from "lodash";
import "font-awesome/css/font-awesome.min.css";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import ReactPaginate from "react-paginate";

const pageSize = 10;
function Homepage() {
  const [totalData, setTotalData] = useState([]);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then((res) => {
        setTotalData(res.data);
        const tempData = [];
        for (let index = 0; index < Math.min(res.data.length, 10); index++) {
          tempData.push(res.data[index]);
        }
        console.log(tempData);
        setData(tempData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function changePage(idx) {
    if (idx < 0) idx = 0;
    if (idx == Math.ceil((totalData.length + 1) / 10)) idx--;
    setIndex(idx);
    let left = idx * 10;
    let right = Math.min(totalData.length, left + 10);
    const tmp = [];
    for (let i = left; i < right; i++) tmp.push(totalData[i]);
    setData(tmp);
  }
  // console.log(data);

  return (
    <div className="container">
      <div className="header">
        <div className="all-banks">All Banks</div>

        <FormControl style={{ width: "10%" }}>
          <InputLabel id="demo-simple-select-label">Select City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select City"
          >
            <MenuItem value={10}>MUMBAI</MenuItem>
            <MenuItem value={20}>DELHI</MenuItem>
            <MenuItem value={30}>BANGALORE</MenuItem>
            <MenuItem value={30}>KOLKATA</MenuItem>
            <MenuItem value={30}>CHENNAI</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: "12%", margin: "0 30px" }}>
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Category"
          >
            <MenuItem value={10}>Bank</MenuItem>
            <MenuItem value={20}>IFSC</MenuItem>
            <MenuItem value={30}>Branch</MenuItem>
            <MenuItem value={30}>Bank Id</MenuItem>
            <MenuItem value={30}>Address</MenuItem>
          </Select>
        </FormControl>

        <div className="search">
          <input placeholder="Search"></input>
        </div>
      </div>

      <div id="table_view">
        <table className="table">
          <thead bgcolor="#C0C0C0">
            <tr className="Row">
              <th scope="col">Bank</th>
              <th scope="col">IFSC</th>
              <th scope="col">Branch</th>
              <th scope="col">Bank ID</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((data, index) => (
                <tr key={index}>
                  <td>{data.bank_name}</td>
                  <td>{data.ifsc}</td>
                  <td>{data.branch}</td>
                  <td>{data.bank_id}</td>
                  <td>{data.address}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="paggination">
          <div className="box1">Row per page: 10</div>
          <div className="box2">
            <i
              className="fa fa-angle-left"
              aria-hidden="true"
              onClick={() => changePage(index - 1)}
            ></i>
            {index * 10 + 1} - {Math.min((index + 1) * 10, totalData.length)}{" "}
            out of
          </div>
          <div className="box3">
            {totalData.length}
            <i
              className="fa fa-angle-right"
              aria-hidden="true"
              onClick={() => changePage(index + 1)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
