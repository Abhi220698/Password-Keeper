document.addEventListener('DOMContentLoaded', function() {
    const passwordForm = document.getElementById('passwordForm');
    const passwordList = document.getElementById('passwordList');
    const countPassword= document.getElementById('count')
    var count=0

    const updatePasswordCount = () => {
        countPassword.textContent = `Total Passwords: ${count}`;
    };

    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

    function getPassword() {
        passwordList.innerHTML = '';
        passwords.forEach((passwd, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Title:</strong> ${passwd.title}
                <strong>Password:</strong> ${passwd.password}
                <button class="delete" data-index="${index}">Delete</button>
                <button class="edit" data-index="${index}">Edit</button>
            `;
            passwordList.appendChild(li);
        });
    }

    function addPassword(title,password) {
        passwords.push({ title, password });
        localStorage.setItem('passwords', JSON.stringify(passwords));
        count+=1
        updatePasswordCount()
        getPassword();
    }

    function editPassword(index, newPassword) {
        passwords[index] = newPassword;
        localStorage.setItem('passwords', JSON.stringify(passwords));
        getPassword();
    }

    function deletePassword(index) {
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        count-=1
        updatePasswordCount()
        getPassword();
    }

    passwordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const password = document.getElementById('password').value;
        const index = document.getElementById('passwordIndex').value;

        if (index === '') {
            addPassword(title, password);
        } else {
            editPassword(index, { title, password });
            document.getElementById('passwordFormButton').textContent = 'Add Password';
            document.getElementById('passwordIndex').value = '';
        }
        passwordForm.reset();
    });

    passwordList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const index = event.target.dataset.index;
            deletePassword(index);
        }
        if (event.target.classList.contains('edit')) {
            const index = event.target.dataset.index;
            const { title, password } = passwords[index];
            document.getElementById('title').value = title;
            document.getElementById('password').value = password;
            document.getElementById('passwordFormButton').textContent = 'Save Changes';
            document.getElementById('passwordIndex').value = index;
        }
    });

    getPassword();
});