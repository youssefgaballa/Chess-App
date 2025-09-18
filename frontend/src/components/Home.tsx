import { usePersistLogin } from "../util/persistLogin";

export function Home() {
  // TODO: Add routing to home page
  // (async () => {
  //   console.log("refresh token", await getRefreshToken(userAuth!));
  // })();

  usePersistLogin();


  return (
    <>
      <div>
        <header className="text-center">
          Home page!
        </header>
        
      </div>
    </>
  )
}

