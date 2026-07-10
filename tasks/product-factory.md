# Tasks — Product Factory

Purpose: run low-cost experiments and validate new small-product ideas.

Template for every idea:
- title: short name
- demand signal: list of data points or `trend.found` references
- competition: short competitor snapshot
- estimated price: suggested price point(s)
- effort level: low / medium / high
- risk: low / medium / high
- next action: concrete next step (design mock, validation ad, prototype)

Process:
1. `trend-research-agent` publishes `trend.found` when a signal appears.
2. `product-factory-agent` creates `product.idea` with the template fields.
3. `design-agent` and `content-agent` prepare assets and copy; `finance-agent` runs `finance.margin_check`.
4. `etsy-listing-agent` prepares `etsy.draft_ready` for owner review.
5. Owner approval required for publishing or paid spend.

Example idea (template filled):
- title: Beach Poster Template
- demand signal: Pinterest saves rising for beach wall art (link)
- competition: 10 similar listings with average price $9.99
- estimated price: $7–12
- effort level: low
- risk: low
- next action: design 3 mockups and prepare Etsy draft
