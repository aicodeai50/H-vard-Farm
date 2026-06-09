# Property photos

Original WhatsApp photos live in `_source/whatsapp/`. Older FINN screenshot crops are in `_screenshots/`.

Import new WhatsApp originals:

```bash
npm run import-photos
```

Regenerate screenshot crops (legacy):

```bash
npm run crop-photos
```

| File | Use |
|------|-----|
| `farm-yard.jpg` | Farmyard · red barn, festoon lights |
| `farm-overview.jpg` | Homepage hero, OG share image |
| `hero-barn.jpg` | Bryllup page hero |
| `barn-exterior-red.jpg` | Barn exterior · side view |
| `barn-cinema.jpg` | Cinema & media room |
| `barn-pool.jpg` | Games room · pool table |
| `barn-games.jpg` | Activity room · air hockey |
| `grounds.jpg` | Alias of farm-yard (outdoor) |

| `finn-estate.jpg` | FINN · historic estate exterior |
| `finn-pool.jpg` | FINN · heated pool 12×6 m |
| `finn-barn-hall.jpg` | FINN · event barn interior |

Import from FINN listing (requires `finn-page.html` saved locally):

```bash
npm run fetch-finn-photos
```
