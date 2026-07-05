---
name: git-essentials
version: 1.0.0
description: Essential Git commands and workflows for version control, branching, and collaboration.
source: easyclaw
metadata: {"clawdbot":{"emoji":"🌳","requires":{"bins":["git"]}},"easyclaw":{"skillId":"17741010805684250","fileId":"611649446286994032","category":"开发技术","author":"运营导入","coverUrl":"https://aibot-data-cdn.easyclaw.cn/public/skill/20260330/612912387107858847/reupload_17741010805684250.png"}}
---
# Git Essentials

Essential Git commands for version control and collaboration.

## Initial Setup

```bash
# Configure user
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Initialize repository
git init

# Clone repository
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git custom-name
```

## Basic Workflow

### Staging and committing
```bash
# Check status
git status

# Add files to staging
git add file.txt
git add .
git add -A  # All changes including deletions

# Commit changes
git commit -m "Commit message"

# Add and commit in one step
git commit -am "Message"

# Amend last commit
git commit --amend -m "New message"
git commit --amend --no-edit  # Keep message
```

### Viewing changes
```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged

# Show changes in specific file
git diff file.txt

# Show changes between commits
git diff commit1 commit2
```

## Branching & Merging

### Branch management
```bash
# List branches
git branch
git branch -a  # Include remote branches

# Create branch
git branch feature-name

# Switch branch
git checkout feature-name
git switch feature-name  # Modern alternative

# Create and switch
git checkout -b feature-name
git switch -c feature-name

# Delete branch
git branch -d branch-name
git branch -D branch-name  # Force delete

# Rename branch
git branch -m old-name new-name
```

### Merging
```bash
# Merge branch into current
git merge feature-name

# Merge with no fast-forward
git merge --no-ff feature-name

# Abort merge
git merge --abort

# Show merge conflicts
git diff --name-only --diff-filter=U
```

## Remote Operations

### Managing remotes
```bash
# List remotes
git remote -v

# Add remote
git remote add origin https://github.com/user/repo.git

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git

# Remove remote
git remote remove origin
```

### Syncing with remote
```bash
# Fetch from remote
git fetch origin

# Pull changes (fetch + merge)
git pull

# Pull with rebase
git pull --rebase

# Push changes
git push

# Push new branch
git push -u origin branch-name

# Force push (careful!)
git push --force-with-lease
```

## More Commands

For additional commands, refer to:
- `references/history-and-search.md` — git log, blame, bisect, searching history
- `references/undoing-changes.md` — restore, reset, revert, unstaging
- `references/advanced-operations.md` — stash, rebase, tags, cherry-pick, submodules, clean
- `references/workflows-and-tips.md` — feature/hotfix workflows, aliases, tips, common issues

## Data Presentation

After running commands, clean and format the output before presenting to the user:

1. **Clean raw data** — Strip any terminal color codes, ANSI escape sequences, or markup. The user should never see raw control characters.
2. **Use plain Markdown only** — Present data using Markdown text, tables, or lists. Do not use LaTeX, MathML, KaTeX, or any math-mode formatting.
3. **Match the user's intent** — Choose the presentation style based on what was asked:
   - Status/diff → code block
   - Log/history → table or formatted list
   - Branch list → simple list
