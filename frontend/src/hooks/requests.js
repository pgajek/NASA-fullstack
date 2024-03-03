const apiUrl = "http://localhost:8000/v1";

async function httpGetPlanets() {
  const response = await fetch(`${apiUrl}/planets`);

  return response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${apiUrl}/launches`);
  const fetchedLaunches = await response.json();

  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${apiUrl}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await await fetch(`${apiUrl}/launches/${id}`, {
      method: "delete",
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
