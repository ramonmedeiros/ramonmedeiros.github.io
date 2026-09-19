---
layout: post
title: "Claude Code /low-priority command"
description: "Keep working after hitting the usage limit"
date: 2026-09-19 11:00:00 +0200
keywords:
  - claude
  - claude-code
  - ai
  - low-priority
---

# Claude Code /low-priority command

I was testing the [Claude Security plugin](claude_security) on a repository. A full scan spawns lots of agents, so I ran out of credits halfway.

Claude Code showed this:

```text
⚠ Usage limit reached · continuing automatically at 12pm · esc to cancel
  ⚠ /low-priority to continue now at lower priority · uses your weekly limit
```

Two options:

- Wait until 12pm and Claude continues by itself.
- Run `/low-priority` and continue now.

I ran `/low-priority`. Claude answered:

```text
Continuing now at lower priority until your limit resets at 12pm. Your weekly limit still applies, and responses may pause while waiting for spare capacity. Run /low-priority to stop.
```

The trade-offs:

- Requests use spare capacity, so responses can pause.
- It consumes the weekly limit.
- It ends at the reset. Running `/low-priority` again stops it before that.

[claude_security]: https://code.claude.com/docs/en/claude-security
