// Estado da aplicação
let currentScreen = 'register';
let items = [];

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    loadItems();
    showScreen('register');
});

// Função para carregar itens do backend
async function loadItems() {
    try {
        const response = await fetch('http://localhost:8080/items');
        if (response.ok) {
            items = await response.json();
        }
    } catch (error) {
        console.error('Erro ao carregar itens:', error);
        // Dados de fallback caso o backend não esteja disponível
        items = [
            { id: "1", name: "Disc Brake Rotor", price: 90.00 },
            { id: "2", name: "Shock Absorber", price: 110.00 },
            { id: "3", name: "Spark Plug", price: 15.00 },
            { id: "4", name: "Car Battery", price: 250.00 }
        ];
    }
}

// Função para mostrar diferentes telas
function showScreen(screen) {
    currentScreen = screen;
    const app = document.getElementById('app');
    
    switch(screen) {
        case 'register':
            app.innerHTML = getRegisterScreen();
            break;
        case 'password':
            app.innerHTML = getPasswordScreen();
            break;
        case 'products':
            app.innerHTML = getProductsScreen();
            break;
        case 'history':
            app.innerHTML = getHistoryScreen();
            break;
    }
}

// Tela de Cadastro de Usuário
function getRegisterScreen() {
    return `
        <div class="container">
            <div class="logo">
                <h1>MECHANIC</h1>
                <div class="subtitle">MECÂNICA AUTOMOTIVA</div>
            </div>
            
            <div class="form-container">
                <h2 class="form-title">Cadastro de Usuário</h2>
                
                <div id="success-message" class="success-message">
                    ✓ Cadastro realizado com sucesso!
                </div>
                
                <form id="register-form">
                    <div class="form-group">
                        <input type="text" id="name" placeholder="Nome" required>
                    </div>
                    
                    <div class="form-group">
                        <input type="email" id="email" placeholder="E-mail" required>
                    </div>
                    
                    <div class="form-group">
                        <input type="text" id="cpf" placeholder="CPF" required>
                    </div>
                    
                    <div class="form-group">
                        <input type="tel" id="phone" placeholder="Telefone" required>
                    </div>
                    
                    <div class="form-group">
                        <input type="password" id="password" placeholder="Senha" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                </form>
                
                <div class="login-link">
                    Já tem conta? <a href="#" onclick="showScreen('password')">Entrar</a>
                </div>
            </div>
        </div>
    `;
}

// Tela de Escolha de Senha
function getPasswordScreen() {
    return `
        <div class="container">
            <div class="logo">
                <h1>MECHANIC</h1>
                <div class="subtitle">MECÂNICA AUTOMOTIVA</div>
            </div>
            
            <div class="form-container">
                <h2 class="form-title">Escolha sua Senha 🔒</h2>
                
                <form id="password-form">
                    <div class="form-group">
                        <label for="new-password">Senha:</label>
                        <input type="password" id="new-password" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="confirm-password">Confirmar senha:</label>
                        <input type="password" id="confirm-password" required>
                    </div>
                    
                    <button type="submit" class="btn btn-yellow">Salvar Senha</button>
                </form>
            </div>
        </div>
    `;
}

// Tela de Produtos
function getProductsScreen() {
    return `
        <div class="header">
            <div class="header-content">
                <div class="header-logo">MECHANIC</div>
                <div class="header-icons">
                    <span onclick="showScreen('register')">👤</span>
                    <span onclick="showScreen('history')">📋</span>
                    <span>🛒</span>
                </div>
            </div>
        </div>
        
        <div class="products-container">
            <h1 class="products-title">Peças em Promoção</h1>
            
            <div class="products-filter">
                <label for="sort">Ordenar por:</label>
                <select id="sort" onchange="sortProducts()">
                    <option value="price-asc">Menor preço</option>
                    <option value="price-desc">Maior preço</option>
                    <option value="name">Nome</option>
                </select>
            </div>
            
            <div class="products-grid" id="products-grid">
                ${getProductsHTML()}
            </div>
            
            <div class="categories">
                <div class="category">Freios</div>
                <div class="category">Suspensão</div>
                <div class="category">Ignição</div>
                <div class="category">Elétrica</div>
            </div>
        </div>
    `;
}

