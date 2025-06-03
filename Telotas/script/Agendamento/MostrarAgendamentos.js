document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/mostrarAgendamentos",{method:'GET'})
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os agendamentos');
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('agendamentos-tbody');

            data.lista.forEach(p => {
                const row = `<tr>
                    <td>${p.nome_do_pet}</td>
                    <td>${p.data}</td>
                    <td>${p.nome_do_funcionario}</td>
                    <td>${p.tipo_servico}</td>
                    <td>${p.telefone_do_dono}</td>
                    <td>${p.status}</td>
                    <td><span class="edit-icon" onClick = "window.location.href='../telaEditarAgendamento/index.html?codigo=${p.id}'">✏️</span></td>
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os agendamentos: ", error);
        })
})
