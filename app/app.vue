<script setup lang="ts">
// ============ PERSONALIZAÇÃO ============
const site = {
  marca: 'Sua Marca',
  camisa: 'Manto 26', // nome da camisa, vira o título gigante do topo
  temporada: '2026',
  preco: 'R$ 189,90',
  whatsapp: '5500000000000',
  instagram: '#',
  email: 'contato@suamarca.com.br',
  cidade: 'Sua cidade, UF',
  desde: '2019',
  cnpj: '00.000.000/0000-00',
}
// versões da camisa (cores do desenho de demonstração; troque pelas fotos reais quando tiver)
const versoes = [
  { id: 'Casa', corpo: '#0F7D45', letra: '#EBE5E3', gola: '#2B2622' },
  { id: 'Fora', corpo: '#F4F0EE', letra: '#2B2622', gola: '#0F7D45' },
  { id: 'Goleiro', corpo: '#2B2622', letra: '#EBE5E3', gola: '#0F7D45' },
]
const detalhes = [
  { g: 'Tecido', itens: [
    ['Poliéster 140 g/m²', 'Leve o bastante para o jogo, encorpado o bastante para durar.'],
    ['Trama com microfuros', 'O ar passa e o suor sai pelas costas e pelas laterais.'],
    ['Seca em minutos', 'Lavou de manhã, veste no jogo da tarde.'],
    ['Proteção UV 50+', 'Para o jogo de domingo ao meio-dia.'],
    ['Cor que não desbota', 'Sublimação: a cor faz parte do fio, não sai na máquina.'],
    ['Toque frio', 'Acabamento que não gruda no corpo.'],
  ] },
  { g: 'Acabamento', itens: [
    ['Escudo bordado', 'Bordado em alto-relevo, não é adesivo.'],
    ['Gola V com ribana', 'Ribana dupla que não abre com o tempo.'],
    ['Nome e número em silk', 'Tinta de alta densidade que não racha na lavagem.'],
    ['Etiqueta termocolada', 'Nada de etiqueta pinicando a nuca.'],
    ['Punho com elástico', 'A manga fica no lugar quando você levanta o braço.'],
    ['Costura reforçada', 'Costura dupla nas laterais e nos ombros.'],
  ] },
  { g: 'Caimento', itens: [
    ['Modelagem torcedor', 'Corte reto, confortável para o dia a dia.'],
    ['Versão jogador', 'Mais justa no corpo, como a dos atletas.'],
    ['Do P ao XGG', 'Tabela de medidas completa logo abaixo.'],
    ['Baby look do P ao GG', 'Modelagem feminina, mesma camisa.'],
    ['Infantil de 4 a 16', 'Para o torcedor que está chegando.'],
    ['Troca em 30 dias', 'Não serviu? A troca é por nossa conta.'],
  ] },
]
const temporadas = [['Manto 26', '2026'], ['Manto 25', '2025'], ['Manto 24', '2024'], ['Manto 23', '2023'], ['Manto 22', '2022'], ['Manto 21', '2021']]
const etapas = [['Modelagem', 'equipe própria'], ['Sublimação', 'parceiro local'], ['Bordado', 'ateliê parceiro'], ['Costura', 'confecção parceira'], ['Personalização', 'equipe própria'], ['Envio', 'Correios e transportadora']]
const avaliacoes = [
  { t: 'Chegou em quatro dias, com o nome do meu filho certinho.', n: 'Paula R.', c: 'Goiânia, GO' },
  { t: 'Tecido leve de verdade. Joguei a pelada inteira com ela.', n: 'Diego S.', c: 'Porto Alegre, RS' },
  { t: 'Pedi a de goleiro com o meu apelido. Ficou exatamente como eu queria.', n: 'Tiago M.', c: 'Belém, PA' },
]
const medidas = [['P', '50', '70'], ['M', '53', '72'], ['G', '56', '74'], ['GG', '59', '76'], ['XGG', '62', '78']]

