import { useEffect } from "react";

export const useAsyncEffect = (asyncFunction, dependencies) => {
  useEffect(() => {
    asyncFunction();
  }, dependencies);
};
