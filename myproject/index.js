addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */



async function handleRequest(request) {
  const url = 'https://cfw-takehome.developers.workers.dev/api/variants';
  const response = await fetch(url) .then(res => res.json()) 
  var variants= [];
  variants = response['variants'];
  var variantValue = Math.round(Math.random());
  var htmlResponse = await fetch(variants[variantValue]);
  var changeHtml =  new HTMLRewriter().on('title', {element(element){
  	element.setInnerContent("Displaying variant"+(variantValue+1));
  }}).on('h1#title', {element(element){
  	element.setInnerContent("Displaying heading for variant"+(variantValue+1));
  }}).on('p#description', {element(element){
  	element.setInnerContent("Cloudflare full stack developer assignment");
  }}).on('a#url', {element(element){
  	element.setInnerContent("Checkout my work");
  	element.setAttribute("href","https://sinthu-kumarasamy.github.io/");
  }}).transform(htmlResponse);
  return changeHtml;
}
