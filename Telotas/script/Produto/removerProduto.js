document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form-removerProduto').addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const codigoEAN = document.getElementById('codigoEAN').value;

        if(!codigoEAN) {
            alert('Preencha todos os campos!!');
            return;
        }

        const produtoDeletar = {
            codigoEAN_13: codigoEAN
        }

        fetch('http://localhost:8080/deletarProdutos', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produtoDeletar)
        })
        .then(response => {
            if(!response.ok) {
                alert('Erro ao deletar o produto');
                throw new Error('Erro ao deletar o produto');
            }
            
            return response.json();
        })
        .then(data => {
            if(data.status !== "OK") {
                alert("Erro ao deletar produto.");
                return;
            }

            alert('✅ ' + data.message);
            window.location.href = "../../pages/telaProdutos/index.html"; 
        });
    });
});