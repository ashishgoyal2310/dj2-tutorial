from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from app.trackers.serializers import TrackerSerializer
from app.trackers import tasks


class TrackerList(APIView):
    """
    """
    def post(self, request, format=None):
        serializer = TrackerSerializer(data=request.data)
        if serializer.is_valid():
            fileurl = serializer.data.get('fileurl')
            celery_task_response = tasks.get_file_from_url.apply_async([fileurl], countdown=0)

            response = serializer.data
            response.update({
                'task_id': celery_task_response.task_id
            })
            return Response(response, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TrackerDetail(APIView):
    """
    """
    def get(self, request, task_id, format=None):
        celery_task_response = tasks.get_celery_task_status(task_id)
        return Response(celery_task_response, status=status.HTTP_201_CREATED)
