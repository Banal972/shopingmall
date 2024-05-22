# 쇼핑몰

> **개발기간** 2024.05 ~ 2024.05

<br/>

## 서비스 주소

https://shopingmall.vercel.app/

<br />

## 프로젝트 소개

Firebase을 이용해서 쇼핑몰을 구축한 사이트 입니다.
회원가입, 로그인, Firebase의 database을 이용하여 쇼핑목록을 불러오고 북마크, 구매, 장바구니, 구매내역등 여러가지의 쇼핑몰의
기능을 구현한 웹사이트 입니다.

<br />

## 시작 가이드

### 요구사항

- Node.js 20.11.1^
- Npm 10.5.0^

### Installation

```
$ git clone https://github.com/solo-service/shopingmall.git
$ cd shopingmall
```

### Frontend

```
$ npm install
$ npm run dev
```

<br />

## 기술 스택

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1716386497711?alt=media&token=555dd18a-8f27-44b5-9c4f-3cbef0c15ec2)](https://github.com/msdio/stackticon)
<br />

## 주요 기능

### ⭐ 로그인, 회원가입

- Firebase의 Authentication을 이용하여 이메일 비밀번호로 로그인이 가능합니다.
- Firebase의 Authentication을 이용하여 이메일 비밀번호로 회원가입이 가능합니다. 또한 Database을 사용하여 회원정보를 저장합니다.

### ⭐ 상품

- Firebase의 Database을 이용해서 상품목록을 불러옵니다.
- 불러온 상품목록으로 상세정보를 가져와 유저에게 보여줍니다.
- 상품을 장바구니에 저장할 수 있습니다.
- 상품을 구매를 하여 Database에 주문내역을 저장합니다.
- 저장된 주문내역을 확인할 수 있습니다.
- 관심있는 상품을 북마크 할 수 있습니다.
- 상품에 대한 후기를 작성할 수 있습니다.

<br />

## 화면 구성

|                                             메인페이지                                             |                                            리스트페이지                                            |                                             상세페이지                                             |
| :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| ![image](https://github.com/Banal972/nwitter/assets/96280450/f8a81293-cbcc-4136-95ab-99a9a5804322) | ![image](https://github.com/Banal972/nwitter/assets/96280450/b3540d85-7af0-47bd-8f1c-dfa1471258db) | ![image](https://github.com/Banal972/nwitter/assets/96280450/746a298d-fd07-4694-bc73-b25546106bbf) |
|                                           상품후기리스트                                           |                                        상품후기 작성 페이지                                        |                                              장바구니                                              |
| ![image](https://github.com/Banal972/nwitter/assets/96280450/672b3582-2d21-4679-9f41-9b76479f2960) | ![image](https://github.com/Banal972/nwitter/assets/96280450/b0a8ac47-b0ce-43fd-a0be-77c5c18a5b33) | ![image](https://github.com/Banal972/nwitter/assets/96280450/75698277-d4bf-432e-884a-4215530c387e) |
|                                           로그인 페이지                                            |                                          회원가입 페이지                                           |                                          관심상품 페이지                                           |
| ![image](https://github.com/Banal972/nwitter/assets/96280450/73b3eb4b-e50a-49b5-b9d0-040ac7d34f82) | ![image](https://github.com/Banal972/nwitter/assets/96280450/f81e7401-d1f7-4453-add5-e4813b49dc26) | ![image](https://github.com/Banal972/nwitter/assets/96280450/75698277-d4bf-432e-884a-4215530c387e) |
|                                            구매 페이지                                             |                                          구매완료 페이지                                           |                                          주문내역 페이지                                           |
| ![image](https://github.com/Banal972/nwitter/assets/96280450/4b97f108-8aff-4869-8d6f-85d3c47e0e95) | ![image](https://github.com/Banal972/nwitter/assets/96280450/8956a460-d74f-4ac9-adcd-71739e520db0) | ![image](https://github.com/Banal972/nwitter/assets/96280450/a94a5231-9d80-4d05-800f-d16b36230768) |
|                                        주문상세내역 페이지                                         |
| ![image](https://github.com/Banal972/nwitter/assets/96280450/8251f6c7-cb56-43f6-a0e7-ccc36daee452) |

<br />

## 아키텍쳐

```
shopingmall
├─ .eslintrc.cjs
├─ .gitignore
├─ .storybook
│  ├─ main.ts
│  └─ preview.ts
├─ index.html
├─ jest.config.ts
├─ jest.setup.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ asset
│     └─ image
│        ├─ icon
│        │  └─ snb_dep2Arr.png
│        ├─ list
│        │  ├─ listBg01.jpg
│        │  ├─ listBg02.jpg
│        │  ├─ listBg03.jpg
│        │  ├─ listBg04.jpg
│        │  ├─ listBg05.jpg
│        │  └─ listBg06.jpg
│        ├─ logo.svg
│        └─ main
│           ├─ banner
│           │  ├─ banner01.jpg
│           │  └─ banner02.jpg
│           └─ visual
│              ├─ visual01.jpg
│              ├─ visual02.jpg
│              ├─ visual03.jpg
│              └─ visual04.jpg
├─ README.md
├─ src
│  ├─ @types
│  │  ├─ card.ts
│  │  ├─ history.ts
│  │  └─ inquiry.ts
│  ├─ App.tsx
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ PrivateRoute.tsx
│  │  │  └─ PublicRoute.tsx
│  │  ├─ buy
│  │  │  └─ Modal.tsx
│  │  ├─ cart
│  │  │  ├─ Add.tsx
│  │  │  ├─ Buy.tsx
│  │  │  ├─ Delete.tsx
│  │  │  ├─ Remove.tsx
│  │  │  └─ Sale.tsx
│  │  ├─ common
│  │  │  ├─ Btn
│  │  │  │  └─ Bookmark.tsx
│  │  │  ├─ Card
│  │  │  │  └─ Card.tsx
│  │  │  ├─ Footer
│  │  │  │  └─ Footer.tsx
│  │  │  ├─ Header
│  │  │  │  └─ Header.tsx
│  │  │  └─ Sales.tsx
│  │  ├─ detail
│  │  │  ├─ inquiry
│  │  │  │  └─ Inquiry.tsx
│  │  │  ├─ popular
│  │  │  │  └─ Popular.tsx
│  │  │  └─ sticky
│  │  │     └─ Sticky.tsx
│  │  └─ main
│  │     ├─ Only
│  │     │  └─ Only.tsx
│  │     ├─ Popular
│  │     │  └─ Popular.tsx
│  │     └─ Sale
│  │        └─ Sale.tsx
│  ├─ firebase.ts
│  ├─ hooks
│  │  └─ useGetUser.tsx
│  ├─ index.css
│  ├─ lib
│  │  └─ saleCalc.ts
│  ├─ main.tsx
│  ├─ page
│  │  ├─ bookmark
│  │  │  └─ Bookmark.tsx
│  │  ├─ buy
│  │  │  └─ Buy.tsx
│  │  ├─ cart
│  │  │  └─ Cart.tsx
│  │  ├─ complete
│  │  │  └─ Complete.tsx
│  │  ├─ detail
│  │  │  ├─ Detail.tsx
│  │  │  ├─ Edit.tsx
│  │  │  └─ Write.tsx
│  │  ├─ history
│  │  │  ├─ History.tsx
│  │  │  └─ More.tsx
│  │  ├─ list
│  │  │  └─ List.tsx
│  │  ├─ login
│  │  │  └─ Login.tsx
│  │  ├─ main
│  │  │  └─ Main.tsx
│  │  └─ sign
│  │     └─ Sign.tsx
│  ├─ store
│  │  ├─ @types
│  │  │  └─ feature
│  │  │     ├─ cart
│  │  │     │  └─ cartType.ts
│  │  │     └─ tag
│  │  │        └─ tagType.ts
│  │  └─ feature
│  │     ├─ buy
│  │     │  └─ buy.ts
│  │     ├─ cart
│  │     │  └─ cart.ts
│  │     ├─ complete
│  │     │  └─ complete.ts
│  │     └─ tag
│  │        └─ tag.ts
│  ├─ stories
│  │  ├─ assets
│  │  │  ├─ accessibility.png
│  │  │  ├─ accessibility.svg
│  │  │  ├─ addon-library.png
│  │  │  ├─ assets.png
│  │  │  ├─ avif-test-image.avif
│  │  │  ├─ context.png
│  │  │  ├─ discord.svg
│  │  │  ├─ docs.png
│  │  │  ├─ figma-plugin.png
│  │  │  ├─ github.svg
│  │  │  ├─ share.png
│  │  │  ├─ styling.png
│  │  │  ├─ testing.png
│  │  │  ├─ theming.png
│  │  │  ├─ tutorials.svg
│  │  │  └─ youtube.svg
│  │  ├─ button.css
│  │  ├─ Button.stories.ts
│  │  ├─ Button.tsx
│  │  ├─ Configure.mdx
│  │  ├─ header.css
│  │  ├─ Header.stories.ts
│  │  ├─ Header.tsx
│  │  ├─ page.css
│  │  ├─ Page.stories.ts
│  │  └─ Page.tsx
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

<br />

## 웹개발팀

<table>
  <tr>
    <th style="width: 200px; text-align : center;">김지유</th>
  </tr>
  <tr style="border-bottom: 1px solid white;">
    <td>
        <img src="https://github.com/gugumo-service/gugumo_frontend/assets/96280450/d6716133-cc01-451c-af07-0da997725785">
    </td>
  </tr>
  <tr style="border-bottom: 1px solid white; text-align : center;">
    <td>FE</td>
  </tr>
</table>
