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




###//create event
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TukiPlan · AI event builder</title>

  <!-- Tailwind + Inter + Font Awesome -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz@14..32&display=swap" rel="stylesheet">
  
  <!-- Flatpickr (mood, not heavily used) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

  <style>
    body { font-family: 'Inter', system-ui, sans-serif; }
    .soft-shadow { box-shadow: 0 8px 30px rgba(0,0,0,0.02), 0 2px 6px rgba(0,20,30,0.02); }
    .input-ring { transition: all 0.15s ease; }
    .input-ring:focus { box-shadow: 0 0 0 3px rgba(30,64,175,0.06); border-color: #a5b4fc; background-color: white; }
    .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 20px 28px -10px rgba(0,45,60,0.06); }
  </style>
</head>
<body class="bg-stone-50 text-stone-800 antialiased flex flex-col min-h-screen">

  <!-- ========== NAVBAR (TukiPlan vibe) ========== -->
  <nav class="bg-white/90 backdrop-blur-sm border-b border-stone-200/60 text-stone-700 sticky top-0 z-20">
    <div class="container mx-auto px-5 md:px-6 py-4 flex justify-between items-center">
      <a href="/" class="text-2xl md:text-3xl font-light tracking-tight text-stone-800 flex items-end gap-1">
        <span class="font-semibold text-blue-900">TukiPlan</span>
        <span class="text-xs uppercase bg-stone-100 text-stone-600 px-2 py-1 rounded-full font-medium border border-stone-200/50">AI</span>
      </a>

      <div class="hidden md:flex items-center space-x-8 text-sm font-medium">
        <a href="#" class="text-stone-600 hover:text-blue-900 transition-colors flex items-center gap-1.5">
          <i class="far fa-compass text-xs"></i> Discover
        </a>
        <a href="#" class="text-stone-600 hover:text-blue-900 transition-colors flex items-center gap-1.5">
          <i class="fas fa-user-group text-xs"></i> Plan together
        </a>
        <a href="#" class="text-stone-600 hover:text-blue-900 transition">Login</a>
        <a href="#" class="bg-blue-900 text-white px-5 py-2 rounded-full hover:bg-blue-800 transition shadow-sm text-sm font-medium">Sign up</a>
      </div>

      <button class="md:hidden text-stone-600 p-2 rounded-full hover:bg-stone-100" id="mobile-menu-btn">
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>
  </nav>

  <!-- ========== MAIN CREATE EVENT PAGE ========== -->
  <main class="container mx-auto px-5 py-16 max-w-4xl flex-grow">
    <!-- subtle back link (just for style) -->
    <a href="#" class="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 mb-8 transition group">
      <i class="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i> dashboard
    </a>

    <!-- MAIN CARD – soft & spacious (TukiPlan identity) -->
    <div class="bg-white/90 backdrop-blur-sm rounded-3xl soft-shadow border border-stone-100/80 overflow-hidden">

      <!-- header – gentle gradient, AI context -->
      <div class="bg-gradient-to-br from-blue-50 to-stone-50 px-8 py-10 md:px-12 md:py-12 border-b border-stone-100">
        <div class="flex items-center gap-3 text-blue-800 mb-4">
          <span class="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
            <i class="fas fa-sparkles text-blue-700"></i>
          </span>
          <span class="text-xs uppercase tracking-wider text-stone-600 bg-white/80 px-4 py-1.5 rounded-full border border-stone-200/50">
            AI‑powered creation
          </span>
        </div>
        <h1 class="text-3xl md:text-4xl font-light text-stone-800 mb-3 tracking-tight">
          Create an event <span class="font-semibold text-blue-900">with AI</span>
        </h1>
        <!-- original AI description line, restyled with TukiPlan warmth -->
        <p class="text-lg text-stone-600 max-w-2xl leading-relaxed bg-purple-50/80 border-l-4 border-purple-300 pl-5 py-3 pr-4 rounded-r-xl">
          Answer a few questions and our AI will use internal data to build your event page. You can still create without AI.
        </p>
      </div>

      <!-- event form fields (no actual submit, just UI) -->
      <div class="p-8 md:p-12 space-y-8">

        <!-- █████ EVENT TITLE █████ -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-stone-700 pl-1 flex items-center gap-1">
            <span class="text-blue-900 font-semibold">Event title</span>
            <span class="text-stone-400 text-xs">*be specific</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="fas fa-calendar-day text-stone-400 text-sm"></i>
            </div>
            <input type="text" value="Spring Product Launch 2026" placeholder="e.g. Sunset picnic & acoustic jam"
                   class="w-full pl-11 pr-4 py-4 bg-stone-50/80 border border-stone-200 rounded-2xl text-stone-700 placeholder:text-stone-400 text-base focus:outline-none input-ring transition" />
          </div>
          <p class="text-xs text-stone-500 pl-1">📝 title helps generate summary, category & tags</p>
        </div>

        <!-- █████ DATE & TIME (start/end) █████ -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-stone-700 pl-1 flex items-center gap-1">
            <span class="text-blue-900 font-semibold">When does your event start and end?</span>
          </label>
          <!-- three inputs grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="fas fa-calendar text-stone-400 text-sm"></i>
              </div>
              <input type="text" value="05/04/2026" placeholder="Date"
                     class="w-full pl-11 pr-4 py-4 bg-stone-50/80 border border-stone-200 rounded-2xl text-stone-700 text-base focus:outline-none input-ring" />
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="fas fa-clock text-stone-400 text-sm"></i>
              </div>
              <input type="text" value="10:00" placeholder="Start time"
                     class="w-full pl-11 pr-4 py-4 bg-stone-50/80 border border-stone-200 rounded-2xl text-stone-700 text-base focus:outline-none input-ring" />
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="fas fa-clock text-stone-400 text-sm"></i>
              </div>
              <input type="text" value="12:00" placeholder="End time"
                     class="w-full pl-11 pr-4 py-4 bg-stone-50/80 border border-stone-200 rounded-2xl text-stone-700 text-base focus:outline-none input-ring" />
            </div>
          </div>
          <!-- day chips (April 05 / April 06) + multi-day hint -->
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <span class="bg-stone-100 text-stone-700 px-5 py-2 rounded-full text-sm font-medium border border-stone-200 flex items-center gap-1">
              <i class="far fa-calendar-check text-blue-500"></i> April 05
            </span>
            <span class="bg-stone-100 text-stone-700 px-5 py-2 rounded-full text-sm font-medium border border-stone-200 flex items-center gap-1">
              <i class="far fa-calendar-check text-blue-500"></i> April 06
            </span>
            <span class="text-xs text-stone-400 ml-2 flex items-center gap-1"><i class="fas fa-ellipsis-h"></i> multi‑day?</span>
          </div>
        </div>

        <!-- █████ LOCATION type (Vancouver, online, TBA) █████ -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-stone-700 pl-1 flex items-center gap-1">
            <span class="text-blue-900 font-semibold">Where is it located?</span>
          </label>
          <div class="flex flex-wrap gap-3">
            <span class="bg-blue-900 text-white px-6 py-3 rounded-full text-sm font-medium border border-blue-900 shadow-sm flex items-center gap-2">
              <i class="fas fa-location-dot"></i> Vancouver
            </span>
            <span class="bg-white border border-stone-200 text-stone-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-stone-50 flex items-center gap-2">
              <i class="fas fa-globe"></i> Online event
            </span>
            <span class="bg-white border border-stone-200 text-stone-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-stone-50 flex items-center gap-2">
              <i class="fas fa-hourglass-half"></i> To be announced
            </span>
          </div>
        </div>

        <!-- █████ LOCATION DETAILS (neighbourhoods + map credit) █████ -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-stone-700 pl-1 flex items-center gap-1">
            <span class="text-blue-900 font-semibold">Add location details</span>
          </label>
          <div class="flex flex-wrap gap-2">
            <span class="bg-stone-100 px-5 py-2 rounded-full text-sm font-medium border border-stone-200/70">PACIFIC HEIGHTS</span>
            <span class="bg-stone-100 px-5 py-2 rounded-full text-sm font-medium border border-stone-200/70">CHINATOWN</span>
            <span class="bg-stone-100 px-5 py-2 rounded-full text-sm font-medium border border-stone-200/70">UNION SQUARE</span>
            <span class="bg-stone-100 px-5 py-2 rounded-full text-sm font-medium border border-stone-200/70">JAPANTOWN</span>
          </div>
          <div class="text-xs text-stone-400 mt-2 flex items-center gap-2 border-t border-dashed border-stone-200 pt-3">
            <i class="fas fa-map text-blue-400"></i> MAP DATA ©2025 Google <span class="text-blue-600 hover:underline cursor-default">view map</span>
          </div>
        </div>

        <!-- █████ TICKET PRICING (with free checkbox) █████ -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-stone-700 pl-1 flex items-center gap-1">
            <span class="text-blue-900 font-semibold">How much to charge?</span>
          </label>
          <div class="help-note text-sm text-stone-500 mb-2 bg-stone-50 p-3 rounded-xl border border-stone-100">
            <i class="fas fa-ticket-alt text-blue-500 mr-1"></i> One General Admission ticket included. You can add more later.
          </div>
          <div class="flex flex-wrap items-center gap-6">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span class="text-stone-500 font-medium">$</span>
              </div>
              <input type="text" value="0.00" class="w-36 pl-8 pr-4 py-4 bg-stone-50/80 border border-stone-200 rounded-2xl text-stone-700 text-base focus:outline-none input-ring" />
            </div>
            <label class="flex items-center gap-2 text-stone-700 font-medium">
              <input type="checkbox" class="w-5 h-5 accent-blue-900" checked /> My tickets are free
            </label>
          </div>
        </div>

        <!-- █████ CAPACITY █████ -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-stone-700 pl-1 flex items-center gap-1">
            <span class="text-blue-900 font-semibold">Event capacity</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="fas fa-users text-stone-400 text-sm"></i>
            </div>
            <input type="text" placeholder="e.g. 250 (total tickets to sell)" 
                   class="w-full pl-11 pr-4 py-4 bg-stone-50/80 border border-stone-200 rounded-2xl text-stone-700 placeholder:text-stone-400 text-base focus:outline-none input-ring" />
          </div>
          <p class="text-xs text-stone-500 pl-1">🎟️ total number of tickets available</p>
        </div>

        <!-- █████ FOOTER ACTIONS (Exit / Create event) with TukiPlan button styles █████ -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-stone-100">
          <p class="text-xs text-stone-400 flex items-center gap-2">
            <i class="fas fa-shield-alt"></i> AI-assisted · all fields can be refined later
          </p>
          <div class="flex items-center gap-3">
            <button class="bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-medium px-8 py-4 rounded-full transition text-base shadow-sm flex items-center gap-2">
              <i class="fas fa-arrow-left text-xs"></i> Exit
            </button>
            <button class="bg-blue-900 hover:bg-blue-800 text-white font-medium px-10 py-4 rounded-full transition text-base shadow-sm flex items-center gap-3 group">
              <span>Create event</span>
              <i class="fas fa-sparkles text-xs group-hover:rotate-12 transition"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- tiny footer note inside main (optional) -->
    <div class="mt-8 text-center text-xs text-stone-400">
      ⚡ internal data + AI = event page · you're in control
    </div>
  </main>

  <!-- ========== FOOTER (TukiPlan style) ========== -->
  <footer class="bg-white border-t border-stone-200/50 mt-8 py-10 text-stone-500 text-sm">
    <div class="container mx-auto px-5 max-w-6xl">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-3 text-base">
          <span class="font-medium text-stone-800">TukiPlan</span>
          <span class="text-stone-300">|</span>
          <span class="text-stone-500 text-sm">plan weekends, together</span>
        </div>
        <div class="flex space-x-8 text-sm">
          <a href="#" class="text-stone-500 hover:text-blue-800 transition">Events</a>
          <a href="#" class="text-stone-500 hover:text-blue-800 transition">Meetups</a>
          <a href="#" class="text-stone-500 hover:text-blue-800 transition">About</a>
          <a href="#" class="text-stone-500 hover:text-blue-800 transition">Contact</a>
        </div>
        <div class="flex items-center space-x-5 text-stone-400">
          <a href="#" class="hover:text-stone-700 transition text-lg"><i class="fab fa-twitter"></i></a>
          <a href="#" class="hover:text-stone-700 transition text-lg"><i class="fab fa-instagram"></i></a>
          <a href="#" class="hover:text-stone-700 transition text-lg"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="text-center md:text-left text-xs text-stone-400 mt-8 border-t border-stone-100 pt-8">
        <p>© 2026 TukiPlan. AI event builder — just tuki, then relax.</p>
      </div>
    </div>
  </footer>

  <!-- simple flatpickr initialisation (for the date field if needed, but we keep plain) -->
  <script>
    // mobile menu placeholder (non‑functional, just vibe)
    document.getElementById('mobile-menu-btn')?.addEventListener('click', function() {
      alert('📱 mobile menu would open — TukiPlan style');
    });
    // you could initialise flatpickr on date field, but we keep it simple
  </script>
