import { Secret } from "./components/Types";

/* 
Standard fetching function. (GET request to shipments at JSON-SERVER)
ARGS:
  1. setSecrets   -> the state "secrets" we initil at Dashboard
  2. setLoading   -> the state "loading" we initial at Dashboard

  After successful request, we update the data using setDataTyped, 
*/

export async function fetchUrl(
  setSecrets: React.Dispatch<React.SetStateAction<Secret[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const _pathToSecrets = "http://localhost:5000/secrets";
  const response = await fetch(_pathToSecrets);
  const json = await response.json();

  //  dataTyped -> Array of Shipments, fetched by GET REQUEST to all shipment.
  // this variable is the rows for main table.
  setSecrets(json);
  setLoading(false);
  return json;
}

export async function changeNameOfSecret(
  newSecret: Secret,
  onClose: () => void
) {
  // < url is form of /shipment/{id} >
  const _pathToaSecret = "http://localhost:5000/secrets/" + newSecret.id;

  let response = await fetch(_pathToaSecret, {
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

  onClose();
  window.location.reload(false);
  return response.json();
}

export async function deleteSecret(secret: Secret) {
  const _pathToaSecret = "http://localhost:5000/secrets/" + secret.id;

  await fetch(_pathToaSecret, {
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
  const _pathToaSecret = "http://localhost:5000/secrets/";

  await fetch(_pathToaSecret, {
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
