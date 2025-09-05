package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type ContactForm struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	CPF   string `json:"cpf"`
	Phone string `json:"phone"`
	Senha string `json:"senha"`
}

type Item struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	OldPrice    float64 `json:"old_price"`
	Description string  `json:"description"`
	Category    string  `json:"category"`
}

type Order struct {
	ID     string `json:"id"`
	Date   string `json:"date"`
	Value  string `json:"value"`
	Status string `json:"status"`
}

// Dados simulados para demonstração
var items = []Item{
	{
		ID:          "1",
		Name:        "Disc Brake Rotor",
		Price:       90.00,
		OldPrice:    120.00,
		Description: "Disco de freio de alta qualidade",
		Category:    "freios",
	},
	{
		ID:          "2",
		Name:        "Shock Absorber",
		Price:       110.00,
		OldPrice:    150.00,
		Description: "Amortecedor dianteiro",
		Category:    "suspensao",
	},
	{
		ID:          "3",
		Name:        "Spark Plug",
		Price:       15.00,
		OldPrice:    25.00,
		Description: "Vela de ignição NGK",
		Category:    "ignicao",
	},
	{
		ID:          "4",
		Name:        "Car Battery",
		Price:       250.00,
		OldPrice:    300.00,
		Description: "Bateria automotiva 60Ah",
		Category:    "eletrica",
	},
}

var orders = []Order{
	{ID: "12345", Date: "22/04/2024", Value: "R$ 250,00", Status: "Entregue"},
	{ID: "12344", Date: "10/04/2024", Value: "R$ 150,00", Status: "Em trânsito"},
	{ID: "12343", Date: "05/04/2024", Value: "R$ 350,00", Status: "Em trânsito"},
	{ID: "12342", Date: "25/03/2024", Value: "R$ 500,00", Status: "Entregue"},
	{ID: "12341", Date: "14/03/2024", Value: "R$ 175,00", Status: "Entregue"},
}

func contactHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var contact ContactForm
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&contact); err != nil {
		http.Error(w, "Erro ao decodificar JSON", http.StatusBadRequest)
		return
	}

	// Validações básicas
	if contact.Name == "" || contact.Email == "" || contact.CPF == "" {
		http.Error(w, "Campos obrigatórios não preenchidos", http.StatusBadRequest)
		return
	}

	// Simular processamento (salvar em banco de dados, enviar email, etc.)
	fmt.Printf("Novo cadastro recebido: %+v\n", contact)
	
	// Log com timestamp
	log.Printf("Cadastro realizado para: %s (%s)", contact.Name, contact.Email)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Cadastro realizado com sucesso!",
		"success": true,
		"timestamp": time.Now().Format("2006-01-02 15:04:05"),
	})
}

func itemsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	// Filtro por categoria (opcional)
	category := r.URL.Query().Get("category")
	filteredItems := items

	if category != "" {
		filteredItems = []Item{}
		for _, item := range items {
			if item.Category == category {
				filteredItems = append(filteredItems, item)
			}
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(filteredItems)
}

func ordersHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(orders)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status": "OK",
		"timestamp": time.Now().Format("2006-01-02 15:04:05"),
		"version": "1.0.0",
	})
}

func main() {
	// Criar roteador
	r := mux.NewRouter()

	// Definir rotas
	r.HandleFunc("/contact", contactHandler).Methods("POST")
	r.HandleFunc("/items", itemsHandler).Methods("GET")
	r.HandleFunc("/orders", ordersHandler).Methods("GET")
	r.HandleFunc("/health", healthHandler).Methods("GET")

	// Configurar CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // Em produção, especificar domínios específicos
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
		AllowCredentials: true,
	})

	// Aplicar middleware CORS
	handler := c.Handler(r)

	// Configurar servidor
	server := &http.Server{
		Addr:         "0.0.0.0:8080",
		Handler:      handler,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Println("🚀 Servidor Mechanic Backend iniciado na porta :8080")
	log.Println("📋 Endpoints disponíveis:")
	log.Println("   POST /contact - Receber dados do formulário de cadastro")
	log.Println("   GET  /items   - Listar peças disponíveis")
	log.Println("   GET  /orders  - Listar histórico de pedidos")
	log.Println("   GET  /health  - Status do servidor")
	
	log.Fatal(server.ListenAndServe())
}


