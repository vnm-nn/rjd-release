
const tramsURL = "http://localhost:8080/trams"

const find = document.getElementById("find_button");
const findModal = document.getElementById("find_modal");
const changeModal = document.getElementById("change_modal");
const span = document.getElementsByClassName("close_modal_window");

const wrapper = document.querySelector(".wrapper");
const form = document.getElementsByTagName("form");
const table = wrapper.getElementsByTagName("table")[1];


span[0].onclick = function () {
	changeModal.style.display = "none";
}
span[1].onclick = function () {
	findModal.style.display = "none";
}

window.onclick = function (event) {
	if (event.target === changeModal) {
		changeModal.style.display = "none";
	} else if (event.target === findModal) {
		findModal.style.display = "none";
	}
}

async function sendRequest(url, method) {
	return await fetch(url, {method: method})
		.then(async response => {
			if (response.ok && method !== 'DELETE') {
				return response.json();
			}
			return response.status;
		})
}

async function sendBodyRequest(url, method, body) {
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
	return await fetch(url, {
		method: method,
		body: JSON.stringify(body),
		headers: headers
	}).then(async response => response.json()
		.catch(response => response.status))
}

async function tramsService() {
	// GET
	const allTrams = await sendRequest(tramsURL, 'GET')

	for (let trams of allTrams) {
		let tr = document.createElement("tr");
		let td = document.createElement("td");
		td.innerHTML = trams['id'];
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = trams['code'];
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = trams['name'];
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = '<button class="edit" title="Редактировать запись" name=\'' + trams['id'] + '\'></button>';
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = '<button class="del" title="Удалить запись" name=\'' + trams['id'] + '\'></button>';
		tr.appendChild(td);

		table.appendChild(tr);
	}
	// DELETE
	[].forEach.call(document.querySelectorAll("button.del"), function (el) {
		el.addEventListener('click', function () {
			let tr = this.parentNode.parentNode;
			table.deleteRow(tr.rowIndex);
			let id = el.getAttribute("name");
			let delURL = tramsURL + '/' + id;
			sendRequest(delURL, 'DELETE').then(status => {
				if(status === 204) {
					alert("Маршрут удален!");
				}
			})
		})
	});
	// PUT
	[].forEach.call(document.querySelectorAll("button.edit"), function (el) {
		el.addEventListener('click', function () {
			changeModal.style.display = "block";
			let row = this.parentNode.parentNode;
			let changeCode = document.getElementById("change_code");
			let changeName = document.getElementById("change_name");
			changeCode.value = table.rows[row.rowIndex].cells[1].innerHTML;
			changeName.value = table.rows[row.rowIndex].cells[2].innerHTML;
			let changeButton = document.getElementById("change_edit");
			changeButton.onclick = function () {
				let putRequestObj = new Map;
				putRequestObj["id"] = parseInt(table.rows[row.rowIndex].cells[0].innerHTML);
				putRequestObj["code"] = changeCode.value;
				putRequestObj["name"] = changeName.value;
				sendBodyRequest(tramsURL + '/' + putRequestObj["id"], 'PUT', putRequestObj);
				alert("Маршрут обнавлен!");
			}
		});
	});
	// POST
	form[0].addEventListener("submit", () => {
		let postRequestObj = new Map;
		postRequestObj["code"] = form[0].elements[0].value;
		postRequestObj["name"] = form[0].elements[1].value;
		sendBodyRequest(tramsURL, 'POST', postRequestObj);
		alert("Новый маршрут добавлен!");
	});
	// GET by id
	find.addEventListener("click", async () => {
		findModal.style.display = "block";
		let title = document.getElementById("find_modal_name");
		let code =  document.getElementById("find_code");
		let name = document.getElementById("find_name");

		const inputId = form[1].elements[0].value;
		const resp = await sendRequest(tramsURL + '/' + inputId, 'GET');

		if(resp !== 500) {
			title.innerHTML = "Трамвайный маршрут по id " + inputId;
			code.value = resp["code"];
			name.value = resp["name"];
		} else {
			title.innerHTML = "Маршрут не существует!";
			code.value = "************";
			name.value = "************";
		}
		form[1].elements[0].value = "";
		code.readOnly = true;
		name.readOnly = true;
	});

} tramsService().then();

