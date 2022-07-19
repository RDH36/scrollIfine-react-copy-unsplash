/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./InfiniteScroll.css";
import { v4 as uuidv4 } from "uuid";

export default function InfinityScroll() {
  const [dataImg, setDataImg] = useState([[], [], []]);
  const [pageIndex, setPageIndex] = useState(1);
  const [searhState, setSearhState] = useState("random");
  const [loading, setLoading] = useState(true);

  const infiniteFecthData = () => {
    fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searhState}&client_id=7HJ5JpCyTzY9J713UniwfXC9I9M4MwdkOUP3lW8y0qQ`
    )
      .then((Response) => Response.json())
      .then((data) => {
        const imgsReceived = [];
        data.results.forEach((img) => imgsReceived.push(img.urls.regular));
        const newFreshState = [
          [...dataImg[0]],
          [...dataImg[1]],
          [...dataImg[2]],
        ];

        let index = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 10; j++) {
            newFreshState[i].push(imgsReceived[index]);
            index++;
          }
        }

        setDataImg(newFreshState);
      });
  };
  const searchFecthData = () => {
    setLoading(true);
    fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searhState}&client_id=7HJ5JpCyTzY9J713UniwfXC9I9M4MwdkOUP3lW8y0qQ`
    )
      .then((Response) => Response.json())
      .then((data) => {
        const imgsReceived = [];
        data.results.forEach((img) => imgsReceived.push(img.urls.regular));
        const newFreshState = [[], [], []];

        let index = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 10; j++) {
            newFreshState[i].push(imgsReceived[index]);
            index++;
          }
        }

        setDataImg(newFreshState);
        setLoading(false);
      });
  };
  const handelSearch = (e) => {
    e.preventDefault();
    if (inpuRef.current.value === "") {
      setSearhState("random");
    } else {
      setSearhState(inpuRef.current.value);
    }
    setPageIndex(1);
  };

  useEffect(() => {
    infiniteFecthData();
  }, [pageIndex]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteCheck);
    return () => {
      window.removeEventListener("scroll", infiniteCheck);
    };
  }, []);

  useEffect(() => {
    searchFecthData();
  }, [searhState]);

  const inpuRef = useRef();

  const infiniteCheck = () => {
    console.log("hello check");
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight) {
      console.log("bottom");
      setPageIndex((pageIndex) => pageIndex + 1);
    }
  };
  console.log(dataImg);
  return (
    <div className="container">
      <form onSubmit={handelSearch}>
        <label htmlFor="search">Votre rechercher</label>
        <input type="text" onChange={handelSearch} id="search" ref={inpuRef} />
      </form>
      {loading ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card-list">
          <div>
            {dataImg[0].map((img) => (
              <img src={img} key={uuidv4()} alt="splat img" />
            ))}
          </div>
          <div>
            {dataImg[1].map((img) => (
              <img src={img} key={uuidv4()} alt="splat img" />
            ))}
          </div>
          <div>
            {dataImg[2].map((img) => (
              <img src={img} key={uuidv4()} alt="splat img" />
            ))}
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
