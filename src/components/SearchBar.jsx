import React, { useEffect, useState, useRef } from "react";
import AsyncSelect from "react-select/async";
import { collection, query, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
function SearchBar({ type }) {
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

  const uniq = (a) => {
    console.log("Uniq function called");
    console.log("input:", a);
    var prims = { boolean: {}, number: {}, string: {} },
      objs = [];

    return a.filter((item) => {
      console.log("item of a:", item);

      var type = typeof item;
      if (type in prims) {
        return prims[type].hasOwnProperty(item)
          ? false
          : (prims[type][item] = true);
      } else return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
  };

  const fetchData = async (inputValue) => {
    const locQuery = query(collection(db, "locations"));

    const locQuerySnapshot = await getDocs(locQuery);
    const locationData = [];
    const filteredData = [];
    //const typeData = [];

    locQuerySnapshot.forEach((doc) => {
      const files = { ...doc.data() };
      const keys = Object.values(files);
      keys.forEach((key) => {
        if (type === "location") {
          locationData.push({
            label: `${key.location}`,
            value: `${key.location}`,
          });
        } else if (type === "type") {
          locationData.push({
            label: `${key.type}`,
            value: `${key.type}`,
          });
        }
      });
    });
    locationData
      .filter((val) => {
        if (inputValue == "") {
          filteredData.push(val);
        } else if (val.label.toLowerCase().includes(inputValue.toLowerCase())) {
          filteredData.push(val);
        }
      })
      .map((val) => {
        filteredData.push(val);
      });
    return filteredData;
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        defaultOptions
        placeholder="location"
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
