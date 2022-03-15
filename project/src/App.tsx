import React, { Component } from 'react';
//import Data from "../mock-data.json";
import {useState} from "react";

export default function App (){

  const [searchText, setSearchText] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  return (
      <div>
        <input 
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder={"Search for company"}
          />
      </div>
  )
  }
//MTpJbnRlcnZpZXclMjAyMDIxLTA5LTIyOjE2MzIzNTk2NTU6NWNhMzViYjk.ZmEwZWI5OTdmYWJjYWFlZWJmY2YyNGYyN2FkMmQ5YzkwODQ4NWNiYg