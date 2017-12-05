var addForm = document.getElementById('addForm'); // mando llamar al id addForm y guardo en variable , mismo procedimeinto para los id//
var button = document.getElementById('button');
var input = document.getElementById('input');
var firstForm = document.getElementById('firstForm');
var container = document.getElementById('container');
var accountant = 1;
window.addEventListener('load', loadpage);  // FunciÓn que ejecuta despuÓs de que carga la página
  // funcion creada para que al hacer click se enfoque el elemento
  function loadpage() {
    addForm.addEventListener('click', function() {
      hideElement(firstForm, addForm); //ver función más abajo
      input.focus();//El método ElementoHTML.focus() fija el enfoque del cursor en el elemento especificado, si éste es susceptible de ello. Si se llama ElementoHTML.focus() desde un gestor de eventos "mousedown" (ratón abajo), se debe también llamar al método event.preventDefault() para evitar que el enfoque abandone ElementoHTML
      input.value = '';// The value property contains the default value OR the value a user types in (or a value set by a script).
		 });


    // Añadiendo lista nueva y añadiendo estilos
		 button.addEventListener('click', function(event) { //al dar click en el botón se desaa la funcion soobre ese evento
			 event.preventDefault();//Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
			 var listContainer = document.createElement('div'); //creo un elemento con título
			 listContainer.classList.add('d-squares'); // aqui creo otro cuadro

			 var remover = firstForm.parentNode; //aqui creo variable para guardar el elemento que va a desaparecer
			 container.appendChild(listContainer); //le agrego a container el nuevo div creado
			 listContainer.appendChild(firstForm); // vuelve a mostrar añadir tarjeta
			 listContainer.appendChild(addForm); // vuelve a poner el formulario
			 remover.remove(); //quita el añadir

			 var containerCards = document.createElement('div'); // crea un elemento con lista
			 containerCards.classList.add('trello-body'); // añade una clase que se llama Trello body
			 container.insertBefore(containerCards, container.lastElementChild);
			 containerCards.addEventListener('dragleave', dejarTrello);
			 containerCards.addEventListener('dragover', arrastrarSobreTrello);
			 containerCards.addEventListener('drop', soltarTrello);
			 containerCards.addEventListener('dragend', terminaArrastrarTrello);

			 hideElement(firstForm, addForm); // una vez mostrado vuelve a ocultar

			 newElements('div', 'newlist', input.value, containerCards);//esta función esta abajo crea un div con la case newList OSEA CADA CUADRO con e valor de default y lo añade a containerCards
			 newElements('div', 'add', 'Añadir una tarjeta', containerCards); //añadae tarjeta dentro de la lista

			 var add = document.getElementsByClassName('add'); // el recien creado
			 add[add.length - 1].addEventListener('click', function() { // al final del listado es decir donde se da Añadir una tarjeta al darse click  se desata la función
				 this.classList.add('d-create'); //sobre este evento
				 newForm('form', 'fomulario', containerCards, this); // esta función esta abajo pero crea un elemento form, con clase formulario que agrega a contenedor de tarjetas , esto this
			 });
		 });
	 }

	 function hideElement(a, b) { //Se definio una función que  oculte elementos
		 a.classList.toggle('d-create');//The toggle() method toggles between hide() and show() for the selected elements
		 b.classList.toggle('d-create');
	 }

	 function newElements(element, clase, texto, container) { //Función para los nuevos elementos, listas es decir cada cuadro
		 var div = document.createElement(element); //cree un elemento
		 div.classList.add(clase); //El método add() añade un nuevo elemento con un valor específico al fina
		 div.innerHTML = texto; // se le coloca texto
		 container.appendChild(div); // y este nuevo div con su clase y texto se añade a contenedor
	 }

	 function newForm(form, clase, container, agregarTarjeta) { //Función para crear las tarjetas
		 var form = document.createElement(form); //crea un elemento de tipo form
		 form.classList.add(clase); // le añade una clase
		 newElements('textarea', 'textarea', '', form); // uso la función pasada para crear un elemento text. (El elemento HTML <textarea> representa un control para edición muti-línea de texto plan0) con clase textarea , sin texto , porque aqui le meto el nuevo y se agega al form
		 newElements('button', 'boton', 'Añadir', form); // creo elemento de tipo button con clase boton que dice en el boton añadir y se incluye en formato
		 container.appendChild(form); //Este formato se agrega a contenedor
     form.lastElementChild.addEventListener('click', function(event) { // al utimo hijo de form al dar click se desata la siguiente función
       event.preventDefault(); // Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
			 agregarTarjeta.classList.remove('d-create'); // esto remueve l parte donde te pregunta Añadir lISTA
			 form.classList.add('d-create');// le pone class d create a form*/

			 var text = form.firstElementChild.value;

			 var div = document.createElement('div'); //creo un elementeo div que es cada uno de estos elementos de la lista de tarjetas
			 div.classList.add('text-cards'); // le pongo la clase text cards a este div
       div.innerHTML = text; // aqui le asigno el texpo al div creado





//---------------------------------------------------------------------------------------------------------------------------------------

			 div.draggable = true; // Hacer que un objeto se pueda arrastrar es muy sencillo. Solo hay que establecer el atributo draggable=true en el elemento que se quiere mover
			 div.setAttribute('id', 'id' + accountant);
			 accountant ++;
			 div.addEventListener('dragstart', empiezaArrastrar);
			 div.addEventListener('drop', soltar);
			 div.addEventListener('dragend', terminaArrastrar);
			 container.insertBefore(div, agregarTarjeta);
		 });
	 }

  // Agregando un estilo personalizado a la tarjeta cuando esté siendo arrastrada por el usuario.
	 function empiezaArrastrar(event) {
		 event.dataTransfer.setData('text', this.id);
		 this.classList.add('opacidad');
	 }

  // Agregando un estilo a la lista cuando la tarjeta esté pasando por encima (dragover).
	 function arrastrarSobreTrello(event) {
		 event.preventDefault();
		 this.classList.add('bg');
	 }

	 function dejarTrello(event) {
		 event.preventDefault();
		 this.classList.remove('bg');
	 }


	 function soltar(event) {
	   event.preventDefault();
	 }

	 function soltarTrello(event) {
	   event.preventDefault();
	   var arrastrado = event.dataTransfer.getData('text');
	   var elemento = document.getElementById(arrastrado);
	   this.insertBefore(elemento, this.children[1]);
	 }
  // Efecto del cuerpo de las Listas cuando se mueve la tarjeta sobre ellos
	 function terminaArrastrarTrello(event) {
		 this.classList.remove('bg');
	 }

	 function terminaArrastrar(event) {
		 this.classList.remove('opacidad');
	 }
