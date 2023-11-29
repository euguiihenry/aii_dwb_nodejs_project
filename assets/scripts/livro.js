/* Imports:
================================================================================================*/
    import 'regenerator-runtime/runtime';    
    import axios from 'axios';
    import dotenv from 'dotenv';

/* Configuring dotenv:
================================================================================================*/
    //dotenv.config({ path: '../../.env' });

/* Getting Data from DB:
================================================================================================*/
    async function getBooks() {
        const path = process.env.LOCAL || 'http://localhost:3000/api/index';
        const response = await axios.get(path);
        console.log(response.data);
        return response.data;
    }

/* Old Script:
================================================================================================*/
    var livros = [
        { id: 1, titulo: "Dom Quixote", autor: "Miguel de Cervantes" },
        { id: 2, titulo: "Romeu e Julieta", autor: "William Shakespeare" },
        { id: 3, titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez" },
        { id: 4, titulo: "1984", autor: "George Orwell" },
        { id: 5, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" }
    ];

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

    async function editarServer() {
        let paragraph = document.querySelector('.response');
        let data1 = {};

        await fetch('http://localhost:3000/api/index')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data1 = JSON.parse(data);
            });

        paragraph.innerText = data1;
    }


    window.onload = exibirLivros;

