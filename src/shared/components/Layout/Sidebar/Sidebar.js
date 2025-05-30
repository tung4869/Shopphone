import React, { useEffect, useState } from "react";
import { getBanner } from "../../../../services/Api";
import { getImageBanner } from "../../../ultils";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    getBanner({
      params: {
        sort: 1,
        limit: 8,
      },
    })
      .then(({ data }) => setBanner(data.data.docs))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
        <div id="banner">
          {banner.map((item, index) => (
            <div key={index} className="banner-item">
              <Link to="#">
                <img
                  alt="anh"
                  className="img-fluid"
                  src={getImageBanner(item.image)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
