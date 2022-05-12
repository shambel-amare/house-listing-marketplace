import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
function SearchBar({ type, placeholder }) {
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  //Handle input change
  const handleInputChange = (value) => {
    setValue(value);
  };

  //handle selection
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const fetchData = async (inputValue) => {
    const locQuery = query(collection(db, "locations"));

    const locQuerySnapshot = await getDocs(locQuery);
    const searchData = [];
    const filteredData = [];

    locQuerySnapshot.forEach((doc) => {
      //get the docs
      const files = { ...doc.data() };
      //take out each ke as eachkey for each doc is different and can be used as identifier
      const keys = Object.values(files);
      keys.forEach((key) => {
        if (type === "location") {
          searchData.push({
            label: `${key.location}`,
            value: `${key.location}`,
          });
        } else if (type === "type") {
          searchData.push({
            label: `${key.type}`,
            value: `${key.type}`,
          });
        }
      });
    });
    searchData
      .filter((val) => {
        if (inputValue === "") {
          filteredData.push(val);
        } else if (val.label.toLowerCase().includes(inputValue.toLowerCase())) {
          filteredData.push(val);
        }
      })
      .map((val) => {
        filteredData.push(val);
      });
    // FILTERING THE UNIQUE VALUES
    // OPTION @3
    const seen = new Set();
    var arr = [...filteredData];
    arr.filter((el) => {
      const duplicate = seen.has(el.value);
      seen.add(el.value);
      return !duplicate;
    });
    const uniqueData = [];
    seen.forEach((el) => {
      uniqueData.push({
        label: `${el}`,
        value: `${el}`,
      });
    });
    return uniqueData;
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        placeholder={placeholder}
        value={selectedValue}
        loadOptions={fetchData}
        onInputChange={handleInputChange}
        onChange={handleChange}
        className="filter"
      />
    </div>
  );
}

export default SearchBar;
