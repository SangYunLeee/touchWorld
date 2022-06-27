import { useReducer, useEffect } from "react";
function useLocalStorageReducer(key, defaultVal, reducer) :[typeof reducer[0], typeof reducer[1]] {
  const [state, dispatch] = useReducer(reducer, defaultVal, () => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || String(defaultVal)
      );
    } catch (e) {
      value = defaultVal;
    }
    return value;
  });

  useEffect(() => {
    if (state == undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, dispatch];
}
export { useLocalStorageReducer };
