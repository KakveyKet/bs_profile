<script setup>
import { computed } from 'vue'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Clock,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  Link2,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  Monitor,
  Package,
  Phone,
  Rocket,
  Search,
  Send,
  Server,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  TreePalm,
  UserRound,
  Wrench,
  X,
  Zap,
} from '@lucide/vue'

// Import only the icons the portfolio actually uses.
// Avoid `import * as icons` — it can unnecessarily increase bundle size.
defineOptions({ inheritAttrs: false })

const props = defineProps({
  name: { type: String, default: 'sparkles' },
  size: { type: [Number, String], default: 24 },
  strokeWidth: { type: [Number, String], default: 1.8 },
})

const icons = {
  globe: Globe,
  cart: ShoppingCart,
  school: GraduationCap,
  shield: ShieldCheck,
  megaphone: Megaphone,
  package: Package,
  book: BookOpen,
  wrench: Wrench,
  store: Store,
  building: Building2,
  palmtree: TreePalm,
  arrow: ArrowRight,
  upRight: ArrowUpRight,
  down: ArrowDown,
  check: Check,
  menu: Menu,
  x: X,
  send: Send,
  phone: Phone,
  mail: Mail,
  sparkles: Sparkles,
  message: MessageCircle,
  clipboard: ClipboardList,
  rocket: Rocket,
  user: UserRound,
  server: Server,
  monitor: Monitor,
  zap: Zap,
  layers: Layers,
  search: Search,
  chevron: ChevronDown,
  chevronUp: ChevronUp,
  clock: Clock,
  heart: Heart,
  link: Link2,
}

const selected = computed(() => icons[props.name] ?? Sparkles)
</script>

<template>
  <component
    :is="selected"
    :size="Number(size)"
    :stroke-width="Number(strokeWidth)"
    aria-hidden="true"
    focusable="false"
    v-bind="$attrs"
  />
</template>
