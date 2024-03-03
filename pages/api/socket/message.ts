import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";

const messageHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (req.method !== "POST") return;

  res.socket.server.io.emit("message", req.body.message);

  res.json({
    message: "successful",
    status: 200,
  });
};

export default messageHandler;
