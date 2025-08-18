// Adicionar funcionalidade aos botões de adicionar ao carrinho
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3').textContent;
        alert(`${productName} foi adicionado ao carrinho!`);
        // Aqui você adicionaria a lógica real para adicionar ao carrinho
    });
});

// Funcionalidade para os botões de categoria
document.querySelectorAll('.categories button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove a classe 'active' de todos os botões
        document.querySelectorAll('.categories button').forEach(btn => btn.classList.remove('active'));
        // Adiciona a classe 'active' ao botão clicado
        this.classList.add('active');
        
        const category = this.textContent;
        alert(`Filtrando produtos da categoria: ${category}`);
        // Aqui você adicionaria a lógica real para filtrar produtos
    });
});

// Funcionalidade para o dropdown de ordenação
document.querySelector('.sort-by select').addEventListener('change', function() {
    const sortBy = this.value;
    alert(`Ordenando produtos por: ${sortBy}`);
    // Aqui você adicionaria a lógica real para ordenar produtos
});

