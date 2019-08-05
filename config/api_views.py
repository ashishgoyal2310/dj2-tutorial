from collections import OrderedDict
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    return Response(OrderedDict([
        ('user', {
            'users': reverse('user-list', request=request, format=format),
        }),
        ('snippet', {
            'snippet list': reverse('snippet-list', request=request, format=format),
            'snippet detail': reverse('snippet-detail', request=request, format=format, args=[1]),
        })
    ]))
