import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";

function RetrieveData() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const typeQuery = query(collection(db, "listings"));
      const data = await getDocs(typeQuery);
      data.forEach((doc) => {
        setLocations({ location: doc.data().location, id: doc.id });
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredLocations(
      locations.filter((user) =>
        user.location.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, locations]);
  return (
    <>
      <div style={{ margin: "8rem 20rem" }}>
        <h1>Contact Details</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        {filteredLocations.map((contact) => [
          <ol>
            <b>Consumer Details :</b> {<br />}
            {locations.location},{<br />}
            {locations.id},{<br />}
          </ol>,
        ])}
      </div>
    </>
  );
}
export default RetrieveData;
