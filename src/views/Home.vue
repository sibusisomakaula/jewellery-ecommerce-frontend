<template>
  <section class="space-y-16">

    <!-- Hero Section -->
    <div class="grid md:grid-cols-2 gap-8 items-center bg-brand-light p-8 rounded-2xl">
      <div class="space-y-4">
        <h1 class="h1 text-4xl font-bold text-brand-blue">Handcrafted Jewellery for Every Moment</h1>
        <p class="muted text-lg text-brand-dark">Discover unique pieces and collect in-store at your chosen time.</p>
        <div class="flex gap-3">
          <router-link to="/products" class="btn px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-dark transition">Browse Products</router-link>
          <router-link to="/cart" class="btn-outline px-6 py-3 border border-brand-blue text-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition">View Cart</router-link>
        </div>
      </div>
    </div>

    <!-- About Us Section -->
    <section class="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto text-center transform hover:scale-105 transition">
      <h2 class="text-3xl font-bold text-brand-blue mb-4">About Us</h2>
      <p class="text-brand-dark text-lg mb-6">
        Cape Peninsula Jewellery Shop has been crafting timeless pieces that celebrate individuality and elegance. Our mission is to provide high-quality, unique designs that empower our customers to express themselves with confidence.
      </p>
      <p class="text-brand-dark text-base">
        We pride ourselves on excellent craftsmanship, attention to detail, and outstanding customer service. Whether you’re shopping for a special occasion or everyday elegance, our curated collection is designed to inspire and delight.
      </p>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto transform hover:scale-105 transition">
      <h2 class="text-3xl font-bold text-brand-blue mb-4 text-center">Contact Us</h2>
      <p class="text-brand-dark text-base mb-4 text-center">
        Have questions or want to visit our store? Reach out to us! We’d love to hear from you.
      </p>

      <div class="flex flex-col md:flex-row md:justify-around gap-4 mb-6 text-sm md:text-base">
        <div class="flex items-center gap-2 hover:text-brand-gold transition">
          <i class="fas fa-map-marker-alt text-brand-blue"></i>
          <p class="text-brand-dark">123 Jewellery Lane, Cape Town, South Africa</p>
        </div>
        <div class="flex items-center gap-2 hover:text-brand-gold transition">
          <i class="fas fa-phone-alt text-brand-blue"></i>
          <p class="text-brand-dark">+27 69 565 0539</p>
        </div>
        <div class="flex items-center gap-2 hover:text-brand-gold transition">
          <i class="fas fa-envelope text-brand-blue"></i>
          <p class="text-brand-dark">info@cpeninsulajewellery.co.za</p>
        </div>
      </div>

      <!-- Smaller Contact Form -->
      <form class="flex flex-col gap-3 max-w-md mx-auto">
        <input type="text" placeholder="Your Name" class="input p-2 border rounded-md w-full" />
        <input type="email" placeholder="Your Email" class="input p-2 border rounded-md w-full" />
        <textarea placeholder="Your Message" class="input p-2 border rounded-md w-full" rows="3"></textarea>
        <button type="submit" class="px-4 py-2 bg-brand-blue text-white rounded-lg font-semibold hover:bg-brand-dark transition">
          Send Message
        </button>
      </form>
    </section>

    <!-- Modern Footer Section -->
    <footer class="bg-brand-dark py-8 mt-12">
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white">© {{ new Date().getFullYear() }} • Cape Peninsula Jewellery Shop</p>
        <div class="flex gap-4">
          <a href="https://www.instagram.com/" target="_blank" class="social-btn">
            <i class="fab fa-instagram text-white"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" class="social-btn">
            <i class="fab fa-facebook-f text-white"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" class="social-btn">
            <i class="fab fa-twitter text-white"></i>
          </a>
          <a href="https://wa.me/27695650539" target="_blank" class="social-btn">
            <i class="fab fa-whatsapp text-white"></i>
          </a>
        </div>
      </div>
    </footer>

  </section>
</template>

<script setup>
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.bg-brand-blue { background-color: #005BAC; }
.bg-brand-dark { background-color: #333333; }
.text-brand-blue { color: #005BAC; }
.text-brand-dark { color: #333333; }
.text-brand-gold { color: #FFD100; }
.bg-brand-light { background-color: #F5F5F5; }

.input { border: 1px solid #ccc; }
.input:focus { outline: none; border-color: #005BAC; }

section:hover { cursor: pointer; }

/* Social Media Buttons */
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #555;
  transition: background-color 0.3s, transform 0.3s;
}
.social-btn:hover {
  background-color: #FFD100;
  transform: scale(1.1);
}
</style>
