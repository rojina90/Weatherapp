import React, { useEffect, useState } from "react";
import "./first.css";
import house from "../assets/img/house.svg";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Firstpage = ({ country }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${country}&days=7&dt=2024-07-17&key=0a72a01535cd4aaeac384408241707`
    );
    const result = await response.json();
    setData(result);
  };
  const handleSearch = () => {
    console.log("search");
    navigate("/second");
  };
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(
  //   data?.forecast?.forecastday[0]?.hour?.map((item) => item.time.slice(11))
  // );
  console.log(data);
  return (
    <div>
      <section>
        <div className="image-sec">
          <img
            id="bg"
            src="https://images.pexels.com/photos/591644/nature-landscape-stars-constellations-591644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />

          <img src={house} alt="" id="house" />
          <div
            className="icon"
            style={{
              position: "absolute",
              top: "20px",
              right: "40px",
              color: "white",
              fontSize: "17px",
            }}
          >
            <FaMagnifyingGlass onClick={handleSearch} />
          </div>
          <div className="temperature">
            <h1>{data?.location?.name}</h1>
            <h2>{data?.current?.temp_c}</h2>
            <h3>{data?.current?.condition?.text}</h3>

            <span>
              H:24°<p style={{ marginLeft: "10px" }}> L:18°</p>{" "}
            </span>
          </div>
          <div className="forecast">
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "800",
                marginTop: "10px",
                letterSpacing: "0.43",
              }}
            >
              Hourly ForeCast
            </p>
            {/* <span>Weekly ForeCast</span> */}
            <div className="items">
              {data?.forecast?.forecastday[0]?.hour?.map((item) => {
                return (
                  <div className="list">
                    <p>{item.time.slice(11)}</p>
                    <img src={item?.condition?.icon} />
                    <p>{item.temp_c}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Firstpage;
