<script setup lang="ts">
// Pincelada decorativa: faixa larga com borda irregular e rastros de pincel seco nas pontas.
withDefaults(defineProps<{ cor?: string, forma?: 1 | 2 | 3 }>(), { cor: '#FF6A13', forma: 1 })
const uid = `p${Math.random().toString(36).slice(2, 8)}`
const formas: Record<number, { faixa: string, rastros: string }> = {
  1: {
    faixa: 'M40 236C160 176 330 96 520 30L572 104C410 170 230 246 78 300Z',
    rastros: 'M20 250 120 206M14 272 96 236M520 30 590 6M546 66 600 46M560 96 600 84',
  },
  2: {
    faixa: 'M20 150C150 120 330 96 560 92L566 176C350 182 170 204 30 232Z',
    rastros: 'M0 168 70 156M4 200 60 192M556 100 600 98M560 140 600 140M562 168 600 170',
  },
  3: {
    faixa: 'M60 270C170 190 300 120 470 54L530 120C380 182 240 248 110 300Z',
    rastros: 'M40 280 120 236M30 300 90 270M470 54 560 18M500 88 580 58',
  },
}
</script>

<template>
  <svg class="pincelada" viewBox="0 0 600 320" aria-hidden="true">
    <defs>
      <filter :id="uid" x="-10%" y="-20%" width="120%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency=".02 .7" numOctaves="3" seed="11" />
        <feDisplacementMap in="SourceGraphic" scale="26" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g :filter="`url(#${uid})`">
      <path :d="formas[forma].faixa" :fill="cor" />
      <path :d="formas[forma].rastros" fill="none" :stroke="cor" stroke-width="9" stroke-linecap="round" />
    </g>
  </svg>
</template>

<style scoped>
.pincelada{ display:block; width:100%; height:auto; pointer-events:none; }
</style>
