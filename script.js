const tabela = document.getElementById('tabela');
    const totalEstoqueEl = document.getElementById('totalEstoque');
    const ultimaAtualizacaoEl = document.getElementById('ultimaAtualizacao');
    const btnAdd = document.getElementById('btnAdd');

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let id = produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1;

    function atualizarResumo() {
      const total = produtos.reduce((soma, p) => soma + (p.quantidade * p.valor), 0);
      totalEstoqueEl.textContent = total.toFixed(2);
      ultimaAtualizacaoEl.textContent = new Date().toLocaleString('pt-BR');
    }

    function salvar() {
      localStorage.setItem('produtos', JSON.stringify(produtos));
      atualizarResumo();
    }

    function renderTabela() {
      tabela.innerHTML = "";
      produtos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.id}</td>
          <td>${p.nome}</td>
          <td>${p.quantidade}</td>
          <td>${p.valor.toFixed(2)}</td>
          <td>${(p.quantidade * p.valor).toFixed(2)}</td>
          <td><button data-id="${p.id}" class="entrada">➕</button></td>
          <td><button data-id="${p.id}" class="saida">➖</button></td>
          <td><button data-id="${p.id}" class="excluir">🗑️</button></td>
        `;
        tabela.appendChild(tr);
      });

      // Eventos dos botões
      document.querySelectorAll('.entrada').forEach(btn => {
        btn.onclick = e => {
          const id = parseInt(e.target.dataset.id);
          const produto = produtos.find(p => p.id === id);
          produto.quantidade++;
          salvar();
          renderTabela();
        };
      });

      document.querySelectorAll('.saida').forEach(btn => {
        btn.onclick = e => {
          const id = parseInt(e.target.dataset.id);
          const produto = produtos.find(p => p.id === id);
          if (produto.quantidade > 0) produto.quantidade--;
          salvar();
          renderTabela();
        };
      });

      document.querySelectorAll('.excluir').forEach(btn => {
        btn.onclick = e => {
          const id = parseInt(e.target.dataset.id);
          produtos = produtos.filter(p => p.id !== id);
          salvar();
          renderTabela();
        };
      });
    }

    btnAdd.addEventListener('click', () => {
      const nome = document.getElementById('nome').value.trim();
      const quantidade = parseInt(document.getElementById('quantidade').value);
      const valor = parseFloat(document.getElementById('valor').value);

      if (!nome || isNaN(quantidade) || isNaN(valor)) {
        alert('Preencha todos os campos!');
        return;
      }

      const novo = { id: id++, nome, quantidade, valor };
      produtos.push(novo);
      salvar();
      renderTabela();

      document.getElementById('nome').value = '';
      document.getElementById('quantidade').value = '';
      document.getElementById('valor').value = '';
    });

    // Inicialização
    renderTabela();
    atualizarResumo();
  </script>
</body>
</html>