// Importa las bibliotecas necesarias
const Instagram = require("instagram-web-api");
const Bard = require("@google-cloud/language-v1");

// Define las variables de configuración
const username = "dc_electricista";
const password = "tu_contraseña";
const interval = 60 * 60; // 1 hora

// Inicializa la API de Instagram
const instagram = new Instagram({
  username,
  password,
});

// Obtiene la última publicación
const lastPost = await instagram.getMediaById(instagram.getSelfProfile().id);

// Crea la nueva publicación
const post = new Instagram.Media();

// Genera una leyenda
const caption = await Bard.text({
  prompt: "¡Llama a DC Electricista para obtener un presupuesto gratuito!",
  max_length: 250,
});

// Genera una imagen
const image = await Bard.image({
  topic: "electricista",
  width: 1080,
  height: 1080,
  color: "#ffffff",
});

// Actualiza la publicación
post.setCaption(caption);
post.setLocation(image.location.name);
post.setTags(["electricista", "san miguel", "buenos aires"]);
post.setMedia(image.url);

// Publica la nueva publicación
await instagram.postMedia(post);

// Espera hasta la próxima publicación
setTimeout(() => {
  console.log("Publicación publicada con éxito.");
}, interval * 1000);
