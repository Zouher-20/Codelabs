# CodeLabs

A project built with ❤️ for university by the great team of: Majd Al-Shalabi , Abd Al-Rahman Gwesh , Zouhair Nasser , Ayman Muhi Al-Deen , Mohammad Nashawati

## Getting Started

First, run the development server:

```bash
# Install dependancies
npm i

# Install husky
npm i -g husky

# Install lint-staged
npm i -g lint-staged

# run local dev server
npm run dev

```

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Naming

-   Classes: PascalCase , ex: UserControler.
-   Component names: PascalCase , ex: \<DropDownItem />
-   Variables: camelCase , ex: activeFileIndex
-   Files: kebab-case, ex: dropdown-menu.ts
-   Branches: kebab-case , ex: fix-navbar-color

## Gitflow

1. A develop branch is created from master
2. A release branch is created from develop
3. Feature branches are created from develop
4. When a feature is complete it is merged into the develop branch
5. When the release branch is done it is merged into develop and master
6. If an issue in master is detected a hotfix branch is created from master
7. Once the hotfix is complete it is merged to both develop and master

## Notes

-   Use Prettier for code formatting.
