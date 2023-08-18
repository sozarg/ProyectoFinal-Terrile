function loadData() {
  return new Promise((resolve, reject) => {
    fetch("./js/data.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject(new Error("Error al cargar los datos"));
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadData()
    .then((data) => {
      const mainContent = document.getElementById("main-content");

      function aplicarFiltros() {
        const posicionSelector = document.getElementById("posicion");
        const epocaSelector = document.getElementById("epoca");

        if (!posicionSelector || !epocaSelector) {
          return;
        }

        const posicionFiltro = posicionSelector.value;
        const epocaFiltro = epocaSelector.value;

        const jugadoresFiltrados = data.filter((jugador) => {
          const cumplePosicion =
            !posicionFiltro || jugador.posicion === posicionFiltro;
          const cumpleepoca = !epocaFiltro || jugador.epoca === epocaFiltro;
          return cumplePosicion && cumpleepoca;
        });

        mainContent.innerHTML = "";

        jugadoresFiltrados.forEach((jugador) => {
          const jugadorDiv = document.createElement("div");
          jugadorDiv.className = "jugador d-flex mb-5";

          const imagenDiv = document.createElement("div");
          imagenDiv.className = "col-md-4";
          
          const imagen = document.createElement("img");
          imagen.src = jugador.imagen;
          imagenDiv.appendChild(imagen);
    

          const detallesDiv = document.createElement("div");
        
          const nombre = document.createElement("h2");
          nombre.textContent = jugador.nombre;
          nombre.className = "col-md-2";

          const posicion = document.createElement("h2");
          posicion.textContent = jugador.posicion;
          posicion.className = "col-md-2";

          const goles = document.createElement("h2");
          goles.textContent = jugador.goles + " goles";
          goles.className = "col-md-2";

          const epoca = document.createElement("h2");
          epoca.textContent = jugador.epoca;
          epoca.className = "col-md-2";

          jugadorDiv.appendChild(imagenDiv);
          jugadorDiv.appendChild(nombre);
          jugadorDiv.appendChild(posicion);
          jugadorDiv.appendChild(goles);
          jugadorDiv.appendChild(epoca);
          jugadorDiv.appendChild(detallesDiv);

          jugadorDiv.addEventListener("click", () => {
            const detalles = `             
                            ${jugador.detallesDiv}
                            `;

            Swal.fire({
              title: jugador.nombre,
              html: detalles,
              confirmButtonText: "Cerrar",
            });
          });

          mainContent.appendChild(jugadorDiv);
        });
      }

      const posicionSelector = document.getElementById("posicion");
      const epocaSelector = document.getElementById("epoca");

      posicionSelector.addEventListener("change", aplicarFiltros);
      epocaSelector.addEventListener("change", aplicarFiltros);

      aplicarFiltros();
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);

      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al cargar los datos.",
        icon: "error",
        confirmButtonText: "OK",
      });
    });
});
