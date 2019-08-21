from rest_framework import serializers


class TrackerSerializer(serializers.Serializer):
    fileurl = serializers.URLField(min_length=None, allow_blank=False)
