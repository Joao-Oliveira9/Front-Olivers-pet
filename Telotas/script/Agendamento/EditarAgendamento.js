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
    const id = String(new URLSearchParams(window.location.search).get('codigo'))
    const bode = {
        id : id
    }
    fetch("http://localhost:8080/mostrarAnimalAgendamento",{
        method:'POST',
        headers: {
                "Content-Type": "application/json"
            },
        body: JSON.stringify(bode)
    })  .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os dados');
            
            return response.json();
        })
        .then(data => {
            const nome_pet = document.getElementById("nome_pet");
            nome_pet.placeholder = data.animalAgendamentoDto.nome_do_animal;

            const telefone = document.getElementById("telefone");
            telefone.placeholder = data.animalAgendamentoDto.telefone_do_dono;
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
            console.error("Erro ao buscar os servicos: ", error);
        });

    document.getElementById('form-editarAgendamento').addEventListener('submit', async function (e) {
       e.preventDefault();

        const id = (new URLSearchParams(window.location.search).get('codigo'))
        const dataAntiga = (new URLSearchParams(window.location.search).get('data'))

        const dia = document.getElementById('data').value;
        const hora = document.getElementById('horarios').value;
        const funcionario = document.getElementById('funcionarios').value;
        const servico = document.getElementById('servicos').value;

        console.log(dia)
        console.log(hora)
        console.log(id)
        console.log(dataAntiga)

        let data = null;

        if (dataAntiga && (dia != "" || hora != "")) {
            const [dataAntigaDia, dataAntigaHoraCompleta] = dataAntiga.split("T");
            const dataAntigaHora = dataAntigaHoraCompleta.slice(0, 5); // "11:00"

            const novoDia = dia || dataAntigaDia;
            const novoHora = hora || dataAntigaHora;

            console.log(novoDia)
            console.log(novoHora)

            data = novoDia + "T" + novoHora + ":00";
        }

        const agendamentoEditado = {
                id: id,
                data: data,
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