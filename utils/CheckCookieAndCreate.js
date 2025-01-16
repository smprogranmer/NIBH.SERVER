import JWT from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
function generateSecureOrderId(length = 15) {
  const uuid = uuidv4(); // Generate UUID
  const numericId = uuid.replace(/\D/g, ""); // Remove non-numeric characters
  return numericId.substring(0, length); // Truncate to desired length
}
export const checkAndSetCookies = (cookie) => {
  const orderId = generateSecureOrderId();
  const refId = cookie
    ? JWT.verify(cookie, process.env.JWT_SECRET_KEY).refId
    : generateSecureOrderId();

  return {
    refId,
    orderId,
  };
};
