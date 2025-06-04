function concluirAgendamento(id) {

        concluir = {
            id: id
        }
        fetch('http://localhost:8080/concluirAgendamento', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(concluir)
        })
        .then(response => {
            if(!response.ok) {
                alert("Erro ao concluir agendamento.");
                throw new Error("Erro ao concluir agendamento.");
            }
            
            return response.json();
        })
        .then(data => {
            if(data.status !== "OK") {
                alert("Erro ao concluir agendamento.");
                return;
            }

            alert('✅ ' + data.message);
            window.location.href = "../../pages/telaAgenda/index.html"; 
        })
    }

document.addEventListener('DOMContentLoaded', () => {
    
    fetch("http://localhost:8080/mostrarAgendamentos",{method:'GET'})
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os agendamentos');
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('agendamentos-tbody');

            data.listaAnimais.forEach(p => {
                const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Sao_Paulo'
                }).format(new Date(p.data));
                const row = `<tr>
                    <td>${p.nome_do_pet}</td>
                    <td>${dataFormatada}</td>
                    <td>${p.funcionario}</td>
                    <td>${p.servico}</td>
                    <td>${p.telefone_do_dono}</td>
                    <td>${p.status}</td>
                    <td><span class="edit-icon" onClick="window.location.href='../telaEditarHorario/index.html?codigo=${p.id}&data=${p.data}'">✏️</span></td>
                    <td><span class="concluir-icon" onclick='concluirAgendamento("${p.id}")'>✅</span></td>
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os agendamentos: ", error);
        })
})
