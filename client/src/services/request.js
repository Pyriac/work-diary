import axios from "axios";

export default function getTasks() {
  return axios
    .get(
      "https://docs.google.com/spreadsheets/d/1rDTGPwr0nW1ReU2sI9y4C_ZEJ6GXaV14iOzaEi5Hr4M/pub?output=csv"
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));
}
