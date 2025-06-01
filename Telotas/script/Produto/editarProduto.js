document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/mostrarCategorias")
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os produtos');
            
            return response.json();
        })
        .then(data => {
            const select = document.getElementById('categoria');

            data.lista.forEach(c=> {
                const option = document.createElement('option');
                option.value = c.nomeCategoria;
                option.textContent = c.nomeCategoria;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os produtos: ", error);
        });

    fetch("http://localhost:8080/mostrarFornecedores")
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os produtos');
            
            return response.json();
        })
        .then(data => {
            const select = document.getElementById('fornecedor');

            data.lista.forEach(c=> {
                const option = document.createElement('option');
                option.value = c.nomeFornecedor;
                option.textContent = c.nomeFornecedor;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os produtos: ", error);
        })

    fetch("http://localhost:8080/mostrarMarcas")
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os produtos');
            
            return response.json();
        })
        .then(data => {
            const select = document.getElementById('marca');

            data.lista.forEach(c=> {
                const option = document.createElement('option');
                option.value = c.nomeMarca;
                option.textContent = c.nomeMarca;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os produtos: ", error);
        })

    document.getElementById('form-editarProdutos').addEventListener('submit', async function (e) {
       e.preventDefault();
       
       const nomeDoProduto = document.getElementById('nomeProduto').value;
       const preco = document.getElementById('preco').value;
       const codigoEAN = (new URLSearchParams(window.location.search).get('codigo'))
       const categoria = document.getElementById('categoria').value;
       const fornecedor = document.getElementById('fornecedor').value;
       const marca = document.getElementById('marca').value;
       const qtdMin = document.getElementById('qtdMin').value;
       const qtdAtual = document.getElementById('qtdAtual').value;

       const produtoEditado = {
            nome_do_produto: nomeDoProduto,
            preco: preco,
            nome_categoria: categoria,
            nome_fornecedor: fornecedor,
            nome_marca: marca,
            codigoEAN_13: codigoEAN,
            qtdMin: qtdMin,
            qtdAtual: qtdAtual
       };

       fetch('http://localhost:8080/editarProduto', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produtoEditado)
        })
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os produtos');
            
            return response.json();
        })
        .then(data => {
            if(data.status !== "OK") {
                alert("Erro ao editar produto.");
                return;
            }

            alert('✅ ' + data.message);
            window.location.href = "../../pages/telaProdutos/index.html"; 
        })

       
       
    })
})
