# PsyQuizz Project Rules & Workflows

## Git Commit & Push Workflow
- **Do NOT push to Git automatically:** Never commit or push to Git after a normal prompt or coding turn unless the user explicitly requests it.
- **Explicit Trigger Only:** Only execute Git operations when the user specifically commands it (e.g., *"update lên git đi"*, *"push git"*, *"push lên repo"*).
- **When requested to push:**
  1. Inspect changes with `git status`.
  2. Write an accurate, concise, and professional commit description in Conventional Commits format summarizing all updates made.
  3. Execute `git add .`, `git commit -m "..."`, and `git push origin main`.
  4. Confirm the pushed commit hash and brief description to the user.
