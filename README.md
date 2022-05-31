# adp-multi.github.io

## Build locally on Ubuntu

Install tools:

```sh
sudo apt install build-essential ruby ruby-dev
sudo gem install bundler
bundle config set --local path 'vendor/bundle'
bundle install
```

Build the site and start a local server:

```sh
bundle exec jekyll serve --livereload
```
