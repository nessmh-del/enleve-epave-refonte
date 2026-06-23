# Enlève Épave — Site de présentation (refonte)

Refonte moderne, animée et mobile-first du site d'enlèvement d'épaves / VHU en Île-de-France.
Conçu pour la conversion : appel direct mis en avant, barre d'appel collante sur mobile,
réassurance accolée aux CTA, structure AIDA.

## Stack
- HTML / CSS vanilla (design system maison)
- [GSAP + ScrollTrigger](https://gsap.com/) pour les animations
- Polices premium via [Fontshare](https://www.fontshare.com/) (Clash Display, General Sans)
- 100 % statique — aucun build nécessaire

## Structure
```
index.html          # Page unique
assets/style.css    # Design system + responsive
assets/main.js      # Interactions & animations
```

## Lancer en local
```bash
python3 -m http.server 4321
# puis ouvrir http://localhost:4321
```

## Déploiement
Site statique : déployable tel quel sur Vercel, Netlify ou Cloudflare Pages
(aucune commande de build, dossier racine = sortie).

---
Contenu (coordonnées, zones, formalités) repris du site existant et retravaillé.
Avant mise en production : brancher le formulaire à un email/CRM et ajouter des photos réelles.
