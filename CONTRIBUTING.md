# Welcome

Welcome to the `csv-to-xlsx` project.

Please read the chapters below carefully to understand how contributing to this
project works.

# Contributing Code

This is a practical guide on how to contribute code (features/bugfixes) to this
project.

For more indepth explanations about each step feel free to search online.

1. Clone the repo to your computer:
   `git clone git@github.com:Aternus/csv-to-xlsx.git`
2. If you're using JetBrain's IntelliJ series of IDE, the setup of your IDE
   should be automatic.

   If not, set your IDE so that you run Prettier and ESLint on each save.

   Husky should take care of running unit tests after each commit.

   These steps are enforced by the PR so please don't waste time (and resources)
   ignoring git hooks.

3. Create a new branch: `git checkout -b feat-third-eye`
4. Contribute code, make sure you've added the description of your work to
   `CHANGELOG.md`. We use `semver`.

   If there is no new version tag in that file (e.g. the npmjs version is 1.0.0
   and the changelog last version is 1.0.0), create a new tag (i.e. 1.0.1 if
   your changes are patch, 1.1.0 if minor, 2.0.0 if major).

5. `git commit`, `git push`
6. Create PR. If you're not ready for a review yet, mark it as `Draft`
7. When you're ready for review, assign a reviewer (e.g. `aternus`) and un-draft
   the PR.
8. If your PR doesn't pass the automatic checks it will be ignored.
9. After a successful review, merge the PR.

# Creating a Release

Once the content for the release has been finalized (i.e. all PRs merged,
`CHANGELOG.md` has the next release version and release notes) it's time to
create a release for `npmjs.com` and generate binaries.

1. Go to Releases
2. Press on "Draft a new Release"
3. Specify a new tag that corresponds to the tag present in the `CHANGELOG.md`
   and release notes.
4. The release's title should include the version as the first thing followed by
   a colon and the major change in this release (e.g.
   `v1.1.0: Added Support for the Third Eye`)
5. In most cases it's not necessary to write any additional notes as you'll get
   the diff which includes the release notes from `CHANGELOG.md`
6. Make sure "set as the latest release" is selected.
7. Press on "Publish Release"

# How CI/CD Works

## Validate

1. A new PR triggers the `validate` workflow which lints the code and runs tests
   on all platforms we should support.
2. If validation fails, you won't be able to merge the PR.
3. If integration (merge to `master`) fails, the "validation badge" will be
   marked red on the main page of the project.

   👀 Keep an eye for it to ensure your PR merge didn't break the project.

## Release

1. A publishing of a Release triggers the `release` workflow which creates
   binaries and publishes the package to `npmjs.com`
