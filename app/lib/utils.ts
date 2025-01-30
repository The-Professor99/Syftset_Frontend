import numeral from "numeral";

function result(format: string, key = ".00") {
  return format ? format : 0;
  // const isInteger = format.includes(key);

  // return isInteger ? format.replace(key, "") : format ? format : 0;
}

export function fShortenNumber(number: number) {
  const format = number ? numeral(number).format("$0.00a") : "";
  return result(format, ".000");
}

export const median = (arr: number[]): number | undefined => {
  if (!arr.length) return undefined;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};
