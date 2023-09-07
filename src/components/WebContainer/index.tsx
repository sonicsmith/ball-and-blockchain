"use client";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
// @ts-ignore
import { ConnectKitProvider } from "connectkit";
import { alchemyProvider } from "wagmi/providers/alchemy";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: alchemyKey! })]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export const Web3Container = ({ children }: { children?: React.ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
};
