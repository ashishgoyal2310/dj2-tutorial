from django.contrib import admin
from app.snippets.models import Snippet


@admin.register(Snippet)
class SnippetAdmin(admin.ModelAdmin):
    exclude = ()
    date_hierarchy = 'created'
    list_display = ('title', 'title_upper_case', 'linenos', 'language', 'style',)
    list_filter = ('linenos', 'style', 'language',)
    search_fields = ('title',)
    readonly_fields = ('created',)

    fieldsets = (
        (None, {
            'fields': ('title', 'code',)
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': ('linenos', 'language', 'style',),
        }),
        ('DateTime options', {
            'classes': ('collapse',),
            'fields': ('created',),
        }),
    )

    def title_upper_case(self, obj):
        return obj.title.upper()

    title_upper_case.short_description = 'Title UC'
