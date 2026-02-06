export function Home() {
  // TODO: Add routing to home page
  // (async () => {
  //   console.log("refresh token", await getRefreshToken(userAuth!));
  // })();
  const starterAccounts = [
    { username: "root", password: "12432543234" },
    { username: "jim", password: "1242353453234" },
    { username: "bill", password: "24325" },
    { username: "bob", password: "252453" },
    { username: "gamer", password: "442232" },
    { username: "sylas", password: "12432543234" },
    { username: "kye", password: "12432543234" },
    { username: "seth", password: "12432543234" },
  ];

  return (
    <>
      <div>
        <header className="text-center">
          <h1 className="text-4xl font-bold underline">
            Welcome to the Chess App!
          </h1>
          <p className="mt-4">Play chess with your friends or by yourself.</p>
          <p>
            You could play on the same computer just by opening up the site in
            two tabs and logging in two different users.
          </p>
          <p>
            You can edit your profile. If you're logged in as an admin you can
            view and edit other users profiles.
          </p>
          <p>
            You can also publish and upload notes to the server, and talk with
            other users in a chat room.
          </p>
          <p>Log in to get started</p>
          <p>Starter Usernames + Passwords: </p>
          {starterAccounts.map((account) => (
            <p key={account.username}>
              {account.username} : {account.password}
            </p>
          ))}
        </header>
      </div>
    </>
  );
}
