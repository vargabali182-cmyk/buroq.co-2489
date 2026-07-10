# Event Bus — Message Format

All agent messages must conform to this minimal JSON envelope:

{
  "id": "uuid-v4",
  "topic": "topic.name",
  "source": "agent-name",
  "timestamp": "ISO-8601",
  "requiresApproval": false,
  "payload": { /* topic-specific content */ },
  "metadata": { /* optional: confidence, links, attachments */ }
}

Field definitions:
- `id`: unique message id (UUID v4)
- `topic`: one of topics in `bus/event-topics.md`
- `source`: publishing agent id (e.g., max-boss-agent)
- `timestamp`: ISO 8601 UTC timestamp
- `requiresApproval`: boolean, true if action must not proceed without owner approval
- `payload`: topic-specific structured data
- `metadata`: helpful links, file references, or confidence scores

Approval flow convention:
- If `requiresApproval` is true, the message must include an `approvalActions` array in `payload` outlining explicit owner choices and consequences.
