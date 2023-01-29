<script>
  import { setContext, createEventDispatcher, onMount } from 'svelte'
  import Parser from './Parser.svelte'
  import { Lexer, Slugger, defaultOptions, defaultRenderers } from './markdown-parser'
  import { key } from './context'
    import { children } from 'svelte/internal'
    import Heading from './renderers/Heading.svelte'

  export let source = []
  export let renderers = {}
  export let options = {}
  export let isInline = false

  const dispatch = createEventDispatcher();

  let tokens;
  let slides = [];
  let lexer;
  let mounted;

  $: preprocessed = Array.isArray(source)
  $: slugger = source ? new Slugger : undefined
  $: combinedOptions = { ...defaultOptions, ...options }
  $: if (preprocessed) {
    tokens = source
  } else {
    lexer = new Lexer(combinedOptions)
    tokens = isInline ? lexer.inlineTokens(source) : lexer.lex(source)

    let section
    let lastSlide
    let introSlide = {
          type: "section",
          depth: 1,
          children: []
        }

    let isChapter = false

    tokens.forEach(token => {
      if (token.type==="heading" && token.depth===2) {
        isChapter = true
        
        // This is where we parse ID
        
        section = {
          type: "section",
          depth: token.depth,
          children: [token],
          id: "section-" + token.text
        }

        slides.push(section)

        lastSlide = section
      } else if (isChapter) {
        lastSlide.children.push(token)
      } else {
        // Its the intro slide
        introSlide.children.push(token)
      }
    });
    
    tokens = []
    tokens = [introSlide, ...slides]

    dispatch('parsed', { tokens })
  }

  $: combinedRenderers = { ...defaultRenderers, ...renderers }

  setContext(key, {
    slug: (val) => slugger ? slugger.slug(val) : '',
    getOptions: () => combinedOptions
  })
  $: mounted && !preprocessed && dispatch('parsed', { tokens })

  onMount(() => {
    mounted = true
  });
</script>

<Parser {tokens} renderers={combinedRenderers} />
