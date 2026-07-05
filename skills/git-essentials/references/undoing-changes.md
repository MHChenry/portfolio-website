# Undoing Changes

## Working directory

```bash
# Discard changes in file
git restore file.txt
git checkout -- file.txt  # Old way

# Discard all changes
git restore .
```

## Staging area

```bash
# Unstage file
git restore --staged file.txt
git reset HEAD file.txt  # Old way

# Unstage all
git reset
```

## Commits

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert commit (create new commit)
git revert commit-hash

# Reset to specific commit
git reset --hard commit-hash
```
