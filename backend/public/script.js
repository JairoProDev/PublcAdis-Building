document.addEventListener('DOMContentLoaded', () => {
  const anuncioForm = document.querySelector('.form-column');
  const anunciosList = document.getElementById('anuncios-list');
  const toggleFormButton = document.getElementById("toggle-form-button");
  const formColumn = document.querySelector(".form-column");

  toggleFormButton.addEventListener("click", function () {
    anuncioForm.classList.toggle("show-form"); // Uso de la variable anuncioForm
  });


  // Agregar evento para enviar nuevos anuncios
  anuncioForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nuevoAnuncio = obtenerDatosFormulario(e.target);
      try {
          const respuesta = await fetch('/api/anuncios', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(nuevoAnuncio),
          });

          if (respuesta.ok) {
              console.log('Anuncio creado exitosamente');
              e.target  .reset();
              agregarAnuncioAlPrincipio(nuevoAnuncio);
          } else {
              console.error('Error al crear el anuncio');
          }
      } catch (error) {
          console.error('Error de red:', error);
      }
  });

  // Obtener y mostrar anuncios al cargar la página
  async function obtenerAnuncios() {
      try {
          const respuesta = await fetch('/api/anuncios');
          const anuncios = await respuesta.json();
          mostrarAnuncios(anuncios);
      } catch (error) {
          console.error('Error al obtener los anuncios', error);
      }
  }

  // Mostrar anuncios
  function mostrarAnuncios(anuncios) {
      anunciosList.innerHTML = '';
      anuncios.forEach((anuncio) => {
          const anuncioCard = crearAnuncioCard(anuncio);
          anunciosList.appendChild(anuncioCard);
      });
  }

  // Crear un elemento de anuncio (li) con su contenido
  function crearAnuncioCard(anuncio) {
      const li = document.createElement('li');
      li.className = 'anuncio-card';

      const adTitle = crearElemento('h3', 'anuncio-titulo', anuncio.adtitle);
      const descripcion = crearElemento('p', 'anuncio-descripcion', anuncio.descripcion);
      const categoria = crearElemento('p', '', `Categoría: ${anuncio.categoria}`);
      const ubicacion = crearElemento('p', '', `Ubicación: ${anuncio.ubicacion}`);
      const monto = crearElemento('p', '', `Monto: ${formatoMonto(anuncio.monto)}`);
      const fechaPublicacion = crearElemento('p', '', `Fecha de Publicación: ${formatoFecha(anuncio.fechaPublicacion)}`);

      li.appendChild(adTitle);
      li.appendChild(descripcion);
      li.appendChild(categoria);
      li.appendChild(ubicacion);
      li.appendChild(monto);
      li.appendChild(fechaPublicacion);

      return li;
  }

  // Formatear monto (si es nulo, mostrar "Negociable")
  function formatoMonto(monto) {
      return monto !== null ? `$${monto}` : 'Negociable';
  }

  function formatoFecha(fecha) {
    const opcionesFecha = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(fecha).toLocaleDateString('es-ES', opcionesFecha);
}

  // Crear un elemento HTML
  function crearElemento(tagName, className, texto) {
      const elemento = document.createElement(tagName);
      if (className) {
          elemento.className = className;
      }
      elemento.textContent = texto;
      return elemento;
  }

  // Obtener datos del formulario de anuncio
  function obtenerDatosFormulario(form) {
      const tipo = form.elements.tipo.value;
      const adTitle = form.elements.adTitle.value;
      const descripcion = form.elements.descripcion.value;
    //   const categoria = form.elements.categoria.value;
    //  const ubicacion = form.elements.ubicacion.value;
      const monto = form.elements.monto.value === '' ? null : parseFloat(form.elements.monto.value);
      const fechaActual = new Date();
      const fechaPublicacion = fechaActual.toLocaleString(); // Fecha y hora actual

      const nuevoAnuncio = {
          tipo,
          adTitle,
          descripcion,
          // categoria,
          // ubicacion,
          monto,
          fechaPublicacion,
      };

      return nuevoAnuncio;
  }

  // Agregar un nuevo anuncio al principio de la lista
  function agregarAnuncioAlPrincipio(anuncio) {
      const nuevoAnuncioCard = crearAnuncioCard(anuncio);
      anunciosList.insertBefore(nuevoAnuncioCard, anunciosList.firstChild);
  }

  // Llamada inicial para obtener anuncios al cargar la página
  obtenerAnuncios();
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});