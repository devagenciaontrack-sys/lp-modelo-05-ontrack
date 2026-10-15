<script setup lang="ts">
// ============ PERSONALIZAÇÃO ============
const site = {
  marca: 'Sua Marca',
  slogan: 'Camisas de time',
  whatsapp: '5500000000000',
  instagram: '#',
  email: 'contato@suamarca.com.br',
  cidade: 'Sua cidade, UF',
  cnpj: '00.000.000/0000-00',
  videoId: '', // ID do vídeo do YouTube da seção "Sobre nós" (vazio = só a capa)
}
// modelos da coleção (cores do desenho de demonstração; troque pelas fotos reais quando tiver)
const modelos = [
  { time: 'FALCÕES', base: '#141A2B', detalhe: '#1FB5C9', texto: '#FFFFFF', padrao: 'raio', preco: 'R$ 129,90' },
  { time: 'FÊNIX', base: '#C8201E', detalhe: '#14161C', texto: '#FFFFFF', padrao: 'chevron', preco: 'R$ 129,90' },
  { time: 'TROVÃO', base: '#F4F4F2', detalhe: '#1D4FD8', texto: '#14161C', contorno: '#FFFFFF', padrao: 'listras', preco: 'R$ 139,90' },
  { time: 'TITÃS', base: '#127A3E', detalhe: '#0B3D20', texto: '#FFFFFF', padrao: 'faixa', preco: 'R$ 129,90' },
] as const
const servicos = [
  { t: 'Design exclusivo', d: 'Mande a ideia, o escudo e as cores. A gente desenha e você aprova antes de produzir.', i: 'pincel' },
  { t: 'Uniforme completo', d: 'Camisa, calção e meião no mesmo padrão, para futebol, futsal e society.', i: 'camisa' },
  { t: 'Pedidos em quantidade', d: 'O preço por peça cai conforme a quantidade. A partir de 10 camisas.', i: 'caixa' },
  { t: 'Envio para todo o Brasil', d: 'Produção em até 15 dias úteis e entrega com código de rastreio.', i: 'caminhao' },
]
const numeros = [{ v: '500+', l: 'times atendidos' }, { v: '10 mil+', l: 'camisas entregues' }, { v: '4,9', l: 'nota dos clientes', estrela: true }]
const avaliacoes = [
  { t: 'Fizemos o uniforme do time da firma. Chegou antes do prazo e a qualidade surpreendeu todo mundo.', n: 'Marcos A.', c: 'Unidos FC · Campinas, SP' },
  { t: 'O desenho ficou do jeito que a gente imaginou. Atendimento rápido pelo WhatsApp.', n: 'Juliana P.', c: 'Futsal feminino · Recife, PE' },
  { t: 'Terceiro ano pedindo com eles. Tecido leve e o número não descasca.', n: 'Rodrigo L.', c: 'Society dos Amigos · Curitiba, PR' },
]
const faq = [
  { q: 'Qual é o pedido mínimo?', a: 'Para time, a partir de 10 camisas. Camisa avulsa personalizada também pode, com o mesmo cuidado.' },
  { q: 'Quanto tempo demora?', a: 'Depois que você aprova o desenho, produzimos em até 15 dias úteis. O frete aparece no orçamento, de acordo com o CEP.' },
  { q: 'Posso colocar o escudo do meu time?', a: 'Pode. Mande o escudo em boa resolução e a gente aplica em sublimação ou bordado.' },
  { q: 'Como escolho os tamanhos?', a: 'Mandamos a tabela de medidas e, se precisar, um kit de prova de tamanhos para o time.' },
  { q: 'O nome e o número descascam?', a: 'Não. Usamos sublimação, que tinge o próprio tecido, e silk de alta densidade nos números. Aguenta lavagem na máquina.' },
]
const pergunta = ref(0)

