import os
import requests
from django.conf import settings
from config import celery_app

from celery.result import AsyncResult
from celery import current_task


def get_celery_task_status(task_id):
    task_response = AsyncResult(task_id)
    if task_response.state == 'Downloading':
        response = task_response.info
    else:
        response = {}

    response.update({
        'state': task_response.state,
        'status': task_response.status,
        'id': task_response.id,
        'task_id': task_id,
    })
    return response


@celery_app.task(name="get_file_from_url")
def get_file_from_url(fileurl):
    file_name = fileurl.split('/')[-1]
    file_path = os.path.join(settings.MEDIA_ROOT, file_name)

    with open(file_path, "wb") as fp:
        task_id = current_task.request.id
        # print("Downloading %s" % file_path)
        response = requests.get(fileurl, stream=True)
        total_size = response.headers.get('content-length')

        if total_size is None: # no content length header
            fp.write(response.content)
        else:
            downloaded_size = 0
            total_size = int(total_size)
            # print('total_size -----> ', total_size)
            for data in response.iter_content(chunk_size=4096):
                downloaded_size += len(data)
                fp.write(data)

                current_task.update_state(
                    task_id=task_id,
                    state='Downloading',
                    meta={
                        'total_size': total_size,
                        'downloaded_size': downloaded_size,
                        'pending_size': total_size - downloaded_size,
                        'speed': '',
                    },
                )
