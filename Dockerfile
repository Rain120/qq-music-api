FROM node:22

LABEL maintainer="Rain120 <1085131904@qq.com>"

# Create app directory
WORKDIR /app

COPY package.json .

RUN yarn install --registry=https://registry.npmmirror.com

COPY . .

EXPOSE 3200

ENTRYPOINT ["npm", "run"]

CMD ["start"]
