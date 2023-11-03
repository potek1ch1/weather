import React, { useEffect, useState } from "react";
import "./css/Select.css";
import { match } from "assert";

interface Props {
  id: string;
  condition: string;
  isChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  // isChange:React.EventHandler<React.ChangeEvent<HTMLInputElement>>
}

const Select = () => {
  const conditions: string[] = ["晴", "雨", "曇"];
  const [trueList, setTrueList] = useState<string[]>([]);

  const handleCheck: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value: string = e.target.value;
    // setTrueList((prevTrueList) => [...prevTrueList, value]);
    e.target.checked
      ? setTrueList((prevTrueList) => [...prevTrueList, value])
      : setTrueList((prevTrueList) =>
          prevTrueList.filter((data) => data !== value)
        );
  };

  const handleExplorer = async () => {
    const result = await fetch(
      "http://api.weatherapi.com/v1/history.json?key=8e4eb12e193f46b6860135354231208&q=TOKYO&dt=2023-08-11"
    ).then((res) => res.json());
    console.log(result)
  };
  useEffect(() => {
    console.log(trueList);
  }, [trueList]);
  return (
    <div className="selectArea">
      <div className="weatherArea">
        天気:
        <span className="container">
          {conditions.map((condition, index) => (
            <SelectArea
              key={index}
              id={String(index)}
              condition={condition}
              isChange={handleCheck}
            />
          ))}
        </span>
      </div>
      <div className="periodArea"></div>
      <button onClick={handleExplorer}>検索</button>
    </div>
  );
};

export default Select;

const SelectArea: React.FC<Props> = ({ id, condition, isChange }) => {
  return (
    <>
      <input type="checkbox" id={id} value={condition} onChange={isChange} />
      <label htmlFor={id}>{condition}</label>
    </>
  );
};
