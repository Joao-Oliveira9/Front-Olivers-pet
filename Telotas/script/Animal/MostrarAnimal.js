document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/animais",{
        method: 'GET'
    })
        .then(response => {
            if(!response.ok) throw new Error('Erro ao buscar os animais');
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('animal-tbody');
            console.log('salve')
            console.log(data)
             data.listaAnimais.forEach(p => {
                const row = `<tr>
                    <td>${p.id}</td>
                    <td>${p.nome_do_animal}</td>
                    <td> ${p.idade}</td>
                    <td>${p.tipo}</td>
                    <td>${p.peso}</td>
                    <td>${p.cpf_dono}</td>
                    <td>${p.telefone}</td>
                    <td><span class="edit-icon" onClick = "window.location.href='../telaEditar/index.html?codigo=${p.id}'">✏️</span></td>
                </tr>`; 
                tbody.innerHTML += row;
            }); 
        })
        .catch(error => {
            console.error("Erro ao buscar os animais: ", error);
        })
})