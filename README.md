# Wheeler
###### formerly known as rental-vehicles-web
A web-app for retailers of rental vehicles and (eventually) private consumers looking to manage all their vehicles in one place. Also offers customer management, automatic price calculations and billing, and much more.

That's the idea anyway. In reality, this project was never meant to be serious and will likely never be "finished." It's just a way for me to evolve as a developer.

## Run the web-app online

1. Go to http://wheeler.clinqlabs.com for the landing page.
2. Go to http://wheeler.clinqlabs.com/dashboard for the backend.
3. Type http://wheeler.clinqlabs.com/* and replace the asterisk with an API command (like "vehicles") to interact with the API. Documentation to follow.

Note that the clinqlabs.com domain is temporary only. In the future, the site will only be available via this github page.

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