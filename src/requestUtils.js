const postData = async ({url, data}) => {
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

const loginApiUrl    = "/api/login";
const signupApiUrl   = "/api/signup";
const logoutApiUrl   = "/api/logout";
const addeventApiUrl = "/api/addevent";

export {
  postData,
  loginApiUrl,  signupApiUrl, logoutApiUrl, addeventApiUrl,
};
