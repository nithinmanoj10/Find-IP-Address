// use timeout if the page takes too long to load
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// get the JSON file from the API URL
export const getJSON = async function (url) {
  try {
    // const res = await fetch(`${API_URL}${id}`);
    const res = await Promise.race([fetch(url), timeout(10)]);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
