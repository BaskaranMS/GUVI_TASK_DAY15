document.addEventListener('DOMContentLoaded', () => {
    loadForm();
});

function loadForm() {
    const formContainer = document.getElementById('formContainer');
    const formHTML = `
        <form id="myForm" onsubmit="formControl()">
            <label for="fName">Enter Your First Name</label>
            <input type="text" id="fName" class="form-control" placeholder="First Name" required>

            <label for="lName">Enter Your Last Name</label>
            <input type="text" id="lName" class="form-control" placeholder="Last Name" required>

            <label for="address">Enter Your Address</label>
            <textarea name="address" id="address" class="form-control" cols="30" rows="1" placeholder="Address" required></textarea>

            <label for="gender">Select Your Gender</label>
            <select id="gender" class="form-control" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <label for="foods">Choose Your Favorite Foods (At least 2)</label>
            <div class="form-check">
                <input type="checkbox" name="foods" value="burger"> Burger
                <input type="checkbox" name="foods" value="pizza"> Pizza
                <input type="checkbox" name="foods" value="pasta"> Pasta
                <input type="checkbox" name="foods" value="salad"> Salad
                <input type="checkbox" name="foods" value="icecream"> Ice Cream
            </div>

            <label for="pincode">Enter Your Pincode</label>
            <input type="text" id="pincode" class="form-control" placeholder="Pincode" required>

            <label for="state">Enter Your State</label>
            <input type="text" id="state" class="form-control" placeholder="State" required>

            <label for="country">Enter Your Country</label>
            <input type="text" id="country" class="form-control" placeholder="Country" required>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;
    formContainer.innerHTML = formHTML;
}

function formControl() {
    const formData = {
        firstName: document.getElementById('fName').value,
        lastName: document.getElementById('lName').value,
        address: document.getElementById('address').value,
        foods: getSelectedFoods(),
        gender: document.getElementById('gender').value,
        pincode: document.getElementById('pincode').value,
        state: document.getElementById('state').value,
        country: document.getElementById('country').value,
    };

    addDataToTable(formData);
    resetForm();
    event.preventDefault();
}

function getSelectedFoods() {
    const checkboxes = document.querySelectorAll('input[name="foods"]:checked');
    const selectedFoods = Array.from(checkboxes).map(checkbox => checkbox.value);
    return selectedFoods;
}

function resetForm() {
    document.getElementById('myForm').reset();
}

function addDataToTable(formData) {
    const tableContainer = document.getElementById('tableContainer');
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-hover');
    const headerRow = table.insertRow(0);

    for (const key in formData) {
        const headerCell = headerRow.insertCell(-1);
        headerCell.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    }

    const dataRow = table.insertRow(-1);

    for (const key in formData) {
        const dataCell = dataRow.insertCell(-1);
        dataCell.textContent = Array.isArray(formData[key]) ? formData[key].join(', ') : formData[key];
    }

    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

