import { ReactElement, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { multiaddr } from "@multiformats/multiaddr";
import { LightNode, Protocols, createLightNode, waitForRemotePeer } from "@waku/sdk";

export type WakuData = {
  waku: LightNode | undefined;
  connected: boolean;
};

export type WakuContextData = {
  wakuData: WakuData;
} | null;

export const WakuContext = createContext<WakuContextData>(null);

const peers = ["/ip4/194.163.147.4/tcp/8000/ws/p2p/16Uiu2HAkyLuGoFERdpXP2uAehxwLXQw9v6jNsYmEJMtRs7iTCihd"];

export const WakuContextProvider: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [waku, setWaku] = useState<LightNode>();

  const connectWaku = useCallback(async () => {
    if (!isConnecting && !connected) {
      setIsConnecting(true);
      const node = await createLightNode();

      node.libp2p.addEventListener("peer:disconnect", () => {
        console.log("peer disconnected");
        setConnected(false);
      });

      node.libp2p.addEventListener("peer:connect", () => {
        console.log("peer connected");
        setConnected(true);
      });

      await node.start();

      console.log("connecting to waku...");
      for (const peer of peers) {
        const addr = multiaddr(peer);
        await node.dial(addr);
      }

      await waitForRemotePeer(node, [Protocols.Filter, Protocols.LightPush, Protocols.Store]);
      setWaku(node);
    }
  }, []);

  useEffect(() => {
    connectWaku();
  }, []);

  const wakuData = useMemo(
    () => ({
      waku,
      connected,
    }),
    [waku, connected],
  );

  return <WakuContext.Provider value={{ wakuData }}>{children}</WakuContext.Provider>;
};
