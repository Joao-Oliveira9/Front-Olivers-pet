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
    document.getElementById('form-agendarHorario').addEventListener('submit', async function (e){
        e.preventDefault();

        const cpf = document.getElementById('cpf').value;
        const nome = document.getElementById('nome').value;
        const servico = document.getElementById('servico').value;
        const data = document.getElementById('data').value;
        const hora = document.getElementById('horarios').value;
        const funcionario = document.getElementById('funcionario').value;

        if(!cpf || !nome || !servico || !data || !hora || !funcionario){
            alert("Preencha todos os campos!!");
            return;
        }

        const horario = data + "T" + hora + ":00"

        const agendamento = {
            nome_do_animal: nome,
            cpf: cpf,
            servico: servico,
            horario: horario,
            funcionario: funcionario
        };

        fetch("http://localhost:8080/horarios", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agendamento)
        })
        .then(response => {
            if(!response.ok) throw new Error('Erro ao realizar o agendamento');
            
            return response.json();
        })
        .then(data => {
            if(data.status !== "OK") {
                alert("Erro ao realizar o agendamento.");
                return;
            }

            alert('✅ Agendamento realizado com sucesso'); 
            window.location.href = "../../pages/telaAgenda/index.html"; 
        });
    });
});