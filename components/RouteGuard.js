import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/lib/authenticate";
import { useAtom } from "jotai"; // Import useAtom
import { favouritesAtom, searchHistoryAtom } from "@/store"; // Import atoms
import { getFavourites, getHistory } from "@/lib/userData"; // Import getFavourites and getHistory

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"]; // Add /register to PUBLIC_PATHS

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favourites, setFavourites] = useAtom(favouritesAtom); // Reference favouritesAtom
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Reference searchHistoryAtom

  const updateAtoms = async () => {
    // Copy updateAtoms function
    const favs = await getFavourites();
    const history = await getHistory();
    setFavourites(favs);
    setSearchHistory(history);
  };

  useEffect(() => {
    updateAtoms(); // Invoke updateAtoms at the beginning of useEffect
    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>;
}
