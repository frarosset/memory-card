const apiUrl = `https://api.ai-cats.net/v1/cat?size=512&theme=All`; // actual api
// const apiUrl = "/card-front.jpg"; // use this during development, to avoid actual api call

async function initCardData(signal) {
  // generate a unique id
  const id = crypto.randomUUID();
  console.log("=> fetch", id);

  try {
    // disable cache to avoid the browser using cached result when the apiUrl does not change
    // if specified, signal can be used to abort the fetch
    const response = await fetch(apiUrl, { cache: "no-store", signal: signal });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    return { id, url };
  } catch (err) {
    if (signal.aborted) {
      console.log("=> abort", id);
    }
    throw new Error(err);
  }
}

export default initCardData;
