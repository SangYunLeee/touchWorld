import {useState} from 'react';

function useToggle (initialVal) {
  const [value, setValue] = useState(initialVal);

  const toggle = () => {
    setValue(!value);
  }
  return [value, toggle];
}

export default useToggle;