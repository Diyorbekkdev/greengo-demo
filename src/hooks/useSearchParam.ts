import { useLocation, useSearchParams } from "react-router-dom";

const useSearchAppParams = () => {
  const { search } = useLocation();
  const [get, set] = useSearchParams();

  // Get all params (available current window)
  const params = new URLSearchParams(search);

  // Get all params
  const getAllParams = () => {
    return {
      keys: Array.from(params.keys()),
      values: Array.from(params.values()),
      pair: Object.fromEntries(Array.from(params.entries())),
    };
  };

  // Remove by key
  const removeParamsByKeys = ({ keys }: any) => {
    const { pair } = getAllParams();

    for (const key of keys) delete pair[key];

    set({ ...pair });
  };

  // Setter
  const setParams = (params: any) => {
    const { pair } = getAllParams();
    set({ ...pair, ...params });
  };

  // Clear
  const clearParams = () => {
    set({});
  };

  // Getter
  const getParams = (params: any) => get.get(params);

  return {
    getAllParams,
    removeParamsByKeys,
    setParams,
    getParams,
    clearParams,
  };
};

export { useSearchAppParams };
