curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh

getent group docker || sudo groupadd docker
sudo usermod -aG docker $USER
#do not run "newgrp docker" here

sudo systemctl enable docker.service
sudo systemctl enable containerd.service

sudo service docker start

echo ========== test docker ==========
sudo docker ps -a

# rm ./get-docker.sh

# newgrp will start a subshell, so run it last
newgrp docker
