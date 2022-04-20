import React, { useEffect, useState, useRef } from "react";
import AsyncSelect from "react-select/async";
import { collection, query, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
function SearchBar() {
  const [idValue, setIdValue] = useState();
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
    const data = [];
    const filteredData = [];
    locQuerySnapshot.forEach((doc) => {
      console.log("Data: ", doc.data());
      const files = { ...doc.data() };
      console.log("Files: ", files);
      files.forEach((file) => {
        console.log("File: ", file);
      });
      data.push({
        label: `${doc.data().EfcTJmMobVj4sApL4k54.location}`,
        value: `${doc.data().EfcTJmMobVj4sApL4k54.location}`,
      });
    });
    console.log("Non filtered: ", data);
    data
      .filter((val) => {
        if (inputValue == "") {
          filteredData.push(val);
        } else if (val.label.toLowerCase().includes(inputValue.toLowerCase())) {
          filteredData.push(val);
        }
      })
      .map((val) => {
        console.log("filtered: ", val);
        filteredData.push(val);
      });
    return filteredData;
  };

  return (
    <div style={{ margin: "8rem 20rem" }}>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        loadOptions={fetchData}
        onInputChange={handleInputChange}
        onChange={handleChange}
        className="filter"
      />
      {console.log(
        "selectedValue: ",
        JSON.stringify(selectedValue || {}, null, 2)
      )}
    </div>
  );
}

export default SearchBar;
