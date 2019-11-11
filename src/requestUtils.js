const postData = async ({url, data}) => {
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

const geteventApiUrl  = "/api/getevent";
const geteventsApiUrl = "/api/getevents";
const loginApiUrl     = "/api/login";
const signupApiUrl    = "/api/signup";
const logoutApiUrl    = "/api/logout";
const addeventApiUrl  = "/api/addevent";

export {
  postData,
  geteventApiUrl, geteventsApiUrl,
  loginApiUrl, signupApiUrl, logoutApiUrl, addeventApiUrl,
};
