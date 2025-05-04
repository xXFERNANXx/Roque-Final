import { Route, Switch, Redirect } from "wouter";
import Navbar from "./navbar";
import CreateAnime from "./pages/createAnime";
import ViewAnimes from "./pages/viewAnime";
import EditAnime from "./pages/editAnime";
import DeleteAnime from "./pages/deleteAnime";

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/Anime" component={ViewAnimes} />
        <Route path="/Anime/create" component={CreateAnime} />
        <Route path="/Anime/edit" component={EditAnime} />
        <Route path="/Anime/delete" component={DeleteAnime} />
        <Redirect to="/Anime" /> 
      </Switch>
    </>
  );
}
