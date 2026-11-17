---
layout: post
title: "Trying to create a 3D game without experience with LLMs"
description: "Vibecoding a browser 3D game and learning why assets are the hard part"
date: 2026-11-17 10:00:00 +0200
keywords:
  - llm
  - gamedev
  - 3d
  - vibecoding
---

I recently got a feeling to build a game on the browser. After so many ports getting famous lately, such as minicar.racing or nsfu2 (unfortunately hacked at the moment). But, building 3D assets is no joke, you can't just prompt it away right now.

As any vibecoder, I started that way, discussing with my agentic coding tool which stack to build, choosing tools and so on. After committing the first decisions, creating a long plan and running the first iteration, there was one phase of the game running, but the 3D assets were super poor.

So then, what is the difference to make them look great? Well, it was quite a huge one.

I started bringing assets from libraries and iterating with them, the same way we build backend: just plug in libraries and make everything work. Well, it did not. So then I started researching: how can I actually make a character or a map with high quality? The answer was very long, which explains why a AAA game takes so long.

Given that, I had to actually implement a pipeline for the LLM, so it could loop through it. Cool thing is, there are already papers for this case, such as LLM3.

It's moments like this we learn the importance of domain knowledge, previous experience and skin in the game. We are still not there, where anyone can build anything, but definitely, you can learn a lot with the tools we have.
