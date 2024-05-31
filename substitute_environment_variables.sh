#!/bin/sh

ROOT_DIR=/app

# Replace env vars in files served by NGINX
for file in $ROOT_DIR/js/*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
do
  sed -i 's|HEADER_APP_PLACEHOLDER|'${HEADER_APP}'|g' $file
  sed -i 's|CORE_APP_PLACEHOLDER|'${CORE_APP}'|g' $file
  # Your other variables here...
done
# Let container execution proceed
exec "$@"
