/* Global Variables:
================================================================================================*/
    let allBooksVar = [];

/* Getting Data from DB and Showing it in Table:
================================================================================================*/
    document.addEventListener('DOMContentLoaded', function() {  
        async function getAllBooks() {
            const path = 'http://localhost:3000/api/library/get/books';
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

        // Call your function
        showAllBooks();
    });

/* Updating Data in DB Using Patch Method:
================================================================================================*/
    async function updateBook(id, title, author) {
        const path = 'http://localhost:3000/api/index';
        const response = await axios.patch(path, {
            id: id,
            title: title,
            author: author
        });
        console.log(response.data);
        return response.data;
    }

/* Posting Data to DB:
================================================================================================*/
    async function postBook(id, title, author) {
        const path = 'http://localhost:3000/api/index';
        const response = await axios.post(path, {
            id: id,
            title: title,
            author: author
        });
        console.log(response.data);
        return response.data;
    }




/* Old Script:
================================================================================================*/
    /* var livros = [
        { id: 1, titulo: "Dom Quixote", autor: "Miguel de Cervantes" },
        { id: 2, titulo: "Romeu e Julieta", autor: "William Shakespeare" },
        { id: 3, titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez" },
        { id: 4, titulo: "1984", autor: "George Orwell" },
        { id: 5, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" }
    ]; */

    function exibirLivros() {
        var listaLivros = document.getElementById("list-itens");
        listaLivros.innerHTML = "";
        livros.forEach(function (livro) {
            var tr = document.createElement("tr");
            var tdID = document.createElement("td");
            var tdTitulo = document.createElement("td");
            var tdAutor = document.createElement("td");

            tdID.textContent = livro.id;
            tdTitulo.textContent = livro.titulo;
            tdAutor.textContent = livro.autor;

            tr.appendChild(tdID);
            tr.appendChild(tdTitulo);
            tr.appendChild(tdAutor);

            listaLivros.appendChild(tr);
        });
    }

    function editar() {
        var id = document.getElementById("ID").value;
        var titulo = document.getElementById("titulo").value;
        var autor = document.getElementById("autor").value;

        // Verifica se o ID fornecido é válido
        if (id.trim() !== "") {
            // Procura o usuário pelo ID
            var livroExistente = livros.find(function (livro) {
                return livro.id == id;
            });

            // Se o usuário existir, atualiza suas informações
            if (livroExistente) {
                livroExistente.titulo = titulo;
                livroExistente.autor = autor;
                exibirLivros();
            } else {
                alert("ID não encontrado. Não é possível editar.");
            }
        } else {
            alert("Digite um ID válido para editar.");
        }
        exibirLivros();
    }

    function excluir() {
        var id = document.getElementById("ID").value;

        // Verifica se o ID fornecido é válido
        if (id.trim() !== "") {
            // Filtra os usuários, removendo o usuário com o ID correspondente
            livros = livros.filter(function (livro) {
                return livro.id != id;
            });
            exibirLivros();
        } else {
            alert("Digite um ID válido para excluir.");
        }
        exibirLivros();
    }

    function adicionar(){
        var id = document.getElementById("ID").value;
        var titulo = document.getElementById("titulo").value;
        var autor = document.getElementById("autor").value;

        // Verifica se os campos não estão vazios e se não existe um livro com esse ID
        if (id.trim() !== "" && titulo.trim() !== "" && autor.trim() !== "" && !livros.some(livro => livro.id == id)) {
            // Adiciona um novo livro à lista
            livros.push({ id: id, titulo: titulo, autor: autor });
            exibirLivros();
        } else {
            alert("Preencha todos os campos e digite um ID único para adicionar o livro.");
        }
        exibirLivros();
    }


   /*  window.onload = () => {
        showAllBooks();
    }; */

