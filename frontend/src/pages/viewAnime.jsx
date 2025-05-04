import star from "/star.svg";
import { useQuery } from "@tanstack/react-query";

async function fetchAnimesAll() {
  const response = await fetch("/api/animes");
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    throw new Error("Error parsing JSON: " + error.message);
  }
}

function ViewAnime() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["animes"],
    queryFn: fetchAnimesAll,
    staleTime: 5000
  });

  if (isLoading) 
    return (
      <>
        <div className="flex items-center justify-center">
          <span
            className="loading loading-infinity"
            style={{ width: "25%", height: "25%" }}
          ></span>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-3xl font-medium">Cargando<span className="loading loading-dots loading-xl"></span></p>
        </div>
      </>
    );

  if (error) 
    return (
      <div className="min-h-[calc(100vh-4.5rem)] bg-base-200 flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col items-center text-center">
              <div className="text-error mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">Error del Servidor</h1>
              
              <p className="text-lg mb-6">
                Lo sentimos, ha ocurrido un problema en el servidor. Por favor, inténtalo de nuevo más tarde.
              </p>
              
              {import.meta.env.DEV && (
                <div className="collapse collapse-arrow bg-base-200 mb-4 w-full">
                  <input type="checkbox" />
                  <div className="collapse-title text-sm font-medium">
                    Detalles del error
                  </div>
                  <div className="collapse-content">
                    <pre className="text-xs text-error overflow-auto">
                      {error?.message || JSON.stringify(error, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
              
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Recargar Página
              </button>
              
              <div className="mt-4">
                <a href="/MundoAnime/Anime" className="link link-primary text-sm">
                  Volver al inicio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="max-w-screen p-2 grid lg:grid-cols-3 md:grid-cols-2 text-left">
        {data?.map((anime) => (
          <div key={anime.id} className="p-4">
            <div className="indicator">
              <span className="indicator-item badge badge-primary text-white">
                <img src={star} alt="star" width="20" height="20" />
                {anime.averageScore}/10
              </span>
              <div className="card w-96 bg-base-100 shadow-2xl">
                <div className="card-body bg-white text-black rounded-2xl">
                  <div className="flex justify-between items-center">
                    <span
                      className={`badge badge-xs text-black ${
                        anime.ageRating == "+13"
                          ? "badge-success"
                          : anime.ageRating == "+16"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      Clasificación: {anime.ageRating}
                    </span>
                    <span className="text-xl"></span>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-3xl font-bold text-primary">
                      {anime.title}
                    </h2>
                  </div>
                  <ul className="flex flex-col gap-2 text-xs">
                    <li className="flex flex-col gap-2 text-xs">
                      <div className="text-center py-4">
                        <span className="font-bold text-2xl text-secondary">
                          Aquí iría la imagen..... si tan solo el server tuviera
                        </span>
                      </div>
                      <span className="font-bold text-2xl text-secondary">
                        Estatus:
                      </span>
                      <ul className="steps text-secondary">
                        <li
                          className={`step flex flex-col ${
                            anime.endDate !== null
                              ? "step-error"
                              : "step-warning"
                          }`}
                        >
                          Anunciado
                          <span className="text-xs"></span>
                        </li>
                        <li
                          className={`step flex flex-col ${
                            anime.endDate !== null
                              ? "step-error"
                              : "step-warning"
                          }`}
                        >
                          Emisión
                          <span className="text-xs">{anime.releaseDate}</span>
                        </li>
                        <li
                          className={`step flex flex-col ${
                            anime.endDate !== null ? "step-error" : ""
                          }`}
                        >
                          Finalizado
                          <span className="text-xs">
                            {anime.endDate !== null ? (
                              anime.endDate
                            ) : (
                              <span className="text-xs">En emisión</span>
                            )}
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="flex justify-center mt-3">
                    <button
                      className="btn btn-secondary w-full bg-green-800"
                      onClick={() =>
                        document
                          .getElementById(`my_modal_${anime.id}`)
                          .showModal()
                      }
                    >
                      Descripción
                    </button>
                    <dialog id={`my_modal_${anime.id}`} className="modal">
                      <div className="modal-box bg-white w-7/12 max-w-5xl">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-4xl text-primary">
                            Sinopsis
                          </h3>
                          <h3 className="font-bold text-2xl text-primary">
                            {anime.type !== "TV" ? (
                              anime.type
                            ) : (
                              <span className="text-font-bold text-2xl text-primary">
                                Serie
                              </span>
                            )}
                          </h3>
                        </div>
                        <div className="flex justify-center flex-row">
                          <div className="stats shadow">
                            <div className="stat">
                              <div className="font-bold stat-title text-1xl text-secondary">
                                Numero de episodios:
                              </div>
                              <div className="stat-value text-error">
                                {anime.episodeCount}
                              </div>
                            </div>
                          </div>
                          <div className="stats shadow">
                            <div className="stat">
                              <div className="font-bold stat-title text-1xl text-secondary">
                                Duración promedio por episodio:
                              </div>
                              <div className="stat-value text-error">
                                {anime.episodeDuration} Min
                              </div>
                            </div>
                          </div>
                          <div className="stats shadow">
                            <div className="stat">
                              <div className="font-bold stat-title text-1xl text-secondary">
                                Temporada:
                              </div>
                              <div className="stat-value text-error">
                                {anime.season}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="py-4 text-lg text-secondary">
                          {anime.synopsis}
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn btn-error">Cerrar</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewAnime;
