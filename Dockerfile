FROM node:alpine as build

# Install dependancies
COPY package.json .
RUN yarn

# Build TS
COPY . .
RUN yarn build

# Prod
FROM node:alpine

COPY package.json .
RUN yarn --prod

COPY --from=build dist dist

ENTRYPOINT [ "node", "./dist" ]
