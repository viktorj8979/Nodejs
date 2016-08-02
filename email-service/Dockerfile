FROM ubuntu:latest

RUN apt-get update
RUN apt-get -y upgrade

RUN DEBIAN_FRONTEND=noninteractive apt-get -y install curl

RUN curl -sL https://deb.nodesource.com/setup_0.12 | bash -
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs

# Copy site into place.
ADD . /var/email

WORKDIR /var/email
RUN npm install
RUN npm install supervisor -g

EXPOSE 3000
CMD npm start