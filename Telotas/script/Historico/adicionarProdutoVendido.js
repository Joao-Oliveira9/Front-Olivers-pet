   document.getElementById('form-cadastroProdutos').addEventListener('submit', async function (e) {
        e.preventDefault();

        const codigoEAN = document.getElementById('codigoEAN').value;
        const funcionario = document.getElementById('funcionario').value;
        const qtdVendida = document.getElementById('qtdVendida').value;

        if(!codigoEAN || !funcionario || !qtdVendida){
            alert("Preencha todos os campos!!");
            return;
        }
        const produto = {
            codigoEAN_13: codigoEAN,
            nome_funcionario: funcionario,
            qtdVendida: qtdVendida
        };

        fetch("http://localhost:8080/registrarProdutosVendidos", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        })
        .then(response => {
            if(!response.ok) throw new Error('Erro ao registrar o produto vendido.');
            
            return response.json();
        })
        .then(data => {
            if(data.status !== "OK") {
                alert(data.message);
                return;
            }

            alert('✅ Produto vendido cadastrado com sucesso'); 
            window.location.href = "../../pages/telaHistorico/index.html"; 
        });
    });