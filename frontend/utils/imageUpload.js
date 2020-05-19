import { blake32Hash } from '~/shared/functions.js'
import { handleFetchResult } from '~/frontend/controller/utils/misc.js'

// Copied from https://stackoverflow.com/a/27980815/4737729
function b64toBlob (dataURI) {
  var byteString = atob(dataURI.split(',')[1])
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: 'image/jpeg' })
}

const imageUpload = async (imageFile, opts = {}) => {
  let file = imageFile

  if (opts.type === 'base64') {
    file = b64toBlob(imageFile)
  }

  console.debug('will upload a picture of type:', file.type)
  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Asynchronously_handling_the_file_upload_process
  const reply = await new Promise((resolve, reject) => {
    // we use FileReader to get raw bytes to generate correct hash
    const reader = new FileReader()
    // https://developer.mozilla.org/en-US/docs/Web/API/Blob
    reader.onloadend = async function () {
      const fd = new FormData()
      const hash = blake32Hash(new Uint8Array(reader.result))
      console.debug('picture hash:', hash)
      fd.append('hash', hash)
      fd.append('data', file)
      fetch(`${process.env.API_URL}/file`, {
        method: 'POST',
        body: fd
      }).then(handleFetchResult('text')).then(resolve).catch(reject)
    }
    reader.readAsArrayBuffer(file)
  })

  return reply + '?type=' + encodeURIComponent(file.type)
}

export default imageUpload
