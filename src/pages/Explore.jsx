import { Link } from "react-router-dom";
import { useState } from "react";
import rentCatagoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCatagoryImage from "../assets/jpg/sellCategoryImage.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/svg/search.svg";
import SearchBar from "../components/SearchBar";
function Explore() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  const [selectedCategory, setSelectedCategory] = useState();
  const handleTypeChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <section className="explore">
      <div className="main-page-container">
        <header>
          <h1 className="pageHeader">
            <div className="mainTextHeader">Finding Anything Made Easy</div>
          </h1>
        </header>
        <div className="search">
          <div className="searchOption">
            <h2>I want to : </h2>
            <button
              onClick={handleTypeChange}
              className={
                selectedCategory === "rent" ? "btn-active" : "primaryButton"
              }
              value="rent"
              style={
                pathMatchRoute("/")
                  ? {
                      color: "#0e0c36",

                      lineHeight: "1.5rem",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      padding: "0 1.5rem",
                      borderRadius: "0.5rem",
                      width: "auto",
                    }
                  : {
                      background: "transparent",
                    }
              }
            >
              Rent
            </button>
            <button
              className={
                selectedCategory === "sale" ? "btn-active" : "primaryButton"
              }
              onClick={handleTypeChange}
              value="sale"
              style={
                pathMatchRoute("/")
                  ? {
                      lineHeight: "1.5rem",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      padding: "0 1.5rem",
                      color: "#0e0c36",
                      borderRadius: "0.5rem",
                      width: "auto",
                    }
                  : {
                      color: "#F3F1F1",
                    }
              }
            >
              Sale
            </button>
            <button
              className={
                selectedCategory === "buy" ? "btn-active" : "primaryButton"
              }
              onClick={handleTypeChange}
              value="buy"
              style={
                pathMatchRoute("/")
                  ? {
                      color: "#0e0c36",
                      lineHeight: "1.5rem",
                      textAlign: "center",
                      borderRadius: "0.5rem",
                      width: "auto",
                      padding: "0 1.5rem",
                      fontSize: "1.5rem",
                    }
                  : {
                      color: "#F3F1F1",
                    }
              }
            >
              Buy
            </button>
            <h2>Something </h2>
          </div>

          <div className="searchBox">
            {/* DROP DOWN GOES HERE */}
            {/* Drop down is done based on selection of the option selected*/}
            {/* either rent or sale or buy */}
            {selectedCategory === "rent" ? (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="location"
                    style={{ padding: "0.5rem 0.75rem" }}
                  >
                    What Do you want to rent?
                  </label>
                  <SearchBar type="location" placeholder="Select..." />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="location"
                    style={{ padding: "0.5rem 0.75rem" }}
                  >
                    location
                  </label>
                  <SearchBar type="location" placeholder="location..." />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="location"
                    style={{ padding: "0.5rem 0.75rem" }}
                  >
                    Category
                  </label>
                  <SearchBar type="location" placeholder="Category..." />
                </div>
              </>
            ) : selectedCategory === "buy" ? (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="location"
                    style={{ padding: "0.5rem 0.75rem" }}
                  >
                    What Do you want to Buy?
                  </label>
                  <SearchBar type="location" placeholder="Select..." />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="location"
                    style={{ padding: "0.5rem 0.75rem" }}
                  >
                    location
                  </label>
                  <SearchBar type="location" placeholder="location..." />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label
                    htmlFor="location"
                    style={{ padding: "0.5rem 0.75rem" }}
                  >
                    Category
                  </label>
                  <SearchBar type="location" placeholder="Category..." />
                </div>
              </>
            ) : (
              navigate("/create-listing")
            )}

            <div className="searchIcon">
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>
      <main>
        {/* Slider */}

        <p className="exploreCategoryHeading"></p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCatagoryImage}
              alt="Rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places For Rent</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCatagoryImage}
              alt="Sale"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places For Sale</p>
          </Link>
        </div>
      </main>
    </section>
  );
}

export default Explore;
