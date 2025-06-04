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

document.getElementById('form-editarAnimal').addEventListener('submit', async function (e) {
    e.preventDefault();
       
    const nomeDoAnimal = document.getElementById('nome').value;
    const tipo = document.getElementById('tipos').value;
    const idade = document.getElementById('idade').value;
    const porte = document.getElementById('porte').value;
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;
    const id = (new URLSearchParams(window.location.search).get('id'))

    console.log(id);

    const animalEditado = {
        id: id,
        nome_do_animal: nomeDoAnimal,
        tipo: tipo,
        idade: idade,
        peso: porte,
        cpf_dono: cpf, 
        telefone: telefone
    };

    fetch('http://localhost:8080/animais', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(animalEditado)
    })
    .then(response => {
        if(!response.ok) {
                alert("Erro ao editar animal.");
                throw new Error('Erro ao editar animal.');
            }
            
        return response.json();
    })
    .then(data => {
        if(data.status !== "OK") {
            console.log(data.status);
            console.log(data.message);
            alert("Erro ao editar animal.");
            return;
        }

        alert('✅ ' + data.message);
        window.location.href = "../../pages/telaAnimais/index.html"; 
    });
});
