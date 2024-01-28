#!/bin/bash

#docker build -t nmf_client . && docker run -it -p 5900:5900 -p 6901:6901 --privileged --rm nmf_client
docker build -t nmf_client . && docker run -it --cap-add=NET_ADMIN -p 5900:5900 -p 6901:6901 --rm nmf_client

