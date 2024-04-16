FROM postgres:16.2-bookworm
RUN apt update && apt install -y nodejs npm
RUN npm i -g npx
# Solution for npx error: npm ERR! cb.apply is not a function
RUN rm /usr/local/bin/npx && npm install -g npm@latest
WORKDIR /shooter_api
COPY . .
EXPOSE 3000
RUN npm install
RUN npm run build
CMD ["npm", "start"]