document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/mostrarFuncionarios")
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os funcionarios');
            
            return response.json();
        })
        .then(data => {
            const select = document.getElementById('funcionarios');

            data.lista.forEach(f=> {
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

        const data = document.getElementById('data').value;
        const hora = document.getElementById('horarios').value;
        const funcionario = document.getElementById('funcionarios').value;

        if(!data || !hora || !funcionario){
            alert("Preencha todos os campos!!");
            return;
        }

        const horario = data + "T" + hora + ":00"

        const cancelamento = {
            horario: horario,
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
            if(!response.ok) throw new Error('Erro ao cancelar o agendamento');
            
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