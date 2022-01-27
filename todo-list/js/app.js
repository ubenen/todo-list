'use strict';

const KEY_ENTER = 13

/*
<li>
	<div class="view">
		<input class="toggle" type="checkbox">
		<label>Hallo</label>
		<button class="destroy"></button>
	</div>
</li>
	*/
/*const todoModule = {
  todos: [
    {title: "HTML lernen", done: true},
    {title: "JavaScript lernen", done: false},
    {title: "Node.JS lernen", done: false}
  ],

  @param {string} title

  addTodo(title) {
    for(const todo of this.todos) {
      if (todo.title === title) {
        return
      
    }
  }
}
*/
document.addEventListener("DOMContentLoaded", () => {        /* hier werden die elemnete geholt -->*/
  const newTodoElement = document.querySelector(".new-todo")
	const todoListElement = document.querySelector(".todo-list")
	const footerElement = document.querySelector(".footer")
	const todoCountElement = document.querySelector(".todo-count strong")  /* das strong-element in dem todo-count-element (verschachtelt)*/
	const clearCompletedElement = document.querySelector(".clear-completed")

	const refreshFooter = () => {                               /*Funktion zum Ausblenden/Einblenden des Footers wird erstellt*/ 
		if (todoListElement.children.length === 0) {
			footerElement.style.display = "none"
		} else {
			footerElement.style.display = ""   /*wird auf den leeren String gesetzt*/
		}

		
		/*let todoCounter = 0
		for (const todoListItem of todoListElement.children) {    ->alle Chlidren werden durchgegangen (in der ul)
			if (!todoListItem.classList.contains("completed")) {    ->wenn nicht die Klasse completed:
				todoCounter++                                              counter wird erhöht
			}
		}
    */
    let todoCounter = todoListElement.querySelectorAll("li:not(.completed)").length  /*von der ul queryselector hole alle listenelemente ohne bestimmte klase*/
		todoCountElement.innerText = todoCounter

		let completedCounter = todoListElement.querySelectorAll("li.completed").length  /* liefert die liste und die gibt die Anzahl der Elemente darin aus*/
		if (completedCounter === 0) {    /* wenn 0 todos button ausblenden*/
			clearCompletedElement.style.display = "none"    
		} else {
			clearCompletedElement.style.display = ""     /*ansonsten none weg*/
		}
	}
	refreshFooter()   /*wird aktualisiert, wenn ein neues Listenelement hinzugefügt wurde */

	const addCallbacksForLi = (liElement) => {   /*callback für die beiden Elemnte/Checkboxen*/
		const checkboxElement = liElement.querySelector(".toggle")
		const destroyButtonElement = liElement.querySelector(".destroy")

		checkboxElement.addEventListener("change", () => {
			if (checkboxElement.checked) {
				liElement.classList.add("completed")    /*klasse completed wird gesetzt, wieder entfernt*/
			} else {
				liElement.classList.remove("completed")
			}

			refreshFooter()                   /*footer wird aktualisiert, wenn checkboxelement verändert worden ist*/
		})

		destroyButtonElement.addEventListener("click", () => {  /* wenn destroybutton geklickt wird das gesamte li element entfernet*/
			liElement.remove()

			refreshFooter()      /* footer wird aktualisiert, wenn ich ein Element a d Liste entferne*/
		})
	}


	newTodoElement.addEventListener("keypress", (event) => {
		if (event.which === KEY_ENTER && newTodoElement.value !== "") {

			const newButtonElement = document.createElement("button")
			newButtonElement.classList.add("destroy")
			
			const newLabelElement = document.createElement("label")
			newLabelElement.appendChild(
				document.createTextNode(newTodoElement.value)
			)

			const newInputCheckbox = document.createElement("input")
			newInputCheckbox.type = "checkbox"
			newInputCheckbox.classList.add("toggle")

			const newDivElement = document.createElement("div")
			newDivElement.classList.add("view")
			newDivElement.appendChild(newInputCheckbox)
			newDivElement.appendChild(newLabelElement)
			newDivElement.appendChild(newButtonElement)

			const newLiElement = document.createElement("li")
			newLiElement.appendChild(newDivElement)          /* div-element ist mit im li element */

			addCallbacksForLi(newLiElement)    /*callbackfunktion wird mit dem Listenelement aufgerufen, es können callbacks gesetzt werden*/

			todoListElement.prepend(newLiElement)

			newTodoElement.value = ""

			refreshFooter()
		}
	})


	clearCompletedElement.addEventListener("click", (event) => {
		const completedLiElements = todoListElement.querySelectorAll("li.completed") /* hole alle elemente und gehe das array durch*/
		for(const completedLiElement of completedLiElements) {
			completedLiElement.remove()          /*remove das objekt aus meinem objektbaum*/
		}

		refreshFooter()
	})
  /*todoModule.on."add", (todo) => {
    const newButtonElement = document.createElement("button")
    newButtonElement.classList.add("destroy")

    const newLabelElement = document.createElement("label")

  }
  */
});
