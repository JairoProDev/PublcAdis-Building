document.addEventListener('DOMContentLoaded', () => {
    const anuncioForm = document.getElementById('anuncio-form');
    const anunciosList = document.getElementById('anuncios-list');

    const toggleFormButton = document.getElementById("toggle-form-button");
    const formColumn = document.querySelector(".form-column");
  
    toggleFormButton.addEventListener("click", function() {
        formColumn.classList.toggle("show-form");
    });

  
    // Agregar evento para enviar nuevos anuncios
    anuncioForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const tipo = e.target.elements.tipo.value;
      const titulo = e.target.elements.titulo.value;
      const descripcion = e.target.elements.descripcion.value;
      const nombreAnunciante = e.target.elements.nombreAnunciante.value;
      const numerosContacto = e.target.elements.numerosContacto.value.split(',');
      const categoria = e.target.elements.categoria.value;
      const ubicacion = e.target.elements.ubicacion.value;
      const monto = e.target.elements.monto.value === '' ? null : parseFloat(e.target.elements.monto.value);
      const imagenes = e.target.elements.imagenes.value.split(',');
      const nuevoAnuncio = {
        tipo,
        titulo,
        descripcion,
        nombreAnunciante,
        numerosContacto,
        categoria,
        ubicacion,
        monto,
        imagenes
      };
  
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
          anuncioForm.reset();
          obtenerAnuncios();
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
        mostrarAnunciosConBotones(anuncios); // Llamada a la función de mostrar anuncios con botones
      } catch (error) {
        console.error('Error al obtener los anuncios', error);
      }
    }
  
    // Mostrar anuncios con botones de editar y eliminar
    function mostrarAnunciosConBotones(anuncios) {
      anunciosList.innerHTML = '';
      anuncios.forEach((anuncio) => {
        const li = document.createElement('li');
        li.className = 'anuncio-card';
        
        const titulo = document.createElement('h3');
        titulo.className = 'anuncio-titulo';
        titulo.textContent = anuncio.titulo;
        
        const descripcion = document.createElement('p');
        descripcion.className = 'anuncio-descripcion';
        descripcion.textContent = anuncio.descripcion;
        
        const categoria = document.createElement('p');
        categoria.textContent = `Categoría: ${anuncio.categoria}`;
  
        const ubicacion = document.createElement('p');
        ubicacion.textContent = `Ubicación: ${anuncio.ubicacion}`;
  
        const monto = document.createElement('p');
        monto.textContent = `Monto: ${anuncio.monto !== null ? `$${anuncio.monto}` : 'Negociable'}`;
  
        const fechaPublicacion = document.createElement('p');
        fechaPublicacion.textContent = `Fecha de Publicación: ${anuncio.fechaPublicacion}`;
  
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'anuncio-buttons';
        
        const editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        
        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = 'Eliminar';
        
        buttonsDiv.appendChild(editarButton);
        buttonsDiv.appendChild(eliminarButton);
        
        li.appendChild(titulo);
        li.appendChild(descripcion);
        li.appendChild(categoria);
        li.appendChild(ubicacion);
        li.appendChild(monto);
        li.appendChild(fechaPublicacion);
        li.appendChild(buttonsDiv);
        
        anunciosList.appendChild(li);
      });
    }
  
    // Llamada inicial para obtener anuncios al cargar la página
    obtenerAnuncios();
  });
  