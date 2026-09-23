# @icelii/ngx-api-paginator

> A lightweight, modern, and customizable pagination component for **Angular 22+**, built with **Signals**, **Standalone Components**, and **Tailwind CSS**.

[![npm](https://img.shields.io/npm/v/@icelii/ngx-api-paginator?color=blue\&logo=npm)](https://www.npmjs.com/package/@icelii/ngx-api-paginator)
[![Angular](https://img.shields.io/badge/Angular-22%2B-DD0031?logo=angular\&logoColor=white)](https://angular.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

`@icelii/ngx-api-paginator` is a reusable pagination component for Angular applications that consume data from paginated APIs.

It provides a responsive pagination UI, multiple visual styles, customizable labels, automatic page calculation, and a simple output event for handling page changes.

---

## ✨ Features

* ⚡ Built with **Angular Signals**
* 🧩 **Standalone Component** — no `NgModule` required
* 🎨 Built with **Tailwind CSS**
* 🎯 Six built-in visual styles
* 🔢 Automatic total page calculation
* ✨ Smart navigation with ellipsis (`...`)
* 🌍 Customizable labels
* 📱 Responsive design
* 🔌 Works with any paginated API
* 🎨 Customizable primary color through CSS variables
* 🧭 Semantic pagination navigation with `aria-label`
* 🪶 Lightweight and easy to integrate

---

## 📦 Installation

Install the package using npm:

```bash
npm install @icelii/ngx-api-paginator
```

---

## 🚀 Basic Usage

`NgxApiPaginator` is a standalone component and can be imported directly into your Angular component.

### Component

```ts
import { Component, signal } from '@angular/core';
import { NgxApiPaginator } from '@icelii/ngx-api-paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgxApiPaginator],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  currentPage = signal(1);
  perPage = signal(10);
  totalItems = signal(120);

  onPageChange(page: number) {
    this.currentPage.set(page);

    // Fetch the selected page from your API.
  }
}
```

### Template

```html
<lib-ngx-api-paginator
  [currentPage]="currentPage()"
  [perPage]="perPage()"
  [totalItems]="totalItems()"
  (pageChanged)="onPageChange($event)"
/>
```

The paginator calculates the total number of pages automatically:

```ts
Math.max(1, Math.ceil(totalItems / perPage))
```

You do **not** need to provide `totalPages`.

---

## 🔌 Using with a Paginated API

The paginator only handles the pagination UI and page selection. It does **not** make API requests.

Your application is responsible for:

1. Requesting the selected page.
2. Updating the displayed data.
3. Providing the total number of records through `totalItems`.

For example, if your API returns:

```json
{
  "data": [],
  "total": 120
}
```

You can use:

```ts
this.items.set(data.data);
this.totalItems.set(data.total);
```

Then handle page changes:

```ts
onPageChange(page: number) {
  this.currentPage.set(page);
  this.fetchProducts(page);
}
```

This makes the paginator independent of your backend framework or API response structure.

### Supported API formats

The library does not require a specific response format.

For example:

**Generic REST API**

```json
{
  "items": [],
  "total": 120
}
```

**Laravel**

```json
{
  "data": [],
  "total": 120,
  "current_page": 1,
  "per_page": 10,
  "last_page": 12
}
```

Regardless of the API structure, the paginator only needs:

```text
currentPage
perPage
totalItems
```

---

## 🎨 Styles

Six built-in styles are available:

| Style      | Description                            |
| ---------- | -------------------------------------- |
| `rounded`  | Rounded buttons with borders. Default. |
| `circle`   | Circular buttons and active page.      |
| `minimal`  | Minimal text-based appearance.         |
| `flat`     | Flat buttons with subtle backgrounds.  |
| `bordered` | Square buttons with visible borders.   |
| `shadow`   | Rounded buttons with elevated shadows. |

Example:

```html
<lib-ngx-api-paginator
  [currentPage]="currentPage()"
  [perPage]="perPage()"
  [totalItems]="totalItems()"
  style="circle"
  (pageChanged)="onPageChange($event)"
/>
```

---

## 🎨 Primary Color

The active page and other primary pagination elements use the CSS custom property:

```css
--primary-color
```

Define it in your global stylesheet:

```css
:root {
  --primary-color: #7c3aed;
}
```

You can use any valid CSS color:

```css
:root {
  --primary-color: #a378b9;
}
```

---

## 🌍 Customizing Labels

The paginator includes customizable labels, allowing you to adapt the component to different languages.

### English

```html
<lib-ngx-api-paginator
  textShowing="Showing"
  textTo="to"
  textOf="of"
  textResults="results"
  textPrevious="Previous"
  textNext="Next"
/>
```

Result:

```text
Showing 1 to 10 of 120 results
```

### Spanish

Spanish is the default language:

```html
<lib-ngx-api-paginator
  textShowing="Mostrando"
  textTo="a"
  textOf="de"
  textResults="resultados"
  textPrevious="Anterior"
  textNext="Siguiente"
/>
```

### Using Signals

Inputs can also receive Signals or computed values:

```ts
lang = signal<'es' | 'en'>('es');

translations = {
  es: {
    showing: 'Mostrando',
    to: 'a',
    of: 'de',
    results: 'resultados',
    previous: 'Anterior',
    next: 'Siguiente',
  },
  en: {
    showing: 'Showing',
    to: 'to',
    of: 'of',
    results: 'results',
    previous: 'Previous',
    next: 'Next',
  },
};

t = computed(() => this.translations[this.lang()]);
```

```html
<lib-ngx-api-paginator
  [currentPage]="currentPage()"
  [perPage]="perPage()"
  [totalItems]="totalItems()"
  [textShowing]="t().showing"
  [textTo]="t().to"
  [textOf]="t().of"
  [textResults]="t().results"
  [textPrevious]="t().previous"
  [textNext]="t().next"
  (pageChanged)="onPageChange($event)"
/>
```

---

## ⚙️ Inputs

| Input          | Type                                                                     | Default        | Description                                   |
| -------------- | ------------------------------------------------------------------------ | -------------- | --------------------------------------------- |
| `currentPage`  | `number`                                                                 | `1`            | Current active page.                          |
| `perPage`      | `number`                                                                 | `10`           | Number of items displayed per page.           |
| `totalItems`   | `number`                                                                 | `0`            | Total number of available records.            |
| `style`        | `'rounded' \| 'circle' \| 'minimal' \| 'flat' \| 'bordered' \| 'shadow'` | `'rounded'`    | Visual style of the paginator.                |
| `showInfo`     | `boolean`                                                                | `true`         | Displays the results information.             |
| `textShowing`  | `string`                                                                 | `"Mostrando"`  | Text before the starting index.               |
| `textTo`       | `string`                                                                 | `"a"`          | Text between the starting and ending indexes. |
| `textOf`       | `string`                                                                 | `"de"`         | Text before the total number of items.        |
| `textResults`  | `string`                                                                 | `"resultados"` | Text after the total number of items.         |
| `textPrevious` | `string`                                                                 | `"Anterior"`   | Previous page button text.                    |
| `textNext`     | `string`                                                                 | `"Siguiente"`  | Next page button text.                        |

> `totalPages` is calculated internally from `totalItems` and `perPage`.

---

## 📤 Outputs

| Output        | Type                       | Description                                             |
| ------------- | -------------------------- | ------------------------------------------------------- |
| `pageChanged` | `OutputEmitterRef<number>` | Emits the selected page number when the user navigates. |

Example:

```html
<lib-ngx-api-paginator
  (pageChanged)="onPageChange($event)"
/>
```

```ts
onPageChange(page: number) {
  console.log('Selected page:', page);
}
```

---

## 👁️ Optional UI Controls

### Hide results information

```html
<lib-ngx-api-paginator
  [showInfo]="false"
/>
```

### Hide Previous/Next text

Pass an empty string to display only the navigation arrows:

```html
<lib-ngx-api-paginator
  textPrevious=""
  textNext=""
/>
```

This can be useful for compact layouts and mobile interfaces.

---

## 🧪 Requirements

* **Angular 22 or later**
* **Tailwind CSS**

The component uses Tailwind utility classes internally.

---

## 🤝 Contributing

Contributions are welcome!

If you would like to improve the library, fix a bug, add a feature, or improve the documentation, feel free to contribute.

### Development setup

1. Fork the repository.
2. Clone your fork:

```bash
git clone https://github.com/Icelii/ngx-api-paginator.git
```

3. Navigate to the project:

```bash
cd ngx-api-paginator
```

4. Install dependencies:

```bash
npm install
```

5. Create a new branch:

```bash
git checkout -b feat/my-new-feature
```

6. Make your changes and test them locally.

7. Build the library:

```bash
npm run build
```

8. Commit your changes and push your branch:

```bash
git add .
git commit -m "feat: add my new feature"
git push origin feat/my-new-feature
```

9. Open a **Pull Request** describing your changes.

### Contribution guidelines

When contributing, please try to:

* Keep the existing coding style.
* Follow Angular best practices.
* Keep the component lightweight and reusable.
* Add or update documentation when necessary.
* Test your changes before opening a Pull Request.
* Use clear and descriptive commit messages.

For larger changes, opening an issue first is recommended so the approach can be discussed before implementation.

---

## 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.

---

## 👩‍💻 Author

**Iceli**

* Website: https://iceli.dev/
* GitHub: [@Icelii](https://github.com/Icelii)