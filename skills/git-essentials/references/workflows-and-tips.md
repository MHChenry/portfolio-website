# Workflows & Tips

## Common Workflows

**Feature branch workflow:**
```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push -u origin feature/new-feature
# Create PR, then after merge:
git checkout main
git pull
git branch -d feature/new-feature
```

**Hotfix workflow:**
```bash
git checkout main
git pull
git checkout -b hotfix/critical-bug
# Fix bug
git commit -am "Fix critical bug"
git push -u origin hotfix/critical-bug
# After merge:
git checkout main && git pull
```

**Syncing fork:**
```bash
git remote add upstream https://github.com/original/repo.git
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Useful Aliases

Add to `~/.gitconfig`:
```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = log --graph --oneline --all
    amend = commit --amend --no-edit
```

## Tips

- Commit often, perfect later (interactive rebase)
- Write meaningful commit messages
- Use `.gitignore` for files to exclude
- Never force push to shared branches
- Pull before starting work
- Use feature branches, not main
- Rebase feature branches before merging
- Use `--force-with-lease` instead of `--force`

## Common Issues

**Undo accidental commit:**
```bash
git reset --soft HEAD~1
```

**Recover deleted branch:**
```bash
git reflog
git checkout -b branch-name <commit-hash>
```

**Fix wrong commit message:**
```bash
git commit --amend -m "Correct message"
```

**Resolve merge conflicts:**
```bash
# Edit files to resolve conflicts
git add resolved-files
git commit  # Or git merge --continue
```

## Documentation

Official docs: https://git-scm.com/doc
Pro Git book: https://git-scm.com/book
Visual Git guide: https://marklodato.github.io/visual-git-guide/
