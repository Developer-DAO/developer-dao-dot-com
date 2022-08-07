**This is a work in progress document and is a first attempt at establishing a
set of developer guidelines**

# Development Guidelines

Developer DAO Code Contribution

Glad to see you here and interested in contributing to Developer DAO’s repo!
Please take a moment to review this document to ensure a smooth contribution
process for everyone.

# Contributions

Contribution assumes that Git with GitHub is the main way to contribute code.

Note: We do seem to have a contributing document on the Developer DAO Github
where this section can eventually be published to

# Issues

Issues should be used to propose new ideas and / or a discussion around a newly
proposed feature. It should be noted that this discussion should pertain to the
subject and functionality of that repository. If the discussion or feature is
out of the scope of that project, this issue should be mentioned as so to either
be put on track or closed because it does not pertain to the scope of the
current repository. That does not mean that some repositories depend on
functionality of repositories and could be used at the discretion of the
community.

As a base, I would recommend a structure of:

1. Context / Background / How This Idea Came To Fruition

2. Problem / Opportunity Of The Current State Of The App / Product / Code

3. Proposed / Solution / How It Can Be Improved / Fixed

4. How Tests Will Be Performed: Manual & Regression / Unit Tests / E2E Tests

TBD - A manner to approve a git issue with upvotes or through an external system
(Discourse perhaps)

It should be noted that just because an issue exists and has been approved, it
should be expressed that the ticket is being worked on by someone to avoid
multiple developers working on the same issue.

Questions are also welcome as issues, which can help with defining better
documentation.

Proposals that include UI changes should preferably be accompanied by design
mockups that illustrate how the changes would look like. This facilitates the
discussion about the proposal and can potentially save development time as well.
You can copy (akin to forking) the Figma design file from this link:
https://www.figma.com/file/BBxYJrArJFOpND9c4OBWkY/D_D?node-id=3%3A2 , make your
proposed changes in your own file, and include a link in your issue.

# Pull Requests (PRs)

A PR should relate to a proposed issue. If a PR does not relate to a specific
git issue, then the PR could be closed because the feature was not discussed or
approved beforehand. A developer should never assume that the community
absolutely needs specific functionality without first discussion and approval
from the community.

PR requests should have the word (or something similar to) referencing:

Fixes #git-issue-number in order to keep track and automatically close specific
issues.

PRs should also include some proof of at least smoke tests, to prove that the
developer has tested the feature and / or functionality. As more and more gets
added, there will be ways for the community to add automatics tests.

# Tests

At the very top of the list End-to-End tests should be the priority, as it
simulates the most real world scenario of user interaction.

Unit tests should also be considered for scenarios that may not include user
interaction but ensure that newly added code is not breaking or interfering with
the functionality of other code.

At the discretion of the developer, it would be great if they could mention if
they have performed smoke tests and / or regression tests if no automatic tests
could be made at the time of the feature.

Rule of thumb: if you write a piece of code, you expect it to run at some point.
So make sure it works as intended

# Conflicts

If there are code conflicts in a PR, it should be the original developer’s
responsibility to ensure that their code incorporates the latest changes from a
parent branch and resolve conflicts in their proposed branch.

# Priority

At the discretion of the community, features should roll out (get merged to
main), in any priority the community sees fit. As a flexible base, if an issue
is defined before another, that issue should take priority.

# Issue Abandonment / Stale Issues / Stale PRs

TBD - A means to figure out if a developer cannot complete a specific issue
within a specific time and have it re-assigned to another volunteer.

# End Product

These are different types of functionality that should be considered at the core
of developing products to ensure openness and allow others to participate.

## Internationalization (i18n)

Whenever possible, offering multiple languages should be considered to allow for
other users and developers to contribute in their native language. When multiple
languages cannot be incorporated and / or cannot be completed at the moment,
English should be the default fallback language.

TBD - What is the best (automated?) way to ensure correct translation into other
languages? Using google translate as a source should be discouraged as it often
results in mis-translations

## Accessibility

Pull requests including UI changes should be checked for accessibility using at
least one automated accessibility tool, such as Lighthouse or the Axe extension
to discover any low hanging bugs to squash (i.e images without altText, buttons
without aria-labels, improper ordering of headings, etc…). While automated
accessibility tests are not comprehensive, they help ensure a minimum level of
accessibility.

TBD - We could open an issue to automate this process by running Lighthouse on
GitHub Actions: https://github.com/marketplace/actions/lighthouse-ci-action

# Tech Stack / Code Quality / Tools

This section covers standards for different types of tech stacks / languages and
what standard tools should be used for each.

## Code Formatting

Please use prettier in your new repositories whenever possible and relevant to
auto-format your code.

## JavaScript / Node

This project uses yarn to manage its dependencies. After checking out the
project, be sure to run yarn to install the project's dependencies. Developers
should ensure that package-lock.json is not committed with their code.

# Commitment Statements

For every standard/guidance we as a community agree upon, we should have a
standard template we follow.

TBD - Perhaps we can NFT these commitments onto the blockchain as a statement
(i.e they are forever on the blockchain and up to each of us to uphold)

## Template

As a developer working in _project_ , I promise to _do_something_ so that I
_get_result_

I commit to the upholding the the following responsibilities

**_Example:_**

As a developer working in developer-dao, I promise to to uphold the
accessibility standards put forth by the WCAG so that I can ensure an accessible
web3 future for all users

I commit to the following responsibilities:

- Following proper coding standards put forth by WCAG
- Ensure accessibility is a requirement for any frontend feature
- If I'm unsure of anything during development that I reach out to the community
  for help/guidance

# Documentation

As a community we must ensure that documentation is created where appropriate
and kept uptodate. We can make use of the Wiki feature in Github or create a
separate Github pages website to house all relevant documentation

As a commitment statement: As a developer working in developer-dao, I promise to
create documentation around any new feature/enhancement I create (when
appropriate) as well as keep existing documentation uptodate so that I can
provide the community the most accurate representation of the project I’m
working on

I commit to the following responsibilities:

- Ensure a major feature/enhancement has proper documentation if there is a
  breaking change or the local development requirements change
- Every new project created has at least a README and CONTRIBUTING document with
  proper documentation of how to get started and how to contribute
- Every new project utilizes the Github wiki or pages feature to better describe
  what the project is all about with relevant links, demo videos, meeting notes
- If I’m creating an API (RESTful, gRPC, graphQL) I will provide a collection of
  request samples (postman, insomnia, etc…) and endpoint links so that users of
  my API can get up and running as fast as possible.
- If i’m creating a Library, I will provide usage documentation as well as code
  samples of how to use the components of my library so that users can get up
  and running as fast as possible
