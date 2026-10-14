<script setup lang="ts">
// ============ PERSONALIZAÇÃO ============
const site = {
  marca: 'Sua Marca',
  produto: 'Camiseta Essencial',
  preco: 129.9,
  precoDe: 159.9,
  checkout: '#', // link do checkout (Shopify, Yampi, Nuvemshop, Mercado Pago…). Recebe ?cor=&tam=&qtd=
  whatsapp: '5500000000000',
}
const cores = [
  { n: 'Grafite', c: '#2B2B2E' },
  { n: 'Off-white', c: '#ECE8DF' },
  { n: 'Oliva', c: '#5E6448' },
  { n: 'Terracota', c: '#B5563A' },
]
const tamanhos = ['P', 'M', 'G', 'GG', 'XG']
const kits = [
  { q: 1, off: 0, tag: '' },
  { q: 3, off: 15, tag: 'Mais escolhido' },
  { q: 5, off: 25, tag: 'Melhor preço' },
]
const pontos = [
  { x: 50, y: 17, t: 'Gola canelada', d: 'Ribana 2x1 que não deforma depois da lavagem.' },
  { x: 24, y: 40, t: 'Ombro reforçado', d: 'Fita interna de ombro a ombro para manter o caimento.' },
  { x: 64, y: 58, t: 'Algodão 230 g/m²', d: 'Malha encorpada, opaca e macia. Não fica transparente.' },
  { x: 40, y: 86, t: 'Barra dupla', d: 'Costura dupla que não enrola nem abre com o uso.' },
]
const medidas = [
  ['P', '50', '70', '1,60–1,70'], ['M', '53', '72', '1,68–1,76'], ['G', '56', '74', '1,74–1,82'], ['GG', '59', '76', '1,80–1,88'], ['XG', '62', '78', '1,86–1,94'],
]
const fotos = [
  { n: 'Lucas T.', t: 'Comprei 3, já quero a terracota.', h: 'tall' },
  { n: 'Bruna K.', t: 'Caimento perfeito, não encolheu.', h: '' },
  { n: 'Rafael M.', t: 'Malha grossa de verdade.', h: '' },
  { n: 'Júlia A.', t: 'Usei o guia de medidas e acertei.', h: 'tall' },
  { n: 'Diego S.', t: 'Melhor camiseta básica que já tive.', h: '' },
  { n: 'Ana C.', t: 'Chegou em 3 dias, embalagem linda.', h: '' },
]

const cor = ref(0)
const tam = ref('M')
const kit = ref(0)
const ponto = ref<number | null>(null)

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const total = computed(() => site.preco * kits[kit.value].q * (1 - kits[kit.value].off / 100))
const unit = computed(() => total.value / kits[kit.value].q)
const link = computed(() => {
  const p = new URLSearchParams({ cor: cores[cor.value].n, tam: tam.value, qtd: String(kits[kit.value].q) })
  return site.checkout === '#' ? '#comprar' : `${site.checkout}?${p}`
})
</script>

