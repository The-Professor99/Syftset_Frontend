import numeral from "numeral";

function result(format: string, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}

export function fShortenNumber(number: number) {
  const format = number ? numeral(number).format("0.00a") : "";
  return result(format, ".00");
}
