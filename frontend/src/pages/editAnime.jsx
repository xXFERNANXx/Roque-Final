import { useState } from "react";
import star from "/star.svg";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

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

function EditAnime() {
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
          <p className="text-3xl font-medium">
            Cargando<span className="loading loading-dots loading-xl"></span>
          </p>
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
                Lo sentimos, ha ocurrido un problema en el servidor. Por favor,
                inténtalo de nuevo más tarde.
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
                <a
                  href="/MundoAnime/Anime"
                  className="link link-primary text-sm"
                >
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
                      className="btn btn-secondary w-full bg-accent"
                      onClick={() =>
                        document
                          .getElementById(`my_modal_${anime.id}`)
                          .showModal()
                      }
                    >
                      Editar
                    </button>
                    <dialog id={`my_modal_${anime.id}`} className="modal">
                      <div className="modal-box bg-white w-7/12 max-w-5xl">
                        <h3 className="font-bold text-2xl text-primary mb-4">
                          Editar Anime: {anime.title}
                        </h3>
                        <EditAnimeForm anime={anime} />
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

function EditAnimeForm({ anime }) {
  // Extraemos temporada y año del valor existente (ej: "Invierno 2018")
  const initialSeason = anime.season?.split(' ')[0] || "";
  const initialYear = anime.season?.split(' ')[1] || new Date().getFullYear();

  const [formData, setFormData] = useState({
    title: anime.title || "",
    averageScore: anime.averageScore || "0",
    ageRating: anime.ageRating || "+13",
    releaseDate: anime.releaseDate || "",
    endDate: anime.endDate || "",
    seasonPart: initialSeason,
    yearPart: initialYear,
    type: anime.type || "TV",
    episodeCount: anime.episodeCount || 0,
    episodeDuration: anime.episodeDuration || 25,
    synopsis: anime.synopsis || "",
    status: anime.status || "En emisión"
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1980 + 7 },
    (_, i) => currentYear + 6 - i
  );

  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: (updatedAnime) => {
      // Combinamos temporada y año antes de enviar
      const seasonValue = `${updatedAnime.seasonPart} ${updatedAnime.yearPart}`.trim();
      
      // Determinamos el estado basado en si tiene fecha de finalización
      const statusValue = updatedAnime.endDate ? "Finalizado" : "En emisión";
      
      const dataToSend = {
        title: updatedAnime.title,
        synopsis: updatedAnime.synopsis,
        releaseDate: updatedAnime.releaseDate,
        endDate: updatedAnime.endDate || null,
        season: seasonValue,
        status: statusValue,
        type: updatedAnime.type,
        episodeCount: Number(updatedAnime.episodeCount) || 0,
        episodeDuration: Number(updatedAnime.episodeDuration) || 25,
        ageRating: updatedAnime.ageRating,
        averageScore: updatedAnime.averageScore
      };

      return fetch(`/api/animes/${anime.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["animes"]);
      document.getElementById(`my_modal_${anime.id}`).close();
      window.location.reload();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-primary font-bold">
        <div className="form-control flex flex-col gap-2">
          <label className="label">
            <span className="label-text">Título</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered border-2 border-primary"
            required
          />
        </div>

        <div className="form-control flex flex-col gap-2">
          <label className="label">
            <span className="label-text">Puntuación (0-10)</span>
          </label>
          <input
            type="number"
            name="averageScore"
            min="0"
            max="10"
            step="0.1"
            value={formData.averageScore}
            onChange={handleChange}
            className="input input-bordered border-2 border-primary"
            required
          />
        </div>

        <div className="form-control flex flex-col gap-2">
          <label className="label">
            <span className="label-text">Clasificación</span>
          </label>
          <select
            name="ageRating"
            value={formData.ageRating}
            onChange={handleChange}
            className="select select-bordered border-2 border-primary"
            required
          >
            <option value="+13">+13</option>
            <option value="+16">+16</option>
            <option value="+18">+18</option>
          </select>
        </div>

        <div className="form-control flex flex-col gap-2">
          <label className="label">
            <span className="label-text">Tipo</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered border-2 border-primary"
            required
          >
            <option value="TV">TV</option>
            <option value="Película">Película</option>
            <option value="OVA">OVA</option>
            <option value="ONA">ONA</option>
            <option value="Especial">Especial</option>
          </select>
        </div>

        <div className="form-control flex flex-row justify-between pr-12">
          <div className="w-4/7 ">
            <label className="label">
              <span className="label-text">Temporada</span>
            </label>
            <select
              name="seasonPart"
              value={formData.seasonPart}
              onChange={handleChange}
              className="select select-bordered border-2 border-primary"
            >
              <option value="">Seleccione temporada</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
            </select>
          </div>

          <div className="w-3/7 pl-3">
            <label className="label">
              <span className="label-text">Año</span>
            </label>
            <select
              name="yearPart"
              value={formData.yearPart}
              onChange={handleChange}
              className="select select-bordered border-2 border-primary"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-control flex flex-col gap-2">
          <label className="label">
            <span className="label-text">Fecha de lanzamiento</span>
          </label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="input input-bordered border-2 border-primary"
            required
          />
        </div>

        <div className="form-control flex flex-col gap-2">
          <label className="label">
            <span className="label-text">Fecha de finalización (Vacío = En emisión)</span>
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate || ""}
            onChange={handleChange}
            className="input input-bordered border-2 border-primary"
          />
        </div>

        <div className="form-control flex flex-col gap-2">
          <label className="label">
            <span className="label-text">Número de episodios</span>
          </label>
          <input
            type="number"
            name="episodeCount"
            min="0"
            value={formData.episodeCount}
            onChange={handleChange}
            className="input input-bordered border-2 border-primary"
          />
        </div>

        <div className="form-control flex flex-col gap-2">
          <label className="label">
            <span className="label-text">Duración por episodio (minutos)</span>
          </label>
          <input
            type="number"
            name="episodeDuration"
            min="1"
            value={formData.episodeDuration}
            onChange={handleChange}
            className="input input-bordered border-2 border-primary"
          />
        </div>

        <div className="form-control flex flex-col gap-2">
          <label className="label">
            <span className="label-text">Synopsis</span>
          </label>
          <textarea
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            className="textarea textarea-bordered border-2 border-primary h-auto"
            placeholder="Escribe aquí la sinopsis del anime..."
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-2">
        <button
          type="button"
          className="btn"
          onClick={() => document.getElementById(`my_modal_${anime.id}`).close()}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      {mutation.isError && (
        <div className="alert alert-error mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error al guardar: {mutation.error.message}</span>
        </div>
      )}
    </form>
  );
}

export default EditAnime;
