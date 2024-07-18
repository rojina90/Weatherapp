import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import "./first.css";
import rectangle from "../assets/img/Rectangle 1.svg";
import { useNavigate } from "react-router-dom";

const Secondpage = ({ country, setCountry }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${country}&days=7&dt=2024-07-17&key=0a72a01535cd4aaeac384408241707`
    );
    const result = await response.json();
    setData(result);
  };
  const handleFirstButton = () => {
    console.log("first");
    navigate("/");
  };

  useEffect(() => {
    if (country) {
      fetchData();
    }
  }, [country]);

  const fetchSearch = async (input) => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?q=${input}&key=0a72a01535cd4aaeac384408241707`
    );
    const result = await response.json();
    setSearchedData(result);
    // console.log(result);
  };

  const handleBackButton = () => {
    console.log("back");
    navigate("/");
  };
  useEffect(() => {
    if (input !== "") {
      fetchSearch(input);
    }
  }, [input]);

  return (
    <div className="bg">
      <div className="container">
        <div className="background">
          <div className="input_section">
            <div
              style={{
                color: "#ffffff",
                padding: " 16px",
                fontSize: "29px",
                lineHeight: "34px",
                paddingTop: "30px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "21px",
                  color: "rgba(235, 235, 245, 0.6)",
                }}
              >
                <FaChevronLeft onClick={handleBackButton} />
              </span>
              Weather
            </div>
            <div className="search_icon">
              <div className="searchicon">
                <FaMagnifyingGlass />
              </div>
              <input
                className="search_box"
                type="text"
                placeholder=" Search for a city or airport"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
            {searchedData?.length !== 0 && (
              <div className="dropdown">
                {searchedData?.map((item) => (
                  <button
                    onClick={() => {
                      setCountry(item.name);
                      setSearchedData([]);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* {data?.forecast?.forecastday[0].hour?.map((item) => ( */}
        {data.length !== 0 && (
          <div className="firstsec" onClick={handleFirstButton}>
            <img src={rectangle} alt="" />
            <div className="content">
              <h1>{data?.current?.temp_c}°</h1>
              <h4 style={{ color: "rgba(235, 235, 245, 0.6)" }}>H:24° L:18°</h4>
              <h3>{data?.location?.name}</h3>

              <div className="cel">
                {" "}
                <img
                  style={{ fontSize: "200px" }}
                  src={data?.current?.condition?.icon}
                  alt=""
                />
                <p>{data?.current?.condition.text}</p>
              </div>
            </div>
          </div>
        )}
        {/* ))} */}
      </div>
    </div>
  );
};

export default Secondpage;
