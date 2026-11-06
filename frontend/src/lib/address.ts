// Turns whatever was typed or clicked into a plain address.
// Example: "  https://www.Tidepool.zz/ " -> "tidepool.zz"
export function toAddress(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^[a-z]+:\/\//, '') // remove "https://"
    .replace(/^www\./, '') // remove "www."
    .replace(/\/+$/, ''); // remove trailing "/"
}
