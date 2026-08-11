# Branching and Promotion Workflow

Code moves through the environments in this order:

```text
feature/* (or bugfix/*, hotfix/*) -> dev -> uat -> main
```

## Start a change

Always branch from the latest `dev` branch:

```bash
git switch dev
git pull
git switch -c feature/short-description
```

Commit and push the feature branch:

```bash
git add <files>
git commit -m "Describe the change"
git push -u origin feature/short-description
```

Open a pull request from `feature/short-description` into `dev`.

## Promote to UAT

After changes are verified in development, open a pull request from `dev` into
`uat`. Test the `uat` branch before approving the production promotion.

## Promote to production

After UAT approval, open a pull request from `uat` into `main`. Do not merge
feature branches or `dev` directly into `main`.

## Automated checks

Every push and pull request involving `dev`, `uat`, or `main` runs:

- clean dependency installation with `npm ci`
- TypeScript validation
- a production Next.js build

The promotion-policy check also rejects pull requests that skip an environment.

Actual environment deployments can be added to the same workflow after the
hosting provider, application targets, and deployment credentials are defined.
