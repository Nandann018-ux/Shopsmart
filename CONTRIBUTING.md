# Contribution Guidelines & Commit Strategy

Welcome to the **UrbanGear / Shopsmart** project! To maintain a high-quality codebase and efficient collaboration, we follow a strict commit strategy based on the **Conventional Commits** specification.

## Commit Strategy Rules

### 1. Conventional Commits
All commit messages must follow the standard prefix format to clearly communicate the intent of the change:

- `feat:` — A new feature for the user, not a new feature for a build script.
- `fix:` — A bug fix for the user, not a fix to a build script.
- `chore:` — Routine tasks, maintenance, documentation, or library updates.
- `refactor:` — A code change that neither fixes a bug nor adds a feature.
- `test:` — Adding missing tests or correcting existing tests.

**Example:**
- `feat: add neon glow to product cards`
- `fix: resolve responsive layout shift on mobile`
- `chore: update github actions for server tests`

### 2. Atomic Commits
Every commit must represent **ONE logical change**. 
- **Rule:** If a commit contains multiple unrelated changes, it should be broken down into smaller, individual commits.
- **Why?** Small, focused commits make it easier to review code, troubleshoot regressions, and revert specific changes if needed.

### 3. Avoid Large Commits
Avoid "Mega-commits" that span dozens of files or multiple features. 
- **Guideline:** Aim for commits that are easy to understand at a glance. If your PR is too large, consider breaking it into multiple smaller PRs or logical sub-steps.

---

## Technical Guidelines

- **Testing**: Ensure that `npm test` passes in the `server` directory before pushing.
- **Linting**: Ensure code follows established styling patterns (TailwindCSS for styling, React for front-end).
- **CI/CD**: Remember that the project uses an automated rollback mechanism; failing tests on `main` will result in an automatic revert.

---

Thank you for contributing to UrbanGear! For any major architectural changes, please open an issue first for discussion.
