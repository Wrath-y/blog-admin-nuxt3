# 阶段一
FROM node:20.5.1-buster as builder
WORKDIR /build

ENV ACCESS_KEY_ID _ACCESS_KEY_ID
ENV ACCESS_KEY_SECRET _ACCESS_KEY_SECRET
ENV BUCKET_NAME _BUCKET_NAME

COPY . .
RUN yarn install; \
    yarn build; \
    sed -in-place -e "s/accessKeyId_example/$ACCESS_KEY_ID/g" upload_to_oss.js; \
    sed -in-place -e "s/accessKeySecret_example/$ACCESS_KEY_SECRET/g" upload_to_oss.js; \
    sed -in-place -e "s/bucket_example/$BUCKET_NAME/g" upload_to_oss.js; \
    node upload_to_oss.js

# 阶段二
FROM node:20.5.1-buster-slim
WORKDIR /app

COPY --from=builder /build/assets ./assets
COPY --from=builder /build/.output ./.output
ENTRYPOINT ["node", "/app/.output/server/index.mjs"]
