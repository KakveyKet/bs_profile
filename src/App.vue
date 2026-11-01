<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";

import SiteIcon from "./components/SiteIcon.vue";

import {
  contact,
  services,
  businessNeeds,
  industries,
  projects,
  projectFilters,
  processSteps,
  faqs,
} from "./data/content.js";

// ==========================================
// BRAND
// ==========================================
const brandName = "KakveyDev";
const year = new Date().getFullYear();

// ==========================================
// SERVICE PROMOTIONAL IMAGES
// ==========================================
const serviceImages = {
  website:
    "https://res.cloudinary.com/e0brilgp/image/upload/v1793260576/photo_2026-10-29_14-55-59.jpg",

  school:
    "https://res.cloudinary.com/e0brilgp/image/upload/v1793260576/photo_2026-10-29_14-56-02.jpg",

  pos: "https://res.cloudinary.com/e0brilgp/image/upload/v1793260576/photo_2026-10-29_14-55-56.jpg",
};

// ==========================================
// NAVIGATION
// ==========================================
const nav = [
  {
    title: "សេវាកម្ម",
    href: "#services",
  },
  {
    title: "គម្រោងការងារ",
    href: "#work",
  },
  {
    title: "តម្លៃ",
    href: "#pricing",
  },
  {
    title: "របៀបធ្វើការ",
    href: "#process",
  },
  {
    title: "អំពីខ្ញុំ",
    href: "#about",
  },
  {
    title: "ទំនាក់ទំនង",
    href: "#contact",
  },
];

const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

function closeMenu() {
  mobileMenuOpen.value = false;
}

function goto(id) {
  closeMenu();

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  document.getElementById(id)?.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

function showService(id) {
  goto(`service-${id}`);
}

function handleScroll() {
  isScrolled.value = window.scrollY > 160;
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    closeMenu();
  }
}

// ==========================================
// PROJECT FILTER
// ==========================================
const activeProjectFilter = ref("all");

const selectedProjects = computed(() => {
  if (activeProjectFilter.value === "all") {
    return projects;
  }

  return projects.filter(
    (project) => project.category === activeProjectFilter.value,
  );
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
let revealObserver = null;

const vReveal = {
  mounted(el) {
    if (typeof window === "undefined") return;

    if (!("IntersectionObserver" in window)) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");

              revealObserver?.unobserve(entry.target);
            }
          }
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -36px 0px",
        },
      );
    }

    el.classList.add("reveal-item");
    revealObserver.observe(el);
  },

  unmounted(el) {
    revealObserver?.unobserve(el);
  },
};

// ==========================================
// LIFECYCLE
// ==========================================
onMounted(() => {
  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeydown);

  revealObserver?.disconnect();
  revealObserver = null;
});

// ==========================================
// CONTACT FORM
// ==========================================
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || "";

const lead = reactive({
  name: "",
  contactInfo: "",
  email: "",
  service: "",
  message: "",
  botcheck: "",
});

const sending = ref(false);

const feedback = ref({
  type: "",
  message: "",
});

function selectService(id) {
  const service = services.find((item) => item.id === id);

  if (service) {
    lead.service = service.name;
  }

  goto("contact");
}