// ============ CAMISA AO VIVO ============
const v = ref(0)
const nome = ref('')
const numero = ref('10')
const nomeCostas = computed(() => (nome.value.trim() || 'Seu nome').toUpperCase().slice(0, 12))
const numCostas = computed(() => (numero.value.replace(/\D/g, '').slice(0, 2) || '10'))
const pedir = computed(() => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Olá! Quero o ${site.camisa} (${versoes[v.value].id}) com o nome ${nomeCostas.value} e o número ${numCostas.value}.`)}`)
const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Olá! Quero saber mais sobre o ${site.camisa}.`)}`
const base = useRuntimeConfig().app.baseURL
const hover = ref<string | null>(null)
const dica = computed(() => hover.value ? detalhes.flatMap(d => d.itens).find(i => i[0] === hover.value)?.[1] : 'Passe o mouse em um item para ver o detalhe.')

// entradas das seções (sem JS, tudo aparece normalmente)
onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  document.documentElement.classList.add('anima')
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
  document.querySelectorAll('[data-sobe]').forEach((el) => io.observe(el))
})
</script>

<template>
  <div>
    <header class="hero">
      <div class="hero-foto">
        <img :src="`${base}fotos/arquibancada.webp`" width="1800" height="1350" alt="Arquibancadas e gramado de um estádio de futebol vazio" fetchpriority="high">
        <nav class="topo" aria-label="Seções">
          <a href="#" class="marca">{{ site.marca }}</a>
          <span class="links"><a href="#personalize">Personalize</a><a href="#detalhes">Detalhes</a><a href="#sobre">Sobre nós</a><a href="#avaliacoes">Avaliações</a></span>
        </nav>
      </div>
      <div class="hero-faixa">
        <h1 class="monumento">{{ site.camisa }}</h1>
        <div class="hero-linha">
          <p>A camisa da temporada {{ site.temporada }}, com o seu nome e o seu número nas costas. A partir de {{ site.preco }}, personalização inclusa.</p>
          <a class="botao" href="#personalize">Montar a minha</a>
        </div>
      </div>
    </header>

    <main>
      <!-- camisa ao vivo -->
      <section id="personalize" class="vitrine">
        <div class="placa" data-sobe>
          <svg class="camisa" viewBox="0 0 300 330" role="img" :aria-label="`Costas da camisa ${versoes[v].id} com o nome ${nomeCostas} e o número ${numCostas}`">
            <path :fill="versoes[v].corpo" d="M92 18Q150 36 208 18L262 42 298 110 254 134 240 110V322H60V110L46 134 2 110 38 42Z" />
            <path :stroke="versoes[v].gola" fill="none" stroke-width="7" d="M92 18Q150 36 208 18" />
            <path :stroke="versoes[v].gola" fill="none" stroke-width="5" d="M254 134 298 110M46 134 2 110" />
            <text x="150" y="96" text-anchor="middle" class="costas-nome" :fill="versoes[v].letra" :textLength="nomeCostas.length > 8 ? 150 : undefined" lengthAdjust="spacingAndGlyphs">{{ nomeCostas }}</text>
            <text x="150" y="232" text-anchor="middle" class="costas-num" :fill="versoes[v].letra">{{ numCostas }}</text>
          </svg>
          <p class="placa-nota">Desenho de demonstração: troque pela foto da camisa.</p>
        </div>
        <div class="vitrine-txt" data-sobe>
          <div class="abas" role="tablist" aria-label="Versão da camisa">
            <button v-for="(x, i) in versoes" :key="x.id" type="button" role="tab" :aria-selected="v === i" :class="{ on: v === i }" @click="v = i">{{ x.id }}</button>
          </div>
          <div>
            <h2>Seu nome nas costas</h2>
            <p class="vitrine-desc">Escreva o nome e escolha o número. É assim que a camisa chega na sua casa, estampada em silk de alta densidade.</p>
            <div class="campos">
              <label>Nome <input v-model="nome" maxlength="12" autocomplete="off" placeholder="Seu nome" @input="nome = nome.replace(/[^A-Za-zÀ-ÿ .]/g, '')"></label>
              <label>Número <input v-model="numero" inputmode="numeric" maxlength="2" autocomplete="off"></label>
            </div>
          </div>
          <div class="acoes">
            <a class="acao acao-tinta" :href="pedir" target="_blank" rel="noopener">Pedir com este nome</a>
            <a class="acao acao-tom" href="#duvidas">Ver tamanhos</a>
          </div>
        </div>
      </section>

      <!-- detalhes -->
      <section id="detalhes" class="detalhes">
        <h2 data-sobe>Feita para jogo</h2>
        <div class="det-grade" data-sobe>
          <div v-for="d in detalhes" :key="d.g" class="det-col">
            <h3>{{ d.g }}</h3>
            <ul>
              <li v-for="[t] in d.itens" :key="t" :class="{ on: hover === t }" tabindex="0" @mouseenter="hover = t" @focus="hover = t" @mouseleave="hover = null" @blur="hover = null">{{ t }}</li>
            </ul>
            <p class="det-resumo">{{ d.itens[0][1] }}</p>
          </div>
          <p class="det-dica" aria-live="polite">{{ dica }}</p>
        </div>
      </section>

      <div class="faixa-fotos" data-sobe>
        <img :src="`${base}fotos/bola.webp`" width="1400" height="934" alt="Bola de futebol parada sobre a grama" loading="lazy">
        <img :src="`${base}fotos/rede.webp`" width="1400" height="934" alt="Rede de um gol de futebol vista de perto" loading="lazy">
      </div>

      <!-- sobre nós -->
      <!-- TODO: trocar pela história real da marca -->
      <section id="sobre" class="sobre">
        <h2 class="oculto">Sobre nós</h2>
        <div class="sobre-linha" data-sobe>
          <dl class="fatos">
            <div><dt>Desde</dt><dd>{{ site.desde }}</dd></div>
            <div><dt>De</dt><dd>{{ site.cidade }}</dd></div>
            <div><dt>Por temporada</dt><dd>Uma camisa só</dd></div>
          </dl>
          <p class="sobre-txt">A {{ site.marca }} nasceu na arquibancada. A gente cansou de camisa que desbota na terceira lavagem e de nome que descola no primeiro jogo. Por isso fazemos uma camisa por temporada, em lotes pequenos, e personalizamos uma a uma, com o nome que você escolher.</p>
        </div>
        <div class="sobre-linha sobre-reg" data-sobe>
          <p class="reg-tit">Temporadas e quem faz</p>
          <ul class="reg"><li v-for="[a, b] in temporadas" :key="a"><span>{{ a }}</span><span>{{ b }}</span></li></ul>
          <ul class="reg"><li v-for="[a, b] in etapas" :key="a"><span>{{ a }}</span><span>{{ b }}</span></li></ul>
        </div>
        <img class="sobre-foto" :src="`${base}fotos/estadio.webp`" width="2200" height="1467" alt="Vista aérea de um grande estádio de futebol no meio da cidade" loading="lazy" data-sobe>
      </section>

      <!-- avaliações -->
      <section id="avaliacoes" class="avaliacoes">
        <h2 class="oculto">Avaliações</h2>
        <blockquote class="citacao" data-sobe>
          <p><span>“Lavei</span><span>trinta</span><span>vezes</span></p>
          <p><span>e o</span><span>nome</span><span>continua lá.”</span></p>
          <footer><span>Rafael M.</span><span>torcedor</span><span>Recife, PE</span></footer>
        </blockquote>
        <div class="mais" data-sobe>
          <p class="nota-geral"><b>4,9</b> de 5, em 000 avaliações</p>
          <figure v-for="a in avaliacoes" :key="a.n"><blockquote>{{ a.t }}</blockquote><figcaption>{{ a.n }} · {{ a.c }}</figcaption></figure>
        </div>
        <p class="aviso">Avaliações de exemplo: substitua por avaliações reais e autorizadas.</p>
      </section>

      <img class="gramado" :src="`${base}fotos/gramado.webp`" width="2000" height="1334" alt="Bola de futebol sozinha no meio de um gramado" loading="lazy" data-sobe>

      <!-- dúvidas -->
      <section id="duvidas" class="duvidas">
        <div class="par"><h2 class="duv-tit">Dúvidas</h2><span /></div>
        <div class="par" data-sobe>
          <h3>Como escolho o tamanho?</h3>
          <div>
            <p>Meça uma camiseta que veste bem em você, deitada numa superfície plana, e compare com a tabela.</p>
            <table>
              <thead><tr><th>Tam.</th><th>Largura</th><th>Comprimento</th></tr></thead>
              <tbody><tr v-for="m in medidas" :key="m[0]"><td>{{ m[0] }}</td><td>{{ m[1] }} cm</td><td>{{ m[2] }} cm</td></tr></tbody>
            </table>
          </div>
        </div>
        <div class="par" data-sobe><h3>Posso usar qualquer nome?</h3><p>Até 12 letras e um número de 0 a 99. Apelido, sobrenome ou o nome do seu filho, você escolhe.</p></div>
        <div class="par" data-sobe><h3>Em quanto tempo chega?</h3><p>Personalizamos em até 3 dias úteis. O prazo de entrega aparece no pedido, de acordo com o seu CEP.</p></div>
        <div class="par" data-sobe><h3>E se não servir?</h3><p>Você tem 30 dias para trocar, com o frete por nossa conta. Camisas personalizadas trocam pelo mesmo nome e número.</p></div>
        <div class="par" data-sobe><h3>Como lavar?</h3><p>Do avesso, em água fria, sem alvejante. Não passe ferro em cima do nome e do número.</p></div>
      </section>

      <!-- fechamento -->
      <section class="fecho">
        <p class="fecho-tit" data-sobe>Seu nome,<br>nosso manto.</p>
        <div class="fecho-linha">
          <p>Monte a sua em um minuto e finalize pelo WhatsApp.</p>
          <a class="botao botao-verde" href="#personalize">Montar a minha</a>
        </div>
      </section>
    </main>

    <footer class="rodape">
      <p class="rod-nome" aria-hidden="true">{{ site.marca }}</p>
      <div class="rod-linha">
        <ul class="rod-contatos">
          <li><a :href="wa" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.3 21.8l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.4Z" /></svg>WhatsApp</a></li>
          <li><a :href="site.instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /></g><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" /></svg>Instagram</a></li>
          <li><a :href="`mailto:${site.email}`">{{ site.email }}</a></li>
        </ul>
        <div class="rod-links">
          <p><a href="#personalize">Personalize</a><a href="#detalhes">Detalhes</a><a href="#sobre">Sobre nós</a></p>
          <p><a href="#avaliacoes">Avaliações</a><a href="#duvidas">Dúvidas</a></p>
          <p>{{ site.marca }}<br>CNPJ {{ site.cnpj }}<br>{{ site.cidade }}</p>
        </div>
      </div>
      <p class="creditos">Fotos de ambientação, não são fotos do produto: <a href="https://commons.wikimedia.org/w/index.php?curid=64140933" target="_blank" rel="noopener">“Architectural Detail - Maracana Stadium”</a> de Adam Jones, CC BY-SA 2.0, convertida para preto e branco; <a href="https://commons.wikimedia.org/w/index.php?curid=27256002" target="_blank" rel="noopener">“Maracana Stadium June 2013”</a>, Governo Federal do Brasil, CC BY 3.0; bola, rede e gramado via rawpixel, CC0.</p>
      <div class="rod-final">
        <span>© {{ new Date().getFullYear() }} {{ site.marca }} · <a class="rod-credito" href="https://www.ontrackagenciadigital.com.br/" target="_blank" rel="noopener">Desenvolvido por <b>OnTrack Agência Digital</b></a></span>
        <a href="#">Voltar ao topo</a>
      </div>
    </footer>
  </div>
</template>
