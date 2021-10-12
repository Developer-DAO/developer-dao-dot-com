# How to Contribute to Developer Dao

Thanks for showing interest in contributing to Developer DAO(D_D)!

This document will help you to start contributing to the DAO as quickly as
possible. The target audience of this document is literally anybody who wants to
contribute to the Developer DAO organization, regardless of skill level or
technical background, in the manner that fits them the best.

## Ways to contribute

We all come from a wide range of experiences, skill-sets and backgrounds;
however, we're all here because of the opportunity to contribute to pushing web3
forward and growing together. There's no one way of contributing to this DAO
which is what makes it so awesome. You're an out-of-this-world designer? Sweet,
feel free to suggest anything to improve our current design. Are you passionate
about testing? Excellent, you can look to ways we can improve our current test
suites and ensure developers are including unit tests through code reviews.
Indeed, there are many ways one can contribute, below are the current areas most
community members are helping out with today:

- Feature development
- Code reviews
- Bug Fixes
- Testing
- Documentation
- Translation
- Design

## Picking up an issue

Oh yeah, you got this far and are looking to get some skin in the game, very
wise choice. If you're itching to get straight into the action, go to the
[issues tab](https://github.com/Developer-DAO/developer-dao/issues) and see
which of the open issues interests you the most. How do you know an issue hasn't
been picked up you ask? Issues are typically picked up by commenting on the
given issue that you'd be interested in taking up and then having them assigned
to you by someone.

To start contributing, we ask all contributors to fork a copy of this repo. Once
you have the project forked, you would then checkout a branch off your local
copy of the project via `git checkout -b your_branch_name` per issue you pick
up. You can name the branch what you want but be sure to give it some context
around the issue you're working on.

Once you're well on your way through your work, don't be shy/hesitant to open a
draft pull request to have the community take a look at the progress or provide
helpful insight/tips/suggestions on how you can improve the current
implementation. At the end of the day the community is here to help one another
and to ensure people are getting the most out their experience being part of the
Developer DAO.

## Issue creation

GitHub Issues are the primary way we discuss ideas and plans for future work for
the website. We have
[a number of issue forms](https://github.com/Developer-DAO/developer-dao/issues/new/choose)
to help guide you through the process of sharing a feature request or reporting
a bug.

### Design oriented issues

If your proposal includes UI changes like a new direction for the site or a new
feature, it might be helpful to include design mockups so that others can
understand your vision! We have
[a Figma design file](https://www.figma.com/file/BBxYJrArJFOpND9c4OBWkY/D_D?node-id=3%3A2)
that you can fork and play around with! If that's not your thing though, don't
let it stop you from sharing your idea! We have a lot of design-minded
individuals in the community that can help bring your idea to life.

## Code reviews

If you're looking to provide a code review for someone(anyone is free to do
so!), ensure to give constructive feedback around how the contributor can
improve their work. This can include things like pointing out misses in code
logic, reminding people to add tests where appropriate, pointing out breakages
in functionality, better approaches to implementation and so on. Let's aim to be
mentors to those who want to contribute and give the community the opportunity
to grow together. There are major learning opportunities to be had with code
reviews, especially to the less experienced among us who are here to learn first
and foremost. Let's ensure we give our community the best opportunities to learn
through each issue they work through.

## Testing

Having an adequate test suite ensures that the code we've written behaves as we
intended and helps us figure out changes that break current functionality. If
you're contributing in any area that either changes existing code or adds new
features, please ensure to update/add on to the existing test suite (unit, e2e,
etc...) so that the codebase behaves as we intend it to. A good rule of thumb to
follow here is if you write a piece of code, you expect it to run at some point
so let's make sure it works as intended.

## Documentation

Documentation is the key to keeping everybody informed about the
ongoings/developments of the repo. As a community we want to aim to have the
most up to date documentation so that future contributors will have the most
accurate information available to them. If you see an opportunity to improve
existing documentation or add something that may be missing, open up an issue
and get writing!

## Translations

Being part of the internet means we have a global audience. This is why we want
our users to actually be able to access our content if English isn't their first
language. Our code base uses
[next-i18next](https://github.com/isaachinman/next-i18next) for translation
purposes and our actual translations are provided by our awesome community
members.

If you'd like to work as a translator for this project, check out our
translation guide in [`TRANSLATIONS.md`](./TRANSLATIONS.md).
