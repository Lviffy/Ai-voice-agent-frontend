import { AccessToken } from "livekit-server-sdk";

function generateRandomAlphanumeric(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const generateToken = async () => {
  const apiKey = import.meta.env.VITE_LIVEKIT_API_KEY || 'APIJfzAzJf6pheq';
  const apiSecret = import.meta.env.VITE_LIVEKIT_API_SECRET || 'ejOfxKDv0SE07f1NDnPSEfSt7GPKlZDjArsmeQ9v5T3C';

  if (!apiKey || !apiSecret) {
    throw new Error("LiveKit API credentials not configured");
  }

  const roomName = `room-${generateRandomAlphanumeric(4)}-${generateRandomAlphanumeric(4)}`;
  const identity = `identity-${generateRandomAlphanumeric(4)}`;

  try {
    const at = new AccessToken(apiKey, apiSecret, { identity });
    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    });

    return at.toJwt();
  } catch (error) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};
