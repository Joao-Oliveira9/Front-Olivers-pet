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

    fetch("http://localhost:8080/mostrarServicos")
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os servicos');
            
            return response.json();
        })
        .then(data => {
            const select = document.getElementById('servicos');

            data.listaServicos.forEach(s=> {
                const option = document.createElement('option');
                option.value = s.tipo_de_servico;
                option.textContent = s.tipo_de_servico;
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
        const servico = document.getElementById('servicos').value;
        const dia = document.getElementById('data').value;
        const hora = document.getElementById('horarios').value;
        const funcionario = document.getElementById('funcionarios').value;

        if(!cpf || !nome || !servico || !dia || !hora || !funcionario){
            alert("Preencha todos os campos!!");
            return;
        }

        const data = dia + "T" + hora + ":00"

        console.log(data);
        
        const agendamento = {
            nome: nome,
            cpf: cpf,
            data: data,
            funcionario: funcionario,
            servico: servico
        };

        fetch("http://localhost:8080/agendarHorario", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agendamento)
        })
        .then(response => {
            console.log(response)
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