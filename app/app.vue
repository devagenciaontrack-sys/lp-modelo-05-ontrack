<script setup lang="ts">
// ============ PERSONALIZAÇÃO ============
const site = {
  marca: 'Sua Marca',
  produto: 'Camiseta Essencial',
  frase: 'A camiseta que você vai usar até gastar.',
  precoAPartir: 'R$ 129,90',
  whatsapp: '5500000000000',
  loja: '', // link da loja (Shopify, Yampi, Nuvemshop…). Vazio = os botões abrem o WhatsApp
  instagram: '#',
  desde: '2019',
  cidade: 'Sua cidade, UF',
  cnpj: '00.000.000/0000-00',
}
const cores = [
  { n: 'Grafite', c: '#2B2B2E' },
  { n: 'Off-white', c: '#ECE8DF' },
  { n: 'Oliva', c: '#5E6448' },
  { n: 'Terracota', c: '#B5563A' },
]
const faixa = ['Algodão 230 g/m²', 'Gola canelada 2x1', 'Costura reforçada', 'Feita no Brasil', 'Troca grátis em 30 dias']
const pontos = [
  { x: 50, y: 17, t: 'Gola canelada', d: 'Ribana 2x1 que não deforma depois da lavagem.' },
  { x: 24, y: 40, t: 'Ombro reforçado', d: 'Fita interna de ombro a ombro para manter o caimento.' },
  { x: 64, y: 58, t: 'Algodão 230 g/m²', d: 'Malha encorpada, opaca e macia. Não fica transparente.' },
  { x: 40, y: 86, t: 'Barra dupla', d: 'Costura dupla que não enrola nem abre com o uso.' },
]
const numeros = [
  { v: '230 g', l: 'por metro quadrado de algodão' },
  { v: '4', l: 'cores fixas, sempre em estoque' },
  { v: '5', l: 'tamanhos, do P ao XG' },
]
const avaliacoes = [
  { n: 'Lucas T.', c: 'São Paulo, SP', t: 'Comprei uma, voltei e levei mais três. A malha é grossa de verdade e não perdeu a forma.', foto: true },
  { n: 'Bruna K.', c: 'Curitiba, PR', t: 'Caimento perfeito. Lavei várias vezes e não encolheu.', foto: false },
  { n: 'Rafael M.', c: 'Recife, PE', t: 'Finalmente uma básica que não fica transparente.', foto: false },
  { n: 'Júlia A.', c: 'Belo Horizonte, MG', t: 'Usei o guia de medidas e acertei de primeira. Chegou rápido e bem embalada.', foto: true },
]
const notas = [{ e: 5, p: 86 }, { e: 4, p: 11 }, { e: 3, p: 2 }, { e: 2, p: 1 }, { e: 1, p: 0 }]
const medidas = [
  ['P', '50', '70'], ['M', '53', '72'], ['G', '56', '74'], ['GG', '59', '76'], ['XG', '62', '78'],
]
const faq = [
  { q: 'Como escolho o tamanho?', a: 'Meça uma camiseta sua que veste bem, deitada numa superfície plana, e compare com a tabela abaixo.', tabela: true },
  { q: 'E se não servir?', a: 'Você tem 30 dias para trocar ou devolver, com o frete por nossa conta.' },
  { q: 'Em quanto tempo chega?', a: 'Enviamos em até 24h úteis. O prazo de entrega aparece no checkout, de acordo com o seu CEP.' },
  { q: 'Como lavar?', a: 'Lavagem na máquina em água fria, do avesso. Não use alvejante e seque à sombra.' },
]

