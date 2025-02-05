import initCardData from "./initCardData.js";

async function fetchCardsData(n, signal) {
  // Fetches the data for n cards using the initCardData() function
  // To perform multiple fetch requests and await for all of them to complete,
  // use Promise.all
  // see: https://stackoverflow.com/a/55124856
  //
  // To repeat an action n times, use Array.from
  // see: https://stackoverflow.com/a/57709384

  return Promise.all(
    Array.from({ length: n }, async () => {
      const cardInfo = await initCardData(signal);
      return cardInfo;
    })
  );
}

export default fetchCardsData;
