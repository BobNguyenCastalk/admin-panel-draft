import { ShopContext } from "@presentation/shared//Shop";
import { useContext } from "react";

function useShop() {
  return useContext(ShopContext);
}
export default useShop;
