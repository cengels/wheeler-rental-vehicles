# Wheeler
###### formerly known as rental-vehicles-web
A web-app for retailers of rental vehicles and (eventually) private consumers looking to manage all their vehicles in one place. Also offers customer management, automatic price calculations and billing, and much more.

## Run the web-app online

1. Go to http://wheeler.clinqlabs.com for the landing page.
2. Go to http://wheeler.clinqlabs.com/rental or any of the other linked sub-pages to get a glimpse into the backend.

Note that the domain is temporary only. Also note that the app is an active work-in-progress, and that you will eventually be able to register an account and access a one-page dashboard instead of individual HTML pages.

## Run the web-app locally

1. Clone repository
2. Rename directory "config_example" into "config"
3. Adjust config variables
4. Define environment variable NODE_ENV as "production" or "development" (default is "development")

## Changing Environment Variable

1. Open your terminal
2. Do one of the following:
    1. Define environment variable forever
        1. Open `~/.bashrc` (or `.zshrc` depending on what shell you use)
        2. Add a new line: `export NODE_ENV=development`
        3. Save and quit
    2. Define environment variable for current session only
        1. Type `export NODE_ENV=development` in your shell
        2. Restart your shell (type `bash` or `zsh`)
    3. Define environment variable for current terminal only
        1. Type `NODE_ENV=development`