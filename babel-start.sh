# cd $WORKSPACE

# echo "files are"

# npm -v


# npm install 

# echo "files are"

# #git add . && git commit -m "run npm install on jenkins"

# npm version patch  --force 


# VERSION=$(node -p -e "require('./package.json').version")


# export APPNAME=aob-ui

# export VERSIONEDAPPNAME=$APPNAME:$VERSION

# npm run build-prod

# sudo docker build -t $APPNAME .

# sudo docker tag $APPNAME $REGISTRY_PATH/$APPNAME
# sudo docker tag $APPNAME $REGISTRY_PATH/$VERSIONEDAPPNAME


# sudo docker push $REGISTRY_PATH/$APPNAME
# sudo docker push $REGISTRY_PATH/$VERSIONEDAPPNAME

# git push git@bitbucket.org:allOnBlock/aob-company-admin-web-app.git HEAD:develop

# cd $WORKSPACE
# export BFF_URL=http://docker.kabloomstaging.com:2001/admin-bff @todo
# echo $BFF_URL @todo
echo "files are"

npm -v

npm install 

echo "files are"

#git add . && git commit -m "run npm install on jenkins"

npm version patch  --force

# VERSION=$(node -p -e "require('./package.json').version") @todo

# export APPNAME=kb-ui @todo

# export VERSIONEDAPPNAME=$APPNAME:$VERSION @todo

npm run build-prod

# sudo docker build -t $APPNAME .@todo

# sudo docker tag $APPNAME $APPNAME @todo
# sudo docker tag $APPNAME $VERSIONEDAPPNAME @todo

# git push http://uat.bloomkonnect.com:8081/lsultana/bkm_react_ui.git HEAD:develop