<template>
  <div>
    <div class="bar">Frete grátis acima de R$ 199 · Troca grátis em 30 dias</div>
    <header class="top"><div class="wrap top-in"><a href="#" class="logo">{{ site.marca }}</a><a class="top-buy" href="#comprar">Comprar</a></div></header>

    <main>
      <section id="comprar" class="hero">
        <div class="wrap hero-grid">
          <div class="gallery">
            <div class="shot" :style="{ '--c': cores[cor].c }">
              <svg class="tee" viewBox="0 0 200 220" aria-hidden="true"><path d="M70 20 40 32 10 66l26 22 14-12v124h100V76l14 12 26-22-30-34-30-12c-4 14-14 22-30 22S74 34 70 20Z" /></svg>
              <span class="shot-tag">Foto do produto</span>
            </div>
            <div class="thumbs"><span v-for="n in 4" :key="n" :class="{ on: n === 1 }" :style="{ '--c': cores[cor].c }" /></div>
          </div>

          <div class="buy">
            <p class="reviews"><span>★★★★★</span> 4,8 · 000 avaliações</p>
            <h1>{{ site.produto }}</h1>
            <p class="price"><b>{{ brl(unit) }}</b><s>{{ brl(site.precoDe) }}</s><span>ou 3x de {{ brl(unit / 3) }}</span></p>

            <div class="opt">
              <p class="opt-k">Cor: <b>{{ cores[cor].n }}</b></p>
              <div class="swatches">
                <button v-for="(c, i) in cores" :key="c.n" type="button" class="sw" :class="{ on: cor === i }" :style="{ '--c': c.c }" :aria-label="c.n" :aria-pressed="cor === i" @click="cor = i" />
              </div>
            </div>
            <div class="opt">
              <p class="opt-k">Tamanho: <b>{{ tam }}</b> <a href="#medidas">Guia de medidas</a></p>
              <div class="sizes">
                <button v-for="t in tamanhos" :key="t" type="button" :class="{ on: tam === t }" :aria-pressed="tam === t" @click="tam = t">{{ t }}</button>
              </div>
            </div>
            <div class="opt">
              <p class="opt-k">Quantidade</p>
              <div class="kits">
                <button v-for="(k, i) in kits" :key="k.q" type="button" class="kit" :class="{ on: kit === i }" :aria-pressed="kit === i" @click="kit = i">
                  <em v-if="k.tag">{{ k.tag }}</em>
                  <b>{{ k.q }} {{ k.q === 1 ? 'peça' : 'peças' }}</b>
                  <span>{{ k.off ? `-${k.off}%` : 'preço cheio' }}</span>
                </button>
              </div>
            </div>
            <a class="btn-buy" :href="link">Comprar agora · {{ brl(total) }}</a>
            <ul class="assure"><li>Troca grátis em 30 dias</li><li>Envio em até 24h</li><li>Pagamento seguro</li></ul>
          </div>
        </div>
      </section>

      <section class="sec anat">
        <div class="wrap anat-grid">
          <div>
            <h2>Feita para durar. Detalhe por detalhe.</h2>
            <p class="muted">Toque nos pontos para ver o que faz diferença no uso.</p>
            <ol class="anat-list">
              <li v-for="(p, i) in pontos" :key="p.t" :class="{ on: ponto === i }" @mouseenter="ponto = i" @mouseleave="ponto = null"><b>{{ p.t }}</b><span>{{ p.d }}</span></li>
            </ol>
          </div>
          <div class="anat-fig" :style="{ '--c': cores[cor].c }">
            <svg class="tee" viewBox="0 0 200 220" aria-hidden="true"><path d="M70 20 40 32 10 66l26 22 14-12v124h100V76l14 12 26-22-30-34-30-12c-4 14-14 22-30 22S74 34 70 20Z" /></svg>
            <button v-for="(p, i) in pontos" :key="p.t" type="button" class="hot" :class="{ on: ponto === i }" :style="{ left: p.x + '%', top: p.y + '%' }" :aria-label="p.t" @click="ponto = ponto === i ? null : i">
              <span>{{ i + 1 }}</span>
            </button>
            <p v-if="ponto !== null" class="hot-tip">{{ pontos[ponto].t }} — {{ pontos[ponto].d }}</p>
          </div>
        </div>
      </section>

      <section id="medidas" class="sec">
        <div class="wrap med-grid">
          <div><h2>Acerte o tamanho de primeira.</h2><p class="muted">Meça uma camiseta sua que veste bem, deitada numa superfície plana, e compare com a tabela.</p></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Tam.</th><th>Largura (cm)</th><th>Comprimento (cm)</th><th>Altura (m)</th></tr></thead>
              <tbody><tr v-for="m in medidas" :key="m[0]" :class="{ on: m[0] === tam }" @click="tam = m[0]"><td><b>{{ m[0] }}</b></td><td>{{ m[1] }}</td><td>{{ m[2] }}</td><td>{{ m[3] }}</td></tr></tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="sec ugc">
        <div class="wrap">
          <h2>No corpo de quem já comprou</h2>
          <div class="wall">
            <figure v-for="f in fotos" :key="f.n" class="post" :class="f.h"><div class="post-img"><span>Foto do cliente</span></div><figcaption><span>★★★★★</span>“{{ f.t }}” <b>{{ f.n }}</b></figcaption></figure>
          </div>
          <p class="note">Avaliações de exemplo — substituir por fotos e textos reais de clientes.</p>
        </div>
      </section>

      <section class="sec guarantee">
        <div class="wrap g-in">
          <div class="seal"><b>30</b><span>dias</span></div>
          <div><h2>Não gostou? A troca é por nossa conta.</h2><p>Você tem 30 dias para trocar ou devolver, com o frete pago por nós. Sem formulário complicado.</p></div>
        </div>
      </section>
    </main>

    <footer class="foot"><div class="wrap foot-in"><span>© {{ new Date().getFullYear() }} {{ site.marca }} · CNPJ 00.000.000/0000-00</span><a :href="`https://wa.me/${site.whatsapp}`" target="_blank" rel="noopener">Atendimento pelo WhatsApp</a></div></footer>

    <div class="sticky">
      <span class="sticky-info"><b>{{ brl(total) }}</b>{{ cores[cor].n }} · {{ tam }} · {{ kits[kit].q }}x</span>
      <a class="btn-buy" :href="link">Comprar agora</a>
    </div>
  </div>
</template>
