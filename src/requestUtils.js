const postData = async ({url, data}) => {
  return await (await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })).json();
}

const getparticipantsApiUrl = "/api/getparticipants"
const geteventApiUrl        = "/api/getevent";
const geteventsApiUrl       = "/api/getevents";
const loginApiUrl           = "/api/login";
const signupApiUrl          = "/api/signup";
const logoutApiUrl          = "/api/logout";
const addeventApiUrl        = "/api/addevent";

export {
  postData,
  geteventApiUrl, geteventsApiUrl, getparticipantsApiUrl,
  loginApiUrl, signupApiUrl, logoutApiUrl, addeventApiUrl,
};
