document.getElementById('form-removerAnimal').addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const nomeAnimal = document.getElementById('nomeAnimal').value;
        const cpfDono = document.getElementById('cpfDono').value;

        if(!nomeAnimal | !cpfDono) {
            alert('Preencha todos os campos!!');
            return;
        }

        const animalDeletar = {
            nome_do_animal: nomeAnimal,
            cpf_dono: cpfDono
        }

        fetch('http://localhost:8080/animais', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalDeletar)
        })
        .then(response => {
            if(!response.ok) throw new Error('Erro ao deletar o animal');
            
            return response.json();
        })
        .then(data => {
            if(data.status !== "OK") {
                alert(data.message);
                return;
            }

            alert('✅ ' + data.message);
            window.location.href = "../../pages/telaAnimais/index.html"; 
        });
    });