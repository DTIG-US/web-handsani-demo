# web-carousel — News Carousel Component

This submodule contains the `CarouselComponent` for the **IH Hand Sanitation** portal. It displays a hero banner carousel alongside a live news feed panel, both driven by `data.json`.

- [CHANGELOG](CHANGELOG.md)
- [CLIFF NOTES](CLIFF_NOTES.md)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The `CarouselComponent` renders two side-by-side panels:

- **Left (75%)** — A `ngx-slick-carousel` banner displaying slides with title, label, and description text from `data.json`.
- **Right (25%)** — A news feed listing article links from `data.json`.

Files in this submodule:

| File | Purpose |
| --- | --- |
| `carousel.component.ts` | Component class — loads `data.json`, configures `slideConfig`, handles carousel events |
| `carousel.component.html` | Template — Bootstrap grid, `<ngx-slick-carousel>`, and news panel |
| `carousel.component.css` | Component-scoped styles (glassmorphism, layout, slide styling) |
| `carousel.component.spec.ts` | Unit tests (Karma + Jasmine) |

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/DTIG-US/web-carousel.git
   cd web-carousel
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

> [!NOTE]
> In normal use, this component is consumed as a Git submodule of `ih-hand-sanitation-www`. See the [parent README](https://github.com/DTIG-US/ih-hand-sanitation-www) for the full setup workflow.

---

## Usage

Add the selector to your root application template (`app.html`):

```html
<app-carousel></app-carousel>
```

Import the component in your root `App` component (Angular v20+ standalone — no NgModule required):

```typescript
import { Component } from '@angular/core';
import { CarouselComponent } from './web-carousel/carousel.component';

@Component({
  selector: 'app-root',
  imports: [CarouselComponent],
  templateUrl: './app.html',
})
export class App {}
```

---

## Configuration

The carousel behaviour is controlled by the `slideConfig` object in `carousel.component.ts`:

```typescript
slideConfig = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  autoplay: true
};
```

Modify these options to change the number of visible slides, enable/disable autoplay, or add navigation arrows. Full configuration options are documented in the [ngx-slick-carousel docs](https://github.com/devmark/ngx-slick-carousel).

### Data Shape

The component reads `../../data.json`. The expected structure:

```json
{
  "carousel": [
    {
      "title": "Slide Title",
      "label": "Category Label",
      "description": "Short description text."
    }
  ],
  "news": [
    {
      "title": "News Article Title",
      "url": "https://example.com/article"
    }
  ]
}
```

---

## Dependencies

| Package | Purpose |
| --- | --- |
| `ngx-slick-carousel` | Angular wrapper for the Slick carousel library |
| `slick-carousel` | Core Slick carousel JS/CSS |
| `bootstrap` | Grid layout and utility classes |
| `jquery` | Required peer dependency of `slick-carousel` |
| `@angular/common` | `CommonModule` for structural directives |

---

## Testing

Run the unit test suite with:

```bash
ng test
```

---

## Contributing

1. Fork this repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Description of changes"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a pull request against `DTIG-US/web-carousel`.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
