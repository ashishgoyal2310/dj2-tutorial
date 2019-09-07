import os
import requests
from django.conf import settings
from config import celery_app

from celery.result import AsyncResult
from celery import current_task

from django.core.cache import caches
cache = caches['default']
fbcache = caches['fbCache']


def get_celery_task_status(task_id):
    response = {
        'total_size': 0,
        'downloaded_size': 0,
        'pending_size': 0,
        'speed': '',
        'state': 'Waiting',
        'file_name': '',
        'file_path': '',
        'file_url': '',
    }
    cache_data = cache.get(task_id)
    if cache_data:
        response.update(cache_data)

    response.update({
        'id': task_id,
        'task_id': task_id,
    })
    return response


@celery_app.task(name="get_file_from_url")
def get_file_from_url(fileurl):
    file_name = fileurl.split('/')[-1]
    file_path = os.path.join(settings.MEDIA_ROOT, file_name)
    file_url = os.path.join(settings.MEDIA_URL, file_name)

    with open(file_path, "wb") as fp:
        task_id = current_task.request.id
        # print("Downloading %s" % file_path)
        response = requests.get(fileurl, stream=True)
        total_size = response.headers.get('content-length')

        status = {
            'total_size': total_size,
            'downloaded_size': 0,
            'pending_size': total_size,
            'speed': '',
            'state': 'Waiting',
            'file_name': file_name,
            'file_path': file_path,
            'file_url': file_url
        }

        if total_size is None: # no content length header
            fp.write(response.content)
            status.update({'total_size': 0, 'pending_size': 0})
        else:
            downloaded_size = 0
            total_size = int(total_size)
            # print('total_size -----> ', total_size)
            status.update({'total_size': total_size})
            try:
                for data in response.iter_content(chunk_size=4096):
                    downloaded_size += len(data)
                    fp.write(data)

                    # current_task.update_state(
                    #     task_id=task_id,
                    #     state='Downloading',
                    #     meta={
                    #         'total_size': total_size,
                    #         'downloaded_size': downloaded_size,
                    #         'pending_size': total_size - downloaded_size,
                    #         'speed': '',
                    #     },
                    # )

                    status.update({'downloaded_size': downloaded_size, 'pending_size': total_size - downloaded_size,
                                   'state': 'Downloading'})
                    cache.set(task_id, status, timeout=settings.CACHE_TTL)
            except Exception as exc:
                    status.update({'state': 'Failed', 'message': str(exc)})

        status = cache.get(task_id)
        # print('status from cache -----> ', status)
        status.update({'state': 'Downloaded'})
        cache.set(task_id, status, timeout=settings.CACHE_TTL)

