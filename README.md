# AnimePulse

Plateforme web pour fans d'anime qui permet de **découvrir des animes**, **gérer ses listes** (Watching/Completed/etc.), **suivre sa progression**, **noter** des séries, et **accéder à des liens de streaming légaux**.

---

## Équipe — Les Espadas

| Membre | Rôle |
|--------|------|
| **Abdul Rahman Zahid** | Scrum Master / Développeur back-end / Développeur front-end |
| **Lauvens Simon** | Développeur back-end |
| **Elijah-Mbuyi Tshinyambala** | Développeur back-end |
| **Adel Tamani** | Développeur back-end |
| **Diane Devi** | Testeuse / QA |

**Cours :** Projet de fin d'études — Technique Informatique
**Date :** Janvier 2026
**Version :** 1.0

---

## Fonctionnalités (MVP visé)

- Authentification (email + SSO)
- Découverte (populaires / tendances)
- Recherche par titre
- Filtrage par genre
- Page détail anime (infos, synopsis, trailer si disponible)
- Listes : **Watching / Completed / Plan to Watch / On Hold / Dropped**
- Notation **1 à 10**
- Progression d'épisodes
- Profil utilisateur (public/privé)
- Liens vers plateformes de streaming partenaires

> Certaines fonctionnalités peuvent être ajustées pendant les sprints.

---

## Tech Stack

| Catégorie | Technologie |
|-----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI** | Tailwind CSS + shadcn/ui |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma 7 |
| **Auth** | Better Auth (JWT + OAuth Google/Discord) |
| **Validation** | Zod |
| **API externe** | Jikan (MyAnimeList) |
| **Déploiement** | Vercel |

---

## Prérequis

- [Bun](https://bun.sh/) (v1.0+)
- [Git](https://git-scm.com/)

---

## Démarrage local

### 1. Installer Bun

**Windows (PowerShell):**
```powershell
irm bun.sh/install.ps1 | iex
```

**macOS/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

Vérifie l'installation:
```bash
bun --version
```

### 2. Cloner le projet

```bash
git clone https://github.com/[VOTRE-REPO]/animepulse.git
cd animepulse
```

### 3. Installer les dépendances

```bash
bun install
```

### 4. Configurer les variables d'environnement

Copie le fichier d'exemple:
```bash
cp .env.example .env
```

Remplis les valeurs dans `.env`:
```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="une-clé-secrète-de-32-caractères"
BETTER_AUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 5. Initialiser la base de données

```bash
bunx prisma db push
bunx prisma generate
```

### 6. Lancer le serveur de développement

```bash
bun dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `bun dev` | Lancer le serveur de dev |
| `bun build` | Build de production |
| `bun start` | Lancer le build de production |
| `bun lint` | Vérifier le code avec ESLint |
| `bunx prisma studio` | Interface visuelle pour la DB |
| `bunx prisma db push` | Synchroniser le schéma avec la DB |
| `bunx prisma generate` | Générer le client Prisma |

---

## Structure du projet

```
animepulse/
├── prisma/
│   └── schema.prisma      # Schéma de la base de données
├── src/
│   ├── app/               # Pages et routes API (App Router)
│   ├── components/        # Composants React
│   ├── lib/               # Utilitaires (db, auth, etc.)
│   └── types/             # Types TypeScript
├── .env                   # Variables d'environnement (local)
├── .env.example           # Template des variables
└── package.json
```

---

## Tests

À venir (Diane - QA).

---

## Gestion de projet

- **Méthode :** Agile / Scrum (sprints)
- **Outils :** GitHub Projects

---

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Jikan API Documentation](https://docs.api.jikan.moe/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

---

## Licence

À venir.
