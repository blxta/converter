import React from "react";
import "../";

const cultures = [
  ["wheat", 400],
  ["corn", 250],
  ["sunflower", 1000],
];

const elements = (
  <>
    <div class="wheat">392</div>
    <div class="corn">7.85</div>
  </>
);

const DisplayCourse = () => {
  return (
    <>
      {cultures.map((culture, index) => (
        <li key={index}>{culture}</li>
      ))}
      {elements}
      <div></div>
    </>
  );
};

export default DisplayCourse;
