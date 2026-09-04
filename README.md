# Rising Souls · B × D

## Landing Page Collection

Three complete responsive landing-page directions are available at [landing/](landing/):

- [Nocturne](landing/nocturne.html): cinematic charcoal, bronze sculpture and immersive product preview.
- [Ember](landing/ember.html): photo-led copper editorial with the real Rising Souls team.
- [Atelier](landing/atelier.html): warm ivory, sculptural art and an espresso dashboard.

Each direction includes functional section navigation, keyboard-accessible app-preview tabs, interactive sample tasks, mobile layouts, reduced-motion support and a comparison switcher. CTAs open the existing app prototypes; these design studies do not register users or collect personal data.

Custom artwork was generated using the built-in image-generation tool. [Asset notes and final prompts](landing/ARTWORK.md). Team photography comes from the existing Rising Souls landing asset library. The previous app prototypes are preserved.

Four interactive design studies combining Nocturne's dark atmosphere with Atelier's Urbanist headlines/body and Unbounded numeric typography.

- **Nocturne**: centered orbital progress, restrained dark surfaces.
- **Ember**: asymmetric composition, copper light, warm glass.
- **Halo**: champagne illumination, suspended ring, frosted panels.
- **Studio**: espresso canvas, structured rows, cream focal cards.

Each has Home, Mein Weg, Community, Academy, Chat and Profil screens. Task completion, goal progress, celebration, filters and preview dialogs are local demo interactions. No backend calls or messages are sent. Google Fonts is the only third-party dependency; system fonts are the fallback.

The previous B/D/E/F study is preserved at `previous.html`.

## Edit and preview

Run `python3 -m http.server 8766 --bind 127.0.0.1` from this directory and visit `http://127.0.0.1:8766/`.

- `index.html`: comparison interface and app shell.
- `styles.css`: shared tokens, four visual variants, responsive framing.
- `app.js`: Home, icon library, navigation and demo interactions.
- `pages.js`, `pages.css`: five secondary screens and matching styles.

Direct selection: `#v=ember&p=home`. Other variant values: `nocturne`, `halo`, `studio`; page values: `home`, `weg`, `community`, `academy`, `chat`, `profil`.

GitHub Pages publishes the root of `main`. There is no build step. Keep `.nojekyll` and `assets/`.
