import { Secret } from "./components/Types";
const _pathToSecrets = "http://localhost:5000/secrets";

/*
////////////////////
////////////////////
! 1. fetchUrl ->
  Fetches all secrets from dataBase

! 2. changeNameOfSecret -> 
  Changes the name of a single secret

! 3. deleteSecret ->
  Deletes a secret

! 4. addSecret ->
  Adds a new secret
////////////////////
////////////////////
*/
export async function fetchUrl(
  setSecrets: React.Dispatch<React.SetStateAction<Secret[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  secretsToShow: React.Dispatch<React.SetStateAction<Secret[]>>
) {
  const response = await fetch(_pathToSecrets);
  const json = await response.json();

  // Setting all dsecrets variable to hold all secrets
  setSecrets(json);

  // Initially, we present all the secrets
  // It is the same as the User is looking for an empty char
  secretsToShow(json);

  // Done fetching...
  setLoading(false);

  return json;
}

export async function changeNameOfSecret(newSecret: Secret) {
  // < url is form of /secret/{id} >
  const _pathToSecret = _pathToSecrets + "/" + newSecret.id;

  let response = await fetch(_pathToSecret, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(newSecret),
  });

  window.location.reload(false);
  return response.json();
}

export async function deleteSecret(secret: Secret) {
  const _pathToSecret = _pathToSecrets + "/" + secret.id;
  console.log("this is _pathToSecret -> ", _pathToSecret);
  await fetch(_pathToSecret, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(secret),
  });
  window.location.reload(false);
}

export async function addSecret(newSecret: Secret) {
  await fetch(_pathToSecrets, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(newSecret),
  });

  window.location.reload(false);
}
