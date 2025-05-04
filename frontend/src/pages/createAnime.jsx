import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation } from 'wouter';

export default function CrearAnime() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    releaseDate: '',
    endDate: '',
    seasonPart: 'Invierno',
    yearPart: currentYear,
    type: 'TV',
    episodeCount: 12,
    episodeDuration: 24,
    ageRating: '+13',
    averageScore: '7.0'
  });

  const mutation = useMutation({
    mutationFn: (newAnime) => {
      return fetch('/api/animes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnime),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['animes']);
      navigate('/animes');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const season = `${formData.seasonPart} ${formData.yearPart}`;
    const status = formData.endDate ? 'Finalizado' : 'En emisión';
    
    mutation.mutate({
      ...formData,
      season,
      status,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-base-200 p-2">
      <div className="max-w-7xl mx-auto"> {/* Aumenté el max-width para 3 columnas */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-primary">Agregar Nuevo Anime</h1>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Sección de 3 columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Columna 1 */}
                <div className="space-y-2">
                  {/* Título */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Título*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="input input-bordered input-primary w-full"
                      required
                    />
                  </div>

                  {/* Tipo */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Tipo*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="select select-bordered select-primary w-full"
                      required
                    >
                      <option value="TV">TV</option>
                      <option value="Película">Película</option>
                      <option value="OVA">OVA</option>
                      <option value="ONA">ONA</option>
                      <option value="Especial">Especial</option>
                    </select>
                  </div>

                  {/* Puntuación */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Puntuación (0-10)*</span>
                    </label>
                    <input
                      type="number"
                      name="averageScore"
                      min="0"
                      max="10"
                      step="0.1"
                      value={formData.averageScore}
                      onChange={handleChange}
                      className="input input-bordered input-primary w-full"
                      required
                    />
                  </div>
                </div>

                {/* Columna 2 */}
                <div className="space-y-2">
                  {/* Temporada y Año */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Temporada*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="seasonPart"
                        value={formData.seasonPart}
                        onChange={handleChange}
                        className="select select-bordered select-primary flex-1"
                        required
                      >
                        <option value="Invierno">Invierno</option>
                        <option value="Primavera">Primavera</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                      </select>
                      <select
                        name="yearPart"
                        value={formData.yearPart}
                        onChange={handleChange}
                        className="select select-bordered select-primary flex-1"
                        required
                      >
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Fechas */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Fecha de Lanzamiento*</span>
                    </label>
                    <input
                      type="date"
                      name="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      className="input input-bordered input-primary w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Fecha de Finalización</span>
                      <span className="label-text-alt">(dejar vacío si sigue en emisión)</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="input input-bordered input-primary w-full"
                    />
                  </div>
                </div>

                {/* Columna 3 */}
                <div className="space-y-2">
                  {/* Clasificación */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Clasificación*</span>
                    </label>
                    <select
                      name="ageRating"
                      value={formData.ageRating}
                      onChange={handleChange}
                      className="select select-bordered select-primary w-full"
                      required
                    >
                      <option value="+13">+13</option>
                      <option value="+16">+16</option>
                      <option value="+18">+18</option>
                    </select>
                  </div>

                  {/* Episodios */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Número de Episodios</span>
                    </label>
                    <input
                      type="number"
                      name="episodeCount"
                      min="1"
                      value={formData.episodeCount}
                      onChange={handleChange}
                      className="input input-bordered input-primary w-full"
                    />
                  </div>

                  {/* Duración */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Duración por Episodio (min)</span>
                    </label>
                    <input
                      type="number"
                      name="episodeDuration"
                      min="1"
                      value={formData.episodeDuration}
                      onChange={handleChange}
                      className="input input-bordered input-primary w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Synopsis - Ocupa todo el ancho */}
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text font-bold">Synopsis*</span>
                </label>
                <textarea
                  name="synopsis"
                  value={formData.synopsis}
                  onChange={handleChange}
                  className="textarea textarea-bordered textarea-primary w-full h-10"
                  placeholder="Describe el argumento del anime..."
                  required
                />
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => navigate('/animes')}
                  className="btn btn-outline"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Creando...
                    </>
                  ) : (
                    'Crear Anime'
                  )}
                </button>
              </div>

              {/* Mensaje de error */}
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
                  <span>Error al crear el anime: {mutation.error.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}