async function submitInquiry() {
  if (sending.value) return;

  feedback.value = {
    type: "",
    message: "",
  };

  if (!accessKey) {
    feedback.value = {
      type: "error",
      message:
        "ទម្រង់ទំនាក់ទំនងមិនទាន់ត្រូវបានកំណត់ទេ។ សូមផ្ញើសារតាម Telegram។",
    };

    return;
  }

  sending.value = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        access_key: accessKey,
        subject: `KakveyDev Inquiry — ${lead.service || "General"}`,
        from_name: "KakveyDev Business Portfolio",
        name: lead.name.trim(),
        phone_or_telegram: lead.contactInfo.trim(),
        email: lead.email.trim(),
        service: lead.service,
        message: lead.message.trim(),
        botcheck: lead.botcheck,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || data?.success !== true) {
      throw new Error(data?.message || "Submission failed");
    }

    Object.assign(lead, {
      name: "",
      contactInfo: "",
      email: "",
      service: "",
      message: "",
      botcheck: "",
    });

    feedback.value = {
      type: "success",
      message: "សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។ សូមអរគុណ!",
    };
  } catch (error) {
    console.error("Inquiry failed:", error);

    feedback.value = {
      type: "error",
      message: "មិនអាចផ្ញើសារបានទេ។ សូមទាក់ទងតាម Telegram ឬទូរស័ព្ទ។",
    };
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <div class="site-shell min-h-screen overflow-x-hidden text-slate-900">
    <a href="#content" class="skip-link"> រំលងទៅមាតិកា </a>

    <!-- ======================================
         HEADER
    ====================================== -->
    <header
      class="site-header sticky top-0 z-50 border-b transition-all duration-300"
      :class="
        isScrolled
          ? 'border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-xl'
          : 'border-slate-100/70 bg-white/90 backdrop-blur-xl'
      "
    >
      <div
        class="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between gap-4 px-5 sm:px-8 xl:px-12"
      >
        <!-- TEXT LOGO -->
        <a
          href="#home"
          class="flex shrink-0 items-center"
          :aria-label="`${brandName} Homepage`"
          @click="closeMenu"
        >
          <span
            class="text-2xl font-extrabold tracking-tight text-[#123663] transition-colors duration-300 sm:text-[1.8rem]"
          >
            Kakvey<span class="text-blue-600">Dev</span>
          </span>
        </a>

        <!-- DESKTOP NAVIGATION -->
        <nav
          aria-label="Main navigation"
          class="hidden items-center gap-8 xl:flex"
        >
          <a
            v-for="link in nav"
            :key="link.href"
            :href="link.href"
            class="nav-link text-sm font-bold text-slate-600"
          >
            {{ link.title }}
          </a>
        </nav>

        <!-- HEADER ACTION -->
        <div class="flex items-center gap-3">
          <a
            :href="contact.telegram"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary hidden items-center gap-2.5 px-5 py-3.5 text-sm sm:inline-flex"
          >
            <SiteIcon name="send" :size="18" />

            ទាក់ទងតាម Telegram

            <SiteIcon name="upRight" :size="15" />
          </a>

          <button
            type="button"
            class="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-[#123663] xl:hidden"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-navigation"
            :aria-label="mobileMenuOpen ? 'បិទម៉ឺនុយ' : 'បើកម៉ឺនុយ'"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <SiteIcon :name="mobileMenuOpen ? 'x' : 'menu'" :size="23" />
          </button>
        </div>
      </div>

      <!-- MOBILE NAVIGATION -->
      <nav
        v-if="mobileMenuOpen"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        class="border-t border-slate-100 bg-white px-5 pb-5 pt-3 xl:hidden"
      >
        <div class="mx-auto max-w-[1500px] space-y-1">
          <a
            v-for="link in nav"
            :key="link.href"
            :href="link.href"
            class="block rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 hover:bg-blue-50"
            @click="closeMenu"
          >
            {{ link.title }}
          </a>

          <a
            :href="contact.telegram"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary mt-3 flex justify-center gap-2 px-5 py-4 text-sm"
            @click="closeMenu"
          >
            <SiteIcon name="send" :size="18" />
            Telegram
          </a>
        </div>
      </nav>
    </header>

    <main id="content">
      <!-- ======================================
           HERO SECTION
      ====================================== -->
      <section
        id="home"
        class="hero-surface relative isolate scroll-mt-24 overflow-hidden text-white"
      >
        <!-- ANIMATED BACKGROUND -->
        <div
          class="hero-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        ></div>

        <div class="hero-aurora aurora-one" aria-hidden="true"></div>

        <div class="hero-aurora aurora-two" aria-hidden="true"></div>

        <div class="hero-orbit orbit-one" aria-hidden="true"></div>

        <div class="hero-orbit orbit-two" aria-hidden="true"></div>

        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b1d36] to-transparent"
          aria-hidden="true"
        ></div>

        <div
          class="relative mx-auto grid max-w-[1500px] items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:min-h-[710px] lg:grid-cols-[1.03fr_.97fr] lg:py-28 xl:px-12"
        >
          <!-- HERO TEXT -->
          <div class="hero-enter relative z-10">
            <span
              class="inline-flex max-w-full items-center gap-2.5 rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2.5 text-[11px] font-bold tracking-widest text-sky-200 sm:text-xs"
            >
              <SiteIcon name="sparkles" :size="15" />

              DIGITAL SOLUTIONS FOR CAMBODIAN BUSINESSES
            </span>

            <h1
              class="business-title mt-7 max-w-3xl text-[2.4rem] font-extrabold sm:text-5xl lg:text-[3.4rem] xl:text-[4rem]"
            >
              បង្កើតវេបសាយ និងប្រព័ន្ធដែល

              <span class="text-gradient"> ជួយអាជីវកម្មរបស់អ្នក </span>
            </h1>

            <p
              class="business-text mt-6 max-w-[650px] text-base text-slate-300 sm:text-lg lg:text-[1.18rem]"
            >
              ធ្វើឱ្យអតិថិជនស្វែងរកអាជីវកម្មបានងាយ គ្រប់គ្រងការលក់ ស្តុក
              និងព័ត៌មានសាលារៀនប្រកបដោយប្រសិទ្ធភាព តាមតម្រូវការជាក់ស្តែង។
            </p>

            <!-- BUTTONS -->
            <div class="mt-9 flex flex-col flex-wrap gap-3 sm:flex-row">
              <a
                :href="contact.telegram"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary inline-flex min-h-14 items-center justify-center gap-3 px-7 py-4 text-sm sm:text-base"
              >
                <SiteIcon name="send" :size="19" />

                ពិគ្រោះគម្រោងតាម Telegram

                <SiteIcon name="arrow" :size="18" />
              </a>

              <a
                href="#work"
                class="btn-glass inline-flex min-h-14 items-center justify-center gap-3 px-7 py-4 text-sm sm:text-base"
              >
                មើលគម្រោងដែលបានធ្វើ

                <SiteIcon name="upRight" :size="18" />
              </a>
            </div>

            <!-- BENEFITS -->
            <div
              class="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-200"
            >
              <span class="flex items-center gap-2">
                <SiteIcon name="check" :size="17" class="text-sky-300" />

                ពិភាក្សាជាភាសាខ្មែរ
              </span>

              <span class="flex items-center gap-2">
                <SiteIcon name="check" :size="17" class="text-sky-300" />

                តម្លៃចាប់ផ្តើមច្បាស់លាស់
              </span>

              <span class="flex items-center gap-2">
                <SiteIcon name="check" :size="17" class="text-sky-300" />

                ដំណោះស្រាយតាមតម្រូវការ
              </span>
            </div>
          </div>

          <!-- HERO DASHBOARD -->
          <div
            class="hero-visual relative z-10 mx-auto w-full max-w-[610px] lg:max-w-none"
            aria-label="Business service overview"
          >
            <div
              class="preview-window relative rounded-[1.6rem] border border-white/20 bg-white/[.09] p-2.5 shadow-[0_30px_95px_rgba(0,0,0,.32)] backdrop-blur-lg sm:p-4"
            >
              <div
                class="overflow-hidden rounded-[1.2rem] bg-[#f8fbff] text-slate-900"
              >
                <!-- DASHBOARD HEADER -->
                <div
                  class="flex h-12 items-center justify-between border-b border-slate-100 bg-white px-5"
                >
                  <div class="flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-[#fb8080]"></span>

                    <span class="h-2.5 w-2.5 rounded-full bg-[#ffd477]"></span>

                    <span class="h-2.5 w-2.5 rounded-full bg-[#71d6ad]"></span>
                  </div>

                  <span
                    class="flex items-center gap-2 text-[11px] font-bold tracking-wide text-slate-500"
                  >
                    <SiteIcon name="shield" :size="13" />
                    BUSINESS WORKSPACE
                  </span>
                </div>

                <!-- DASHBOARD CONTENT -->
                <div class="p-5 sm:p-7">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p
                        class="text-[10px] font-extrabold tracking-[.16em] text-blue-600"
                      >
                        YOUR BUSINESS, SIMPLIFIED
                      </p>

                      <h2
                        class="business-title mt-1.5 text-xl font-extrabold sm:text-2xl"
                      >
                        ជ្រើសរើសដំណោះស្រាយ
                      </h2>
                    </div>

                    <div
                      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700"
                    >
                      <SiteIcon name="layers" :size="21" />
                    </div>
                  </div>

                  <!-- SERVICE SHORTCUTS -->
                  <div class="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                    <button
                      v-for="service in services"
                      :key="service.id"
                      type="button"
                      class="service-mini group flex min-h-[145px] flex-col items-start rounded-2xl border border-slate-200/90 bg-white p-4 text-left transition sm:p-5"
                      @click="showService(service.id)"
                    >
                      <span class="icon-tile mb-3">
                        <SiteIcon :name="service.iconKey" :size="23" />
                      </span>

                      <span
                        class="business-title text-sm font-extrabold text-slate-800 group-hover:text-blue-700 sm:text-base"
                      >
                        {{ service.name }}
                      </span>

                      <span
                        class="mt-auto pt-2 text-sm font-extrabold text-blue-700"
                      >
                        {{ service.price }}
                      </span>
                    </button>
                  </div>

                  <div
                    class="mt-4 flex items-center gap-3 rounded-xl bg-[#eaf3ff] px-4 py-3.5 text-sm font-semibold leading-7 text-[#28537e]"
                  >
                    <SiteIcon name="message" :size="21" class="shrink-0" />

                    <span>
                      មិនប្រាកដថាត្រូវការអ្វី? អាចពិគ្រោះគម្រោងជាមុនបាន។
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- FLOATING CHIPS -->
            <div
              class="float-chip chip-one pointer-events-none absolute -right-2 -top-6 hidden items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-4 py-3 text-sm font-bold text-[#123663] shadow-2xl sm:flex"
            >
              <SiteIcon name="shield" :size="18" class="text-teal-600" />

              Website Care
            </div>

            <div
              class="float-chip chip-two pointer-events-none absolute -bottom-6 -left-4 hidden items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-4 py-3 text-sm font-bold text-[#123663] shadow-2xl sm:flex"
            >
              <SiteIcon name="zap" :size="18" class="text-amber-500" />

              Smart Business Solutions
            </div>
          </div>
        </div>
      </section>

      <!-- ======================================
           BUSINESS NEEDS
      ====================================== -->
      <section
        class="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24 xl:px-12"
        aria-labelledby="needs-heading"
      >
        <div v-reveal class="mx-auto max-w-3xl text-center">
          <p class="section-kicker">SOLUTIONS THAT MAKE SENSE</p>

          <h2 id="needs-heading" class="section-head mt-3">
            តើអាជីវកម្មរបស់អ្នកកំពុងជួបបញ្ហាអ្វី?
          </h2>

          <p class="business-text mt-4 text-base text-slate-600 sm:text-lg">
            មិនចាំបាច់ដឹងពាក្យបច្ចេកទេសទេ។ ជ្រើសរើសបញ្ហាដែលអ្នកចង់ដោះស្រាយ។
          </p>
        </div>

        <div class="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <button
            v-for="need in businessNeeds"
            :key="need.id"
            v-reveal
            type="button"
            class="modern-card group flex min-h-[272px] flex-col p-7 text-left sm:p-8"
            @click="showService(need.id)"
          >
            <span class="icon-tile icon-tile-lg">
              <SiteIcon :name="need.iconKey" :size="27" />
            </span>

            <h3
              class="business-title mt-6 text-lg font-extrabold text-[#132742]"
            >
              {{ need.problem }}
            </h3>

            <p class="business-text mt-3 text-sm text-slate-600">
              {{ need.solution }}
            </p>

            <span
              class="mt-auto flex items-center gap-2 pt-6 text-sm font-extrabold text-blue-600"
            >
              មើលដំណោះស្រាយ

              <SiteIcon
                name="arrow"
                :size="17"
                class="transition-transform group-hover:translate-x-1"
              />
            </span>
          </button>
        </div>
      </section>

      <!-- ======================================
           LARGE SERVICES SECTION
      ====================================== -->
      <section
        id="services"
        class="section-soft relative scroll-mt-24 border-y border-slate-200/80 bg-[#f6f9ff] py-20 sm:py-28"
        aria-labelledby="services-heading"
      >
        <div class="mx-auto max-w-[1500px] px-5 sm:px-8 xl:px-12">
          <!-- SECTION HEADING -->
          <div v-reveal class="mx-auto mb-14 max-w-4xl text-center">
            <p class="section-kicker">OUR BUSINESS SOLUTIONS</p>

            <h2 id="services-heading" class="section-head mt-4">
              សេវាកម្មសម្រាប់អាជីវកម្មរបស់អ្នក
            </h2>

            <p
              class="business-text mx-auto mt-5 max-w-3xl text-base leading-[2] text-slate-600 sm:text-lg"
            >
              បង្កើតវេបសាយ និងប្រព័ន្ធគ្រប់គ្រង ដែលជួយសម្រួលការងារប្រចាំថ្ងៃ
              ឱ្យកាន់តែងាយស្រួល និងមានប្រសិទ្ធភាព។
            </p>
          </div>

          <!-- LARGE SERVICE CARDS -->
          <div class="space-y-10 lg:space-y-14">
            <article
              v-for="service in services"
              :id="`service-${service.id}`"
              :key="service.id"
              v-reveal
              class="group scroll-mt-28 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_12px_55px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_25px_85px_rgba(15,23,42,0.10)] sm:rounded-[2.5rem]"
            >
              <div class="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
                <!-- LARGE IMAGE -->
                <div
                  class="relative flex min-h-[380px] items-center justify-center overflow-hidden border-b border-slate-200 bg-gradient-to-br from-blue-50 via-[#f8fbff] to-indigo-50 p-4 sm:min-h-[540px] sm:p-6 lg:min-h-[650px] lg:border-b-0 lg:border-r lg:p-8 xl:min-h-[700px]"
                >
                  <template v-if="serviceImages[service.id] || service.image">
                    <img
                      :src="serviceImages[service.id] || service.image"
                      :alt="`${service.name} - KakveyDev`"
                      loading="lazy"
                      decoding="async"
                      class="relative z-10 max-h-[480px] w-full rounded-2xl object-contain shadow-[0_14px_40px_rgba(15,23,42,0.12)] transition-transform duration-500 group-hover:scale-[1.025] sm:max-h-[600px] lg:max-h-[660px]"
                    />

                    <!-- IMAGE CATEGORY -->
                    <span
                      class="absolute left-6 top-6 z-20 rounded-full border border-white/80 bg-white/95 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur sm:left-8 sm:top-8"
                    >
                      {{ service.english }}
                    </span>
                  </template>

                  <!-- HOSTING VISUAL -->
                  <div
                    v-else
                    class="relative flex w-full max-w-md flex-col items-center rounded-[2rem] border border-white bg-white/85 px-8 py-16 text-center shadow-xl backdrop-blur"
                  >
                    <div
                      class="grid h-28 w-28 place-items-center rounded-[2rem] bg-teal-50 text-teal-700"
                    >
                      <SiteIcon name="shield" :size="55" />
                    </div>

                    <h3 class="mt-9 text-3xl font-extrabold text-[#123663]">
                      Website Care
                    </h3>

                    <p
                      class="mt-4 text-base font-semibold leading-8 text-slate-600"
                    >
                      Hosting · Domain · Security
                    </p>

                    <div class="mt-8 flex flex-wrap justify-center gap-3">
                      <span
                        v-for="label in ['SSL', 'Backup', 'Maintenance']"
                        :key="label"
                        class="rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700"
                      >
                        {{ label }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- SERVICE DETAILS -->
                <div class="flex flex-col p-7 sm:p-10 lg:p-12 xl:p-14">
                  <!-- TOP -->
                  <div
                    class="flex flex-wrap items-center justify-between gap-5"
                  >
                    <span
                      class="grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue-700"
                    >
                      <SiteIcon :name="service.iconKey" :size="31" />
                    </span>

                    <span
                      class="rounded-full border border-blue-100 bg-blue-50 px-5 py-3 text-base font-extrabold text-blue-700"
                    >
                      {{ service.price }}
                    </span>
                  </div>

                  <!-- TITLE -->
                  <div class="mt-8">
                    <p
                      class="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600"
                    >
                      {{ service.english }}
                    </p>

                    <h3
                      class="business-title mt-4 text-2xl font-extrabold leading-[1.7] text-[#123663] sm:text-3xl xl:text-[2rem]"
                    >
                      {{ service.name }}
                    </h3>

                    <p
                      class="business-text mt-5 text-base leading-[2] text-slate-600 sm:text-lg"
                    >
                      {{ service.summary }}
                    </p>
                  </div>

                  <!-- FEATURES -->
                  <div class="mt-9">
                    <h4 class="text-base font-extrabold text-slate-900">
                      អ្វីដែលអ្នកទទួលបាន
                    </h4>

                    <ul class="mt-6 space-y-5">
                      <li
                        v-for="detail in service.details"
                        :key="detail"
                        class="flex items-start gap-4"
                      >
                        <span
                          class="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"
                        >
                          <SiteIcon name="check" :size="18" />
                        </span>

                        <span
                          class="business-text text-base leading-[1.9] text-slate-700"
                        >
                          {{ detail }}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <!-- CTA -->
                  <div class="mt-auto pt-12">
                    <div class="border-t border-slate-200 pt-7">
                      <p
                        class="business-text mb-6 text-sm leading-8 text-slate-500"
                      >
                        {{ service.priceNote }}
                        · តម្លៃចុងក្រោយអាស្រ័យលើ តម្រូវការជាក់ស្តែង។
                      </p>

                      <button
                        type="button"
                        class="flex min-h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#123663] px-6 py-5 text-base font-extrabold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/20"
                        @click="selectService(service.id)"
                      >
                        សាកសួរអំពីសេវាកម្មនេះ

                        <SiteIcon name="arrow" :size="21" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ======================================
           BUSINESS TYPES
      ====================================== -->
      <section
        id="industries"
        class="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 xl:px-12"
      >
        <div v-reveal class="max-w-3xl">
          <p class="section-kicker">MADE FOR YOUR BUSINESS</p>

          <h2 class="section-head mt-3">អ្នកមានអាជីវកម្មប្រភេទណា?</h2>

          <p class="business-text mt-3 text-lg text-slate-600">
            ចុចជ្រើសរើសអាជីវកម្ម ដើម្បីមើលសេវាកម្មដែលសមស្រប។
          </p>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <button
            v-for="item in industries"
            :key="item.name"
            v-reveal
            type="button"
            class="modern-card group p-7 text-left"
            @click="showService(item.type)"
          >
            <span class="icon-tile icon-tile-lg">
              <SiteIcon :name="item.iconKey" :size="28" />
            </span>

            <h3 class="business-title mt-6 text-lg font-extrabold">
              {{ item.name }}
            </h3>

            <p class="business-text mt-3 text-sm text-slate-600">
              {{ item.detail }}
            </p>

            <span
              class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              មើលសេវាកម្ម

              <SiteIcon name="upRight" :size="17" />
            </span>
          </button>
        </div>
      </section>

      <!-- ======================================
           PROJECTS
      ====================================== -->
      <section
        id="work"
        class="section-soft scroll-mt-24 border-y border-slate-200/80 py-20 sm:py-24"
        aria-labelledby="work-heading"
      >
        <div class="mx-auto max-w-[1500px] px-5 sm:px-8 xl:px-12">
          <div
            v-reveal
            class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div class="max-w-3xl">
              <p class="section-kicker">SELECTED PROJECTS</p>

              <h2 id="work-heading" class="section-head mt-3">
                គម្រោងការងារដែលបានអភិវឌ្ឍ
              </h2>

              <p class="business-text mt-4 text-lg text-slate-600">
                មើលឧទាហរណ៍ការងារ និងដំណោះស្រាយសម្រាប់អាជីវកម្ម។
                គម្រោងមួយចំនួនមិនមាន Public Demo ទេ។
              </p>
            </div>

            <a
              :href="contact.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex shrink-0 items-center gap-2 font-bold text-blue-700 hover:underline"
            >
              GitHub Portfolio

              <SiteIcon name="upRight" :size="18" />
            </a>
          </div>

          <!-- FILTER -->
          <div
            class="mt-9 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter projects"
          >
            <button
              v-for="filter in projectFilters"
              :key="filter.id"
              type="button"
              :aria-pressed="activeProjectFilter === filter.id"
              class="filter-pill"
              :class="
                activeProjectFilter === filter.id
                  ? 'filter-active'
                  : 'filter-inactive'
              "
              @click="activeProjectFilter = filter.id"
            >
              {{ filter.label }}
            </button>
          </div>

          <!-- PROJECT GRID -->
          <TransitionGroup
            name="filter"
            tag="div"
            class="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            <article
              v-for="project in selectedProjects"
              :key="project.title"
              class="modern-card project-card group flex flex-col overflow-hidden !p-0"
            >
              <div class="relative h-[230px] overflow-hidden bg-slate-100">
                <img
                  :src="project.image"
                  :alt="`${project.title} project preview`"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.045]"
                />

                <div
                  class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/35 to-transparent"
                  aria-hidden="true"
                ></div>

                <span
                  class="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur"
                >
                  {{ project.label }}
                </span>
              </div>

              <div class="flex flex-1 flex-col p-7">
                <h3 class="text-xl font-extrabold text-[#123663]">
                  {{ project.title }}
                </h3>

                <p class="business-text mt-3 flex-1 text-sm text-slate-600">
                  {{ project.description }}
                </p>

                <a
                  v-if="project.url"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:underline"
                >
                  មើលគម្រោង

                  <SiteIcon name="upRight" :size="17" />
                </a>

                <span
                  v-else
                  class="mt-6 inline-flex items-center gap-2 text-xs font-bold text-slate-500"
                >
                  <SiteIcon name="message" :size="16" />

                  សាកសួរព័ត៌មានបន្ថែមបាន
                </span>
              </div>
            </article>
          </TransitionGroup>
        </div>
      </section>

      <!-- ======================================
           PRICING
      ====================================== -->
      <section
        id="pricing"
        class="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 xl:px-12"
        aria-labelledby="pricing-heading"
      >
        <div v-reveal class="mx-auto max-w-3xl text-center">
          <p class="section-kicker">CLEAR STARTING PRICES</p>

          <h2 id="pricing-heading" class="section-head mt-3">
            តម្លៃចាប់ផ្តើមសម្រាប់គម្រោង
          </h2>

          <p class="business-text mt-4 text-lg text-slate-600">
            តម្លៃពិតប្រាកដនឹងកំណត់តាមមុខងារ និងទំហំការងារ។
          </p>
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <!-- WEBSITE -->
          <div v-reveal class="modern-card flex flex-col p-8 sm:p-9">
            <span class="icon-tile icon-tile-lg">
              <SiteIcon name="globe" :size="27" />
            </span>

            <h3 class="mt-7 text-xl font-extrabold">Website & Blog</h3>

            <div
              class="mt-5 text-5xl font-extrabold tracking-tight text-[#123663]"
            >
              $250
              <span class="ml-1 text-lg text-slate-400"> + </span>
            </div>

            <p class="business-text mt-5 flex-1 text-base text-slate-600">
              វេបសាយបង្ហាញព័ត៌មានអាជីវកម្ម ផលិតផល និងសេវាកម្ម។
            </p>

            <button
              type="button"
              class="btn-outline mt-8 flex items-center justify-center gap-2 px-6 py-4"
              @click="selectService('website')"
            >
              ពិគ្រោះគម្រោង

              <SiteIcon name="arrow" :size="18" />
            </button>
          </div>

          <!-- MANAGEMENT SYSTEMS -->
          <div
            v-reveal
            class="pricing-featured relative flex flex-col overflow-hidden rounded-[1.9rem] border border-blue-600/60 p-8 text-white shadow-[0_25px_65px_rgba(24,72,135,.2)] sm:p-9"
          >
            <div
              class="absolute -right-20 -top-16 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl"
              aria-hidden="true"
            ></div>

            <span
              class="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/10"
            >
              <SiteIcon name="layers" :size="27" />
            </span>

            <h3 class="relative mt-7 text-xl font-extrabold">
              Management Systems
            </h3>

            <div class="relative mt-5 text-5xl font-extrabold tracking-tight">
              $350
              <span class="ml-1 text-lg text-sky-200"> + </span>
            </div>

            <p
              class="business-text relative mt-5 flex-1 text-base text-slate-200"
            >
              ប្រព័ន្ធគ្រប់គ្រងការលក់ ស្តុក សាលារៀន និងការងារផ្សេងៗ។
            </p>

            <button
              type="button"
              class="relative mt-8 flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-4 font-extrabold transition hover:bg-blue-400"
              @click="selectService('pos')"
            >
              ពិគ្រោះគម្រោង

              <SiteIcon name="arrow" :size="18" />
            </button>
          </div>

          <!-- MAINTENANCE -->
          <div v-reveal class="modern-card flex flex-col p-8 sm:p-9">
            <span class="icon-tile icon-tile-lg">
              <SiteIcon name="shield" :size="27" />
            </span>

            <h3 class="mt-7 text-xl font-extrabold">Hosting & Maintenance</h3>

            <div
              class="business-title mt-5 text-2xl font-extrabold text-[#123663]"
            >
              សាកសួរតម្លៃ
            </div>

            <p class="business-text mt-5 flex-1 text-base text-slate-600">
              Domain, Hosting, SSL, Backup និងការថែទាំវេបសាយ។
            </p>

            <button
              type="button"
              class="btn-outline mt-8 flex items-center justify-center gap-2 px-6 py-4"
              @click="selectService('care')"
            >
              ពិគ្រោះគម្រោង

              <SiteIcon name="arrow" :size="18" />
            </button>
          </div>
        </div>

        <p class="business-text mt-7 text-sm text-slate-500">
          * តម្លៃទាំងនេះជាតម្លៃចាប់ផ្តើម។ Domain, Hosting និងសេវាកម្មភាគីទីបី
          អាចគិតថ្លៃដោយឡែក។
        </p>
      </section>

      <!-- ======================================
           PROCESS
      ====================================== -->
      <section
        id="process"
        class="section-soft scroll-mt-24 border-y border-slate-200/80 py-20 sm:py-24"
      >
        <div class="mx-auto max-w-[1500px] px-5 sm:px-8 xl:px-12">
          <div v-reveal class="max-w-3xl">
            <p class="section-kicker">SIMPLE PROCESS</p>

            <h2 class="section-head mt-3">របៀបធ្វើការជាមួយគ្នា</h2>

            <p class="business-text mt-4 text-lg text-slate-600">
              ដំណើរការច្បាស់លាស់ពីការពិភាក្សាដំបូង រហូតដល់ការដាក់ឱ្យប្រើប្រាស់។
            </p>
          </div>

          <div class="mt-11 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="step in processSteps"
              :key="step.n"
              v-reveal
              class="modern-card relative p-7"
            >
              <div class="flex items-center justify-between">
                <span class="text-3xl font-black tracking-tight text-blue-500">
                  {{ step.n }}
                </span>

                <span class="icon-tile">
                  <SiteIcon :name="step.iconKey" :size="23" />
                </span>
              </div>

              <h3 class="business-title mt-6 text-lg font-extrabold">
                {{ step.title }}
              </h3>

              <p class="business-text mt-3 text-sm text-slate-600">
                {{ step.detail }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- ======================================
           ABOUT
      ====================================== -->
      <section
        id="about"
        class="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 xl:px-12"
        aria-labelledby="about-heading"
      >
        <div
          v-reveal
          class="modern-card grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[260px_1fr] lg:gap-14 lg:p-12"
        >
          <!-- PROFILE -->
          <div class="relative mx-auto w-full max-w-[260px]">
            <div
              class="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-blue-100 to-teal-100 blur-lg"
              aria-hidden="true"
            ></div>

            <img
              src="https://res.cloudinary.com/e0brilgp/image/upload/v1793261383/fp_41_of_194.jpg"
              alt="Portrait of the developer"
              loading="lazy"
              decoding="async"
              class="relative aspect-[4/5] w-full rounded-[1.7rem] object-cover shadow-lg"
            />
          </div>

          <!-- ABOUT INFO -->
          <div>
            <p class="section-kicker">ABOUT THE PERSON BEHIND THE WORK</p>

            <h2 id="about-heading" class="section-head mt-3">
              សួស្តី! ខ្ញុំជាអ្នកបង្កើតវេបសាយ និងប្រព័ន្ធគ្រប់គ្រង
            </h2>

            <p class="business-text mt-5 text-base text-slate-600 sm:text-lg">
              ខ្ញុំផ្តោតលើការបង្កើតប្រព័ន្ធដែលងាយប្រើ
              និងអាចជួយដោះស្រាយបញ្ហាជាក់ស្តែងរបស់អាជីវកម្ម។
              ខ្ញុំធ្លាប់ធ្វើការលើវេបសាយក្រុមហ៊ុន ប្រព័ន្ធសាលារៀន
              និងស្វ័យប្រវត្តិកម្មឯកសារ។
            </p>

            <details
              class="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <summary
                class="flex cursor-pointer items-center justify-between gap-4 font-extrabold text-[#123663]"
              >
                មើលបទពិសោធន៍ និងបច្ចេកវិទ្យា

                <SiteIcon name="chevron" :size="20" />
              </summary>

              <div class="business-text mt-5 space-y-3 text-sm text-slate-600">
                <p>
                  <strong>ការងារ៖</strong>
                  Web Development, Business Management Systems, Automation
                </p>

                <p>
                  <strong>បច្ចេកវិទ្យា៖</strong>
                  Vue, React, Node.js, Django, Laravel, WordPress និង Databases
                </p>

                <p>
                  ស្វែងយល់បន្ថែម៖

                  <a
                    :href="contact.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-bold text-blue-700 underline"
                  >
                    GitHub
                  </a>

                  ·

                  <a
                    :href="contact.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-bold text-blue-700 underline"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </details>

            <a
              :href="contact.telegram"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-dark mt-7 inline-flex items-center gap-3 px-6 py-4 text-sm"
            >
              ពិភាក្សាគម្រោង

              <SiteIcon name="arrow" :size="18" />
            </a>
          </div>
        </div>
      </section>

      <!-- ======================================
           FAQ
      ====================================== -->
      <section
        id="faq"
        class="section-soft scroll-mt-24 border-y border-slate-200/80 py-20 sm:py-24"
      >
        <div class="mx-auto max-w-[940px] px-5 sm:px-8">
          <div v-reveal>
            <p class="section-kicker">FREQUENT QUESTIONS</p>

            <h2 class="section-head mt-3">សំណួរដែលអតិថិជនសួរញឹកញាប់</h2>
          </div>

          <div class="mt-10 space-y-4">
            <details
              v-for="item in faqs"
              :key="item.q"
              v-reveal
              class="faq-row group"
            >
              <summary
                class="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-extrabold leading-8 sm:text-lg"
              >
                {{ item.q }}

                <span
                  class="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700 transition group-open:rotate-180"
                >
                  <SiteIcon name="chevron" :size="19" />
                </span>
              </summary>

              <p
                class="business-text mt-3 max-w-3xl text-sm text-slate-600 sm:text-base"
              >
                {{ item.a }}
              </p>
            </details>
          </div>
        </div>
      </section>

      <!-- ======================================
           CONTACT
      ====================================== -->
      <section
        id="contact"
        class="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 xl:px-12"
        aria-labelledby="contact-heading"
      >
        <div
          v-reveal
          class="grid overflow-hidden rounded-[2.2rem] bg-white shadow-[0_25px_100px_rgba(16,46,87,.10)] ring-1 ring-slate-200 lg:grid-cols-[.94fr_1.06fr]"
        >
          <!-- CONTACT INFORMATION -->
          <div
            class="contact-panel relative overflow-hidden p-8 text-white sm:p-11 lg:p-14"
          >
            <div
              class="contact-pattern pointer-events-none absolute inset-0"
              aria-hidden="true"
            ></div>

            <div class="relative">
              <span
                class="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-sky-200"
              >
                <SiteIcon name="sparkles" :size="17" />

                LET'S BUILD SOMETHING USEFUL
              </span>

              <h2
                id="contact-heading"
                class="business-title mt-6 text-3xl font-extrabold sm:text-4xl"
              >
                ប្រាប់ពីគម្រោង និងតម្រូវការរបស់អ្នក
              </h2>

              <p class="business-text mt-5 text-base text-slate-300 sm:text-lg">
                អ្នកអាចប្រាប់ពីអាជីវកម្ម និងបញ្ហាដែលចង់ដោះស្រាយ។
                ខ្ញុំនឹងពិភាក្សាអំពី ដំណោះស្រាយដែលសមស្រប។
              </p>

              <a
                :href="contact.telegram"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary mt-9 inline-flex w-full items-center justify-center gap-3 px-7 py-4 sm:w-auto"
              >
                <SiteIcon name="send" :size="20" />

                ទាក់ទងតាម Telegram

                <SiteIcon name="upRight" :size="16" />
              </a>

              <div class="mt-11 space-y-4 border-t border-white/15 pt-8">
                <a
                  :href="contact.tel"
                  class="flex items-center gap-3 font-bold hover:text-sky-200"
                >
                  <SiteIcon name="phone" :size="19" />

                  {{ contact.phone }}
                </a>

                <a
                  :href="contact.mailto"
                  class="flex items-center gap-3 break-all text-sm text-slate-300 hover:text-white"
                >
                  <SiteIcon name="mail" :size="19" />

                  {{ contact.email }}
                </a>
              </div>

              <p class="business-text mt-10 text-sm text-sky-100">
                សេវាកម្មសម្រាប់អាជីវកម្មនៅកម្ពុជា · អាចធ្វើការពីចម្ងាយបាន
              </p>
            </div>
          </div>

          <!-- CONTACT FORM -->
          <form
            class="space-y-5 p-7 sm:p-10 lg:p-12"
            @submit.prevent="submitInquiry"
          >
            <div>
              <p class="section-kicker">SEND AN INQUIRY</p>

              <h3
                class="business-title mt-3 text-2xl font-extrabold text-[#123663]"
              >
                ផ្ញើសំណើអំពីគម្រោង
              </h3>

              <p class="business-text mt-2 text-sm text-slate-500">
                បំពេញព័ត៌មានខ្លីៗ ហើយខ្ញុំនឹងទាក់ទងត្រឡប់
                តាមព័ត៌មានដែលអ្នកបានផ្តល់។
              </p>
            </div>

            <!-- HONEYPOT -->
            <div class="absolute -left-[9999px]" aria-hidden="true">
              <label for="botcheck"> Leave empty </label>

              <input
                id="botcheck"
                v-model="lead.botcheck"
                type="text"
                name="botcheck"
                tabindex="-1"
                autocomplete="off"
              />
            </div>

            <!-- NAME AND CONTACT -->
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="field-label" for="lead-name"> ឈ្មោះ * </label>

                <input
                  id="lead-name"
                  v-model="lead.name"
                  class="field"
                  required
                  maxlength="100"
                  autocomplete="name"
                  placeholder="ឈ្មោះរបស់អ្នក"
                />
              </div>

              <div>
                <label class="field-label" for="lead-contact">
                  ទូរស័ព្ទ / Telegram *
                </label>

                <input
                  id="lead-contact"
                  v-model="lead.contactInfo"
                  class="field"
                  required
                  maxlength="100"
                  placeholder="លេខទូរស័ព្ទ ឬ @username"
                />
              </div>
            </div>

            <!-- EMAIL -->
            <div>
              <label class="field-label" for="lead-email">
                Email (បើមាន)
              </label>

              <input
                id="lead-email"
                v-model="lead.email"
                type="email"
                maxlength="254"
                autocomplete="email"
                class="field"
                placeholder="example@gmail.com"
              />
            </div>

            <!-- SERVICE -->
            <div>
              <label class="field-label" for="lead-service">
                សេវាកម្មដែលចាប់អារម្មណ៍
              </label>

              <select id="lead-service" v-model="lead.service" class="field">
                <option value="">មិនទាន់ប្រាកដ</option>

                <option
                  v-for="service in services"
                  :key="service.id"
                  :value="service.name"
                >
                  {{ service.name }}
                </option>

                <option value="ប្រព័ន្ធតាមតម្រូវការ">
                  ប្រព័ន្ធតាមតម្រូវការ
                </option>
              </select>
            </div>

            <!-- MESSAGE -->
            <div>
              <label class="field-label" for="lead-message">
                តើអ្នកត្រូវការអ្វី? *
              </label>

              <textarea
                id="lead-message"
                v-model="lead.message"
                class="field min-h-[145px] resize-y"
                required
                maxlength="3000"
                rows="4"
                placeholder="ឧទាហរណ៍៖ ខ្ញុំមានហាងលក់ទំនិញ និងចង់គ្រប់គ្រងស្តុក..."
              ></textarea>
            </div>

            <!-- FEEDBACK -->
            <p
              v-if="feedback.message"
              role="status"
              aria-live="polite"
              class="business-text rounded-xl p-4 text-sm"
              :class="
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-red-50 text-red-700'
              "
            >
              {{ feedback.message }}
            </p>

            <!-- SUBMIT -->
            <button
              type="submit"
              :disabled="sending"
              class="btn-primary flex w-full items-center justify-center gap-3 px-7 py-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SiteIcon name="send" :size="18" />

              {{ sending ? "កំពុងផ្ញើសារ..." : "ផ្ញើសំណើរបស់អ្នក" }}
            </button>

            <p class="business-text text-xs text-slate-500">
              សារបញ្ជូនតាម Web3Forms។ សូមកុំផ្ញើព័ត៌មានសម្ងាត់តាមទម្រង់នេះ។
            </p>
          </form>
        </div>
      </section>
    </main>

    <!-- ======================================
         FOOTER
    ====================================== -->
    <footer class="border-t border-slate-200 bg-white">
      <div
        class="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 px-5 py-10 sm:px-8 lg:flex-row lg:items-center xl:px-12"
      >
        <div>
          <a
            href="#home"
            class="text-2xl font-extrabold tracking-tight text-[#123663]"
          >
            Kakvey<span class="text-blue-600">Dev</span>
          </a>

          <p class="mt-2 text-sm text-slate-500">
            Websites & Business Solutions · Cambodia
          </p>

          <p class="mt-2 text-xs text-slate-400">
            © {{ year }} {{ brandName }}. All rights reserved.
          </p>
        </div>

        <div
          class="flex flex-wrap items-center gap-5 text-sm font-bold text-slate-600"
        >
          <a href="#services" class="hover:text-blue-600"> សេវាកម្ម </a>

          <a href="#work" class="hover:text-blue-600"> គម្រោង </a>

          <a
            :href="contact.telegram"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-blue-600"
          >
            Telegram
          </a>

          <a
            :href="contact.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-blue-600"
          >
            LinkedIn
          </a>

          <a
            :href="contact.github"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-blue-600"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>

    <!-- BACK TO TOP -->
    <Transition name="scroll-top">
      <button
        v-if="isScrolled"
        type="button"
        class="back-to-top"
        aria-label="ត្រឡប់ទៅខាងលើ"
        @click="goto('home')"
      >
        <SiteIcon name="chevronUp" :size="24" />
      </button>
    </Transition>
  </div>
</template>
