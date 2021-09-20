## ソースコードブランチ対応表

|  レクチャー名  |  ブランチ名  |
| ---- | ---- |
|  セクション4  |  ----  |
|  コンポーネントの作成と読み込み  |  create-components  |
|  svelte-routingの導入  |   add-routing  |
|  CSSフレームワーク（smelte）の導入とtailwindcssの概要説明  |   add-smelte  |
|  tailwindcssベースカラーの設定  |   base-color  |
|  ヘッダーとフッターをsmelteでスタイリング  |   header-css  |
|  ヘッダーとにロゴとアイコンを設置  |   header-logo  |
|  ハンバーガーメニューの中身を実装  |   menu-content  |
|  セクション5  |  ----  |
|  firebaseの準備  |   add-firebase  |
|  firebaseの情報をenvファイルから取得できるように変更 |  env  |
|  googleログインの実装  |   google-login  |
|  storeでログイン情報を保管  |   create-store  |
|  ログアウト機能の実装  |   logout  |
|  日記作成画面の作成  |   diary-create-ui  |
|  日記作成画面からデータを送信  |   create-form  |
|  日記をfirestoreへ保存  |   create-form  |
|  セクション6  |  ----  |
|  firestoreからデータを取得  |  fetch  |
|  日記データをレンダリング  |  render  |
|  ログイン状態に応じてコンポーネントを出し分ける  |  if-login  |
|  日記詳細ページの作成  |  get-diary  |
|  日記更新機能の作成  |  update  |
|  セクション7  |  ----  |
|  日記作成フォームに画像を追加とプレビュー機能の作成  | add-image-form  |
|  firebase storageに画像をアップロード  | upload-storage  |
|  日記詳細ページに画像を追加  | detail-image  |
|  画像を更新できるように日記更新機能を改良  | storage-update  |
|  セクション7  |  ----  |
|  日記の削除機能  | diary-delete  |

## コマンド一覧

- npm i --save-dev dotenv @rollup/plugin-replace
- npm i firebase@9.*
- npm i svelte-routing
- npm i dayj
- npm i npm install dotenv @rollup/plugin-replace
- npm i smelte
- npm i @tailwindcss/forms
- npm i svelte-hamburgers
- npm i carbon-icons-svelte
- npm i js-cookie
- npm i svelte-star-rating

## Smelte
[ドキュメント](https://smeltejs.com/)
[tailwindcssドキュメント](https://tailwindcss.com/docs)

## カラー設定
[colorhunt](https://colorhunt.co/palette/79b4b7fefbf3f8f0df9d9d9d)

## Svelte-hanbargers
[npmモジュール](https://www.npmjs.com/package/svelte-hamburgers)

## svelteで使えるアイコンモジュール
[carbon-icons-svelte](https://github.com/carbon-design-system/carbon-icons-svelte)

[アイコン一覧](https://www.carbondesignsystem.com/guidelines/icons/library/)

## Googleログインドキュメント
[firebase公式](https://firebase.google.com/docs/auth/web/google-signin?hl=ja#web-version-9_4)

## js-cookir
[ドキュメント](https://www.npmjs.com/package/js-cookie)

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

If you want to use `baseUrl` or `path` aliases within your `tsconfig`, you need to set up `@rollup/plugin-alias` to tell Rollup to resolve the aliases. For more info, see [this StackOverflow question](https://stackoverflow.com/questions/63427935/setup-tsconfig-path-in-svelte).

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
