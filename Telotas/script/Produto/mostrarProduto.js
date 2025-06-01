document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/mostrarProduto")
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os produtos');
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('produtos-tbody');

            data.lista.forEach(p => {
                const row = `<tr>
                    <td>${p.nomeDoProduto}</td>
                    <td>${p.codigoEan13}</td>
                    <td>R$ ${p.preco}</td>
                    <td>${p.nomeDaCategoria}</td>
                    <td>${p.nomeDoFornecedor}</td>
                    <td>${p.nomeDaMarca}</td>
                    <td>${p.qtdMin}</td>
                    <td>${p.qtdAtual}</td>
                    <td><span class="edit-icon" onClick = "window.location.href='../telaEditarProduto/index.html?codigo=${p.codigoEan13}'">✏️</span></td>
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os produtos: ", error);
        })
})
