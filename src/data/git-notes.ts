import type { GitCategory, GitTip } from "./types";

export const gitCategories: GitCategory[] = [
  {
    id: "setup",
    label: "Setup",
    description: "One-time config, aliases, and credential helpers.",
    groups: [
      {
        title: "User & Editor",
        commands: [
          {
            caption: "Global identity",
            command: 'git config --global user.name "Jane Dev"',
          },
          {
            caption: "Global email",
            command: "git config --global user.email jane@example.com",
          },
          {
            caption: "Default editor",
            command: 'git config --global core.editor "code --wait"',
          },
          {
            caption: "Default branch on init",
            command: "git config --global init.defaultBranch main",
          },
          {
            caption: "Sensible pull behaviour",
            command: "git config --global pull.rebase true",
          },
          {
            caption: "Auto-stash during rebase",
            command: "git config --global rebase.autostash true",
          },
        ],
      },
      {
        title: "Aliases worth having",
        commands: [
          {
            caption: "Short status",
            command: 'git config --global alias.s "status -sb"',
          },
          {
            caption: "Pretty graph log",
            command:
              'git config --global alias.lg "log --graph --oneline --decorate --all"',
          },
          {
            caption: "Amend with previous message",
            command:
              'git config --global alias.amend "commit --amend --no-edit"',
          },
          {
            caption: "Unstage a file",
            command: 'git config --global alias.unstage "reset HEAD --"',
          },
        ],
      },
      {
        title: "Credentials & SSH",
        commands: [
          {
            caption: "Credential helper (macOS)",
            command: "git config --global credential.helper osxkeychain",
          },
          {
            caption: "Credential helper (Windows)",
            command: "git config --global credential.helper manager",
          },
          {
            caption: "Credential cache (Linux)",
            command:
              'git config --global credential.helper "cache --timeout=7200"',
          },
          { caption: "Test SSH to GitHub", command: "ssh -T git@github.com" },
          {
            caption: "Sign commits (GPG)",
            command: "git config --global commit.gpgsign true",
          },
        ],
      },
      {
        title: "Inspect config",
        commands: [
          {
            caption: "Show all with sources",
            command: "git config --list --show-origin",
          },
          {
            caption: "Per-repo override",
            command: "git config --local user.email jane@work.com",
          },
          {
            caption: "Unset a key",
            command: "git config --global --unset alias.s",
          },
        ],
      },
    ],
  },
  {
    id: "basics",
    label: "Basics",
    description: "Starting a repo, staging, committing, inspecting.",
    groups: [
      {
        title: "Start a repo",
        commands: [
          {
            caption: "Init (modern default branch)",
            command: "git init --initial-branch=main",
          },
          {
            caption: "Clone",
            command: "git clone https://github.com/owner/repo.git",
          },
          {
            caption: "Shallow clone (CI-fast)",
            command: "git clone --depth 1 <url>",
          },
          {
            caption: "Single branch only",
            command: "git clone --single-branch --branch main <url>",
          },
          {
            caption: "Blobless partial clone",
            command: "git clone --filter=blob:none <url>",
          },
        ],
      },
      {
        title: "Stage & Commit",
        commands: [
          { caption: "Short status with branch", command: "git status -sb" },
          { caption: "Stage a specific file", command: "git add path/to/file" },
          { caption: "Interactive hunk staging", command: "git add -p" },
          { caption: "Stage all tracked + new", command: "git add -A" },
          {
            caption: "Commit with subject",
            command: 'git commit -m "feat: add login"',
          },
          {
            caption: "Amend keeping message",
            command: "git commit --amend --no-edit",
          },
          {
            caption: "Empty commit (trigger CI)",
            command: 'git commit --allow-empty -m "chore: rebuild"',
          },
        ],
      },
      {
        title: "Inspect changes",
        commands: [
          { caption: "Unstaged diff", command: "git diff" },
          { caption: "Staged diff", command: "git diff --cached" },
          {
            caption: "Branch vs main (since divergence)",
            command: "git diff main...HEAD",
          },
          {
            caption: "Just changed file names",
            command: "git diff --name-only main...HEAD",
          },
          { caption: "Word-level diff", command: "git diff --word-diff" },
        ],
      },
    ],
  },
  {
    id: "branches",
    label: "Branches",
    description: "Create, switch, track, and delete branches.",
    groups: [
      {
        title: "List & Create",
        commands: [
          { caption: "List local", command: "git branch" },
          { caption: "List all (incl. remotes)", command: "git branch -a" },
          { caption: "Last commit per branch", command: "git branch -v" },
          {
            caption: "Create + switch",
            command: "git switch -c feature/login",
          },
          {
            caption: "Branch from a tag / SHA",
            command: "git switch -c hotfix v1.2.3",
          },
          { caption: "Rename current", command: "git branch -m new-name" },
        ],
      },
      {
        title: "Switch & Track",
        commands: [
          { caption: "Switch branch", command: "git switch main" },
          { caption: "Jump back to previous", command: "git switch -" },
          {
            caption: "Detach HEAD at a SHA",
            command: "git switch --detach <sha>",
          },
          {
            caption: "Set upstream on first push",
            command: "git push -u origin HEAD",
          },
          {
            caption: "Track an existing remote branch",
            command: "git switch --track origin/feature-x",
          },
        ],
      },
      {
        title: "Delete",
        commands: [
          {
            caption: "Delete (only if merged)",
            command: "git branch -d feature/login",
          },
          {
            caption: "Force delete local",
            command: "git branch -D feature/login",
          },
          {
            caption: "Delete remote branch",
            command: "git push origin --delete feature/login",
          },
          {
            caption: "Prune deleted remote refs",
            command: "git fetch --prune",
          },
        ],
      },
    ],
  },
  {
    id: "remotes",
    label: "Remotes",
    description: "Fetch, pull, and push safely.",
    groups: [
      {
        title: "Remotes",
        commands: [
          { caption: "List with URLs", command: "git remote -v" },
          {
            caption: "Add an upstream",
            command:
              "git remote add upstream https://github.com/upstream/repo.git",
          },
          { caption: "Rename", command: "git remote rename old new" },
          {
            caption: "Change URL",
            command: "git remote set-url origin git@github.com:owner/repo.git",
          },
          { caption: "Remove", command: "git remote remove upstream" },
        ],
      },
      {
        title: "Sync",
        commands: [
          { caption: "Fetch one remote", command: "git fetch origin" },
          { caption: "Fetch all + prune", command: "git fetch --all --prune" },
          { caption: "Pull with rebase", command: "git pull --rebase" },
          {
            caption: "Push + set upstream",
            command: "git push -u origin HEAD",
          },
          { caption: "Push all branches", command: "git push --all" },
          { caption: "Push tags", command: "git push --tags" },
        ],
      },
      {
        title: "Force push (safely)",
        intro:
          "Always prefer --force-with-lease over --force — it aborts if the remote moved since your last fetch.",
        commands: [
          {
            caption: "Safer force push",
            command: "git push --force-with-lease",
          },
          {
            caption: "With explicit expected SHA",
            command: "git push --force-with-lease=main:<expected-sha>",
          },
        ],
      },
    ],
  },
  {
    id: "merge-rebase",
    label: "Merge & Rebase",
    description: "Integrate branches; rewrite local history cleanly.",
    groups: [
      {
        title: "Merge",
        commands: [
          { caption: "Merge a branch", command: "git merge feature/login" },
          {
            caption: "Preserve topology (no fast-forward)",
            command: "git merge --no-ff feature/login",
          },
          {
            caption: "Squash-merge into one commit",
            command: "git merge --squash feature/login",
          },
          { caption: "Abort a conflicted merge", command: "git merge --abort" },
        ],
      },
      {
        title: "Rebase",
        commands: [
          { caption: "Rebase onto main", command: "git rebase main" },
          {
            caption: "Interactive (last 5 commits)",
            command: "git rebase -i HEAD~5",
          },
          {
            caption: "Auto-squash fixup! commits",
            command: "git rebase -i --autosquash main",
          },
          {
            caption: "Auto-stash dirty tree first",
            command: "git rebase --autostash main",
          },
          {
            caption: "Continue / abort / skip",
            command: "git rebase --continue|--abort|--skip",
          },
        ],
      },
      {
        title: "Cherry-pick",
        commands: [
          { caption: "Pick one commit", command: "git cherry-pick <sha>" },
          { caption: "Pick a range", command: "git cherry-pick A^..B" },
          {
            caption: "Leave staged, don't commit",
            command: "git cherry-pick -n <sha>",
          },
          {
            caption: "Resolve + continue",
            command: "git cherry-pick --continue",
          },
        ],
      },
    ],
  },
  {
    id: "history",
    label: "History",
    description: "Read the past — logs, blame, and reflog.",
    groups: [
      {
        title: "Log",
        commands: [
          {
            caption: "One-line with refs",
            command: "git log --oneline --decorate",
          },
          {
            caption: "All-branches graph",
            command: "git log --oneline --graph --all",
          },
          { caption: "By author", command: 'git log --author="Jane"' },
          { caption: "Since date", command: 'git log --since="2 weeks ago"' },
          {
            caption: "Patches touching a file",
            command: "git log -p -- path/to/file",
          },
          {
            caption: "Pickaxe: commits that added/removed a string",
            command: 'git log -S "functionName" -p',
          },
        ],
      },
      {
        title: "Blame & Show",
        commands: [
          { caption: "Blame a file", command: "git blame path/to/file" },
          {
            caption: "Blame with move/copy detection",
            command: "git blame -C -M path/to/file",
          },
          { caption: "Show a commit", command: "git show <sha>" },
          {
            caption: "Show file at a revision",
            command: "git show HEAD~3:path/to/file",
          },
        ],
      },
      {
        title: "Diff & Reflog",
        commands: [
          {
            caption: "Diff two branches (tip vs tip)",
            command: "git diff main..feature",
          },
          {
            caption: "Diff since branch point",
            command: "git diff main...feature",
          },
          {
            caption: "HEAD history (lifeline for lost commits)",
            command: "git reflog",
          },
          {
            caption: "Reflog for a specific branch",
            command: "git reflog show feature/login",
          },
        ],
      },
    ],
  },
  {
    id: "undo",
    label: "Undo",
    description: "Walk back changes, the index, or history — safely.",
    groups: [
      {
        title: "Working tree & index",
        intro:
          "git restore is the modern replacement for checkout -- / reset HEAD.",
        commands: [
          {
            caption: "Discard unstaged edits to a file",
            command: "git restore path/to/file",
          },
          {
            caption: "Unstage a file (keep edits)",
            command: "git restore --staged path/to/file",
          },
          { caption: "Discard ALL unstaged edits", command: "git restore ." },
          { caption: "Dry-run clean untracked", command: "git clean -nd" },
          {
            caption: "Remove untracked files + dirs",
            command: "git clean -fd",
          },
        ],
      },
      {
        title: "Rewind HEAD",
        intro:
          "Rewinds the current branch. Only use on local/unpushed history.",
        commands: [
          {
            caption: "Move HEAD back, keep changes staged",
            command: "git reset --soft HEAD~1",
          },
          {
            caption: "Move HEAD back, unstage, keep edits",
            command: "git reset --mixed HEAD~1",
          },
          {
            caption: "Move HEAD back, DISCARD changes",
            command: "git reset --hard HEAD~1",
          },
          {
            caption: "Snap branch to remote",
            command: "git reset --hard origin/main",
          },
        ],
      },
      {
        title: "Public-safe undo",
        intro:
          "revert creates a new inverse commit — safe to push on shared branches.",
        commands: [
          { caption: "Revert a commit", command: "git revert <sha>" },
          {
            caption: "Revert a merge commit (first-parent)",
            command: "git revert -m 1 <merge-sha>",
          },
          {
            caption: "Stage the revert, don't commit yet",
            command: "git revert --no-commit <sha>",
          },
        ],
      },
    ],
  },
  {
    id: "stash",
    label: "Stash",
    description: "Park work-in-progress safely.",
    groups: [
      {
        title: "Stash",
        commands: [
          {
            caption: "Stash tracked changes with message",
            command: 'git stash push -m "wip: login form"',
          },
          {
            caption: "Include untracked files",
            command: 'git stash push -u -m "wip"',
          },
          {
            caption: "Stash only some paths",
            command: 'git stash push -m "wip css" -- src/styles',
          },
          { caption: "List stashes", command: "git stash list" },
          {
            caption: "Apply most recent (keep entry)",
            command: "git stash apply",
          },
          { caption: "Apply + drop most recent", command: "git stash pop" },
          {
            caption: "Apply a specific one",
            command: "git stash apply stash@{2}",
          },
          {
            caption: "Show contents as a patch",
            command: "git stash show -p stash@{0}",
          },
          {
            caption: "Drop / clear all",
            command: "git stash drop stash@{0}  #  git stash clear",
          },
        ],
      },
    ],
  },
  {
    id: "advanced",
    label: "Advanced",
    description: "Tags, worktrees, submodules, bisect, maintenance.",
    groups: [
      {
        title: "Tags",
        commands: [
          { caption: "Lightweight tag", command: "git tag v1.0.0" },
          {
            caption: "Annotated tag (recommended)",
            command: 'git tag -a v1.0.0 -m "Release 1.0.0"',
          },
          { caption: "Push a single tag", command: "git push origin v1.0.0" },
          { caption: "Push all tags", command: "git push --tags" },
          { caption: "Delete local tag", command: "git tag -d v1.0.0" },
          {
            caption: "Delete remote tag",
            command: "git push origin --delete v1.0.0",
          },
        ],
      },
      {
        title: "Worktrees",
        intro:
          "Multiple checkouts from one repo — review a PR without stashing, or keep hotfix + feature work open simultaneously.",
        commands: [
          {
            caption: "Add worktree on a branch",
            command: "git worktree add ../repo-hotfix hotfix/1.2.1",
          },
          {
            caption: "Add detached at a SHA",
            command: "git worktree add --detach ../repo-inspect <sha>",
          },
          { caption: "List", command: "git worktree list" },
          { caption: "Remove", command: "git worktree remove ../repo-hotfix" },
          { caption: "Prune stale entries", command: "git worktree prune" },
        ],
      },
      {
        title: "Submodules",
        commands: [
          {
            caption: "Add a submodule",
            command: "git submodule add https://github.com/owner/lib lib/",
          },
          {
            caption: "Init + fetch after a clone",
            command: "git submodule update --init --recursive",
          },
          {
            caption: "Clone including submodules",
            command: "git clone --recurse-submodules <url>",
          },
          {
            caption: "Update to remote tip",
            command: "git submodule update --remote --merge",
          },
          {
            caption: "Deinit a submodule",
            command: "git submodule deinit -f lib/",
          },
        ],
      },
      {
        title: "Bisect",
        intro: "Binary-search for the commit that broke something.",
        commands: [
          { caption: "Start", command: "git bisect start" },
          { caption: "Mark current as bad", command: "git bisect bad" },
          {
            caption: "Mark a known-good tag",
            command: "git bisect good v1.0.0",
          },
          {
            caption: "Run script to auto-bisect",
            command: "git bisect run ./scripts/test.sh",
          },
          { caption: "Finish", command: "git bisect reset" },
        ],
      },
      {
        title: "Maintenance & Recovery",
        commands: [
          {
            caption: 'Recover a "lost" commit via reflog',
            command: "git reflog  #  then: git branch recovery <sha>",
          },
          { caption: "Garbage collect", command: "git gc --aggressive" },
          {
            caption: "Background maintenance",
            command: "git maintenance start",
          },
          { caption: "Verify repo integrity", command: "git fsck --full" },
        ],
      },
    ],
  },
];

