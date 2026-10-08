const getApiUrl = (n) =>
  `https://api.ai-cats.net/v2/cats/random/bulk?size=512&theme=All&limit=${n}`; // bulk api

async function initMultiCardsData(signal, n = 1) {
  console.log(`=> fetch ${n} cards`);

  try {
    // disable cache to avoid the browser using cached result when the apiUrl does not change
    // if specified, signal can be used to abort the fetch
    const response = await fetch(getApiUrl(n), {
      cache: "no-store",
      signal: signal,
    });

    const json = await response.json();

    // the v2 bulk api returns an id and an url: use them directly and let the browser handle the image fetching and caching

    return json.map(({ id, url }) => ({
      id,
      url,
    }));

    // SAVE BLOB DATA:

    // return await Promise.all(
    //   // creates an array of promises
    //   json.map(async (imgData) => {
    //     const id = imgData.id;

    //     const imgResponse = await fetch(imgData.url, {
    //       cache: "no-store",
    //       signal: signal,
    //     });
    //     const blob = await imgResponse.blob();

    //     const url = URL.createObjectURL(blob);

    //     return { id, url };
    //   }),
    // );
  } catch (err) {
    if (signal.aborted) {
      console.log("=> abort");
    }
    throw new Error(err);
  }
}

export default initMultiCardsData;
