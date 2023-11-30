/* Axios Config Variable:
================================================================================================*/
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }
}

/* Getting Data from DB and Showing it in Table:
================================================================================================*/
    document.addEventListener('DOMContentLoaded', function() {  
        showAllStudents();
    });

    async function getAllStudents() {
        const path = 'https://library-dwb.vercel.app/api/students/get/students';
        const response = await axios.get(path);
        const data = response.data;
        return data;
    }

    async function showAllStudents() {
        const allStudents = await getAllStudents();
        console.log(allStudents);
        const tableElement = document.getElementById('list-itens');
        
        if (tableElement) {
            tableElement.innerHTML = '';
            for (let i = 0; i < allStudents.length; i++) {
                tableElement.innerHTML += `
                <tr>
                    <td>${allStudents[i].id}</td>
                    <td>${allStudents[i].nome}</td>
                    <td>${allStudents[i].matricula}</td>
                </tr>
                `;
            }
        } else {
            console.error('Table element not found.');
        }
    }

/* Updating Data in DB Using Patch Method:
================================================================================================*/
    async function updateStudent() {
        let id = document.getElementById("ID").value;
        let nome = document.getElementById("name").value;
        let matricula = document.getElementById("matricula").value;

        const path = 'https://library-dwb.vercel.app/api/students/update/student/' + id;

        try {
            await axios.patch(path, {
                id: id,
                nome: nome,
                matricula: matricula
            }, config);
        } catch (error) {
            console.error(error);
        }

        showAllStudents();
    }

/* Adding student into DB:
================================================================================================*/
    async function addStudent() {
        let id = document.getElementById("ID").value;
        let nome = document.getElementById("name").value;
        let matricula = document.getElementById("matricula").value;

        const path = 'https://library-dwb.vercel.app/api/students/add/student';

        try {
            await axios.post(path, {
                id: id,
                nome: nome,
                matricula: matricula
            }, config);
        } catch (error) {
            console.error(error);
        }

        showAllStudents();
    }

/* Deleting student from DB:
================================================================================================*/
    async function deleteStudent() {
        let id = document.getElementById("ID").value;

        const path = 'https://library-dwb.vercel.app/api/students/delete/student/';

        try {
            await axios.delete(path, {
                id: id
            }, config);
        } catch (error) {
            console.error(error);
        }

        showAllStudents();
    }
