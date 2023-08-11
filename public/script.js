document.addEventListener('DOMContentLoaded', () => {
    const anuncioForm = document.getElementById('anuncio-form');
    const anunciosList = document.getElementById('anuncios-list');
  
    // Lógica JavaScript aquí para enviar y obtener anuncios
    
  anuncioForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = e.target.titulo.value;
    const descripcion = e.target.descripcion.value;
    const nuevoAnuncio = { titulo, descripcion };

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

  async function obtenerAnuncios() {
    try {
      const respuesta = await fetch('/api/anuncios');
      const anuncios = await respuesta.json();

      anunciosList.innerHTML = '';
      anuncios.forEach((anuncio) => {
        const li = document.createElement('li');
        li.textContent = `${anuncio.titulo}: ${anuncio.descripcion}`;
        anunciosList.appendChild(li);
      });
    } catch (error) {
      console.error('Error al obtener los anuncios', error);
    }
  }

  obtenerAnuncios();
  
  // Nueva lógica para mostrar anuncios con botones de editar y eliminar
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
      li.appendChild(buttonsDiv);
      
      anunciosList.appendChild(li);
    });
  }

});
  