import Cookies from "js-cookie";

export default function setToken({
  accessToken,
  uid,
  expiry,
  client,
}: {
  accessToken: string;
  uid: string;
  expiry: string;
  client: string;
}) {
  // アクセストークン
  Cookies.set("access-token", accessToken, {
    path: "/",
    expires: new Date(expiry),
  });

  // uid
  Cookies.set("uid", uid, {
    path: "/",
    expires: new Date(expiry),
  });

  // expiry
  Cookies.set("expiry", expiry, {
    path: "/",
    expires: new Date(expiry),
  });

  // client
  Cookies.set("client", client, {
    path: "/",
    expires: new Date(expiry),
  });
}
