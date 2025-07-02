<script>
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";

    // Reactive variables
    let activeSlide = 0;
    let formData = {
        name: "",
        email: "",
        message: "",
    };

    // Slider functionality
    import "@splidejs/splide/css";
    import Splide from "@splidejs/splide";

    let splideElement;
    let splide;

    // Your slide data
    export let slides = [
        { id: 1, image: "/img1.jpg" },
        { id: 2, image: "/img2.jpg" },
        { id: 3, image: "/img3.jpg" },
        { id: 3, image: "/img4.jpg" },
        { id: 3, image: "/img5.jpg" },
        { id: 3, image: "/img6.jpg" },
        { id: 3, image: "/img7.jpg" },
        { id: 3, image: "/img8.jpg" },
    ];

    // Splide options
    const options = {
        type: "loop",
        perPage: 3,
        perMove: 1,
        autoplay: true,
        interval: 3000,
        arrows: true,
        pagination: true,
        lazyLoad: "nearby",
        responsive: {
            768: {
                perPage: 1,
            },
        },
    };

    // Scroll to section
    function scrollToSection(sectionId) {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    export let form;

    onMount(() => {
        if (window.innerWidth < 768) options.perPage = 1;
        splide = new Splide(splideElement, options);
        splide.mount();

        // Cleanup
        return () => {
            if (splide) {
                splide.destroy();
            }
        };
    });
</script>

<!-- Header -->
<header>
    <div class="container">
        <div class="header-content">
            <div class="logo">
                <img src="/logo.png" alt="" />
            </div>
            <nav>
                <ul>
                    <li>
                        <a
                            href="#about"
                            on:click|preventDefault={() =>
                                scrollToSection("#about")}>O nás</a
                        >
                    </li>
                    <li>
                        <a
                            href="#contact"
                            on:click|preventDefault={() =>
                                scrollToSection("#contact")}>Kontakt</a
                        >
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>

<!-- Slider section -->
<div class="splide" bind:this={splideElement}>
    <div class="splide__track">
        <ul class="splide__list">
            {#each slides as slide}
                <li class="splide__slide">
                    <img src={slide.image} alt={slide.title} />
                </li>
            {/each}
        </ul>
    </div>
</div>

<!-- About Section -->
<section class="about" id="about">
    <div class="container">
        <div class="about-content">
            <div class="about-text">
                <h2>Kdo jsme</h2>
                <p>
                    Jsme stavební firma se specializací na kompletní realizaci
                    střech, rekonstrukce střešních plášťů, výstavbu zahradních
                    pergol a široké spektrum dokončovacích stavebních prací.
                    Provádíme tesařské práce, kompletní dodávky krovů,
                    dřevostavby a pokrývačské práce.
                </p>
                <p>
                    Zajišťujeme střechy na klíč i kompletní rekonstrukce střech
                    s důrazem na preciznost a kvalitu.
                </p>
                <p>
                    Naší prioritou je kvalitní řemeslné zpracování,
                    profesionální přístup a individuální řešení šité na míru
                    každému zákazníkovi.
                </p>
            </div>
            <div class="about-image"></div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section class="services" id="services">
    <div class="container">
        <h2>Naše služby</h2>

        {#each [{ icon: "🔨", title: "Střešní práce", description: "Provádíme pokrývačské a tesařské práce související s rekonstrukcí střech.", list: ["Realizace nových střech na klíč (šikmé i ploché)", "Rekonstrukce a opravy střešních krytin", "Pokládka střešních krytin (betonové, pálené tašky, plechové krytiny aj.)", "Montáž střešních oken", "Zateplení střech a půdních prostor", "Tesařské práce"] }, { icon: "🧱", title: "Dokončovací stavební práce" }] as service}
            <div class="service-card">
                <h3 class="no-margin">
                    <div class="service-icon">{service.icon}</div>
                    {service.title}
                </h3>
                {#if service.description}
                    <p>{service.description}</p>
                {/if}
                {#if service.list}
                    <ul class="service-list">
                        {#each service.list as item}
                            <li>{item}</li>
                        {/each}
                    </ul>
                {/if}
            </div>
        {/each}
    </div>
</section>

<!-- Contact Section -->
<section class="contact" id="contact">
    <div class="container">
        <h2>Kontakt</h2>
        <div class="contact-content">
            <div class="contact-info">
                <h3>Stav Bílý s.r.o.</h3>
                <p><strong>Jiří Bílý</strong></p>
                <p>U Strouhy 525</p>
                <p>Vestec, 252 42</p>
                <br />
                <p><strong>tel. číslo:</strong> +420 721 580 111</p>
                <p><strong>e-mail:</strong> stavbily@gmail.com</p>
                <br />
                <p><strong>IČ:</strong> 22173145</p>
            </div>
            <div class="contact-form">
                <div class="contact-response">
                    {#if form?.success}
                        <p class="contact-success">{form.message}</p>
                    {/if}

                    {#if form?.error}
                        <p class="contact-error">{form.error}</p>
                    {/if}
                </div>
                <form method="post" use:enhance>
                    <div class="form-group">
                        <label for="name">Jméno a příjmení</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div class="honeypot">
                        <label for="company">Název firmy</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            tabindex="-1"
                            autocomplete="off"
                        />
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div class="honeypot-alt">
                        <label for="phone">Telefon</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            tabindex="-1"
                            autocomplete="off"
                        />
                    </div>
                    <div class="form-group">
                        <label for="message">Zpráva</label>
                        <textarea id="message" name="message" required
                        ></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Odeslat</button>
                </form>
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<footer>
    <div class="container">
        <p>Copyright © 2025 Stav Bílý s.r.o.</p>
    </div>
</footer>

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(body) {
        font-family: "Georgia", serif;
        line-height: 1.6;
        color: #333;
        background-color: #f8f6f3;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    /* Header */
    header {
        background: #f8f6f3;
        padding: 20px 0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo img {
        width: 100px;
    }

    nav ul {
        list-style: none;
        display: flex;
        gap: 30px;
    }

    nav a {
        text-decoration: none;
        color: #d2691e;
        font-weight: 700;
        transition: color 0.3s;
        cursor: pointer;
    }

    nav a:hover {
        color: #8b4513;
    }

    /* Slider */
    .splide__slide img {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }

    /* About Section */
    .about {
        padding: 80px 0;
        background: #f8f6f3;
    }

    .about-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
    }

    .about-text h2 {
        font-size: 42px;
        color: #8b4513;
        margin-bottom: 30px;
        font-weight: normal;
    }

    .about-text p {
        font-size: 16px;
        line-height: 1.8;
        color: #555;
        margin-bottom: 20px;
    }

    .about-image {
        background: #d2b48c;
        height: 300px;
        border-radius: 8px;
        background-image: url("/img1.jpg");
        background-size: cover;
        background-position: center;
    }

    /* Services Section */
    .services {
        padding: 80px 0;
        background: white;
    }

    .services h2 {
        text-align: center;
        font-size: 42px;
        color: #8b4513;
        margin-bottom: 60px;
        font-weight: normal;
    }

    .service-card {
        text-align: center;
        padding: 40px;
        background: #f8f6f3;
        border-radius: 8px;
        margin-bottom: 40px;
    }

    .service-card h3 {
        font-size: 24px;
        color: #8b4513;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
    }

    .service-icon {
        min-width: 40px;
        height: 40px;
        background: #d2691e;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .service-card p {
        color: #666;
        line-height: 1.6;
        margin: 20px 0;
    }

    .service-list {
        list-style: none;
        margin-top: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .service-list li {
        margin-bottom: 10px;
        padding-left: 20px;
        position: relative;
        color: #666;
        line-height: 1.4;
        display: inline-block;
        width: auto;
        text-align: center;
    }

    .service-list li:after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: #d2691e;
        opacity: 0.6;
        margin: 10px auto;
    }

    .service-list li:first-child:before {
        display: none;
    }

    /* Contact Section */
    .contact {
        padding: 80px 0;
        background: white;
    }

    .contact h2 {
        font-size: 42px;
        color: #8b4513;
        margin-bottom: 60px;
        font-weight: normal;
    }

    .contact-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
    }

    .contact-info {
        color: #666;
    }

    .contact-info h3 {
        color: #8b4513;
        margin-bottom: 20px;
        font-size: 20px;
    }

    .contact-info p {
        margin-bottom: 10px;
    }

    .contact-form {
        background: #f8f6f3;
        padding: 40px;
        border-radius: 8px;
    }

    .contact-response {
        margin-bottom: 10px;
    }

    .contact-response p {
        padding: 8px 12px;
        border-radius: 4px;
    }

    .contact-success {
        color: green;
        background-color: rgba(34, 197, 94, 0.1);
    }

    .contact-error {
        color: red;
        background-color: rgba(239, 68, 68, 0.15);
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        color: #8b4513;
        font-weight: 500;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: inherit;
    }

    .form-group textarea {
        height: 120px;
        resize: vertical;
    }

    .honeypot {
        position: absolute !important;
        left: -9999px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
    }

    .honeypot-alt {
        display: none;
    }

    .submit-btn {
        background: #d2691e;
        color: white;
        padding: 12px 30px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.3s;
    }

    .submit-btn:hover {
        background: #8b4513;
    }

    /* Footer */
    footer {
        background: #333;
        color: white;
        text-align: center;
        padding: 30px 0;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .about-content,
        .contact-content {
            grid-template-columns: 1fr;
        }

        .header-content {
            flex-direction: column;
            gap: 20px;
        }

        nav ul {
            flex-direction: column;
            text-align: center;
            gap: 15px;
        }

        h2 {
            font-size: 32px !important;
        }
    }
</style>
