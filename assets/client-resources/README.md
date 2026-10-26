# Client resource packs

Signal-branded cards for the Content Hub **Resources** pane (Full screen).
Each pack is a folder of images plus a `manifest.json`. Hub maps
`scripts.client_slug` → pack folder and shows the cards without a database write.

## Layout

```
assets/client-resources/<pack-slug>/
  manifest.json     # [{id, title, body_md, image, image_hub, tags, admin_only, order, client}]
  hub/*.png         # 720×900 sidebar crops (preferred in the drawer)
  png/*.png         # 1080×1350 full cards
```

## Add another client (Andrew / Devin / Sagun)

1. Copy `jan-rla/` to `<pack-slug>/` and replace the six cards + `manifest.json`.
2. In `index.html`, add the client slug to `CLIENT_RESOURCE_PACKS`
   (`andrew: 'andrew'`) and paste that pack’s manifest array into
   `CLIENT_RESOURCE_MANIFESTS`.
3. Keep `admin_only: true` on review-aid cards. Clients never see those, and
   they never see Audit.

Jan / Rich Life Academy is wired as `jan` and `jan-rla` → `jan-rla`.
Per-script `scripts.client_resources` can still add or override cards
(same rich-card shape, or the older thesis / formats text shapes).
