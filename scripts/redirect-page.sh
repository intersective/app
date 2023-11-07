#!/bin/bash

set -e


# Define the file name
file_name="redirect.html"

# Create the HTML content
html_content="<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv=\"refresh\" content=\"0;url=$REDIRECT_URL\" />
  </head>
  <body>
  </body>
</html>"

# Write the HTML content to the file
echo "$html_content" > "$file_name"