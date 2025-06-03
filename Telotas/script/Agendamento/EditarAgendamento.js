document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/mostrarDadosPet",{
        method:'GET',
        headers: {
                "Content-Type": "application/json"
            },
        body: JSON.stringify((new URLSearchParams(window.location.search).get('codigo')))
    })  .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os dados');
            
            return response.json();
        })
        .then(data => {
            const nome_pet = document.getElementById('nome_pet');
            nome_pet.placeholder = data.nome_do_animal;

            const telefone = document.getElementById('telefone');
            telefone.placeholder = data.telefone_do_dono;
        })
        .catch(error => {
            console.error("Erro ao buscar os dados: ", error);
        });

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

    fetch("http://localhost:8080/mostrarServicos")
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os servicos');
            
            return response.json();
        })
        .then(data => {
            const select = document.getElementById('servicos');

            data.lista.forEach(s=> {
                const option = document.createElement('option');
                option.value = s.tipo_de_servico;
                option.textContent = f.tipo_de_servico;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os funcionarios: ", error);
        });

    document.getElementById('form-editarAgendamento').addEventListener('submit', async function (e) {
       e.preventDefault();

        const id = (new URLSearchParams(window.location.search).get('codigo'))
        const data = document.getElementById('data').value;
        const hora = document.getElementById('horarios').value;
        const funcionario = document.getElementById('funcionario').value;
        const servico = document.getEalementById('servico')
        const horario = null;

        if(data!=null && hora!= null){
            horario = data + "T" + hora + ":00"
        }

        const agendamentoEditado = {
                id: id,
                horario: horario,
                funcionario: funcionario,
                servico: servico

        };

       fetch('http://localhost:8080/editarAgendamento', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agendamentoEditado)
        })
        .then(response => {
            if(!response.ok) throw new Error('');
            
            return response.json();
        })
        .then(data => {
            if(data.status !== "OK") {
                alert("Erro ao editar agendamento.");
                return;
            }

            alert('✅ ' + data.message);
            window.location.href = "../../pages/telaAgenda/index.html"; 
        })

       
       
    })
});