export const gitTips: GitTip[] = [
  {
    title: "--force-with-lease > --force",
    body: "`--force-with-lease` aborts the push if someone else pushed since your last fetch. Plain `--force` silently overwrites teammates' commits.",
  },
  {
    title: "Never rebase shared history",
    body: "Rebasing rewrites SHAs. If the commits are already on a shared branch, everyone else has to reset — and may lose work. Rebase only local/unpushed commits.",
  },
  {
    title: "reflog is your lifeline",
    body: 'Even "deleted" commits survive for ~90 days in the reflog. `git reflog` → find the SHA → `git branch recovery <sha>`. Resets and force-pushes are rarely truly fatal.',
  },
  {
    title: "Prefer git restore / git switch",
    body: "The modern split: `restore` for files (`--staged` to unstage), `switch` for branches. Reserve `checkout` for older muscle memory — the new commands are clearer.",
  },
  {
    title: "pull.rebase = true",
    body: 'Default pull merges, producing ugly "Merge branch main" commits. `git config --global pull.rebase true` keeps history linear without thinking.',
  },
  {
    title: "fixup! + --autosquash",
    body: "Commit WIP as `git commit --fixup <target-sha>`, then `git rebase -i --autosquash main` folds them into the right commit automatically. Cleaner than `squash`.",
  },
  {
    title: "Large binaries → Git LFS",
    body: 'Committing big binaries bloats history forever — every clone pays. Use `git lfs track "*.psd"` (or model/video extensions) and commit `.gitattributes`.',
  },
  {
    title: "Sign your commits",
    body: "`git config --global commit.gpgsign true` (GPG) or `gpg.format=ssh` for SSH signing. Most orgs' branch protection rules require it.",
  },
  {
    title: ".git/info/exclude for personal ignores",
    body: "IDE/OS files you don't want to PR into .gitignore go in `.git/info/exclude` — per-repo, uncommitted, personal.",
  },
  {
    title: "Detached HEAD isn't broken",
    body: "HEAD at a SHA without a branch is fine for inspection. To save work, `git switch -c new-branch` before committing anything.",
  },
  {
    title: "Revert merges with -m",
    body: "`git revert <merge-sha>` fails unless you pick a parent: `git revert -m 1 <merge-sha>` keeps the first-parent line and undoes the side branch.",
  },
  {
    title: "Worktrees beat stashing",
    body: "Need to hotfix while mid-feature? `git worktree add ../repo-hotfix hotfix/x` gives you a second working directory — no stash juggling, no branch switching.",
  },
];
