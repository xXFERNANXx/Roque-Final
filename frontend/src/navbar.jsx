import { Link, useRoute } from "wouter";

function Navbar() {

  const [isViewActive] = useRoute("/Anime");
  const [isCreateActive] = useRoute("/Anime/create");
  const [isEditActive] = useRoute("/Anime/edit");
  const [isDeleteActive] = useRoute("/Anime/delete");

  return (
    <div className="navbar shadow-sm bg-white">
      <div className="navbar-start">
        <a className="pl-4 text-xl font-bold text-primary">Mundo Anime</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
          <Link
            href="/Anime"
            className={`mx-1 btn btn-ghost hover:bg-primary hover:text-white ${isViewActive ? "bg-primary text-white" : "text-secondary"}`}
          >
            Ver Animes Disponibles
          </Link>
          <Link
            href="/Anime/create"
            className={`mx-1 btn btn-ghost hover:bg-primary hover:text-white ${isCreateActive ? "bg-primary text-white" : "text-secondary"}`}
          >
            Agregar Anime
          </Link>
          <Link
            href="/Anime/edit"
            className={`mx-1 btn btn-ghost hover:bg-primary hover:text-white ${isEditActive ? "bg-primary text-white" : "text-secondary"}`}
          >
            Editar Anime
          </Link>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          href="/Anime/delete"
          className={`btn btn-ghost hover:bg-primary hover:text-white ${isDeleteActive ? "bg-primary text-white" : "text-secondary"}`}
          >
          Eliminar Anime
        </Link>
      </div>
    </div>
  );
}
export default Navbar;
