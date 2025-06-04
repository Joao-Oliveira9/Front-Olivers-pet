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

   document.getElementById('form-cadastroAnimal').addEventListener('submit', async function (e) {
        e.preventDefault();
       
        const idade = document.getElementById('Idade').value;
        const peso = document.getElementById('porte').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const tipo = document.getElementById('tipos').value;
        const nome = document.getElementById('Nome').value;

        if(!nome || !idade|| !peso || !telefone || !tipo || !cpf){
            alert("Preencha todos os campos!!");
            return;
        }
        const produto = {
            nome_do_animal: nome,
            tipo: tipo,
            idade: idade,
            peso: peso,
            cpf_dono: cpf,
            telefone: telefone,
        };

        fetch("http://localhost:8080/animais", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        })
        .then(response => {
            if(!response.ok) {
                alert("Erro ao registrar animal.");
                throw new Error('Erro ao registrar animal.');
            }
            return response.json();
        })
        .then(data => {
            if(data.status !== "OK") {
                alert("Erro ao registrar animal.");
                return;
            }

            alert('✅ Animal cadastrado com sucesso'); 
            window.location.href = "../../pages/telaAnimais/index.html"; 
        });
    });