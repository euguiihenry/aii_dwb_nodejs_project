/* Format Dates Functions:
================================================================================================*/
    function formatDate(inputDate) {
        const dateObject = new Date(inputDate);
        
        const day = String(dateObject.getUTCDate()).padStart(2, '0');
        const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
        const year = dateObject.getUTCFullYear();

        return `${day}/${month}/${year}`;
    }

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
        showAllLoans();
    });

    async function getAllLoans() {
        const path = 'https://library-dwb.vercel.app/api/registers/get/registers';
        const response = await axios.get(path);
        const data = response.data;
        return data;
    }

    async function showAllLoans() {
        const allLoans = await getAllLoans();
        
        for (let i = 0; i < allLoans.length; i++) {
            allLoans[i].data_devolucao = formatDate(allLoans[i].data_devolucao);
            allLoans[i].data_emprestimo = formatDate(allLoans[i].data_emprestimo);
        }

        const tableElement = document.getElementById('list-itens');
        
        if (tableElement) {
            tableElement.innerHTML = '';
            for (let i = 0; i < allLoans.length; i++) {
                tableElement.innerHTML += `
                <tr>
                    <td>${allLoans[i].id_emprestimo}</td>
                    <td>${allLoans[i].id_aluno}</td>
                    <td>${allLoans[i].id_livro}</td>
                    <td>${allLoans[i].data_emprestimo}</td>
                    <td>${allLoans[i].data_devolucao}</td>
                </tr>
                `;
            }
        } else {
            console.error('Table element not found.');
        }
    }

/* Updating Data in DB Using Patch Method:
================================================================================================*/
    async function updateLoan() {
        let idEmprestimo = document.getElementById("IDEmprestimo").value;
        let idAluno = document.getElementById("IDAluno").value;
        let idLivro = document.getElementById("IDLivro").value;
        let dataEmprestimo = document.getElementById("dataEmprestimo").value;
        let dataDevolucao = document.getElementById("dataDevolucao").value;

        const path = 'https://library-dwb.vercel.app/api/registers/update/register/' + idEmprestimo;

        try {
            await axios.patch(path, {
                id_emprestimo: idEmprestimo,
                id_aluno: idAluno,
                id_livro: idLivro,
                data_emprestimo: dataEmprestimo,
                data_devolucao: dataDevolucao
            }, config);
        } catch (error) {
            console.error(error);
        }

        showAllLoans();
    }

/* Adding loan into DB:
================================================================================================*/
    async function addLoan() {
        let idAluno = document.getElementById("IDAluno").value;
        let idLivro = document.getElementById("IDLivro").value;
        let dataEmprestimo = document.getElementById("dataEmprestimo").value;
        let dataDevolucao = document.getElementById("dataDevolucao").value;

        const path = 'https://library-dwb.vercel.app/api/registers/add/register';

        try {
            await axios.post(path, {
                id_aluno: idAluno,
                id_livro: idLivro,
                data_emprestimo: dataEmprestimo,
                data_devolucao: dataDevolucao
            }, config);
        } catch (error) {
            console.error(error);
        }

        showAllLoans();
    }

/* Deleting loan from DB:
================================================================================================*/
    async function deleteLoan() {
        let idEmprestimo = document.getElementById("IDEmprestimo").value;

        const path = 'https://library-dwb.vercel.app/api/registers/delete/register/';

        try {
            await axios.delete(path,{ id: idEmprestimo }, config);
        } catch (error) {
            console.error(error);
        }

        showAllLoans();
    }