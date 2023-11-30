/* Global Variables:
================================================================================================*/
    let allBooksVar = [];

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
        showAllBooks();
    });

    async function getAllBooks() {
        const path = 'https://library-dwb.vercel.app/api/library/get/books';
        const response = await axios.get(path);
        const data = response.data;
        return data;
    }

    async function showAllBooks() {
        allBooksVar = await getAllBooks();
        console.log(allBooksVar);
        const tableElement = document.getElementById('list-itens');
        
        // Check if the table element exists
        if (tableElement) {
            tableElement.innerHTML = '';
            for (let i = 0; i < allBooksVar.length; i++) {
                tableElement.innerHTML += `
                <tr>
                    <td>${allBooksVar[i].id}</td>
                    <td>${allBooksVar[i].titulo}</td>
                    <td>${allBooksVar[i].autor}</td>
                </tr>
                `;
            }
        } else {
            console.error('Table element not found.');
        }
    }

/* Updating Data in DB Using Patch Method:
================================================================================================*/
    async function updateBook() {
        let id = document.getElementById("ID").value;
        let titulo = document.getElementById("titulo").value;
        let autor = document.getElementById("autor").value;

        const path = 'https://library-dwb.vercel.app/api/library/update/book';

        try {
            await axios.patch(path, {
                id: id,
                titulo: titulo,
                autor: autor
            }, config);
        } catch (error) {
            console.error(error);
        }

        showAllBooks();
    }

/* Adding book into DB:
================================================================================================*/
    async function addBook() {
        let id = document.getElementById("ID").value;
        let titulo = document.getElementById("titulo").value;
        let autor = document.getElementById("autor").value;

        const path = 'https://library-dwb.vercel.app/api/library/add/book';

        try {
            await axios.post(path, {
                id: id,
                titulo: titulo,
                autor: autor
            }, config);
        } catch (error) {
            console.error(error);
        }

        showAllBooks();
    }

/* Deleting Book from DB:
================================================================================================*/
    async function deleteBook() {
        let id = document.getElementById("ID").value;

        const path = 'https://library-dwb.vercel.app/api/library/delete/book';

        try {
            await axios.delete(path, {
                id: id
            }, config);
        } catch (error) {
            console.error(error);
        }

        showAllBooks();
    }
