import Cookies from "js-cookie";

export default function getToken() {
  // アクセストークン
  const accessToken = Cookies.get("access-token");

  // uid
  const uid = Cookies.get("uid");

  // expiry
  const expiry = Cookies.get("expiry");

  // client
  const client = Cookies.get("client");

  return {
    accessToken: accessToken || "",
    uid: uid || "",
    expiry: expiry || "",
    client: client || "",
  };
}
