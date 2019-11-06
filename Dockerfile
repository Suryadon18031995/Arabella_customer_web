FROM node:8.15.1-alpine
RUN mkdir -p /kb-ui
COPY  dist/ .
COPY app.js .
COPY cmd.sh .
WORKDIR /kb-ui
ADD . /kb-ui
# CMD npm run ${APP_START_MODE_ENV}
# RUN npm install -g express
RUN npm config set unsafe-perm true
RUN npm cache clean --force \
    && npm install -g express

CMD sh cmd.sh
# CMD ["sh","-c",'sed -i -e "s@##KB_UI_BFF_URL##@$BFF_URL@g" dist/app.bundle.js && sed -i -e "s@####KB_UI_MEDIA_SERVICE_URL####@$MEDIA_SERVICE_URL@g" dist/app.bundle.js && node app.js']
# CMD ["sh","-c",'node app.js']