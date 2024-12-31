import crypto from "crypto";
export const generatePnrNumber = (number: string, transactionId: string) => {
  const timestamp = Date.now().toString();
  const data = number + transactionId + timestamp;
  const hash = crypto.createHash("md5").update(data).digest("hex");
  return hash.substring(0, 15).toUpperCase();
};
