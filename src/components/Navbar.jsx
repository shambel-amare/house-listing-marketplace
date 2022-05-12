import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { AiOutlineLogin } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  const handleLoging = () => {
    if (auth.currentUser) {
      navigate("/profile");
    }
  };
  return (
    <header className="navbar">
      <div className="logo">
        <h1 className="pageHeader" style={{ color: "#ff6000" }}>
          ESPACE
        </h1>
      </div>
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <ExploreIcon
              fill={pathMatchRoute("/") ? "#0CBC8B" : "#ffff"}
              width="26px"
              height="26px"
              onClick={() => navigate("/")}
            />
            <a href="/">
              <p
                className={
                  pathMatchRoute("/")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
                style={
                  pathMatchRoute("/")
                    ? {
                        color: "white",
                        fontSize: "1.25rem",
                      }
                    : {
                        color: "#F3F1F1",
                      }
                }
              >
                Explore
              </p>
            </a>
          </li>
          <li className="navbarListItem">
            <OfferIcon
              fill={pathMatchRoute("/offers") ? "#0CBC8B" : "#ffff"}
              width="26px"
              height="26px"
              onClick={() => navigate("/offers")}
            />
            <a href="/offers">
              <p
                className={
                  pathMatchRoute("/offers")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
                style={
                  pathMatchRoute("/offers")
                    ? {
                        color: "white",
                        fontSize: "1.25rem",
                      }
                    : {
                        color: "#F3F1F1",
                      }
                }
              >
                Discount
              </p>
            </a>
          </li>
          <li className="navbarListItem">
            <BiCategoryAlt
              fill={pathMatchRoute("/category") ? "#0CBC8B" : "#ffff"}
              style={{
                color: "white",
                fontSize: "1.25rem",
                color: "#F3F1F1",
                width: "26px",
                height: "26px",
              }}
              onClick={() => navigate("/category")}
            />
            <a href="/category">
              <p
                className={
                  pathMatchRoute("/category")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
                style={
                  pathMatchRoute("/category")
                    ? {
                        color: "white",
                        fontSize: "1rem",
                      }
                    : {
                        color: "#F3F1F1",
                      }
                }
              >
                Category
              </p>
            </a>
          </li>
        </ul>
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <AiOutlineLogin
              fill={pathMatchRoute("/sign-in") ? "#0CBC8B" : "#ffff"}
              width="36px"
              height="36px"
              onClick={() => navigate("/sign-in")}
            />
            <a href="/sign-in">
              <p
                className={
                  pathMatchRoute("/sign-in")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
                style={
                  pathMatchRoute("/sign-in")
                    ? {
                        color: "white",
                        fontSize: "1.25rem",
                      }
                    : {
                        color: "#F3F1F1",
                      }
                }
              >
                LOG IN
              </p>
            </a>
          </li>
          <li className="navbarListItem">
            <MdCreateNewFolder
              fill={pathMatchRoute("/create-listing") ? "#0CBC8B" : "#ffff"}
              width="36px"
              height="36px"
              onClick={() => navigate("/create-listing")}
            />
            <a href="/create-listing">
              <p
                className={
                  pathMatchRoute("/create-listing")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
                style={
                  pathMatchRoute("/create-listing")
                    ? {
                        color: "white",
                        fontSize: "1.25rem",
                      }
                    : {
                        color: "#F3F1F1",
                      }
                }
              >
                ADD LISTING
              </p>
            </a>
          </li>
          <li className="navbarListItem">
            <FiPhoneCall
              fill={pathMatchRoute("/contact") ? "#0CBC8B" : "#ffff"}
              width="36px"
              height="36px"
              onClick={() => navigate("/contact")}
            />
            <a href="/contact">
              <p
                className={
                  pathMatchRoute("/contact")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
                style={
                  pathMatchRoute("/contact")
                    ? {
                        color: "white",
                        fontSize: "1.25rem",
                      }
                    : {
                        color: "#F3F1F1",
                      }
                }
              >
                Call Us
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
