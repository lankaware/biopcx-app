// export const apiURI = 'http://vndl4:8080/'
export const apiURI = process.env.REACT_APP_APIURL.trim()

export async function getList(apiDesc) {
  return fetch( apiURI + apiDesc,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accept': '*/*',
      },
    },
  )
    .then(data => data.json())
}

export async function putRec(apiDesc, dataSend ) {
  return fetch(apiURI + apiDesc,
    {
      method: 'PUT',
       headers: {
        "Content-type": "application/json; charset=UTF-8"
       },
      body: dataSend,
    },
  )
    .then(data => data.json())
}

export async function postRec(apiDesc, dataSend) {
  return fetch(apiURI + apiDesc,
    {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
       },
      body: dataSend,
    },
  )
    .then(data => data.json())
}

export async function deleteRec(apiDesc, dataSend) {
  return fetch(apiURI + apiDesc,
    {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
       },
      body: dataSend,
    },
  )
    .then(data => data.json())
}

//Content-Type

