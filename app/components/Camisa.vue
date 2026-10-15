<script setup lang="ts">
// Camisa desenhada em SVG: frente ou costas, com padrão, cores, nome e número.
const props = withDefaults(defineProps<{
  base?: string
  detalhe?: string
  manga?: string
  texto?: string
  padrao?: 'raio' | 'faixa' | 'listras' | 'liso' | 'chevron'
  lado?: 'frente' | 'costas'
  nome?: string
  numero?: string
  time?: string
  contorno?: string
}>(), { base: '#14161C', detalhe: '#1FB5C9', manga: '', texto: '#FFFFFF', padrao: 'raio', lado: 'frente', nome: 'SEU NOME', numero: '10', time: 'SUA MARCA', contorno: '' })

const uid = `c${Math.random().toString(36).slice(2, 8)}`
const corpo = 'M100 20C113 31 187 31 200 20L250 38C263 44 272 52 280 64L300 128 256 146 244 112V326C244 332 240 336 234 336H66C60 336 56 332 56 326V112L44 146 0 128 20 64C28 52 37 44 50 38Z'
const mangaCor = computed(() => props.manga || props.base)
const nomeTam = computed(() => (props.nome.length > 9 ? 150 : undefined))
</script>

<template>
  <svg class="camisa-svg" viewBox="0 0 300 340" :aria-label="`Camisa ${lado === 'frente' ? time : nome} número ${numero}`" role="img">
    <defs>
      <clipPath :id="`${uid}-c`"><path :d="corpo" /></clipPath>
      <linearGradient :id="`${uid}-s`" x1="0" x2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".38" />
        <stop offset=".22" stop-color="#000" stop-opacity="0" />
        <stop offset=".5" stop-color="#fff" stop-opacity=".07" />
        <stop offset=".78" stop-color="#000" stop-opacity="0" />
        <stop offset="1" stop-color="#000" stop-opacity=".38" />
      </linearGradient>
      <linearGradient :id="`${uid}-v`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".08" />
        <stop offset="1" stop-color="#000" stop-opacity=".22" />
      </linearGradient>
    </defs>
    <g :clip-path="`url(#${uid}-c)`">
      <rect width="300" height="340" :fill="base" />
      <!-- mangas -->
      <path d="M0 0H86L56 112 44 146 0 128Z M300 0H214L244 112 256 146 300 128Z" :fill="mangaCor" />
      <!-- padrões -->
      <template v-if="padrao === 'raio'">
        <path d="M56 150 118 96 92 180 150 132 104 260 56 300Z" :fill="detalhe" opacity=".95" />
        <path d="M244 120 196 176 214 196 168 262 244 214Z" :fill="detalhe" opacity=".95" />
        <path d="M56 300 104 260 96 336H56Z" :fill="detalhe" opacity=".55" />
      </template>
      <path v-else-if="padrao === 'faixa'" d="M30 40H96L280 336H214Z" :fill="detalhe" />
      <template v-else-if="padrao === 'listras'">
        <rect v-for="x in [70, 118, 166, 214]" :key="x" :x="x" y="0" width="24" height="340" :fill="detalhe" />
      </template>
      <path v-else-if="padrao === 'chevron'" d="M56 130 150 196 244 130V168L150 234 56 168Z" :fill="detalhe" />
      <!-- punhos e laterais -->
      <path d="M0 128 44 146 48 134 4 116Z M300 128 256 146 252 134 296 116Z" :fill="detalhe" />
      <rect x="56" y="112" width="8" height="224" :fill="detalhe" opacity=".85" />
      <rect x="236" y="112" width="8" height="224" :fill="detalhe" opacity=".85" />
      <!-- volume -->
      <rect width="300" height="340" :fill="`url(#${uid}-s)`" />
      <rect width="300" height="340" :fill="`url(#${uid}-v)`" />
    </g>
    <!-- gola -->
    <path v-if="lado === 'frente'" d="M100 20 150 60 200 20" fill="none" :stroke="detalhe" stroke-width="9" stroke-linejoin="round" />
    <path v-else d="M100 20Q150 42 200 20" fill="none" :stroke="detalhe" stroke-width="9" />
    <!-- textos -->
    <template v-if="lado === 'frente'">
      <text x="150" y="112" text-anchor="middle" class="cs-time" :fill="texto" :stroke="contorno || undefined" :stroke-width="contorno ? 6 : undefined" paint-order="stroke" stroke-linejoin="round">{{ time }}</text>
      <text x="150" y="214" text-anchor="middle" class="cs-num" :fill="texto" :stroke="contorno || undefined" :stroke-width="contorno ? 6 : undefined" paint-order="stroke" stroke-linejoin="round">{{ numero }}</text>
    </template>
    <template v-else>
      <text x="150" y="104" text-anchor="middle" class="cs-nome" :fill="texto" :stroke="contorno || undefined" :stroke-width="contorno ? 6 : undefined" paint-order="stroke" stroke-linejoin="round" :textLength="nomeTam" lengthAdjust="spacingAndGlyphs">{{ nome }}</text>
      <text x="150" y="240" text-anchor="middle" class="cs-num cs-num-g" :fill="texto" :stroke="contorno || undefined" :stroke-width="contorno ? 6 : undefined" paint-order="stroke" stroke-linejoin="round">{{ numero }}</text>
    </template>
  </svg>
</template>

<style scoped>
.camisa-svg{ display:block; width:100%; height:auto; overflow:visible; filter:drop-shadow(0 24px 30px rgba(0,0,0,.45)); }
.cs-time{ font-family:'Archivo', system-ui, sans-serif; font-weight:800; font-size:21px; letter-spacing:.06em; }
.cs-nome{ font-family:'Archivo', system-ui, sans-serif; font-weight:800; font-size:27px; letter-spacing:.06em; }
.cs-num{ font-family:'Archivo', system-ui, sans-serif; font-weight:900; font-size:96px; letter-spacing:-.02em; }
.cs-num-g{ font-size:124px; }
</style>
