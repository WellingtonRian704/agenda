// Função para cadastrar contato
function cadastrarContato() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

  if (nome && email && telefone) {
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    const novoContato = { nome, email, telefone };
    contatos.push(novoContato);

    // Salvar no localStorage
    localStorage.setItem('contatos', JSON.stringify(contatos));

    // Limpar os campos
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';

    // Atualizar a tabela
    atualizarTabela();
  } else {
    alert('Preencha todos os campos!');
  }
}

// Função para atualizar a tabela de contatos
function atualizarTabela() {
  const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
  const tabelaContatos = document.getElementById('tabelaContatos').getElementsByTagName('tbody')[0];
  tabelaContatos.innerHTML = '';

  contatos.forEach((contato, index) => {
    const row = tabelaContatos.insertRow();
    row.innerHTML = `
      <td>${contato.nome}</td>
      <td>${contato.email}</td>
      <td>${contato.telefone}</td>
      <td>
        <button class="btn btn-editar" onclick="editarContato(${index})">Editar</button>
        <button class="btn btn-excluir" onclick="excluirContato(${index})">Excluir</button>
      </td>
    `;
  });

  // Atualizar total de contatos
  document.getElementById('totalContatos').textContent = contatos.length;
}

// Função para excluir um contato
function excluirContato(index) {
  const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
  contatos.splice(index, 1);
  localStorage.setItem('contatos', JSON.stringify(contatos));
  atualizarTabela();
}

// Função para editar um contato
function editarContato(index) {
  const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
  const contato = contatos[index];

  // Preencher os campos do formulário com os dados do contato
  document.getElementById('nome').value = contato.nome;
  document.getElementById('email').value = contato.email;
  document.getElementById('telefone').value = contato.telefone;

  // Remover o contato para que o usuário possa atualizar
  excluirContato(index);
}

// Função para filtrar contatos pelo nome
function filtrarContatos() {
  const filtro = document.getElementById('filtro').value.toLowerCase();
  const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
  const tabelaContatos = document.getElementById('tabelaContatos').getElementsByTagName('tbody')[0];
  tabelaContatos.innerHTML = '';

  contatos.filter(contato => contato.nome.toLowerCase().includes(filtro)).forEach((contato, index) => {
    const row = tabelaContatos.insertRow();
    row.innerHTML = `
      <td>${contato.nome}</td>
      <td>${contato.email}</td>
      <td>${contato.telefone}</td>
      <td>
        <button class="btn btn-editar" onclick="editarContato(${index})">Editar</button>
        <button class="btn btn-excluir" onclick="excluirContato(${index})">Excluir</button>
      </td>
    `;
  });
}

// Carregar contatos ao carregar a página
window.onload = atualizarTabela;