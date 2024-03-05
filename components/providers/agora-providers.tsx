"use client";

import React from "react";
import AgoraRTC, { AgoraRTCProvider, IAgoraRTCClient } from "agora-rtc-react";

export const client = AgoraRTC.createClient({
  codec: "vp8",
  mode: "rtc",
});

const AgoraProvider = ({ children }: { children: React.ReactNode }) => {
  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
};

export default AgoraProvider;
