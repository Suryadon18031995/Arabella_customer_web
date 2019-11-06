#!/bin/sh

# sed -i -e "s@##KB_UI_BFF_URL##@$BFF_URL@g" dist/app.bundle.js
# sed -i -e "s@##KB_UI_MEDIA_SERVICE_URL##@$MEDIA_SERVICE_URL@g" dist/app.bundle.js
pm2 start app.js