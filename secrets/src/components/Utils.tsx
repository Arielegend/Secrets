// 1 Central function to check validity of MASTER_KEY
export function checkMasterKey(masterKey: string) {
  if (masterKey === "42") {
    return true;
  } else {
    alert("Wrong Master key!");
    return false;
  }
}
