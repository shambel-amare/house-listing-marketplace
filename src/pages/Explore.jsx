import { Link } from "react-router-dom";
import rentCatagoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCatagoryImage from "../assets/jpg/sellCategoryImage.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/svg/search.svg";
import SearchBar from "../components/SearchBar";
function Explore() {
  const location = useLocation();
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <section className="explore">
      <div className="main-page-container">
        <header>
          <h1 className="pageHeader">
            <div className="mainTextHeader">Finding Anything Made Easy</div>
          </h1>
        </header>
        <div className="searchOption">
          <h2>I want to : </h2>
          <button
            className="primaryButton"
            style={
              pathMatchRoute("/")
                ? {
                    color: "#0e0c36",
                    background: "var(--color-orange)",
                    lineHeight: "1.5rem",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    borderRadius: "0",
                  }
                : {
                    background: "transparent",
                  }
            }
          >
            Rent
          </button>
          <button
            className="primaryButton"
            style={
              pathMatchRoute("/")
                ? {
                    color: "#0e0c36",
                    background: "var(--color-orange)",
                    lineHeight: "1.5rem",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    borderRadius: "0",
                  }
                : {
                    color: "#F3F1F1",
                  }
            }
          >
            Sale
          </button>
          <button
            className="primaryButton"
            style={
              pathMatchRoute("/")
                ? {
                    color: "#0e0c36",
                    background: "var(--color-orange)",
                    lineHeight: "1.5rem",
                    textAlign: "center",
                    borderRadius: "0",
                    fontSize: "1.5rem",
                  }
                : {
                    color: "#F3F1F1",
                  }
            }
          >
            Buy
          </button>
        </div>
        <div className="searchBox">
          {/* DROP DOWN GOES HERE */}
          <SearchBar type="location" />
          <SearchBar type="type" />
          <div className="searchIcon">
            <SearchIcon />
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
