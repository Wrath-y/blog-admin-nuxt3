//将接收的对象数据转为请求url接口参数
export function useQueryToString(query = {}) {
  let q = "";
  for (const key in query) {
    if (q == "") {
      q = `?${key}=${query[key]}`;
    } else {
      q += `&${key}=${query[key]}`;
    }
  }
  return q;
}

//回车事件
export function useEnterEvent(event) {
  let handleEnterEvent = (e) => {
    if (e.key === "Enter") {
      event();
      e.preventDefault();
    }
  };
  onBeforeMount(() => {
    document.addEventListener("keydown", handleEnterEvent);
  });

  //移除事件
  onUnmounted(() => {
    document.removeEventListener("keydown", handleEnterEvent);
  });
}

//时间状态判断
export function useTimeStatus(start, end) {
  start = new Date(start).getTime();
  end = new Date(end).getTime();
  const now = Date.now();

  let status = "";
  if (start < now && now < end) {
    status = "ing";
  } else if (start >= now) {
    status = "pending";
  } else {
    status = "end";
  }

  return status;
}

export function getNowFormatDateTime(timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export function getNowFormatDate(timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`
}

export async function getOssPolicy(dir) {
  // 上传前进行服务器签名
  const { data } = await useHttpGet('uploads', '/uploads', {})
  if (data.value.code == 200) {
    let obj = data.value.data.form
    obj.dir = dir;
    obj.host = data.value.data.upload_url
    obj.key = obj.dir + "${filename}";
    return obj
  } else {
    return null
  }
}