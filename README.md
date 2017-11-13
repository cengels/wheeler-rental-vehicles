# rental-vehicles-web
Rent vehicles — now as web app!

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