// ============ MONTE A SUA (ao vivo) ============
const m = ref(0)
const nome = ref('')
const numero = ref('10')
const nomeCostas = computed(() => (nome.value.trim() || 'SEU NOME').toUpperCase().slice(0, 12))
const numCostas = computed(() => numero.value.replace(/\D/g, '').slice(0, 2) || '10')
const pedir = computed(() => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Olá! Quero orçamento da camisa ${modelos[m.value].time} com o nome ${nomeCostas.value} e o número ${numCostas.value}.`)}`)
const wa = (t = 'Olá! Quero fazer o orçamento das camisas do meu time.') => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t)}`
const base = useRuntimeConfig().app.baseURL
const tocando = ref(false)
function personalizar(i: number) {
  m.value = i
  document.getElementById('monte')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  document.documentElement.classList.add('anima')
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
  document.querySelectorAll('[data-sobe]').forEach((el) => io.observe(el))
})
</script>

<template>
  <div>
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <defs>
        <symbol id="i-seta" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></symbol>
        <symbol id="i-escudo" viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /></symbol>
        <symbol id="i-raio" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /></symbol>
        <symbol id="i-pincel" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4.5 19.5 9.5 11 18l-5-5Z" /><path d="M6 13c-2 0-3 1.5-3 3.5S2 20 2 20s3.5 0 5-1 1.5-2.5 1-4" /></g></symbol>
        <symbol id="i-camisa" viewBox="0 0 24 24"><path d="M8 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5-3c-.5 1.5-2 2.5-4 2.5S8.5 4.5 8 3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /></symbol>
        <symbol id="i-caixa" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></g></symbol>
        <symbol id="i-caminhao" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></g></symbol>
        <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7Z" fill="currentColor" /></symbol>
        <symbol id="i-estrela" viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" fill="currentColor" /></symbol>
        <symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.3 21.8l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.4Z" /></symbol>
        <symbol id="i-ig" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /></g><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" /></symbol>
      </defs>
    </svg>

    <header class="topo">
      <div class="wrap topo-in">
        <a href="#" class="logo"><b>{{ site.marca }}</b><small>{{ site.slogan }}</small></a>
        <nav class="nav" aria-label="Seções">
          <a href="#inicio" class="ativo">Início</a><a href="#colecao">Modelos</a><a href="#monte">Monte a sua</a><a href="#sobre">Sobre nós</a><a href="#avaliacoes">Avaliações</a>
        </nav>
        <a class="btn btn-laranja btn-p" href="#monte">Monte a sua</a>
      </div>
    </header>

    <main>
      <!-- topo -->
      <section id="inicio" class="hero">
        <div class="wrap hero-grid">
          <div class="hero-txt">
            <p class="sobretitulo">Camisas personalizadas</p>
            <h1>Seu time.<br><span>Seu estilo.</span><br>Nossa camisa.</h1>
            <p class="hero-desc">Criamos camisas de time sob medida, com o escudo, as cores, o nome e o número de cada jogador. Para a escola, a firma, a pelada de domingo ou o campeonato.</p>
            <div class="hero-acoes">
              <a class="btn btn-laranja" href="#monte">Monte a sua camisa <svg><use href="#i-seta" /></svg></a>
              <a class="btn btn-contorno" href="#colecao">Ver modelos</a>
            </div>
            <ul class="selos">
              <li><svg><use href="#i-escudo" /></svg>Tecido<br>premium</li>
              <li><svg><use href="#i-raio" /></svg>Produção<br>rápida</li>
              <li><svg><use href="#i-pincel" /></svg>Personalização<br>completa</li>
            </ul>
          </div>
          <div class="hero-camisas" aria-label="Três camisas de exemplo">
            <Pincelada class="pin pin-a" cor="#FF6A13" :forma="1" />
            <Pincelada class="pin pin-b" cor="#1FB5C9" :forma="3" />
            <div class="hc hc-1"><Camisa lado="costas" base="#FF6A13" detalhe="#14161C" texto="#14161C" padrao="liso" nome="SEU NOME" numero="10" /></div>
            <div class="hc hc-3"><Camisa lado="costas" base="#F4F4F2" detalhe="#1FB5C9" manga="#1FB5C9" texto="#14161C" padrao="liso" nome="SEU NOME" numero="10" /></div>
            <div class="hc hc-2"><Camisa lado="frente" base="#14161C" detalhe="#1FB5C9" texto="#FFFFFF" padrao="raio" :time="site.marca.toUpperCase()" numero="10" /></div>
          </div>
        </div>
      </section>

      <!-- serviços -->
      <section class="servicos claro">
        <div class="wrap serv-grid">
          <div class="serv-txt" data-sobe>
            <p class="sobretitulo">O que a gente faz</p>
            <h2>Tudo que o seu time precisa</h2>
            <p>Do desenho à entrega, cuidamos de cada etapa para o uniforme sair do jeito que o time sonhou: bonito, resistente e com a cara de vocês.</p>
            <a class="btn btn-escuro" :href="wa()" target="_blank" rel="noopener">Pedir orçamento <svg><use href="#i-seta" /></svg></a>
          </div>
          <div class="serv-cards" data-sobe>
            <article v-for="s in servicos" :key="s.t" class="serv-card">
              <span class="serv-ic"><svg><use :href="`#i-${s.i}`" /></svg></span>
              <div><h3>{{ s.t }}</h3><p>{{ s.d }}</p></div>
            </article>
          </div>
        </div>
      </section>

      <!-- coleção -->
      <section id="colecao" class="colecao">
        <div class="wrap">
          <div class="sec-head" data-sobe>
            <div><p class="sobretitulo">Coleção</p><h2>Modelos mais pedidos</h2></div>
            <a class="link-seta" href="#monte">Personalizar um modelo <svg><use href="#i-seta" /></svg></a>
          </div>
          <div class="col-grid" data-sobe>
            <button v-for="(x, i) in modelos" :key="x.time" type="button" class="col-card" @click="personalizar(i)">
              <span class="col-img"><Camisa lado="frente" :base="x.base" :detalhe="x.detalhe" :texto="x.texto" :contorno="x.contorno" :padrao="x.padrao" :time="x.time" numero="10" /></span>
              <span class="col-info"><b>{{ x.time }}</b><span>a partir de {{ x.preco }}</span></span>
              <span class="col-cta">Personalizar <svg><use href="#i-seta" /></svg></span>
            </button>
          </div>
        </div>
      </section>

      <!-- monte a sua -->
      <section id="monte" class="monte">
        <div class="wrap monte-grid">
          <div class="monte-camisa" data-sobe>
            <Pincelada class="pin pin-c" cor="#FF6A13" :forma="2" />
            <Camisa lado="costas" :base="modelos[m].base" :detalhe="modelos[m].detalhe" :texto="modelos[m].texto" :contorno="modelos[m].contorno" :padrao="modelos[m].padrao" :nome="nomeCostas" :numero="numCostas" />
          </div>
          <div class="monte-txt" data-sobe>
            <p class="sobretitulo">Monte a sua</p>
            <h2>Seu nome nas costas</h2>
            <p>Escolha o modelo, escreva o nome e o número. A prévia muda na hora.</p>
            <div class="modelos-mini" role="radiogroup" aria-label="Modelo">
              <button v-for="(x, i) in modelos" :key="x.time" type="button" role="radio" :aria-checked="m === i" :class="{ on: m === i }" :style="{ '--b': x.base, '--d': x.detalhe }" @click="m = i"><span />{{ x.time }}</button>
            </div>
            <div class="campos">
              <label>Nome<input v-model="nome" maxlength="12" autocomplete="off" placeholder="SEU NOME" @input="nome = nome.replace(/[^A-Za-zÀ-ÿ .]/g, '')"></label>
              <label>Número<input v-model="numero" inputmode="numeric" maxlength="2" autocomplete="off"></label>
            </div>
            <a class="btn btn-laranja" :href="pedir" target="_blank" rel="noopener"><svg><use href="#i-wa" /></svg> Pedir pelo WhatsApp</a>
            <p class="obs">Desenho de demonstração. O orçamento final sai pelo WhatsApp.</p>
          </div>
        </div>
      </section>

      <!-- sobre nós -->
      <!-- TODO: trocar pela história real da marca e pelo vídeo -->
      <section id="sobre" class="sobre claro">
        <div class="wrap sobre-grid">
          <div class="sobre-video" data-sobe>
            <iframe v-if="tocando && site.videoId" :src="`https://www.youtube-nocookie.com/embed/${site.videoId}?autoplay=1&rel=0`" title="Vídeo sobre a marca" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen />
            <button v-else type="button" class="video-capa" aria-label="Assistir ao vídeo sobre a marca" @click="tocando = true">
              <img :src="`${base}fotos/arquibancada.webp`" width="1400" height="1050" alt="" loading="lazy">
              <span class="video-camisa"><Camisa lado="costas" base="#14161C" detalhe="#FF6A13" texto="#FFFFFF" padrao="liso" nome="JUNTOS" numero="26" /></span>
              <span class="play"><svg><use href="#i-play" /></svg></span>
            </button>
          </div>
          <div class="sobre-txt" data-sobe>
            <p class="sobretitulo">Sobre nós</p>
            <h2>Mais que camisas: a identidade do seu time</h2>
            <p>A {{ site.marca }} nasceu de um time de várzea que nunca achava uniforme bonito e barato ao mesmo tempo. Hoje desenhamos e produzimos camisas para times de todo o Brasil, com o mesmo cuidado do primeiro pedido.</p>
            <p>Cada camisa passa por quatro mãos: quem desenha, quem estampa, quem costura e quem confere antes de embalar.</p>
            <ul class="sobre-lista"><li>Produção própria em {{ site.cidade }}</li><li>Sublimação total: a cor não sai</li><li>Atendimento direto pelo WhatsApp</li></ul>
          </div>
        </div>
      </section>

      <!-- confiança + avaliações -->
      <section id="avaliacoes" class="confianca claro">
        <div class="wrap conf-grid">
          <div class="conf-txt" data-sobe>
            <h2>Aprovado pelos times. Amado pelos jogadores.</h2>
            <p>Da escolinha ao campeonato amador, quem veste uma vez volta para a próxima temporada.</p>
            <dl class="numeros">
              <div v-for="n in numeros" :key="n.l"><dt>{{ n.v }}<svg v-if="n.estrela"><use href="#i-estrela" /></svg></dt><dd>{{ n.l }}</dd></div>
            </dl>
          </div>
          <div class="conf-fotos" data-sobe>
            <img :src="`${base}fotos/bola.webp`" width="900" height="600" alt="Bola de futebol na grama" loading="lazy">
            <img :src="`${base}fotos/rede.webp`" width="900" height="600" alt="Rede do gol vista de perto" loading="lazy">
            <img :src="`${base}fotos/gramado.webp`" width="1400" height="934" alt="Bola no meio do gramado" loading="lazy">
          </div>
        </div>
        <div class="wrap dep-grid" data-sobe>
          <figure v-for="a in avaliacoes" :key="a.n" class="dep">
            <span class="dep-estrelas" aria-label="5 de 5 estrelas"><svg v-for="k in 5" :key="k"><use href="#i-estrela" /></svg></span>
            <blockquote>“{{ a.t }}”</blockquote>
            <figcaption><b>{{ a.n }}</b><span>{{ a.c }}</span></figcaption>
          </figure>
        </div>
        <p class="wrap aviso">Números e avaliações de exemplo: substitua pelos dados reais e autorizados.</p>
      </section>

      <!-- dúvidas: placar -->
      <section id="duvidas" class="duvidas">
        <div class="wrap">
          <div class="sec-head"><div><p class="sobretitulo">Dúvidas</p><h2>Antes de entrar em campo</h2></div></div>
          <div class="placar">
            <div class="placar-lista" role="tablist" aria-label="Perguntas">
              <button v-for="(f, i) in faq" :key="f.q" type="button" role="tab" :aria-selected="pergunta === i" :class="{ on: pergunta === i }" @click="pergunta = i"><span class="placar-n" aria-hidden="true">{{ i + 1 }}</span>{{ f.q }}</button>
            </div>
            <div class="placar-painel" role="tabpanel" aria-live="polite">
              <Pincelada class="pin placar-pin" cor="#FF6A13" :forma="2" />
              <div class="placar-camisa"><Camisa lado="costas" base="#14161C" detalhe="#FF6A13" texto="#FFFFFF" padrao="liso" nome="DÚVIDA" :numero="String(pergunta + 1)" /></div>
              <Transition name="placar" mode="out-in">
                <div :key="pergunta" class="placar-txt"><h3>{{ faq[pergunta].q }}</h3><p>{{ faq[pergunta].a }}</p></div>
              </Transition>
              <a class="link-seta" :href="wa('Olá! Tenho uma dúvida sobre as camisas.')" target="_blank" rel="noopener">Outra dúvida? Chame no WhatsApp <svg><use href="#i-seta" /></svg></a>
            </div>
          </div>
        </div>
      </section>

      <!-- chamada final -->
      <section class="chamada">
        <div class="wrap cha-grid">
          <div data-sobe>
            <h2>Pronto para criar a camisa do seu time?</h2>
            <p>Mande a ideia pelo WhatsApp e receba o desenho e o orçamento sem compromisso.</p>
            <a class="btn btn-laranja" :href="wa()" target="_blank" rel="noopener"><svg><use href="#i-wa" /></svg> Começar agora</a>
          </div>
          <div class="cha-camisa" data-sobe><Pincelada class="pin pin-d" cor="#1FB5C9" :forma="1" /><Pincelada class="pin pin-e" cor="#FF6A13" :forma="3" /><Camisa lado="frente" base="#14161C" detalhe="#FF6A13" texto="#FFFFFF" padrao="raio" :time="site.marca.toUpperCase()" numero="10" /></div>
        </div>
      </section>
    </main>

    <footer class="rodape">
      <div class="wrap rod-grid">
        <div class="rod-marca">
          <a href="#" class="logo"><b>{{ site.marca }}</b><small>{{ site.slogan }}</small></a>
          <p>Camisas personalizadas para times de todo o Brasil.</p>
          <div class="rod-redes">
            <a :href="wa()" target="_blank" rel="noopener" aria-label="WhatsApp"><svg><use href="#i-wa" /></svg></a>
            <a :href="site.instagram" target="_blank" rel="noopener" aria-label="Instagram"><svg><use href="#i-ig" /></svg></a>
          </div>
        </div>
        <div><h3>Navegação</h3><a href="#inicio">Início</a><a href="#colecao">Modelos</a><a href="#monte">Monte a sua</a><a href="#sobre">Sobre nós</a></div>
        <div><h3>Atendimento</h3><a :href="wa()" target="_blank" rel="noopener">WhatsApp</a><a :href="site.instagram" target="_blank" rel="noopener">Instagram</a><a :href="`mailto:${site.email}`">{{ site.email }}</a></div>
        <div><h3>Empresa</h3><p>{{ site.marca }}<br>CNPJ {{ site.cnpj }}<br>{{ site.cidade }}</p></div>
      </div>
      <div class="wrap rod-final">
        <span>© {{ new Date().getFullYear() }} {{ site.marca }}. Todos os direitos reservados.</span>
        <span class="creditos">Fotos de ambientação: Adam Jones (CC BY-SA 2.0, via Wikimedia Commons) e rawpixel (CC0).</span>
        <a class="rod-credito" href="https://www.ontrackagenciadigital.com.br/" target="_blank" rel="noopener">Desenvolvido por <b>OnTrack Agência Digital</b></a>
      </div>
    </footer>
  </div>
</template>
