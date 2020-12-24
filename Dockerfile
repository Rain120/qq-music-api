FROM node:12

LABEL maintainer = "Rain120 <1085131904@qq.com>"

# Create app directory
WORKDIR /

COPY package.json .

RUN yarn install --registry=https://registry.npm.taobao.org

COPY . .

EXPOSE 3200

ENTRYPOINT ["npm", "run"]

CMD ["start"]
