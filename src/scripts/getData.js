const getDataFromJson = async (path) => {
  try {
    const resp = await fetch(`/public/json/${path}s.json`);
    const parsedResp = await resp.json();
    return parsedResp;
  } catch (error) {
    console.log(`Error fetchind ${path} data`, error.message);
  }
};

const getDataFromHtml = async (path) => {
  const parser = new DOMParser();

  try {
    const resp = await fetch(`/src/categories/${path}/index.html`);
    const parsedResp = await resp.text();
    const htmlResp = parser.parseFromString(parsedResp, "text/html");

    return htmlResp;
  } catch (error) {
    return console.log(`Error fetching category ${category}`, error.message);
  }
};

export { getDataFromJson, getDataFromHtml };
