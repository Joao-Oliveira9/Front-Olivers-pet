document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/mostrarProdutosVendidos")
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os produtos');
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('historico-tbody');

            data.lista.forEach(p => {

                const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Sao_Paulo'
                }).format(new Date(p.created_at));

                const row = `<tr>
                    <td>${p.nome_do_produto}</td>
                    <td>${p.codigoEAN_13}</td>
                    <td>${p.nome_do_funcionario}</td>
                    <td>${p.qtdVendida}</td>
                    <td>${p.qtdAtual}</td>
                    <td>${dataFormatada}</td>
                    <td><span class="edit-icon" onClick = "window.location.href='../telaEditarProduto/index.html?codigo=${p.codigoEAN_13}'">✏️</span></td>
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os produtos: ", error);
        })
})
