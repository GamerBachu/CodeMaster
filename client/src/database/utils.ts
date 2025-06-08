export function encryptPassword(password: string): string {
  const reversed = password.split("").reverse().join("");
  const base64Encoded = btoa(reversed);
  return base64Encoded;
}
