import React from "react";
import Data from "./prefectures.json";
import "./css/Area.css";
import { useLocation } from "react-router-dom";
export default function Area() {
  // const areaList = [
  //   "北海道・東北",
  //   "関東",
  //   "中部",
  //   "近畿",
  //   "中国",
  //   "四国",
  //   "九州・沖縄",
  // ];
  //Data.map((area) => area.prefectures.map(prefecture => console.log(prefecture)))
  return (
    <div className="flex-container">
      {Data.map((area) => (
        <div key={area.area} className="container">
          <h3>{area.area}</h3>
          {/* {extractPrefecture(area.prefectures)} */}
          <ExtractPrefecture prefectures={area.prefectures}/>
        </div>
      ))}
    </div>
  );
}

const ExtractPrefecture = ({prefectures}: any) => {
  const pathname = useLocation().pathname;
  //prefectures.map((prefecture: any) => console.log(prefecture));
  return (
    <div className="prefecture-container">
      {prefectures.map((prefecture: any) => (
        <div key={prefecture.id} className="prefecture">
          <a href={pathname +"?pref="+ prefecture.en}>{prefecture.name}</a>
          <br />
        </div>
      ))}
    </div>
  );
};
