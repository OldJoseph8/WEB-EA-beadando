document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');
    const createForm = document.getElementById('createForm');
    const updateForm = document.getElementById('updateForm');
    const deleteButton = document.getElementById('deleteButton');
    const getDataForIdButton = document.getElementById('getDataForId');

    // API URL (cseréld ki a saját API URL-edre)
    const apiUrl = 'https://api.example.com/data';

    // Funkció az adatok betöltésére
    function fetchData() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                dataContainer.innerHTML = '';
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.innerHTML = `<strong>ID:</strong> ${item.id} <strong>Név:</strong> ${item.name} <strong>Életkor:</strong> ${item.age}`;
                    dataContainer.appendChild(div);
                });
            })
            .catch(error => console.error('Hiba az adatok betöltésénél:', error));
    }

    // Új adat hozzáadása
    createForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('createName').value;
        const age = document.getElementById('createAge').value;

        const newData = { name, age };

        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        })
            .then(response => response.json())
            .then(() => {
                fetchData();  // Adatok újratöltése
                createForm.reset();
            })
            .catch(error => console.error('Hiba az új adat hozzáadásánál:', error));
    });

    // Adat módosítása
    getDataForIdButton.addEventListener('click', function() {
        const id = document.getElementById('updateId').value;
        if (!id) return alert('ID szükséges!');

        fetch(`${apiUrl}/${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('updateName').value = data.name;
                document.getElementById('updateAge').value = data.age;
            })
            .catch(error => console.error('Hiba a módosítási adat betöltésénél:', error));
    });

    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('updateId').value;
        const name = document.getElementById('updateName').value;
        const age = document.getElementById('updateAge').value;

        const updatedData = { name, age };

        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        })
            .then(response => response.json())
            .then(() => {
                fetchData();  // Adatok újratöltése
                updateForm.reset();
            })
            .catch(error => console.error('Hiba az adat módosításánál:', error));
    });

    // Adat törlése
    deleteButton.addEventListener('click', function() {
        const id = document.getElementById('deleteId').value;
        if (!id) return alert('ID szükséges!');

        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                fetchData();  // Adatok újratöltése
                document.getElementById('deleteId').value = '';
            })
            .catch(error => console.error('Hiba az adat törlésénél:', error));
    });

    // Kezdjük el az adatok betöltését
    fetchData();
});
document.addEventListener("DOMContentLoaded", function () {
    const loadDataButton = document.getElementById("loadData");
    const createDataButton = document.getElementById("createData");
    const deleteDataButton = document.getElementById("deleteData");

    const dataContainer = document.getElementById("data-container");

    // API URL (Ezt cseréld ki az aktuális API URL-jére)
    const apiUrl = "https://api.example.com/data"; // Példa URL

    // GET request - Adatok betöltése
    loadDataButton.addEventListener("click", function () {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                dataContainer.innerHTML = "<h3>Adatok:</h3><ul>";
                data.forEach(item => {
                    dataContainer.innerHTML += `<li>ID: ${item.id}, Név: ${item.name}, Érték: ${item.value}</li>`;
                });
                dataContainer.innerHTML += "</ul>";
            })
            .catch(error => {
                dataContainer.innerHTML = "Hiba történt az adatok betöltésekor.";
                console.error("Error fetching data:", error);
            });
    });

    // POST request - Új adat hozzáadása
    createDataButton.addEventListener("click", function () {
        const newData = {
            name: "Új adat",  // Ide jöhet a formban megadott adat
            value: 100
        };

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        })
        .then(response => response.json())
        .then(data => {
            alert("Új adat hozzáadva!");
        })
        .catch(error => {
            alert("Hiba történt az új adat hozzáadása közben.");
            console.error("Error creating data:", error);
        });
    });

    // DELETE request - Adat törlése
    deleteDataButton.addEventListener("click", function () {
        const idToDelete = prompt("Adja meg a törölni kívánt adat ID-ját:");
        
        fetch(`${apiUrl}/${idToDelete}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            alert("Adat törölve!");
        })
        .catch(error => {
            alert("Hiba történt az adat törlése közben.");
            console.error("Error deleting data:", error);
        });
    });
});
