import { useContext } from "react";
import { WakuContext } from "./WakuContext";

export const useWakuNode = () => {
  const context = useContext(WakuContext);

  if (!context) {
    throw new Error(
      "useWakuNode() can only be used inside of <WakuProvider />, " + "please declare it at a higher level.",
    );
  }

  return context.wakuData;
};
