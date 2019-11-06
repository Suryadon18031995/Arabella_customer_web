# # actual commands
# sudo docker rm -f aob-ui
# sudo docker pull $REGISTRY_PATH/aob-ui
# sudo docker run -d -p 3131:3131 -e BFF_URL=http://docker.kabloomstaging.com/admin-bff -e MEDIA_SERVICE_URL=http://docker.kabloomstaging.com/media-service  --restart always --name aob-ui $REGISTRY_PATH/aob-ui 
if [[ $(sudo docker inspect --format . kb-ui) == "." ]]; then
  sudo docker rm -f kb-ui;
fi
#sudo docker rm -f kb-ui
sudo docker run -d -p 3100:3010 -e BFF_URL=http://docker.kabloomstaging.com:2001/admin-bff --restart always --name kb-ui kb-ui