</body>
</html>







auth
app.get("/login", (req, res) => {
    res.render("login", {
        title: "Login - WeekendVibe",
    })
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    connection.query("SELECT * FROM users WHERE email = ?", [email], async (querryErr, results) => {
        if (querryErr) {
            console.error("DB Query error", querryErr);
            res.status(500).json({ message: "Internal Server Error" })
        }
        if (results.length === 0) {
            // No user found with that email
            return res.status(401).send("Invalid email or password")
        }
        const user = results[0];

        //compare password with hashed
        bcrypt.compare(password, user.hashedPassword, (bcryptError, isMatch) => {
            if (bcryptError) {
                console.error("Error comparing passwords", bcryptError);
                return res.status(500).send("Internal Server Error")
            }
            if (isMatch) {
                // Passwords match, login successful
                console.log("Login successful for user:", user.email);


                //create session
                req.session.user = results[0]

                //redirect to original url or homepage
                const redirectTo = req.session.returnTo || "/";
                delete req.session.returnTo; // clear it after redirecting
                res.redirect(redirectTo);

            } else {
                // Passwords do not match
                console.log("Login failed for user:", user.email);
                res.status(401).send("Invalid email or password")
            }
        })
    })
})

app.get("/register", (req, res) => {
    res.render("signup", {
        title: "Register - WeekendVibe",
    })
})
app.post("/register", async (req, res) => {
    // Handle user registration logic here
    try {
        const { fullname, email, password } = req.body;

        //hashing password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        //insert user into database
        const insertStatement = `INSERT INTO users(fullname,email, hashedPassword) VALUES (?, ?, ?)`;
        connection.query(insertStatement, [fullname, email, hashedPassword], (querryErr, results) => {
            if (querryErr) {
                console.error("DB Insert error", querryErr);
                res.status(500).json({ message: "Internal Server Error" })
            }
            if (results) {
                // res.status(201).json({message: "User registered successfully"})
                console.log("User registered successfully");

                res.redirect("/login")
            }
        })
    } catch (error) {
        console.error("Registration error", error);
        res.status(500).json({ message: "Internal Server Error" })

    }
})
