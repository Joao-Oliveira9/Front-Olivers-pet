   function formatar(mascara, documento) {
        let i = documento.value.length;
         let saida = '#';
        let texto = mascara.substring(i);
        while (texto.substring(0, 1) != saida && texto.length ) {
            documento.value += texto.substring(0, 1);
            i++;
            texto = mascara.substring(i);
        }
    }

document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/mostrarFuncionarios")
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os funcionarios');
            
            return response.json();
        })
        .then(data => {
            const select = document.getElementById('funcionarios');

            data.listaFuncionarios.forEach(f=> {
                const option = document.createElement('option');
                option.value = f.nome;
                option.textContent = f.nome;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os funcionarios: ", error);
        });
    document.getElementById('form-cancelarAgendamento').addEventListener('submit', async function (e){
    e.preventDefault();

        const dia = document.getElementById('data').value;
        const hora = document.getElementById('horarios').value;
        const funcionario = document.getElementById('funcionarios').value;

        if(!dia || !hora || !funcionario){
            alert("Preencha todos os campos!!");
            return;
        }

        const data = dia + "T" + hora + ":00"

        const cancelamento = {
            data: data,
            funcionario: funcionario
        };

        fetch("http://localhost:8080/cancelarAgendamento", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cancelamento)
        })
        .then(response => {
            if(!response.ok) {
                alert("Erro ao cancelar agendamento.");
                throw new Error("Erro ao cancelar agendamento.");
            }
            
            return response.json();
        })
        .then(data => {
            if(data.status !== "OK") {
                alert("Erro ao cancelar o agendamento.");
                return;
            }

            alert('✅ Agendamento cancelado com sucesso'); 
            window.location.href = "../../pages/telaAgenda/index.html"; 
        });
    });
});