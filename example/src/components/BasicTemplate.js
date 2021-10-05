import React from "react";

const BasicTemplate = ({title, input, output}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>
        Input: <b>{input}</b>
        <br />
        Output: <b>{output}</b>
      </p>
    </div>
  );
};

export default BasicTemplate;
