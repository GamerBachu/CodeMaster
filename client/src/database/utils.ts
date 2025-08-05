import type { UserModel } from "./localDb/model/UserModel";
import type { UserTokenModel } from "./localDb/model/UserTokenModel";

const TOKEN_VALID_MIN = 60;
export function encryptPassword(password: string): string {
  const reversed = password.split("").reverse().join("");
  const base64Encoded = btoa(reversed);
  return base64Encoded;
}

export function generateGuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = crypto.getRandomValues(new Uint8Array(16));

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, "0"));
    return `${hex.slice(0, 4).join("")}${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 12).join("")}-${hex.slice(12, 16).join("")}`;
  }

  return `${Date.now()}}`;
}



const xorEncrypt = (str: string, key: string): string => {
  return `${key}.${str}`;
};

const xorDecrypt = (encrypted: string, key: string): string => {
  const split = encrypted.split(".");

  if (split.length !== 2) return "";

  if (split[0] !== key) return "";

  return split[1];
};

const getValidTil = (validMinutes: number): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + validMinutes);
  return date.toISOString();
};


export const tokenValidate = (token: string): UserTokenModel | null => {

  const splitToken = token.split(".");
  if (splitToken.length !== 3) return null;

  const [base64UrlHeader, base64UrlPayload, signature] = splitToken;


  const payload = JSON.parse(atob(base64UrlPayload));
  const guid = payload?.guid ?? "";
  const validTil = payload?.validTil ?? "";
  const username = payload?.username ?? "";
  const name = payload?.name ?? "";
  if (guid === "" || validTil === "" || username === "" || name === "") return null;


  const date1 = new Date(validTil);
  const date2 = new Date();

  if (date1 <= date2) return null;

  const headerA = atob(base64UrlHeader);
  const random = xorDecrypt(headerA, guid);

  if (random === "") return null;

  const headerS = JSON.parse(atob(signature));
  if (headerS === undefined) return null;

  return {
    username: username,
    validTil: validTil,
    token: token,
    deviceName: ""
  };
};


export const tokenCreate = (user: UserModel): UserTokenModel => {
  const guid = user.guid;

  const random = generateGuid();
  const headerA = xorEncrypt(random, guid);
  const base64UrlHeader = btoa(headerA);
  const validTil = getValidTil(TOKEN_VALID_MIN);

  const payload = {
    username: user.username,
    name: user.name,
    validTil: validTil,
    guid: guid
  };
  const base64UrlPayload = btoa(JSON.stringify(payload));

  const headerS = {
    alg: "HS256",
    typ: "JWT",
  };

  const signature = btoa(JSON.stringify(headerS));

  const Token = `${base64UrlHeader}.${base64UrlPayload}.${signature}`;

  return {
    username: user.username,
    validTil: validTil,
    token: Token,
    deviceName: ""
  };
};
