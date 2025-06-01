   document.getElementById('form-cadastroAnimal').addEventListener('submit', async function (e) {
        e.preventDefault();

        const idade = document.getElementById('Idade').value;
        const peso = document.getElementById('Peso').value;
        const cpf = document.getElementById('CPF').value;
        const telefone = document.getElementById('Telefone').value;
        const tipo = document.getElementById('Tipo').value;
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
            if(!response.ok) throw new Error('Erro ao registrar o produto');
            
            return response.json();
        })
        .then(data => {
            if(data.status !== "OK") {
                alert("Erro ao registrar produto.");
                return;
            }

            alert('✅ Produto cadastrado com sucesso'); 
            window.location.href = "../../pages/telaAnimais/index.html"; 
        });
    });