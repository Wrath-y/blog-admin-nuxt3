const OSS = require("ali-oss");
const fs = require("fs");
const path = require("path");
const os = require("os");
const PUBLIC_PATH = path.join(__dirname);

const client = new OSS({
  accessKeyId: "accessKeyId_example",
  accessKeySecret: "accessKeySecret_example",
  bucket: "bucket_example",
  region: "oss-cn-shanghai"
});

/**
 * 遍历文件夹递归上传
 * @param {path} src 本地路径
 * @param {string} dist oos文件夹名 www|kouzi
 */
function addFileToOSSSync(src, dist) {
  let docs = fs.readdirSync(src);
  docs.forEach(function (doc) {
    let _src = src + "/" + doc,
      _dist = dist + "/" + doc;
    let st = fs.statSync(_src);
    // 判断是否为文件
    if (st.isFile() && doc !== ".DS_Store") {
      putOSS(_src, _dist);
    }
    // 如果是目录则递归调用自身
    else if (st.isDirectory()) {
      addFileToOSSSync(_src, _dist);
    }
  });
}
/**
 *单个文件上传至oss
 */
async function putOSS(src, dist) {
  try {
    await client.put(dist, src);
    console.log(src + dist + "上传oss成功");
  } catch (e) {
    console.log("上传失败".e);
  }
}
/**
 *上传文件启动
 *@param {string} dirName 将要上传的文件名
 */
async function upFile(dirName = '') {
  try {
    await addFileToOSSSync(PUBLIC_PATH + dirName + "/.output/public/_nuxt", 'static_web/_nuxt');
  } catch (err) {
    console.log(dirName + "上传oss成功失败", err);
  }
}

upFile();