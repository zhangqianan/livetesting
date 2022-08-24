import {request,request2} from "./request.js"

export function updateVedio(param) {
  return request2({
    url: '/img/upload',
    method: 'post',
    data: param,
    headers: { "Content-Type":"multipart/form-data"},
  })
}

export function livingH5(datas) {
  return request({
    url: '/ws/dataPay/updateVideo',
    method: 'post',
    data: datas,
    // dataType:'json',
    headers: { 'Content-Type':'application/json' },
  })
}

export function judgeToken(tokenId) {
  console.log("------------"+tokenId)
  return request({
    url: '/ws/livetesting/parsingToken',
    method: 'post',
    data: tokenId,
    // dataType:'json',
    headers: {
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      // token: 'JSESSIONID=F584F80B7C575B648000029C93A709F1'
    },
  })
}

export function getQrCode(data){
  return request({
    url: '/ws/livetesting/getQrCode',
    method: 'post',
    data: data,
    headers: {
      'Content-Type':'application/json',
      "Token":'JSESSIONID=F584F80B7C575B648000029C93A709F1',
    },
  })
}

export function getQrCodePerson(data){
  return request({
    url: '/ws/realName/getQrCode',
    method: 'post',
    data: data,
    headers: {
      'Content-Type':'application/json',
      "Token":'JSESSIONID=F584F80B7C575B648000029C93A709F1',
    },
  })
}

export function faceRec(param){
  // console.log(param.tokenId);
  // console.log(param);
  return request({
    url: '/ws/livetesting/faceRec',
    method: 'post',
    data: param,
    headers: {
      "Content-Type":"multipart/form-data",
      'Access-Control-Allow-Origin':'*',
      "Token":'JSESSIONID=F584F80B7C575B648000029C93A709F1'
    },
  })
}

export function resultResponse(param){
  return request({
    url: '/ws/realName/faceRec',
    method: 'post',
    data: param,
    headers: {
      "Content-Type":"multipart/form-data",
      'Access-Control-Allow-Origin':'*',
      "Token":'JSESSIONID=F584F80B7C575B648000029C93A709F1'
    },
  })
}
