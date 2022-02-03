export const fromHexString = (hexString: any) =>
  new Uint8Array(
    hexString.match(/.{1,2}/g).map((byte: any) => parseInt(byte, 16))
  );

export const toHexString = (bytes: any) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
