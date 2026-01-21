# Personal Website

My personal website built with the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme.

## 🌐 View the Website

**[https://plana93.github.io](https://plana93.github.io)**

## Local Development

### Prerequisites

- Ruby 4.0+ (install via Homebrew: `brew install ruby`)
- Bundler gem (`gem install bundler`)

### Running the site locally

1. **Install dependencies:**
   ```bash
   bundle install
   ```

2. **Start the Jekyll server:**
   ```bash
   bundle exec jekyll serve --livereload --host 0.0.0.0
   ```

3. **Open your browser:**
   The site will be available at `http://localhost:4000`

### Notes

- **Live reload** is enabled - changes to files will automatically refresh your browser
- Some plugins are temporarily disabled for Ruby 4.0 compatibility:
  - `jekyll-twitter-plugin` (requires `ostruct` gem)
  - `mini_racer` (requires C++20 compiler)
- ImageMagick warnings can be ignored (optional image optimization)

### Alternative: Docker (if you prefer)

```bash
docker compose up
```

The site will be available at `http://localhost:8080`.

## License

This project uses the [al-folio](https://github.com/alshedivat/al-folio) theme, which is available under the [MIT License](LICENSE).
