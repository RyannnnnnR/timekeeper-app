if [ ! "$(docker ps -q -f name=mysql)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=<name>)" ]; then
        # cleanup
        docker rm mysql
    fi
    # run your container
    docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password --name  mysql mysql
fi
