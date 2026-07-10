# Max OS v0.1

Max OS is a founder-led, Jarvis-style AI operating system for BUROQ. The boss agent is named Max. Max OS coordinates specialist department agents that collaborate through a shared event bus. Max acts as the single point of summarization, prioritization, and owner-facing approvals.

How Max delegates work
- `Max` ingests signals from the event bus and specialist agents.
- `Max` summarizes context, sets priorities, and delegates discrete tasks to department agents.
- For any action that could publish, spend, commit, or make irreversible changes, `Max` escalates to `human.approval_required` and waits for explicit owner confirmation.

How departments communicate
- Departments publish and subscribe to topics on the shared event bus.
- Messages follow the structured schema in `bus/message-format.md` and use the canonical topic list in `bus/event-topics.md`.
- Departments return outputs as events, artifacts, or approval requests that other agents may consume.

How the event bus works
- The event bus provides named topics (see `bus/event-topics.md`).
- Agents publish messages to topics; subscribers react, transform, or produce follow-ups.
- Messages include `source`, `topic`, `timestamp`, `payload`, and `requiresApproval` where relevant.

How owner approval works
- Hard rule: No agent may publish listings, spend money, contact suppliers, send customer emails, deploy code, or make irreversible decisions without explicit owner approval.
- Approval flow: an agent publishes a `human.approval_required` event with a clear summary and action options. `Max` collects context and requests the owner’s decision. Owner responds explicitly; agents only proceed when a valid approval event is received.

Using Max OS for BUROQ
- Use Max to coordinate product development for the AETRO line (AETRO Lite first).
- Design and web work can be prepared in drafts; nothing that publishes or charges customers happens without owner consent.

Using Max OS for Product Factory
- Product Factory runs rapid, low-cost experiments (digital products, templates, mockups, Etsy-safe ideas).
- Each Product Factory idea must include: demand signal, competition, estimated price, effort level, risk, and the next action.
- Product Factory ideas are emitted as `product.idea` events and validated through `product.validated` or escalated for approval.

Repository note: These files are documentation and operating-system definitions only. Website/app code was intentionally not modified.
