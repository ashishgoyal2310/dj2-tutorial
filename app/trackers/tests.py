import requests
import sys

fileurl = "https://www.cs.toronto.edu/~kriz/cifar-10-python.tar.gz"
file_name = fileurl.split('/')[-1]
with open(file_name, "wb") as fp:
    print ("Downloading %s" % file_name)
    headers = {"range": "bytes=10000-20000"}
    response = requests.get(fileurl, stream=True, headers=headers)
    total_length = response.headers.get('content-length')

    if total_length is None: # no content length header
        fp.write(response.content)
    else:
        downloaded = 0
        total_length = int(total_length)
        print('total_length -----> ', total_length)
        for data in response.iter_content(chunk_size=4096):
            downloaded += len(data)
            print(downloaded, end=' ')
            fp.write(data)
            done = int(50 * downloaded / total_length)
            sys.stdout.write("\r[%s%s]" % ('=' * done, ' ' * (50-done)) )
            sys.stdout.flush()

