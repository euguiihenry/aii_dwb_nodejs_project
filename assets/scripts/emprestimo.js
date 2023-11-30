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
        console.log(allLoans);
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
        let idAluno = document.getElementById("IDAluno").value;
        let idLivro = document.getElementById("IDLivro").value;
        let dataEmprestimo = document.getElementById("dataEmprestimo").value;
        let dataDevolucao = document.getElementById("dataDevolucao").value;

        const path = 'https://library-dwb.vercel.app/api/registers/update/register/' + idAluno;

        try {
            await axios.patch(path, {
                id_aluno: idAluno,
                id_livro: idLivro,
                data_emprestimo: dataEmprestimo,
                data_devolucao: dataDevolucao
            });
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
            });
        } catch (error) {
            console.error(error);
        }

        showAllLoans();
    }

/* Deleting loan from DB:
================================================================================================*/
    async function deleteLoan() {
        let idAluno = document.getElementById("IDAluno").value;

        const path = 'https://library-dwb.vercel.app/api/registers/delete/register/' + idAluno;

        try {
            await axios.delete(path);
        } catch (error) {
            console.error(error);
        }

        showAllLoans();
    }