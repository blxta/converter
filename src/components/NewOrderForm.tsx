import React, { useState } from "react";

type Input = {
  name: string;
};
const NewOrder = () => {
  const [state, setState] = useState<Input>({ name: "buba" });
  return <>{state.name}</>;
};

export default NewOrder;
