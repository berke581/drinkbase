FROM node:19-alpine3.15

LABEL maintainer="Berke Yoncaci <berke5sekiz1@gmail.com>"

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

ENTRYPOINT ["yarn"]
CMD ["start:dev"]
