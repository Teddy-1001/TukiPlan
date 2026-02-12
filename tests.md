<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title><%= title || 'WeekendVibe - Weekend Events & Meetups in Kenya' %></title>
  
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</head>
<body class="bg-cream-50 min-h-screen flex flex-col text-gray-800">

  <!-- Navbar - Blue header -->
  <nav class="bg-blue-700 text-white shadow-lg">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <a href="/" class="text-3xl font-bold tracking-tight">WeekendVibe</a>
      
      <div class="hidden md:flex space-x-8 items-center">
        <a href="/events" class="hover:text-blue-200 transition">Discover Events</a>
        <a href="/meetups" class="hover:text-blue-200 transition">Plan with Friends</a>
        <% if (user) { %>
          <span class="text-blue-200 font-medium">Hi, <%= user.username %></span>
          <a href="/logout" class="bg-white text-blue-700 px-5 py-2 rounded-full hover:bg-gray-100 transition font-semibold">Logout</a>
        <% } else { %>
          <a href="/login" class="hover:text-blue-200 transition">Login</a>
          <a href="/register" class="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition font-semibold">Sign Up</a>
        <% } %>
      </div>

      <button class="md:hidden focus:outline-none" id="mobile-menu-btn">
        <i class="fas fa-bars text-2xl"></i>
      </button>
    </div>
  </nav>

  <!-- Hero Section - Inspired by Ticketsasa "Find Your Event" -->
  <header class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 md:py-28">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Find Your Weekend Vibe</h1>
      <p class="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">Discover fun weekend events, grab tickets, or plan picnics, parties & meetups with your crew — easy and affordable.</p>
      
      <!-- Search like Ticketsasa style -->
      <form action="/events/search" method="GET" class="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
        <input 
          type="text" 
          name="q" 
          placeholder="Search weekend vibes (picnic, party, nyama choma, meetup...)" 
          class="flex-1 px-6 py-5 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
          value="<%= searchQuery || '' %>"
        />
        <button type="submit" class="bg-red-600 text-white font-bold px-10 py-5 rounded-full hover:bg-red-700 transition text-lg shadow-lg">
          Search Events
        </button>
      </form>
      
      <p class="mt-8 text-lg opacity-80">This weekend: Picnics • House Parties • Game Nights • Chama Hangouts • Nyama Choma</p>
    </div>
  </header>

  <!-- Featured Event Spotlight (like Ticketsasa's Open Gin Sunsets) -->
  <% if (featuredEvent) { %>
    <section class="container mx-auto px-4 py-12">
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
        <div class="md:flex">
          <div class="md:w-1/2 bg-gray-200 h-64 md:h-auto flex items-center justify-center">
            <i class="fas fa-glass-cheers text-8xl text-blue-300"></i> <!-- Placeholder; replace with real image -->
          </div>
          <div class="p-8 md:p-12">
            <span class="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">Featured This Weekend</span>
            <h2 class="text-3xl md:text-4xl font-bold text-blue-800 mb-4"><%= featuredEvent.title %></h2>
            <p class="text-gray-600 mb-6 text-lg"><%= featuredEvent.description.substring(0, 150) %>...</p>
            <div class="grid grid-cols-2 gap-6 mb-8 text-gray-700">
              <div>
                <i class="far fa-calendar-alt mr-2 text-blue-600"></i>
                <%= new Date(featuredEvent.date).toLocaleDateString('en-KE', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }) %>
              </div>
              <div>
                <i class="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                <%= featuredEvent.location %>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold text-red-600">
                KSh <%= featuredEvent.price ? featuredEvent.price.toLocaleString() : 'Free' %>
              </span>
              <a href="/events/<%= featuredEvent.id %>" class="bg-blue-700 text-white px-8 py-4 rounded-full hover:bg-blue-800 transition font-semibold text-lg">
                Get Tickets
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  <% } %>

  <!-- Upcoming Events Section - Card grid, cream cards -->
  <main class="container mx-auto px-4 py-16 flex-grow">
    <div class="flex justify-between items-center mb-10">
      <h2 class="text-4xl font-bold text-blue-800">Upcoming Weekend Events</h2>
      <a href="/events" class="text-red-600 font-semibold hover:underline text-lg">View All →</a>
    </div>

    <% if (events && events.length > 0) { %>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <% events.forEach(event => { %>
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 border border-cream-200">
            <div class="h-48 bg-gradient-to-br from-blue-100 to-cream-100 flex items-center justify-center">
              <i class="fas fa-calendar-day text-7xl text-blue-400 opacity-70"></i>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-blue-800 mb-3"><%= event.title %></h3>
              <p class="text-gray-600 mb-5 line-clamp-2"><%= event.description %></p>
              
              <div class="space-y-3 mb-6 text-gray-700">
                <div><i class="far fa-clock mr-2 text-blue-600"></i> <%= new Date(event.date).toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric' }) %></div>
                <div><i class="fas fa-map-marker-alt mr-2 text-blue-600"></i> <%= event.location %></div>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-2xl font-extrabold text-red-600">
                  KSh <%= event.price ? event.price.toLocaleString() : 'Free' %>
                </span>
                <a href="/events/<%= event.id %>" class="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                  View & Book
                </a>
              </div>
            </div>
          </div>
        <% }) %>
      </div>
    <% } else { %>
      <div class="text-center py-20 bg-white rounded-2xl shadow">
        <i class="fas fa-calendar-times text-8xl text-gray-300 mb-6"></i>
        <h3 class="text-3xl font-bold text-gray-600 mb-4">No weekend vibes yet...</h3>
        <p class="text-xl text-gray-500 mb-8">Create one and get the party started!</p>
        <% if (user) { %>
          <a href="/events/create" class="inline-block bg-red-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-red-700">
            Create Event
          </a>
        <% } else { %>
          <a href="/register" class="inline-block bg-blue-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-blue-700">
            Sign Up to Start
          </a>
        <% } %>
      </div>
    <% } %>

    <!-- Plan with Friends CTA -->
    <div class="mt-20 text-center bg-gradient-to-br from-blue-50 to-cream-50 py-16 rounded-3xl shadow-inner">
      <h3 class="text-3xl md:text-4xl font-bold text-blue-800 mb-6">Planning a Group Hang?</h3>
      <p class="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">Create meetups, invite friends, split budgets — perfect for picnics, birthdays, or casual weekends.</p>
      <% if (user) { %>
        <a href="/meetups/create" class="inline-block bg-red-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-red-700 transition shadow-lg">
          Start Planning Now
        </a>
      <% } else { %>
        <a href="/register" class="inline-block bg-red-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-red-700 transition shadow-lg">
          Sign Up & Plan Together
        </a>
      <% } %>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-blue-900 text-white py-12 mt-auto">
    <div class="container mx-auto px-4 text-center">
      <p class="text-lg mb-4">&copy; <%= new Date().getFullYear() %> WeekendVibe | Weekend Plans Made Simple in Kenya</p>
      <div class="flex justify-center space-x-8 text-2xl mt-6">
        <a href="#" class="hover:text-red-400"><i class="fab fa-twitter"></i></a>
        <a href="#" class="hover:text-red-400"><i class="fab fa-instagram"></i></a>
        <a href="#" class="hover:text-red-400"><i class="fab fa-whatsapp"></i></a>
      </div>
    </div>
  </footer>

</body>
</html>