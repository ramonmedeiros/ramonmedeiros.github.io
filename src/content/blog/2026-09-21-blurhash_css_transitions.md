---
layout: post
title: "BlurHash and CSS transitions for image loading"
description: "Ship a blurred placeholder in the API response instead of an empty box"
date: 2026-09-21 10:00:00 +0200
keywords:
  - blurhash
  - css
  - images
  - frontend
---

# BlurHash and CSS transitions for image loading

On [Find a Cocktail][findacocktail] every cocktail has a photo. The list loads fast, the images do not: for a moment the page is a grid of empty grey boxes, and then the pictures pop in one by one.

The usual fix is a thumbnail, but that is one more request per image. [BlurHash][blurhash] avoids it: you encode the image once into a short string, around 30 characters, and send it in the same JSON that already carries the image URL. No extra round trip.

The backend does it at upload time, [in this PR][pr]. It decodes the uploaded image, encodes the hash with a small component count (4x3 is enough), and stores it in the same row as the image. The API just returns one more field.

The client decodes the hash into a tiny canvas, paints it as the background, and lets CSS do the rest:

```css
.cocktail-image {
  opacity: 0;
  transition: opacity 300ms ease-in;
}

.cocktail-image.loaded {
  opacity: 1;
}
```

The `loaded` class comes from the image's `load` event. The blurred version sits behind, the real one fades over it.

Some things worth knowing:

- Encode once, on upload. Doing it per request burns CPU on something that never changes.
- Reserve the space with an aspect ratio, otherwise the layout still jumps.
- The hash is useless without dimensions, so return width and height too.
- It is a blur, not a preview. Any text in the image is gone.

[findacocktail]: https://www.findacocktail.com
[blurhash]: https://blurha.sh/
[pr]: https://github.com/findacocktail/backend/pull/8
