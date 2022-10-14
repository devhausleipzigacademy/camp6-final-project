import { isError } from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TelegramLoginButton from "react-telegram-login";

export default function Login() {
  const router = useRouter();

  // Redirect the user to home if a telegramId is already stored in localstorage
  useEffect(() => {
    const telegramId = localStorage.getItem("c6-tid");
    if (telegramId) {
      router.replace("/");
    }
  }, []);

  const handleTelegramResponse = async (response) => {
    try {
      const user = await fetch("http://bookshare.local/api/user", {
        method: "POST",
        body: JSON.stringify({
          username: response.username,
          telegramId: response.id.toString(),
          image: response.photo_url,
          firstName: response.first_name,
          lastName: response.last_name,
        }),
      }).then((res) => res.json());
      const telegramId = localStorage.getItem("c6-tid");
      // if theres no telegramId in localstorage create it
      if (!telegramId) {
        localStorage.setItem(
          "c6-tid",
          JSON.stringify({ tid: user.telegramId, uid: user.identifier })
        );
      }
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TelegramLoginButton
      dataOnauth={handleTelegramResponse}
      botName="bookshare_official_bot"
    />
  );
}