// Tela de Histórico de Compras
function getHistoryScreen() {
    const orders = [
        { id: "12345", date: "22/04/2024", value: "R$ 250,00", status: "Entregue" },
        { id: "12344", date: "10/04/2024", value: "R$ 150,00", status: "Em trânsito" },
        { id: "12343", date: "05/04/2024", value: "R$ 350,00", status: "Em trânsito" },
        { id: "12342", date: "25/03/2024", value: "R$ 500,00", status: "Entregue" },
        { id: "12341", date: "14/03/2024", value: "R$ 175,00", status: "Entregue" }
    ];
    
    return `
        <div class="history-container">
            <h1 class="history-title">Histórico de Compras</h1>
            
            <div class="history-filter">
                <label for="period">Período:</label>
                <select id="period">
                    <option value="30">Últimos 30 dias</option>
                    <option value="60">Últimos 60 dias</option>
                    <option value="90">Últimos 90 dias</option>
                </select>
            </div>
            
            <div class="history-table">
                <table>
                    <thead>
                        <tr>
                            <th>Nº do pedido</th>
                            <th>Data</th>
                            <th>Valor total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map(order => `
                            <tr>
                                <td>${order.id}</td>
                                <td>${order.date}</td>
                                <td>${order.value}</td>
                                <td class="${order.status === 'Entregue' ? 'status-entregue' : 'status-transito'}">${order.status}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="pagination">
                <span class="active">1</span>
                <span>2</span>
                <span>3</span>
            </div>
            
            <button class="details-btn" onclick="showScreen('products')">Voltar às Compras</button>
        </div>
    `;
}

// Função para gerar HTML dos produtos
function getProductsHTML() {
    return items.map(item => `
        <div class="product-card">
            <div class="product-image">
                <div style="color: #333; font-size: 0.8rem;">${item.name}</div>
            </div>
            <div class="product-name">${item.name}</div>
            <div class="product-price">
                <div class="old-price">R$ ${(item.price * 1.5).toFixed(2)}</div>
                <div class="new-price">R$ ${item.price.toFixed(2)}</div>
            </div>
            <button class="product-btn" onclick="addToCart('${item.id}')">Adicionar ao Carrinho</button>
        </div>
    `).join('');
}

// Função para ordenar produtos
function sortProducts() {
    const sortValue = document.getElementById('sort').value;
    
    switch(sortValue) {
        case 'price-asc':
            items.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            items.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            items.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    document.getElementById('products-grid').innerHTML = getProductsHTML();
}

// Função para adicionar ao carrinho
function addToCart(itemId) {
    const item = items.find(i => i.id === itemId);
    if (item) {
        alert(`${item.name} adicionado ao carrinho!`);
    }
}

// Manipulador do formulário de cadastro
document.addEventListener('submit', async function(e) {
    if (e.target.id === 'register-form') {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            cpf: document.getElementById('cpf').value,
            phone: document.getElementById('phone').value,
            senha: document.getElementById('password').value
        };
        
        try {
            const response = await fetch('http://localhost:8080/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                document.getElementById('success-message').classList.add('show');
                document.getElementById('register-form').reset();
                
                setTimeout(() => {
                    showScreen('products');
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            // Simular sucesso para demonstração
            document.getElementById('success-message').classList.add('show');
            document.getElementById('register-form').reset();
            
            setTimeout(() => {
                showScreen('products');
            }, 2000);
        }
    }
    
    if (e.target.id === 'password-form') {
        e.preventDefault();
        
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        alert('Senha salva com sucesso!');
        showScreen('products');
    }
});

