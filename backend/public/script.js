document.addEventListener("DOMContentLoaded", () => {
  const anuncioForm = document.querySelector("#adForm");
  const anunciosList = document.getElementById("anuncios-list");

  // Agregar evento para enviar nuevos anuncios
  anuncioForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newAd = {
      title: e.target.elements.title.value,
      description: e.target.elements.description.value,
    };

    try {
      const respuesta = await fetch("/api/anuncios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAd),
      });

      if (respuesta.ok) {
        const anuncio = await respuesta.json();
        console.log(anuncio); // Imprimir el anuncio en la consola
        agregarAnuncioAlPrincipio(anuncio);
        e.target.reset();
      } else {
        console.error("Error al crear el anuncio");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  });

  // Obtener y mostrar anuncios al cargar la página
  async function getAds() {
    try {
      const respuesta = await fetch("/api/anuncios");
      const anuncios = await respuesta.json();
      console.log(anuncios);
      showAds(anuncios);
    } catch (error) {
      console.error("Error al obtener los anuncios", error);
    }
  }

  // Mostrar anuncios
  function showAds(anuncios) {
    anunciosList.innerHTML = "";
    anuncios.forEach((anuncio) => {
      const anuncioCard = createAdCard(anuncio);
      anunciosList.appendChild(anuncioCard);
    });
  }

  // Crear un elemento de anuncio (li) con su contenido
  function createAdCard(anuncio) {
    const li = document.createElement("li");
    li.className = "anuncio-card";
    li.innerHTML = `
            <h3 class="title">${anuncio.title || anuncio.titulo || anuncio.adTitle}</h3>
            <p class="description">${anuncio.description || anuncio.descripcion || anuncio.adDescription}</p>
        `;
    return li;
  }

  // Agregar un nuevo anuncio al principio de la lista
  function agregarAnuncioAlPrincipio(anuncio) {
    const newAdCard = createAdCard(anuncio);
    anunciosList.insertBefore(newAdCard, anunciosList.firstChild);
  }

  // Llamada inicial para obtener anuncios al cargar la página
  getAds();
});

async function eliminarAnuncios() {
  const respuesta = await fetch('/api/anuncios', { method: 'DELETE' });
  if (respuesta.ok) {
    console.log('Todos los anuncios han sido eliminados');
  } else {
    console.error('Error al eliminar los anuncios');
  }
}
