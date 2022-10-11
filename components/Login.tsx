import TelegramLoginButton from "react-telegram-login";

export function Login() {
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
      });
      console.log(user);
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
