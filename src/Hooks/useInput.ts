import { useState } from "react";

export default (defaultValue: any) => {
  const [value, setValue] = useState<any>(defaultValue);
  const onChangeText = text => {
    setValue(text);
  };
  return { value, setValue, onChangeText };
};
