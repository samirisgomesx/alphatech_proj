/* =========================================
   ALPHA TECH — JAVASCRIPT
========================================= */


/* =========================================
   1. CONFIGURAÇÕES DA EMPRESA
========================================= */

const CONFIG = {
    // Substitua pelo número oficial da empresa.
    // Formato: 55 + DDD + número.
    whatsapp: "5511910291204"
};


/* =========================================
   2. ELEMENTOS PRINCIPAIS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    const loginModal = document.getElementById("loginModal");
    const loginForm = document.getElementById("loginForm");

    const portal = document.getElementById("portal");
    const portalExit = document.getElementById("portalExit");

    const quoteForm = document.getElementById("quoteForm");

    let loginType = "client";


    /* =====================================
       3. ANO AUTOMÁTICO
    ===================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================
       4. MENU RESPONSIVO
    ===================================== */

    function closeMenu() {
        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const open = navMenu.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(open));
            menuToggle.textContent = open ? "✕" : "☰";

        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        navMenu.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) closeMenu();
        });
    }


    /* =====================================
       5. WHATSAPP
    ===================================== */

    function abrirWhatsApp(mensagem) {

        const numero = String(CONFIG.whatsapp || "")
            .replace(/\D/g, "");

        if (
            numero.length < 12 ||
            numero.length > 13
        ) {
            alert(
                "Configure o WhatsApp oficial da Alpha Tech no início do arquivo script.js."
            );

            return;
        }

        const texto = encodeURIComponent(mensagem);

        const link = `https://wa.me/${numero}?text=${texto}`;

        window.open(link, "_blank", "noopener,noreferrer");
    }


    /* =====================================
       6. BOTÕES DE WHATSAPP
    ===================================== */

    document.querySelectorAll(".whatsapp-link").forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const mensagem =
                button.dataset.message ||
                "Olá! Gostaria de conhecer os serviços da Alpha Tech.";

            abrirWhatsApp(mensagem);

        });

    });


    /* =====================================
       7. FORMULÁRIO DE ORÇAMENTO
    ===================================== */

    if (quoteForm) {

        quoteForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!quoteForm.reportValidity()) return;

            const nome = document.getElementById("quoteName").value.trim();
            const empresa = document.getElementById("quoteCompany").value.trim();
            const email = document.getElementById("quoteEmail").value.trim();
            const telefone = document.getElementById("quotePhone").value.trim();
            const servico = document.getElementById("quoteService").value;
            const detalhes = document.getElementById("quoteDetails").value.trim();

            const mensagem = [
                "Olá! Vim pelo site da Alpha Tech e gostaria de solicitar uma proposta.",
                "",
                `Nome: ${nome}`,
                `Empresa: ${empresa}`,
                `E-mail: ${email}`,
                telefone ? `Telefone: ${telefone}` : "",
                `Serviço desejado: ${servico}`,
                "",
                "Descrição da necessidade:",
                detalhes
            ]
                .filter(Boolean)
                .join("\n");

            abrirWhatsApp(mensagem);

        });

    }


    /* =====================================
       8. ANIMAÇÕES AO ROLAR
    ===================================== */

    const elementosAnimados = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        elementosAnimados.forEach(elemento => {
            observer.observe(elemento);
        });

    } else {

        elementosAnimados.forEach(elemento => {
            elemento.classList.add("visible");
        });

    }


    /* =====================================
       9. MODAL DE LOGIN
    ===================================== */

    function abrirModal() {

        if (!loginModal) return;

        loginModal.classList.add("open");
        loginModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

    }

    function fecharModal() {

        if (!loginModal) return;

        loginModal.classList.remove("open");
        loginModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

    }

    document.querySelectorAll("[data-open-login]").forEach(button => {

        button.addEventListener("click", abrirModal);

    });

    document.querySelectorAll("[data-close-modal]").forEach(button => {

        button.addEventListener("click", fecharModal);

    });


    /* =====================================
       10. ESCOLHA DO TIPO DE ACESSO
    ===================================== */

    const loginTabs = document.querySelectorAll("[data-login-tab]");

    loginTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            loginTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            loginType = tab.dataset.loginTab;

        });

    });


    /* =====================================
       11. ABRIR PAINEL DEMONSTRATIVO
    ===================================== */

    function abrirPortal(tipo, nome) {

        if (!portal) return;

        portal.classList.add("open");
        portal.setAttribute("aria-hidden", "false");

        fecharModal();

        const portalRole = document.getElementById("portalRole");
        const portalWelcome = document.getElementById("portalWelcome");

        if (tipo === "admin") {

            portalRole.textContent = "PAINEL ADMINISTRATIVO";

            document.querySelectorAll(".admin-only").forEach(item => {
                item.style.display = "block";
            });

            portalWelcome.textContent = "Administrador";

        } else {

            portalRole.textContent = "ÁREA DO CLIENTE";

            document.querySelectorAll(".admin-only").forEach(item => {
                item.style.display = "none";
            });

            portalWelcome.textContent = nome || "Cliente";

        }

        mostrarPainel("overview");

    }


    /* =====================================
       12. LOGIN DE DEMONSTRAÇÃO
    ===================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!loginForm.reportValidity()) return;

            const email = document
                .getElementById("loginEmail")
                .value.trim();

            const nome = email.split("@")[0];

            abrirPortal(loginType, nome);

            loginForm.reset();

        });

    }


    /* =====================================
       13. NAVEGAÇÃO ENTRE TELAS DO PAINEL
    ===================================== */

    function mostrarPainel(nome) {

        document.querySelectorAll(".portal-view").forEach(view => {
            view.classList.remove("active");
        });

        document.querySelectorAll(".portal-link").forEach(link => {
            link.classList.remove("active");
        });

        const tela = document.getElementById(`view-${nome}`);

        if (tela) {
            tela.classList.add("active");
        }

        const botao = document.querySelector(
            `.portal-link[data-panel="${nome}"]`
        );

        if (botao) {
            botao.classList.add("active");
        }

        const titulos = {
            overview: "Visão geral",
            tickets: "Central de chamados",
            contracts: "Contratos",
            finance: "Financeiro",
            customers: "Clientes",
            management: "Administração"
        };

        document.getElementById("portalTitle").textContent =
            titulos[nome] || "Painel";

    }

    document.querySelectorAll("[data-panel]").forEach(button => {

        button.addEventListener("click", () => {

            const nome = button.dataset.panel;

            // Bloqueio visual das telas administrativas para o perfil cliente.
            const adminOnly = ["customers", "management"];

            if (
                adminOnly.includes(nome) &&
                document.getElementById("portalRole").textContent !== "PAINEL ADMINISTRATIVO"
            ) {
                return;
            }

            mostrarPainel(nome);

        });

    });


    /* =====================================
       14. SAIR DO PAINEL
    ===================================== */

    function sairDoPortal() {

        portal.classList.remove("open");
        portal.setAttribute("aria-hidden", "true");

        document.querySelectorAll(".admin-only").forEach(item => {
            item.style.display = "none";
        });

    }

    if (portalExit) {
        portalExit.addEventListener("click", sairDoPortal);
    }


    /* =====================================
       15. NOVO CHAMADO DEMONSTRATIVO
    ===================================== */

    const newTicketButton = document.getElementById("newTicketButton");
    const ticketForm = document.getElementById("ticketForm");
    const ticketList = document.getElementById("ticketList");

    let ticketNumber = 1003;

    if (newTicketButton && ticketForm) {

        newTicketButton.addEventListener("click", () => {

            ticketForm.classList.toggle("hidden");

        });

    }

    if (ticketForm) {

        ticketForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!ticketForm.reportValidity()) return;

            const assunto = document
                .getElementById("ticketSubject")
                .value.trim();

            const descricao = document
                .getElementById("ticketDescription")
                .value.trim();

            const novoChamado = document.createElement("div");

            novoChamado.className = "ticket-row";

            const titulo = document.createElement("strong");
            titulo.textContent = `#${ticketNumber} — ${assunto}`;

            const status = document.createElement("span");
            status.textContent = "Demonstração";

            novoChamado.append(titulo, status);

            ticketList.prepend(novoChamado);

            ticketNumber++;

            const statTickets = document.getElementById("statTickets");

            if (statTickets) {
                statTickets.textContent = ticketList.children.length;
            }

            alert(
                "Chamado adicionado apenas nesta demonstração. Ele não foi enviado à Alpha Tech."
            );

            console.log("Chamado demonstrativo:", {
                assunto,
                descricao
            });

            ticketForm.reset();
            ticketForm.classList.add("hidden");

        });

    }


    /* =====================================
       16. FECHAR MODAL COM ESC
    ===================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            fecharModal();

        }

    });

    console.log("Supabase carregado:", typeof supabaseClient !== "undefined");

    supabaseClient.auth.getSession()
    .then(({ data, error }) => {
        if (error) {
            console.error("Erro na conexão:", error.message);
        } else {
            console.log("Supabase conectado com sucesso!", data);
        }
    });
});