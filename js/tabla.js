document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#crudTable tbody');
    const createForm = document.querySelector('#createForm');
    const nameInput = document.querySelector('#name');
    const ageInput = document.querySelector('#age');
    const submitBtn = createForm.querySelector('button');

    let data = []; // Tárolt rekordok
    let editId = null; // Szerkesztés alatt álló ID

    // Táblázat sor hozzáadása
    function addRow(id, name, age) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td>${age}</td>
            <td>
                <button class="editBtn" data-id="${id}">Szerkesztés</button>
                <button class="deleteBtn" data-id="${id}">Törlés</button>
            </td>
        `;
        tableBody.appendChild(row);
    }

    // Form submit esemény (hozzáadás vagy frissítés)
    createForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = nameInput.value.trim();
        const age = ageInput.value.trim();

        if (!name || !age) return;

        if (editId !== null) {
            // Frissítés
            const index = data.findIndex(item => item.id === editId);
            data[index] = { id: editId, name, age };
            renderTable();
            submitBtn.textContent = 'Hozzáadás';
            editId = null;
        } else {
            // Új hozzáadás
            const id = data.length ? data[data.length - 1].id + 1 : 1;
            data.push({ id, name, age });
            addRow(id, name, age);
        }

        createForm.reset();
    });

    // Műveletek gombok kezelése
    tableBody.addEventListener('click', function (event) {
        const target = event.target;
        const rowId = parseInt(target.getAttribute('data-id'));

        if (target.classList.contains('deleteBtn')) {
            data = data.filter(item => item.id !== rowId);
            renderTable();
        }

        if (target.classList.contains('editBtn')) {
            const record = data.find(item => item.id === rowId);
            nameInput.value = record.name;
            ageInput.value = record.age;
            editId = rowId;
            submitBtn.textContent = 'Frissítés';
        }
    });

    // Újrarajzolja az egész táblázatot
    function renderTable() {
        tableBody.innerHTML = '';
        data.forEach(({ id, name, age }) => addRow(id, name, age));
    }
});
