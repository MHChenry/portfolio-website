# History & Logs

## Viewing history

```bash
# Show commit history
git log

# One line per commit
git log --oneline

# With graph
git log --graph --oneline --all

# Last N commits
git log -5

# Commits by author
git log --author="Name"

# Commits in date range
git log --since="2 weeks ago"
git log --until="2024-01-01"

# File history
git log -- file.txt
```

## Searching history

```bash
# Search commit messages
git log --grep="bug fix"

# Search code changes
git log -S "function_name"

# Show who changed each line
git blame file.txt

# Find commit that introduced bug
git bisect start
git bisect bad
git bisect good commit-hash
```
