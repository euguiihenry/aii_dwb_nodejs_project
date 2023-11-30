var emprestimos = [
    { IDAluno: 1, IDLivro: 101, dataEmprestimo: "2023-01-01", dataDevolucao: "2023-01-15" },
    { IDAluno: 2, IDLivro: 102, dataEmprestimo: "2023-02-05", dataDevolucao: "2023-02-20" },
    { IDAluno: 3, IDLivro: 103, dataEmprestimo: "2023-03-10", dataDevolucao: "2023-03-25" },
    { IDAluno: 4, IDLivro: 104, dataEmprestimo: "2023-04-15", dataDevolucao: "2023-04-30" },
    { IDAluno: 5, IDLivro: 105, dataEmprestimo: "2023-05-20", dataDevolucao: "2023-06-05" }
];

function exibirEmprestimos() {
    var listaEmprestimos = document.getElementById("list-itens");
    listaEmprestimos.innerHTML = "";
    emprestimos.forEach(function (emprestimo) {
        var tr = document.createElement("tr");
        var tdIDAluno = document.createElement("td");
        var tdIDLivro = document.createElement("td");
        var tdDataEmprestimo = document.createElement("td");
        var tdDataDevolucao = document.createElement("td");

        tdIDAluno.textContent = emprestimo.IDAluno;
        tdIDLivro.textContent = emprestimo.IDLivro;
        tdDataEmprestimo.textContent = emprestimo.dataEmprestimo;
        tdDataDevolucao.textContent = emprestimo.dataDevolucao;

        tr.appendChild(tdIDAluno);
        tr.appendChild(tdIDLivro);
        tr.appendChild(tdDataEmprestimo);
        tr.appendChild(tdDataDevolucao);

        listaEmprestimos.appendChild(tr);
    });
}

function editar() {
    var idAluno = document.getElementById("IDAluno").value;
    var idLivro = document.getElementById("IDLivro").value;
    var dataEmprestimo = document.getElementById("dataEmprestimo").value;
    var dataDevolucao = document.getElementById("dataDevolucao").value;

    // Verifica se o ID do aluno fornecido é válido
    if (idAluno.trim() !== "" && idLivro.trim() !== "") {
        // Procura o empréstimo pelo ID do aluno
        var emprestimoExistente = emprestimos.find(function (emprestimo) {
            return emprestimo.IDAluno == idAluno;
        });

        // Se o empréstimo existir, atualiza suas informações
        if (emprestimoExistente) {
            emprestimoExistente.IDLivro = idLivro;
            emprestimoExistente.dataEmprestimo = dataEmprestimo;
            emprestimoExistente.dataDevolucao = dataDevolucao;
            exibirEmprestimos();
        } else {
            alert("Empréstimo não encontrado. Não é possível editar.");
        }
    } else {
        alert("Digite um ID de aluno válido para editar.");
    }
}

function excluir() {
    var idAluno = document.getElementById("IDAluno").value;

    // Verifica se o ID do aluno fornecido é válido
    if (idAluno.trim() !== "") {
        // Filtra os empréstimos, removendo o empréstimo com o ID do aluno correspondente
        emprestimos = emprestimos.filter(function (emprestimo) {
            return emprestimo.IDAluno != idAluno;
        });
        exibirEmprestimos();
    } else {
        alert("Digite um ID de aluno válido para excluir.");
    }
}

function adicionar() {
    var idAluno = document.getElementById("IDAluno").value;
    var idLivro = document.getElementById("IDLivro").value;
    var dataEmprestimo = document.getElementById("dataEmprestimo").value;
    var dataDevolucao = document.getElementById("dataDevolucao").value;

    // Verifica se os campos não estão vazios e se não existe um empréstimo com esse ID de aluno
    if (idAluno.trim() !== "" && idLivro.trim() !== "" && dataEmprestimo.trim() !== "" && dataDevolucao.trim() !== "" &&
        !emprestimos.some(emprestimo => emprestimo.IDAluno == idAluno && emprestimo.IDLivro == idLivro) &&
        validarDatas(dataEmprestimo, dataDevolucao)) {
        // Adiciona um novo empréstimo à lista
        emprestimos.push({ IDAluno: idAluno, IDLivro: idLivro, dataEmprestimo: dataEmprestimo, dataDevolucao: dataDevolucao });
        exibirEmprestimos();
    } else {
        alert("Preencha todos os campos, digite IDs únicos e verifique as datas de empréstimo e devolução.");
    }
    exibirEmprestimos();
}

function validarDatas(dataEmprestimo, dataDevolucao) {
    // Converte as datas para objetos Date para facilitar a comparação
    var dataEmprestimoObj = new Date(dataEmprestimo);
    var dataDevolucaoObj = new Date(dataDevolucao);

    // Verifica se a data de empréstimo é anterior à data de devolução
    if (dataEmprestimoObj < dataDevolucaoObj) {
        return true;
    } else {
        alert("A data de empréstimo deve ser inferior à data de devolução.");
        return false;
    }
}

window.onload = exibirEmprestimos;