const cor = ref(0)
const ponto = ref<number | null>(null)
const comprar = computed(() => site.loja || `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Olá! Quero a ${site.produto} na cor ${cores[cor.value].n}.`)}`)
</script>

<template>
  <div>
    <div class="bar">Frete grátis acima de R$ 199 · Troca grátis em 30 dias</div>
    <header class="top">
      <div class="wrap top-in">
        <a href="#" class="logo">{{ site.marca }}</a>
        <nav class="nav" aria-label="Seções">
          <a href="#detalhes">Detalhes</a><a href="#sobre">Sobre nós</a><a href="#avaliacoes">Avaliações</a><a href="#duvidas">Dúvidas</a>
        </nav>
        <a class="top-buy" :href="comprar" target="_blank" rel="noopener">Comprar</a>
      </div>
    </header>

    <main>
      <!-- produto em destaque -->
      <section class="hero">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <h1>{{ site.produto }}</h1>
            <p class="lead">{{ site.frase }} Algodão pesado, caimento reto e costura que aguenta o dia a dia.</p>
            <div class="hero-colors">
              <p class="opt-k">Cor: <b>{{ cores[cor].n }}</b></p>
              <div class="swatches">
                <button v-for="(c, i) in cores" :key="c.n" type="button" class="sw" :class="{ on: cor === i }" :style="{ '--c': c.c }" :aria-label="c.n" :aria-pressed="cor === i" @click="cor = i" />
              </div>
            </div>
            <div class="hero-cta">
              <a class="btn-buy" :href="comprar" target="_blank" rel="noopener">Quero a minha</a>
              <p class="from">a partir de <b>{{ site.precoAPartir }}</b><span>em até 3x sem juros</span></p>
            </div>
          </div>
          <div class="hero-stage" :style="{ '--c': cores[cor].c }">
            <span class="stage-word" aria-hidden="true">{{ cores[cor].n }}</span>
            <svg class="tee" viewBox="0 0 200 220" aria-hidden="true"><path d="M70 20 40 32 10 66l26 22 14-12v124h100V76l14 12 26-22-30-34-30-12c-4 14-14 22-30 22S74 34 70 20Z" /></svg>
            <span class="stage-tag">Foto do produto</span>
            <span class="stage-seal"><b>4,8</b>★ 000 avaliações</span>
          </div>
        </div>
      </section>

      <div class="strip" aria-hidden="true"><div class="strip-in"><span v-for="n in 2" :key="n"><i v-for="f in faixa" :key="f">{{ f }}</i></span></div></div>

      <!-- detalhes -->
      <section id="detalhes" class="sec anat">
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

      <!-- cores -->
      <section class="sec cores">
        <div class="wrap">
          <div class="cores-head">
            <h2>Quatro cores. Um caimento só.</h2>
            <dl class="nums"><div v-for="n in numeros" :key="n.l"><dt>{{ n.v }}</dt><dd>{{ n.l }}</dd></div></dl>
          </div>
          <div class="look">
            <button v-for="(c, i) in cores" :key="c.n" type="button" class="look-item" :class="{ on: cor === i }" :style="{ '--c': c.c }" :aria-pressed="cor === i" @click="cor = i">
              <span class="look-img"><svg class="tee" viewBox="0 0 200 220" aria-hidden="true"><path d="M70 20 40 32 10 66l26 22 14-12v124h100V76l14 12 26-22-30-34-30-12c-4 14-14 22-30 22S74 34 70 20Z" /></svg></span>
              <span class="look-n">{{ c.n }}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- sobre nós -->
      <!-- TODO: trocar pela história real da marca e pelas fotos do ateliê -->
      <section id="sobre" class="sec about">
        <div class="wrap about-grid">
          <div class="about-photos">
            <div class="ph ph-a"><span>Foto do ateliê</span></div>
            <div class="ph ph-b"><span>Foto da equipe</span></div>
          </div>
          <div class="about-txt">
            <h2>Uma marca de uma peça só.</h2>
            <p>A {{ site.marca }} começou com uma pergunta simples: por que é tão difícil achar uma camiseta básica que dure? Em vez de lançar coleção nova a cada estação, decidimos fazer uma peça só, e fazer direito.</p>
            <p>Escolhemos o fio, testamos a malha, ajustamos a modelagem até o caimento ficar certo. Produzimos em lotes pequenos, com confecção parceira no Brasil.</p>
            <dl class="about-facts">
              <div><dt>Desde</dt><dd>{{ site.desde }}</dd></div>
              <div><dt>De</dt><dd>{{ site.cidade }}</dd></div>
              <div><dt>Produção</dt><dd>Lotes pequenos</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <!-- avaliações -->
      <section id="avaliacoes" class="sec reviews">
        <div class="wrap rev-grid">
          <div class="rev-sum">
            <h2>Quem comprou, voltou.</h2>
            <p class="score"><b>4,8</b><span>★★★★★<small>média de 000 avaliações</small></span></p>
            <ul class="bars">
              <li v-for="n in notas" :key="n.e"><span>{{ n.e }}★</span><i><em :style="{ width: n.p + '%' }" /></i><span>{{ n.p }}%</span></li>
            </ul>
          </div>
          <div class="rev-list">
            <figure v-for="a in avaliacoes" :key="a.n" class="rev" :class="{ 'has-photo': a.foto }">
              <div v-if="a.foto" class="rev-img"><span>Foto do cliente</span></div>
              <blockquote><span class="stars" aria-label="5 de 5 estrelas">★★★★★</span>“{{ a.t }}”</blockquote>
              <figcaption><b>{{ a.n }}</b> · {{ a.c }} <span class="ok">Compra verificada</span></figcaption>
            </figure>
          </div>
        </div>
        <p class="wrap note">Avaliações de exemplo: substitua por avaliações reais e autorizadas.</p>
      </section>

      <!-- garantia + chamada -->
      <section class="sec guarantee">
        <div class="wrap g-in">
          <div class="seal"><b>30</b><span>dias</span></div>
          <div class="g-txt">
            <h2>Não gostou? A troca é por nossa conta.</h2>
            <p>Você tem 30 dias para trocar ou devolver, com o frete pago por nós. Sem formulário complicado.</p>
          </div>
          <a class="btn-buy btn-ink" :href="comprar" target="_blank" rel="noopener">Quero a minha</a>
        </div>
      </section>

      <!-- dúvidas -->
      <section id="duvidas" class="sec faq">
        <div class="wrap faq-grid">
          <h2>Dúvidas</h2>
          <div class="faq-list">
            <details v-for="(f, i) in faq" :key="f.q" :open="i === 0">
              <summary>{{ f.q }}</summary>
              <p>{{ f.a }}</p>
              <div v-if="f.tabela" class="table-wrap">
                <table>
                  <thead><tr><th>Tam.</th><th>Largura (cm)</th><th>Comprimento (cm)</th></tr></thead>
                  <tbody><tr v-for="m in medidas" :key="m[0]"><td><b>{{ m[0] }}</b></td><td>{{ m[1] }}</td><td>{{ m[2] }}</td></tr></tbody>
                </table>
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>

    <footer class="foot rod">
      <div class="wrap rod-top">
        <div class="rod-brand">
          <b class="rod-logo">{{ site.marca }}</b>
          <p>Uma peça só, feita para durar.</p><p>CNPJ {{ site.cnpj }}</p>
        </div>
        <div class="rod-soc">
          <a :href="`https://wa.me/${site.whatsapp}`" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 20.5 4.8 16.3A8.5 8.5 0 1 1 8 19.3Z"/><path d="M9.2 8.6c-.1 3.3 2.9 6.3 6.2 6.2l.9-1.5-1.9-.9-.9.8a5 5 0 0 1-2.6-2.6l.8-.9-.9-1.9Z"/></svg></a>
          <a :href="site.instagram" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/></svg></a>
        </div>
      </div>
      <div class="wrap"><div class="rod-bot">
        <span>© {{ new Date().getFullYear() }} {{ site.marca }}. Todos os direitos reservados.</span>
        <a class="rod-credit" href="https://www.ontrackagenciadigital.com.br/" target="_blank" rel="noopener">Desenvolvido por <b>OnTrack Agência Digital</b></a>
      </div></div>
    </footer>

    <a class="sticky" :href="comprar" target="_blank" rel="noopener">Quero a minha · {{ site.precoAPartir }}</a>
  </div>
</template>
